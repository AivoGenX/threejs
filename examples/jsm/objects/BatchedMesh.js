import {
	BufferAttribute,
	BufferGeometry,
	DataTexture,
	FloatType,
	MathUtils,
	Matrix4,
	Mesh,
	RGBAFormat,
	Box3,
	Sphere,
	Frustum,
	WebGLCoordinateSystem,
	WebGPUCoordinateSystem,
	Vector3,
} from 'three';

const ID_ATTR_NAME = 'batchId';
const _matrix = new Matrix4();
const _identityMatrix = new Matrix4();
const _zeroScaleMatrix = new Matrix4().set(
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 1,
);
const _projScreenMatrix = new Matrix4();
const _frustum = new Frustum();
const _box = new Box3();
const _sphere = new Sphere();
const _vector = new Vector3();

// @TODO: SkinnedMesh support?
// @TODO: Future work if needed. Move into the core. Can be optimized more with WEBGL_multi_draw.

// copies data from attribute "src" into "target" starting at "targetOffset"
function copyAttributeData( src, target, targetOffset = 0 ) {

	const itemSize = target.itemSize;
	if ( src.isInterleavedBufferAttribute || src.array.constructor !== target.array.constructor ) {

		// use the component getters and setters if the array data cannot
		// be copied directly
		const vertexCount = src.count;
		for ( let i = 0; i < vertexCount; i ++ ) {

			for ( let c = 0; c < itemSize; c ++ ) {

				target.setComponent( i + targetOffset, c, src.getComponent( i, c ) );

			}

		}

	} else {

		// faster copy approach using typed array set function
		target.array.set( src.array, targetOffset * itemSize );

	}

	target.needsUpdate = true;

}

class BatchedMesh extends Mesh {

	constructor( maxGeometryCount, maxVertexCount, maxIndexCount = maxVertexCount * 2, material ) {

		super( new BufferGeometry(), material );

		this.isBatchedMesh = true;

		this._drawRanges = [];
		this._reservedRanges = [];

		this._visible = [];
		this._active = [];
		this._bounds = [];

		this._maxGeometryCount = maxGeometryCount;
		this._maxVertexCount = maxVertexCount;
		this._maxIndexCount = maxIndexCount;

		this._geometryInitialized = false;
		this._geometryCount = 0;
		this._multiDrawCounts = null;
		this._multiDrawStarts = null;
		this._multiDrawCount = 0;

		// Local matrix per geometry by using data texture
		// @TODO: Support uniform parameter per geometry

		this._matrices = [];
		this._matricesTexture = null;

		this._initMatricesTexture();

	}

	_initMatricesTexture() {

		// layout (1 matrix = 4 pixels)
		//      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
		//  with  8x8  pixel texture max   16 matrices * 4 pixels =  (8 * 8)
		//       16x16 pixel texture max   64 matrices * 4 pixels = (16 * 16)
		//       32x32 pixel texture max  256 matrices * 4 pixels = (32 * 32)
		//       64x64 pixel texture max 1024 matrices * 4 pixels = (64 * 64)

		let size = Math.sqrt( this._maxGeometryCount * 4 ); // 4 pixels needed for 1 matrix
		size = MathUtils.ceilPowerOfTwo( size );
		size = Math.max( size, 4 );

		const matricesArray = new Float32Array( size * size * 4 ); // 4 floats per RGBA pixel
		const matricesTexture = new DataTexture( matricesArray, size, size, RGBAFormat, FloatType );

		this._matricesTexture = matricesTexture;

	}

	_initializeGeometry( reference ) {

		// @TODO: geometry.groups support?
		// @TODO: geometry.drawRange support?
		// @TODO: geometry.morphAttributes support?

		const geometry = this.geometry;
		const maxVertexCount = this._maxVertexCount;
		const maxGeometryCount = this._maxGeometryCount;
		const maxIndexCount = this._maxIndexCount;
		if ( this._geometryInitialized === false ) {

			for ( const attributeName in reference.attributes ) {

				const srcAttribute = reference.getAttribute( attributeName );
				const { array, itemSize, normalized } = srcAttribute;

				const dstArray = new array.constructor( maxVertexCount * itemSize );
				const dstAttribute = new srcAttribute.constructor( dstArray, itemSize, normalized );
				dstAttribute.setUsage( srcAttribute.usage );

				geometry.setAttribute( attributeName, dstAttribute );

			}

			if ( reference.getIndex() !== null ) {

				const indexArray = maxVertexCount > 65536
					? new Uint32Array( maxIndexCount )
					: new Uint16Array( maxIndexCount );

				geometry.setIndex( new BufferAttribute( indexArray, 1 ) );

			}

			const idArray = maxGeometryCount > 65536
				? new Uint32Array( maxVertexCount )
				: new Uint16Array( maxVertexCount );
			geometry.setAttribute( ID_ATTR_NAME, new BufferAttribute( idArray, 1 ) );

			// Use infinitely large bounds since frustum culling will occur in onBeforeRender
			const box = new Box3();
			box.min.setScalar( - Infinity );
			box.max.setScalar( Infinity );
			geometry.boundingBox = box;

			const sphere = new Sphere();
			sphere.radius = Infinity;
			geometry.boundingSphere = sphere;

			this._geometryInitialized = true;
			this._multiDrawCounts = new Int32Array( maxGeometryCount );
			this._multiDrawStarts = new Int32Array( maxGeometryCount );

		}

	}

	// Make sure the geometry is compatible with the existing combined geometry atributes
	_validateGeometry( geometry ) {

		// check that the geometry doesn't have a version of our reserved id attribute
		if ( geometry.getAttribute( ID_ATTR_NAME ) ) {

			throw new Error( `BatchedMesh: Geometry cannot use attribute "${ ID_ATTR_NAME }"` );

		}

		// check to ensure the geometries are using consistent attributes and indices
		const batchGeometry = this.geometry;
		if ( Boolean( geometry.getIndex() ) !== Boolean( batchGeometry.getIndex() ) ) {

			throw new Error( 'BatchedMesh: All geometries must consistently have "index".' );

		}

		for ( const attributeName in batchGeometry.attributes ) {

			if ( attributeName === ID_ATTR_NAME ) {

				continue;

			}

			if ( ! geometry.hasAttribute( attributeName ) ) {

				throw new Error( `BatchedMesh: Added geometry missing "${ attributeName }". All geometries must have consistent attributes.` );

			}

			const srcAttribute = geometry.getAttribute( attributeName );
			const dstAttribute = batchGeometry.getAttribute( attributeName );
			if ( srcAttribute.itemSize !== dstAttribute.itemSize || srcAttribute.normalized !== dstAttribute.normalized ) {

				throw new Error( 'BatchedMesh: All attributes must have a consistent itemSize and normalized value.' );

			}

		}

	}

	getGeometryCount() {

		return this._geometryCount;

	}

	getVertexCount() {

		const reservedRanges = this._reservedRanges;
		if ( reservedRanges.length === 0 ) {

			return 0;

		} else {

			const finalRange = reservedRanges[ reservedRanges.length - 1 ];
			return finalRange.vertexStart + finalRange.vertexCount;

		}

	}

	getIndexCount() {

		const reservedRanges = this._reservedRanges;
		const geometry = this.geometry;
		if ( geometry.getIndex() === null || reservedRanges.length === 0 ) {

			return 0;

		} else {

			const finalRange = reservedRanges[ reservedRanges.length - 1 ];
			return finalRange.indexStart + finalRange.indexCount;

		}

	}

	addGeometry( geometry, vertexCount = - 1, indexCount = - 1 ) {

		this._initializeGeometry( geometry );

		this._validateGeometry( geometry );

		// ensure we're not over geometry
		if ( this._geometryCount >= this._maxGeometryCount ) {

			throw new Error( 'BatchedMesh: Maximum geometry count reached.' );

		}

		// get the necessary range fo the geometry
		const reservedRange = {
			vertexStart: - 1,
			vertexCount: - 1,
			indexStart: - 1,
			indexCount: - 1,
		};

		let lastRange = null;
		const reservedRanges = this._reservedRanges;
		const drawRanges = this._drawRanges;
		const bounds = this._bounds;
		if ( this._geometryCount !== 0 ) {

			lastRange = reservedRanges[ reservedRanges.length - 1 ];

		}

		if ( vertexCount === - 1 ) {

			reservedRange.vertexCount = geometry.getAttribute( 'position' ).count;

		} else {

			reservedRange.vertexCount = vertexCount;

		}

		if ( lastRange === null ) {

			reservedRange.vertexStart = 0;

		} else {

			reservedRange.vertexStart = lastRange.vertexStart + lastRange.vertexCount;

		}

		const index = geometry.getIndex();
		const hasIndex = index !== null;
		if ( hasIndex ) {

			if ( indexCount	=== - 1 ) {

				reservedRange.indexCount = index.count;

			} else {

				reservedRange.indexCount = indexCount;

			}

			if ( lastRange === null ) {

				reservedRange.indexStart = 0;

			} else {

				reservedRange.indexStart = lastRange.indexStart + lastRange.indexCount;

			}

		}

		if (
			reservedRange.indexStart !== - 1 &&
			reservedRange.indexStart + reservedRange.indexCount > this._maxIndexCount ||
			reservedRange.vertexStart + reservedRange.vertexCount > this._maxVertexCount
		) {

			throw new Error( 'BatchedMesh: Reserved space request exceeds the maximum buffer size.' );

		}

		const visible = this._visible;
		const active = this._active;
		const matricesTexture = this._matricesTexture;
		const matrices = this._matrices;
		const matricesArray = this._matricesTexture.image.data;

		// push new visibility states
		visible.push( true );
		active.push( true );

		// update id
		const geometryId = this._geometryCount;
		this._geometryCount ++;

		// initialize matrix information
		matrices.push( new Matrix4() );
		_identityMatrix.toArray( matricesArray, geometryId * 16 );
		matricesTexture.needsUpdate = true;

		// add the reserved range and draw range objects
		reservedRanges.push( reservedRange );
		drawRanges.push( {
			start: hasIndex ? reservedRange.indexStart : reservedRange.vertexStart,
			count: - 1
		} );
		bounds.push( {
			boxInitialized: false,
			box: new Box3(),

			sphereInitialized: false,
			sphere: new Sphere()
		} );

		// set the id for the geometry
		const idAttribute = this.geometry.getAttribute( ID_ATTR_NAME );
		for ( let i = 0; i < reservedRange.vertexCount; i ++ ) {

			idAttribute.setX( reservedRange.vertexStart + i, geometryId );

		}

		idAttribute.needsUpdate = true;

		// update the geometry
		this.setGeometryAt( geometryId, geometry );

		return geometryId;

	}

	setGeometryAt( id, geometry ) {

		if ( id >= this._geometryCount ) {

			throw new Error( 'BatchedMesh: Maximum geometry count reached.' );

		}

		this._validateGeometry( geometry );

		const batchGeometry = this.geometry;
		const hasIndex = batchGeometry.getIndex() !== null;
		const dstIndex = batchGeometry.getIndex();
		const srcIndex = geometry.getIndex();
		const reservedRange = this._reservedRanges[ id ];
		if (
			hasIndex &&
			srcIndex.count > reservedRange.indexCount ||
			geometry.attributes.position.count > reservedRange.vertexCount
		) {

			throw new Error( 'BatchedMesh: Reserved space not large enough for provided geometry.' );

		}

		// copy geometry over
		const vertexStart = reservedRange.vertexStart;
		const vertexCount = reservedRange.vertexCount;
		for ( const attributeName in batchGeometry.attributes ) {

			if ( attributeName === ID_ATTR_NAME ) {

				continue;

			}

			// copy attribute data
			const srcAttribute = geometry.getAttribute( attributeName );
			const dstAttribute = batchGeometry.getAttribute( attributeName );
			copyAttributeData( srcAttribute, dstAttribute, vertexStart );

			// fill the rest in with zeroes
			const itemSize = srcAttribute.itemSize;
			for ( let i = srcAttribute.count, l = vertexCount; i < l; i ++ ) {

				const index = vertexStart + i;
				for ( let c = 0; c < itemSize; c ++ ) {

					dstAttribute.setComponent( index, c, 0 );

				}

			}

			dstAttribute.needsUpdate = true;

		}

		// copy index
		if ( hasIndex ) {

			const indexStart = reservedRange.indexStart;

			// copy index data over
			for ( let i = 0; i < srcIndex.count; i ++ ) {

				dstIndex.setX( indexStart + i, vertexStart + srcIndex.getX( i ) );

			}

			// fill the rest in with zeroes
			for ( let i = srcIndex.count, l = reservedRange.indexCount; i < l; i ++ ) {

				dstIndex.setX( indexStart + i, vertexStart );

			}

			dstIndex.needsUpdate = true;

		}

		// store the bounding boxes
		const bound = this._bounds[ id ];
		if ( geometry.boundingBox !== null ) {

			bound.box.copy( geometry.boundingBox );
			bound.boxInitialized = true;

		} else {

			bound.boxInitialized = false;

		}

		if ( geometry.boundingSphere !== null ) {

			bound.sphere.copy( geometry.boundingSphere );
			bound.sphereInitialized = true;

		} else {

			bound.sphereInitialized = false;

		}

		// set drawRange count
		const drawRange = this._drawRanges[ id ];
		const posAttr = geometry.getAttribute( 'position' );
		drawRange.count = hasIndex ? srcIndex.count : posAttr.count;

		return id;

	}

	deleteGeometry( geometryId ) {

		// Note: User needs to call optimize() afterward to pack the data.

		const active = this._active;
		const matricesArray = this._matricesTexture.image.data;
		const matricesTexture = this._matricesTexture;
		if ( geometryId >= active.length || active[ geometryId ] === false ) {

			return this;

		}

		active[ geometryId ] = false;
		_zeroScaleMatrix.toArray( matricesArray, geometryId * 16 );
		matricesTexture.needsUpdate = true;

		return this;

	}

	// get bounding box and compute it if it doesn't exist
	getBoundingBoxAt( id, target ) {

		const active = this._active;
		if ( active[ id ] === false ) {

			return this;

		}

		// compute bounding box
		const bound = this._bounds[ id ];
		const box = bound.box;
		const geometry = this.geometry;
		if ( bound.boxInitialized === false ) {

			box.makeEmpty();

			const index = geometry.index;
			const position = geometry.attributes.position;
			const drawRange = this._drawRanges[ id ];
			for ( let i = drawRange.start, l = drawRange.start + drawRange.count; i < l; i ++ ) {

				let iv = i;
				if ( index ) {

					iv = index.getX( iv );

				}

				box.expandByPoint( _vector.fromBufferAttribute( position, iv ) );

			}

			bound.boxInitialized = true;

		}

		target.copy( box );
		return target;

	}

	// get bounding sphere and compute it if it doesn't exist
	getBoundingSphereAt( id, target ) {

		const active = this._active;
		if ( active[ id ] === false ) {

			return this;

		}

		// compute bounding sphere
		const bound = this._bounds[ id ];
		const sphere = bound.sphere;
		const geometry = this.geometry;
		if ( bound.sphereInitialized === false ) {

			sphere.makeEmpty();

			this.getBoundingBoxAt( id, _box );
			_box.getCenter( sphere.center );

			const index = geometry.index;
			const position = geometry.attributes.position;
			const drawRange = this._drawRanges[ id ];

			let maxRadiusSq = 0;
			for ( let i = drawRange.start, l = drawRange.start + drawRange.count; i < l; i ++ ) {

				let iv = i;
				if ( index ) {

					iv = index.getX( iv );

				}

				_vector.fromBufferAttribute( position, iv );
				maxRadiusSq = Math.max( maxRadiusSq, sphere.center.distanceToSquared( _vector ) );

			}

			sphere.radius = Math.sqrt( maxRadiusSq );
			bound.sphereInitialized = true;

		}

		target.copy( sphere );
		return target;

	}

	optimize() {

		throw new Error( 'BatchedMesh: Optimize function not implemented.' );

	}

	setMatrixAt( geometryId, matrix ) {

		// @TODO: Map geometryId to index of the arrays because
		//        optimize() can make geometryId mismatch the index

		const visible = this._visible;
		const active = this._active;
		const matricesTexture = this._matricesTexture;
		const matrices = this._matrices;
		const matricesArray = this._matricesTexture.image.data;
		if ( geometryId >= matrices.length || active[ geometryId ] === false ) {

			return this;

		}

		if ( visible[ geometryId ] === true ) {

			matrix.toArray( matricesArray, geometryId * 16 );
			matricesTexture.needsUpdate = true;

		}

		matrices[ geometryId ].copy( matrix );

		return this;

	}

	getMatrixAt( geometryId, matrix ) {

		const matrices = this._matrices;
		const active = this._active;
		if ( geometryId >= matrices.length || active[ geometryId ] === false ) {

			return matrix;

		}

		return matrix.copy( matrices[ geometryId ] );

	}

	setVisibleAt( geometryId, value ) {

		const visible = this._visible;
		const active = this._active;
		const matricesTexture = this._matricesTexture;
		const matrices = this._matrices;
		const matricesArray = this._matricesTexture.image.data;

		// if the geometry is out of range, not active, or visibility state
		// does not change then return early
		if (
			geometryId >= visible.length ||
			active[ geometryId ] === false ||
			visible[ geometryId ] === value
		) {

			return this;

		}

		// scale the matrix to zero if it's hidden
		if ( value === true ) {

			matrices[ geometryId ].toArray( matricesArray, geometryId * 16 );

		} else {

			_zeroScaleMatrix.toArray( matricesArray, geometryId * 16 );

		}

		matricesTexture.needsUpdate = true;
		visible[ geometryId ] = value;
		return this;

	}

	getVisibleAt( geometryId ) {

		const visible = this._visible;
		const active = this._active;

		// return early if the geometry is out of range or not active
		if ( geometryId >= visible.length || active[ geometryId ] === false ) {

			return false;

		}

		return visible[ geometryId ];

	}

	raycast() {

		console.warn( 'BatchedMesh: Raycast function not implemented.' );

	}

	copy() {

		// super.copy( source );

		throw new Error( 'BatchedMesh: Copy function not implemented.' );

	}

	toJSON() {

		throw new Error( 'BatchedMesh: toJSON function not implemented.' );

	}

	dispose() {

		// Assuming the geometry is not shared with other meshes
		this.geometry.dispose();

		this._matricesTexture.dispose();
		this._matricesTexture = null;
		return this;

	}

	onBeforeRender( _renderer, _scene, camera, geometry, material/*, _group*/ ) {

		// the indexed version of the multi draw function requires specifying the start
		// offset in bytes.
		const index = geometry.getIndex();
		const bytesPerElement = index === null ? 1 : index.array.BYTES_PER_ELEMENT;

		const visible = this._visible;
		const multiDrawStarts = this._multiDrawStarts;
		const multiDrawCounts = this._multiDrawCounts;
		const drawRanges = this._drawRanges;
		const frustumCulled = this.frustumCulled;

		// prepare the frustum
		if ( frustumCulled ) {

			_projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
			_frustum.setFromProjectionMatrix(
				_projScreenMatrix,
				_renderer.isWebGPURenderer ? WebGPUCoordinateSystem : WebGLCoordinateSystem
			);

		}

		let count = 0;
		for ( let i = 0, l = visible.length; i < l; i ++ ) {

			if ( visible[ i ] ) {

				// determine whether the batched geometry is within the frustum
				let culled = false;
				if ( frustumCulled ) {

					// get the bounds in camera space
					this.getMatrixAt( i, _matrix ).premultiply( this.matrixWorld );

					// get the bounds
					this.getBoundingBoxAt( i, _box ).applyMatrix4( _matrix );
					this.getBoundingSphereAt( i, _sphere ).applyMatrix4( _matrix );
					culled = ! _frustum.intersectsBox( _box ) || ! _frustum.intersectsSphere( _sphere );

				}

				if ( ! culled ) {

					const range = drawRanges[ i ];
					multiDrawStarts[ count ] = range.start * bytesPerElement;
					multiDrawCounts[ count ] = range.count;
					count ++;

				}

			}

		}

		this._multiDrawCount = count;

		// @TODO: Implement geometry sorting for transparent and opaque materials

	}

}

export { BatchedMesh };
