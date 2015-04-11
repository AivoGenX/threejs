/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.BufferGeometry = function () {

	Object.defineProperty( this, 'id', { value: THREE.GeometryIdCount ++ } );

	this.uuid = THREE.Math.generateUUID();

	this.name = '';
	this.type = 'BufferGeometry';

	this.attributes = {};
	this.attributesKeys = [];

	this.drawcalls = [];
	this.offsets = this.drawcalls; // backwards compatibility

	this.boundingBox = null;
	this.boundingSphere = null;

};

THREE.BufferGeometry.prototype = {

	constructor: THREE.BufferGeometry,

	addAttribute: function ( name, attribute ) {

		if ( attribute instanceof THREE.BufferAttribute === false && attribute instanceof THREE.InterleavedBufferAttribute === false ) {

			THREE.warn( 'THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).' );

			this.attributes[ name ] = { array: arguments[ 1 ], itemSize: arguments[ 2 ] };

			return;

		}

		this.attributes[ name ] = attribute;
		this.attributesKeys = Object.keys( this.attributes );

	},

	getAttribute: function ( name ) {

		return this.attributes[ name ];

	},

	addDrawCall: function ( start, count, indexOffset ) {

		this.drawcalls.push( {

			start: start,
			count: count,
			index: indexOffset !== undefined ? indexOffset : 0

		} );

	},

	applyMatrix: function ( matrix ) {

		var position = this.attributes.position;

		if ( position !== undefined ) {

			matrix.applyToVector3Array( position.array );
			position.needsUpdate = true;

		}

		var normal = this.attributes.normal;

		if ( normal !== undefined ) {

			var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

			normalMatrix.applyToVector3Array( normal.array );
			normal.needsUpdate = true;

		}

		if ( this.boundingBox !== null ) {

			this.computeBoundingBox();

		}

		if ( this.boundingSphere !== null ) {

			this.computeBoundingSphere();

		}

	},

	center: function () {

		this.computeBoundingBox();

		var offset = this.boundingBox.center().negate();

		this.applyMatrix( new THREE.Matrix4().setPosition( offset ) );

		return offset;

	},

	setFromObject: function ( object ) {

		console.log( 'THREE.BufferGeometry.setFromObject(). Converting ', object, this );

		var geometry = object.geometry;
		var material = object.material;

		if ( object instanceof THREE.PointCloud || object instanceof THREE.Line ) {

			var positions = new Float32Array( geometry.vertices.length * 3 );
			var colors = new Float32Array( geometry.colors.length * 3 );
			
			var BufferType = geometry.dynamic ? THREE.DynamicBufferAttribute : THREE.BufferAttribute;

			this.addAttribute( 'position', new BufferType( positions, 3 ).copyVector3sArray( geometry.vertices ) );
			this.addAttribute( 'color', new BufferType( colors, 3 ).copyColorsArray( geometry.colors ) );
			this.computeBoundingSphere();

		} else if ( object instanceof THREE.Mesh ) {

			this.fromGeometry( geometry, material, object );

		}

		return this;

	},

	updateFromObject: function ( object ) {

		var geometry = object.geometry;

		if ( object instanceof THREE.PointCloud || object instanceof THREE.Line ) {

			if ( geometry.verticesNeedUpdate === true ) {

				var attribute = this.attributes.position;

				if ( attribute !== undefined ) {

					attribute.copyVector3sArray( geometry.vertices );
					attribute.needsUpdate = true;

				}

				geometry.verticesNeedUpdate = false;

			}

			if ( geometry.colorsNeedUpdate === true ) {

				var attribute = this.attributes.color;

				if ( attribute !== undefined ) {

					attribute.copyColorsArray( geometry.colors );
					attribute.needsUpdate = true;

				}

				geometry.colorsNeedUpdate = false;

			}

		} else if ( object instanceof THREE.Mesh ) {
			
			if ( geometry.dynamic ) {

				var material = object.material;

				if ( geometry.verticesNeedUpdate === true ) {

					this.updateWithMapping( geometry.vertices, this.attributes.position, this.vertexMap );

					geometry.verticesNeedUpdate = false;

				}

				if ( geometry.colorsNeedUpdate === true ) {

					this.updateWithMapping( geometry.colors, this.attributes.color, this.vertexMap );

					geometry.colorsNeedUpdate = false;

				}

				for ( var name in material.attributes ) {

					var attribute = material.attributes[name];

					if ( attribute.needsUpdate ) {

						this.updateWithMapping( attribute.value, this.attributes[name], object.vertexMap );

						attribute.needsUpdate = false;

					}

				}

			}
		}

	},

	updateWithMapping: function ( values, attribute, vertexMap ) {

		if ( attribute !== undefined ) {

			for ( var i = 0, ul = values.length; i < ul; i += attribute.itemSize ) {

				var mapping = vertexMap[i];

				if ( mapping === undefined ) continue;

				for ( var ii = 0; ii < attribute.itemSize; ii++ ) {

					var value = values[i + ii];

					if ( mapping instanceof Array ) {

						for ( var m = 0, ml = mapping.length; m < ml; m++ ) {

							attribute.array[mapping[m]] = value;

						}

					} else {

						attribute.array[mapping] = value;

					}

				}

			}

			attribute.needsUpdate = true;

		}

	},

	fromGeometry: function ( geometry, material, object ) {

		material = material || { 'vertexColors': THREE.NoColors, attributes: [] };

		var vertices = geometry.vertices;
		var faces = geometry.faces;
		var faceVertexUvs = geometry.faceVertexUvs;
		var vertexColors = material.vertexColors;

		var hasFaceVertexUv = faceVertexUvs[ 0 ].length > 0;
		var hasFaceVertexUv2 = faceVertexUvs[ 1 ] && faceVertexUvs[ 1 ].length > 0;

		var hasFaceVertexNormals = faces[ 0 ].vertexNormals.length == 3;

		var indices = [];
		var positions = [];
		var normals = [];
		var colors = [];
		var uvs = [];
		var uvs2 = [];

		var vertexHash = {}, vertexMap = [];

		var index = [], position = [], normal = [], color = [], uv = [], uv2 = [];

		var indexCount = 0;

		for ( var i = 0; i < 3; i++ ) {

			index[i] = 0;
			position[i] = [];
			normal[i] = [];
			color[i] = [];
			uv[i] = [];
			uv2[i] = [];

		}

		for ( var f = 0, fl = faces.length; f < fl; f++ ) {

			var face = faces[f];

			index[0] = face.a;
			index[1] = face.b;
			index[2] = face.c;

			var a = vertices[face.a];
			var b = vertices[face.b];
			var c = vertices[face.c];

			position[0][0] = a.x;
			position[0][1] = a.y;
			position[0][2] = a.z;

			position[1][0] = b.x;
			position[1][1] = b.y;
			position[1][2] = b.z;

			position[2][0] = c.x;
			position[2][1] = c.y;
			position[2][2] = c.z;

			if ( hasFaceVertexNormals === true ) {

				var na = face.vertexNormals[0];
				var nb = face.vertexNormals[1];
				var nc = face.vertexNormals[2];

				normal[0][0] = na.x;
				normal[0][1] = na.y;
				normal[0][2] = na.z;

				normal[1][0] = nb.x;
				normal[1][1] = nb.y;
				normal[1][2] = nb.z;

				normal[2][0] = nc.x;
				normal[2][1] = nc.y;
				normal[2][2] = nc.z;

			} else {

				var n = face.normal;

				normal[0][0] = n.x;
				normal[0][1] = n.y;
				normal[0][2] = n.z;

				normal[1][0] = n.x;
				normal[1][1] = n.y;
				normal[1][2] = n.z;

				normal[2][0] = n.x;
				normal[2][1] = n.y;
				normal[2][2] = n.z;

			}

			if ( vertexColors === THREE.FaceColors ) {

				var fc = face.color;

				color[0][0] = fc.r;
				color[0][1] = fc.g;
				color[0][2] = fc.b;

				color[1][0] = fc.r;
				color[1][1] = fc.g;
				color[1][2] = fc.b;

				color[2][0] = fc.r;
				color[2][1] = fc.g;
				color[2][2] = fc.b;

			} else if ( vertexColors === THREE.VertexColors ) {

				var vca = face.vertexColors[0];
				var vcb = face.vertexColors[1];
				var vcc = face.vertexColors[2];

				color[0][0] = vca.r;
				color[0][1] = vca.g;
				color[0][2] = vca.b;

				color[1][0] = vcb.r;
				color[1][1] = vcb.g;
				color[1][2] = vcb.b;

				color[2][0] = vcc.r;
				color[2][1] = vcc.g;
				color[2][2] = vcc.b;

			}

			if ( hasFaceVertexUv === true ) {

				var uva = faceVertexUvs[0][f][0];
				var uvb = faceVertexUvs[0][f][1];
				var uvc = faceVertexUvs[0][f][2];

				uv[0][0] = uva.x;
				uv[0][1] = uva.y;

				uv[1][0] = uvb.x;
				uv[1][1] = uvb.y;

				uv[2][0] = uvc.x;
				uv[2][1] = uvc.y;

			}

			if ( hasFaceVertexUv2 === true ) {

				var uva = faceVertexUvs[1][f][0];
				var uvb = faceVertexUvs[1][f][1];
				var uvc = faceVertexUvs[1][f][2];

				uv2[0][0] = uva.x;
				uv2[0][1] = uva.y;

				uv2[1][0] = uvb.x;
				uv2[1][1] = uvb.y;

				uv2[2][0] = uvc.x;
				uv2[2][1] = uvc.y;

			}

			for ( var i = 0; i < 3; i++ ) {

				var hashGroup = [index[i]];

				// don't put in one loop and intermingle attribute values, or weird index connections may happen

				for ( var ii = 0; ii < 3; ii++ ) {

					hashGroup.push( position[i][ii] );

				}

				for ( var ii = 0; ii < 3; ii++ ) {

					hashGroup.push( normal[i][ii] );

				}

				if ( vertexColors !== THREE.NoColors ) {

					for ( var ii = 0; ii < 3; ii++ ) {

						hashGroup.push( color[i][ii] );

					}

				}

				if ( hasFaceVertexUv === true ) {

					for ( var ii = 0; ii < 2; ii++ ) {

						hashGroup.push( uv[i][ii] );

					}

				}
				
				if ( hasFaceVertexUv2 === true ) {

					for ( var ii = 0; ii < 2; ii++ ) {

						hashGroup.push( uv2[i][ii] );

					}

				}

				var hash = hashGroup.join( '|' );

				var vertexIndex = vertexHash[hash];

				if ( vertexIndex === undefined ) {

					for ( var ii = 0; ii < 3; ii++ ) {

						positions.push( position[i][ii] );
						normals.push( normal[i][ii] );

						if ( vertexColors !== THREE.NoColors ) {

							colors.push( color[i][ii] );

						}

					}

					if ( hasFaceVertexUv === true || hasFaceVertexUv2 === true ) {

						for ( var ii = 0; ii < 2; ii++ ) {

							if ( hasFaceVertexUv === true ) {

								uvs.push( uv[i][ii] );
							}

							if ( hasFaceVertexUv2 === true ) {

								uvs2.push( uv2[i][ii] ); 

							}

						}

					}

					var currentMapping = vertexMap[index[i]];
					if ( currentMapping === undefined ) {

						vertexMap[index[i]] = indexCount;

					} else if ( currentMapping instanceof Array ) {

						currentMapping.push( indexCount );

					} else {

						vertexMap[index[i]] = [];
						vertexMap[index[i]].push( currentMapping, indexCount );

					}

					indices.push( indexCount );
					vertexHash[hash] = indexCount;

					indexCount++;

				} else {

					indices.push( vertexIndex );

				}

			}

		}

		var BufferType = geometry.dynamic ? THREE.DynamicBufferAttribute : THREE.BufferAttribute;

		this.addAttribute( 'position', new BufferType( new Float32Array( positions ), 3 ) );
		this.addAttribute( 'normal', new BufferType( new Float32Array( normals ), 3 ) );

		if ( vertexColors !== THREE.NoColors ) {

			this.addAttribute( 'color', new BufferType( new Float32Array( colors ), 3 ) );

		}

		if ( hasFaceVertexUv === true ) {

			this.addAttribute( 'uv', new BufferType( new Float32Array( uvs ), 2 ) );

		}

		if ( hasFaceVertexUv2 === true ) {

			this.addAttribute( 'uv2', new BufferType( new Float32Array( uvs2 ), 2 ) );

		}

		var UintArray = ( ( positions.length / 3 ) > 65535 ) ? Uint32Array : Uint16Array;
		this.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
		
		// custom attributes

		var vertexCount = positions.length / 3;

		for ( var name in material.attributes ) {

			var attribute = material.attributes[name];

			var size = 1;   // "f" and "i"

			if ( attribute.type === 'v2' ) size = 2;
			else if ( attribute.type === 'v3' ) size = 3;
			else if ( attribute.type === 'v4' ) size = 4;
			else if ( attribute.type === 'c' ) size = 3;

			var array = new Float32Array( vertexCount * size );
			var values = attribute.value;

			for ( var i = 0, ul = values.length; i < ul; i += size ) {

				var mapping = vertexMap[i];

				for ( var ii = 0; ii < size; ii++ ) {

					var value = values[i + ii];

					if ( mapping instanceof Array ) {

						for ( var m = 0, ml = mapping.length; m < ml; m++ ) {

							array[mapping[m]] = value;

						}

					} else {

						array[mapping] = value;

					}

				}				

			}
			
			this.addAttribute( name, new BufferType( array, size ) );

		}

		this.computeOffsets( undefined, vertexMap );

		if ( geometry.dynamic ) {

			object.vertexMap = vertexMap;

		}

		this.computeBoundingSphere();

		return this;

	},

	computeBoundingBox: function () {

		var vector = new THREE.Vector3();

		return function () {

			if ( this.boundingBox === null ) {

				this.boundingBox = new THREE.Box3();

			}

			var positions = this.attributes.position.array;

			if ( positions ) {

				var bb = this.boundingBox;
				bb.makeEmpty();

				for ( var i = 0, il = positions.length; i < il; i += 3 ) {

					vector.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );
					bb.expandByPoint( vector );

				}

			}

			if ( positions === undefined || positions.length === 0 ) {

				this.boundingBox.min.set( 0, 0, 0 );
				this.boundingBox.max.set( 0, 0, 0 );

			}

			if ( isNaN( this.boundingBox.min.x ) || isNaN( this.boundingBox.min.y ) || isNaN( this.boundingBox.min.z ) ) {

				THREE.error( 'THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.' );

			}

		}

	}(),

	computeBoundingSphere: function () {

		var box = new THREE.Box3();
		var vector = new THREE.Vector3();

		return function () {

			if ( this.boundingSphere === null ) {

				this.boundingSphere = new THREE.Sphere();

			}

			var positions = this.attributes.position.array;

			if ( positions ) {

				box.makeEmpty();

				var center = this.boundingSphere.center;

				for ( var i = 0, il = positions.length; i < il; i += 3 ) {

					vector.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );
					box.expandByPoint( vector );

				}

				box.center( center );

				// hoping to find a boundingSphere with a radius smaller than the
				// boundingSphere of the boundingBox: sqrt(3) smaller in the best case

				var maxRadiusSq = 0;

				for ( var i = 0, il = positions.length; i < il; i += 3 ) {

					vector.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );
					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

				}

				this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

				if ( isNaN( this.boundingSphere.radius ) ) {

					THREE.error( 'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.' );

				}

			}

		}

	}(),

	computeFaceNormals: function () {

		// backwards compatibility

	},

	computeVertexNormals: function () {

		var attributes = this.attributes;

		if ( attributes.position ) {

			var positions = attributes.position.array;

			if ( attributes.normal === undefined ) {

				this.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( positions.length ), 3 ) );

			} else {

				// reset existing normals to zero

				var normals = attributes.normal.array;

				for ( var i = 0, il = normals.length; i < il; i ++ ) {

					normals[ i ] = 0;

				}

			}

			var normals = attributes.normal.array;

			var vA, vB, vC,

			pA = new THREE.Vector3(),
			pB = new THREE.Vector3(),
			pC = new THREE.Vector3(),

			cb = new THREE.Vector3(),
			ab = new THREE.Vector3();

			// indexed elements

			if ( attributes.index ) {

				var indices = attributes.index.array;

				var offsets = ( this.offsets.length > 0 ? this.offsets : [ { start: 0, count: indices.length, index: 0 } ] );

				for ( var j = 0, jl = offsets.length; j < jl; ++ j ) {

					var start = offsets[ j ].start;
					var count = offsets[ j ].count;
					var index = offsets[ j ].index;

					for ( var i = start, il = start + count; i < il; i += 3 ) {

						vA = ( index + indices[ i     ] ) * 3;
						vB = ( index + indices[ i + 1 ] ) * 3;
						vC = ( index + indices[ i + 2 ] ) * 3;

						pA.fromArray( positions, vA );
						pB.fromArray( positions, vB );
						pC.fromArray( positions, vC );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						normals[ vA     ] += cb.x;
						normals[ vA + 1 ] += cb.y;
						normals[ vA + 2 ] += cb.z;

						normals[ vB     ] += cb.x;
						normals[ vB + 1 ] += cb.y;
						normals[ vB + 2 ] += cb.z;

						normals[ vC     ] += cb.x;
						normals[ vC + 1 ] += cb.y;
						normals[ vC + 2 ] += cb.z;

					}

				}

			} else {

				// non-indexed elements (unconnected triangle soup)

				for ( var i = 0, il = positions.length; i < il; i += 9 ) {

					pA.fromArray( positions, i );
					pB.fromArray( positions, i + 3 );
					pC.fromArray( positions, i + 6 );

					cb.subVectors( pC, pB );
					ab.subVectors( pA, pB );
					cb.cross( ab );

					normals[ i     ] = cb.x;
					normals[ i + 1 ] = cb.y;
					normals[ i + 2 ] = cb.z;

					normals[ i + 3 ] = cb.x;
					normals[ i + 4 ] = cb.y;
					normals[ i + 5 ] = cb.z;

					normals[ i + 6 ] = cb.x;
					normals[ i + 7 ] = cb.y;
					normals[ i + 8 ] = cb.z;

				}

			}

			this.normalizeNormals();

			attributes.normal.needsUpdate = true;

		}

	},

	computeTangents: function () {

		// based on http://www.terathon.com/code/tangent.html
		// (per vertex tangents)

		if ( this.attributes.index === undefined ||
			 this.attributes.position === undefined ||
			 this.attributes.normal === undefined ||
			 this.attributes.uv === undefined ) {

			THREE.warn( 'THREE.BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()' );
			return;

		}

		var indices = this.attributes.index.array;
		var positions = this.attributes.position.array;
		var normals = this.attributes.normal.array;
		var uvs = this.attributes.uv.array;

		var nVertices = positions.length / 3;

		if ( this.attributes.tangent === undefined ) {

			this.addAttribute( 'tangent', new THREE.BufferAttribute( new Float32Array( 4 * nVertices ), 4 ) );

		}

		var tangents = this.attributes.tangent.array;

		var tan1 = [], tan2 = [];

		for ( var k = 0; k < nVertices; k ++ ) {

			tan1[ k ] = new THREE.Vector3();
			tan2[ k ] = new THREE.Vector3();

		}

		var vA = new THREE.Vector3(),
			vB = new THREE.Vector3(),
			vC = new THREE.Vector3(),

			uvA = new THREE.Vector2(),
			uvB = new THREE.Vector2(),
			uvC = new THREE.Vector2(),

			x1, x2, y1, y2, z1, z2,
			s1, s2, t1, t2, r;

		var sdir = new THREE.Vector3(), tdir = new THREE.Vector3();

		function handleTriangle( a, b, c ) {

			vA.fromArray( positions, a * 3 );
			vB.fromArray( positions, b * 3 );
			vC.fromArray( positions, c * 3 );

			uvA.fromArray( uvs, a * 2 );
			uvB.fromArray( uvs, b * 2 );
			uvC.fromArray( uvs, c * 2 );

			x1 = vB.x - vA.x;
			x2 = vC.x - vA.x;

			y1 = vB.y - vA.y;
			y2 = vC.y - vA.y;

			z1 = vB.z - vA.z;
			z2 = vC.z - vA.z;

			s1 = uvB.x - uvA.x;
			s2 = uvC.x - uvA.x;

			t1 = uvB.y - uvA.y;
			t2 = uvC.y - uvA.y;

			r = 1.0 / ( s1 * t2 - s2 * t1 );

			sdir.set(
				( t2 * x1 - t1 * x2 ) * r,
				( t2 * y1 - t1 * y2 ) * r,
				( t2 * z1 - t1 * z2 ) * r
			);

			tdir.set(
				( s1 * x2 - s2 * x1 ) * r,
				( s1 * y2 - s2 * y1 ) * r,
				( s1 * z2 - s2 * z1 ) * r
			);

			tan1[ a ].add( sdir );
			tan1[ b ].add( sdir );
			tan1[ c ].add( sdir );

			tan2[ a ].add( tdir );
			tan2[ b ].add( tdir );
			tan2[ c ].add( tdir );

		}

		var i, il;
		var j, jl;
		var iA, iB, iC;

		if ( this.drawcalls.length === 0 ) {

			this.addDrawCall( 0, indices.length, 0 );

		}

		var drawcalls = this.drawcalls;

		for ( j = 0, jl = drawcalls.length; j < jl; ++ j ) {

			var start = drawcalls[ j ].start;
			var count = drawcalls[ j ].count;
			var index = drawcalls[ j ].index;

			for ( i = start, il = start + count; i < il; i += 3 ) {

				iA = index + indices[ i ];
				iB = index + indices[ i + 1 ];
				iC = index + indices[ i + 2 ];

				handleTriangle( iA, iB, iC );

			}

		}

		var tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();
		var n = new THREE.Vector3(), n2 = new THREE.Vector3();
		var w, t, test;

		function handleVertex( v ) {

			n.fromArray( normals, v * 3 );
			n2.copy( n );

			t = tan1[ v ];

			// Gram-Schmidt orthogonalize

			tmp.copy( t );
			tmp.sub( n.multiplyScalar( n.dot( t ) ) ).normalize();

			// Calculate handedness

			tmp2.crossVectors( n2, t );
			test = tmp2.dot( tan2[ v ] );
			w = ( test < 0.0 ) ? - 1.0 : 1.0;

			tangents[ v * 4     ] = tmp.x;
			tangents[ v * 4 + 1 ] = tmp.y;
			tangents[ v * 4 + 2 ] = tmp.z;
			tangents[ v * 4 + 3 ] = w;

		}

		for ( j = 0, jl = drawcalls.length; j < jl; ++ j ) {

			var start = drawcalls[ j ].start;
			var count = drawcalls[ j ].count;
			var index = drawcalls[ j ].index;

			for ( i = start, il = start + count; i < il; i += 3 ) {

				iA = index + indices[ i ];
				iB = index + indices[ i + 1 ];
				iC = index + indices[ i + 2 ];

				handleVertex( iA );
				handleVertex( iB );
				handleVertex( iC );

			}

		}

	},

	/*
	Compute the draw offset for large models by chunking the index buffer into chunks of 65k addressable vertices.
	This method will effectively rewrite the index buffer and remap all attributes to match the new indices.
	WARNING: This method will also expand the vertex count to prevent sprawled triangles across draw offsets.
	size - Defaults to 65535 or 4294967296 if extension OES_element_index_uint supported, but allows for larger or smaller chunks.
	*/
	computeOffsets: function ( size, vertexMap ) {

		if ( size === undefined ) size = THREE.BufferGeometry.MaxIndex;


		var indices = this.attributes.index.array;
		var vertices = this.attributes.position.array;

		var facesCount = ( indices.length / 3 );

		var UintArray = ( ( vertices.length / 3 ) > 65535 && THREE.BufferGeometry.MaxIndex > 65535 ) ? Uint32Array : Uint16Array;

		/*
		THREE.log("Computing buffers in offsets of "+size+" -> indices:"+indices.length+" vertices:"+vertices.length);
		THREE.log("Faces to process: "+(indices.length/3));
		THREE.log("Reordering "+verticesCount+" vertices.");
		*/

		var sortedIndices = new UintArray( indices.length );

		var indexPtr = 0;
		var vertexPtr = 0;

		var offsets = [ { start:0, count:0, index:0 } ];
		var offset = offsets[ 0 ];

		var duplicatedVertices = 0;
		var newVerticeMaps = 0;
		var faceVertices = new Int32Array( 6 );
		var vertexHash = new Int32Array( vertices.length );
		var revVertexMap = new Int32Array( vertices.length );
		for ( var j = 0; j < vertices.length; j ++ ) { vertexHash[ j ] = - 1; revVertexMap[ j ] = - 1; }

		/*
			Traverse every face and reorder vertices in the proper offsets of 65k.
			We can have more than 'size' entries in the index buffer per offset, but only reference 'size' values.
		*/
		for ( var findex = 0; findex < facesCount; findex ++ ) {
			newVerticeMaps = 0;

			for ( var vo = 0; vo < 3; vo ++ ) {
				var vid = indices[ findex * 3 + vo ];
				if ( vertexHash[ vid ] == - 1 ) {
					//Unmapped vertice
					faceVertices[ vo * 2 ] = vid;
					faceVertices[ vo * 2 + 1 ] = - 1;
					newVerticeMaps ++;
				} else if ( vertexHash[ vid ] < offset.index ) {
					//Reused vertices from previous block (duplicate)
					faceVertices[ vo * 2 ] = vid;
					faceVertices[ vo * 2 + 1 ] = - 1;
					duplicatedVertices ++;
				} else {
					//Reused vertice in the current block
					faceVertices[ vo * 2 ] = vid;
					faceVertices[ vo * 2 + 1 ] = vertexHash[ vid ];
				}
			}

			var faceMax = vertexPtr + newVerticeMaps;
			if ( faceMax > ( offset.index + size ) ) {
				var new_offset = { start:indexPtr, count:0, index:vertexPtr };
				offsets.push( new_offset );
				offset = new_offset;

				//Re-evaluate reused vertices in light of new offset.
				for ( var v = 0; v < 6; v += 2 ) {
					var new_vid = faceVertices[ v + 1 ];
					if ( new_vid > - 1 && new_vid < offset.index )
						faceVertices[ v + 1 ] = - 1;
				}
			}

			//Reindex the face.
			for ( var v = 0; v < 6; v += 2 ) {
				var vid = faceVertices[ v ];
				var new_vid = faceVertices[ v + 1 ];

				if ( new_vid === - 1 )
					new_vid = vertexPtr ++;

				vertexHash[ vid ] = new_vid;
				revVertexMap[ new_vid ] = vid;
				sortedIndices[ indexPtr ++ ] = new_vid - offset.index; //XXX overflows at 16bit
				offset.count ++;
			}
		}

		/* Move all attribute values to map to the new computed indices , also expand the vertice stack to match our new vertexPtr. */
		this.reorderBuffers( sortedIndices, revVertexMap, vertexPtr, vertexMap );
		this.offsets = offsets; // TODO: Deprecate
		this.drawcalls = offsets;

		/*
		var orderTime = Date.now();
		THREE.log("Reorder time: "+(orderTime-s)+"ms");
		THREE.log("Duplicated "+duplicatedVertices+" vertices.");
		THREE.log("Compute Buffers time: "+(Date.now()-s)+"ms");
		THREE.log("Draw offsets: "+offsets.length);
		*/

		return offsets;

	},

	merge: function ( geometry, offset ) {

		if ( geometry instanceof THREE.BufferGeometry === false ) {

			THREE.error( 'THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.', geometry );
			return;

		}

		if ( offset === undefined ) offset = 0;

		var attributes = this.attributes;

		for ( var key in attributes ) {

			if ( geometry.attributes[ key ] === undefined ) continue;

			var attribute1 = attributes[ key ];
			var attributeArray1 = attribute1.array;

			var attribute2 = geometry.attributes[ key ];
			var attributeArray2 = attribute2.array;

			var attributeSize = attribute2.itemSize;

			for ( var i = 0, j = attributeSize * offset; i < attributeArray2.length; i ++, j ++ ) {

				attributeArray1[ j ] = attributeArray2[ i ];

			}

		}

		return this;

	},

	normalizeNormals: function () {

		var normals = this.attributes.normal.array;

		var x, y, z, n;

		for ( var i = 0, il = normals.length; i < il; i += 3 ) {

			x = normals[ i ];
			y = normals[ i + 1 ];
			z = normals[ i + 2 ];

			n = 1.0 / Math.sqrt( x * x + y * y + z * z );

			normals[ i     ] *= n;
			normals[ i + 1 ] *= n;
			normals[ i + 2 ] *= n;

		}

	},

	/*
		reoderBuffers:
		Reorder attributes based on a new indexBuffer and indexMap.
		indexBuffer - Uint16Array of the new ordered indices.
		indexMap - Int32Array where the position is the new vertex ID and the value the old vertex ID for each vertex.
		vertexCount - Amount of total vertices considered in this reordering (in case you want to grow the vertice stack).
	*/
	reorderBuffers: function ( indexBuffer, indexMap, vertexCount, vertexMap ) {

		/* Create a copy of all attributes for reordering. */
		var sortedAttributes = {};
		for ( var attr in this.attributes ) {
			if ( attr == 'index' )
				continue;
			var sourceArray = this.attributes[ attr ].array;
			sortedAttributes[ attr ] = new sourceArray.constructor( this.attributes[ attr ].itemSize * vertexCount );
		}

		/* Move attribute positions based on the new index map */
		for ( var new_vid = 0; new_vid < vertexCount; new_vid ++ ) {
			var vid = indexMap[ new_vid ];
			for ( var attr in this.attributes ) {
				if ( attr == 'index' )
					continue;
				var attrArray = this.attributes[ attr ].array;
				var attrSize = this.attributes[ attr ].itemSize;
				var sortedAttr = sortedAttributes[ attr ];
				for ( var k = 0; k < attrSize; k ++ )
					sortedAttr[ new_vid * attrSize + k ] = attrArray[ vid * attrSize + k ];
			}
		}

		/* Adjust vertex map for converted objects for dynamic updates */
		if ( vertexMap !== undefined ) {
				
			// reverse lookup
			var invVertexMap = [];
			for ( var i = 0, ul = vertexMap.length; i < ul; i++ ) {

				var value = vertexMap[i];
				if ( value === undefined ) continue;

				if ( value instanceof Array ) {

					for ( var m = 0, ml = value.length; m < ml; m++ ) {

						invVertexMap[value[m]] = i;

					}

				} else {

					invVertexMap[value] = i;

				}

			}

			var newVertexMap = [];
			for ( var new_vid = 0; new_vid < vertexCount; new_vid++ ) {

				var vid = indexMap[new_vid];
				var oid = invVertexMap[vid];


				var newMapping = newVertexMap[oid];
				if ( newMapping === undefined ) {

					newVertexMap[oid] = new_vid;

				} else if ( newMapping instanceof Array ) {

					newMapping.push( new_vid );

				} else {

					newVertexMap[oid] = [];
					newVertexMap[oid].push( newMapping, new_vid );

				}
				
			}

			// reassign new vaules
			for ( var i = 0, ul = vertexMap.length; i < ul; i++ ) {

				if ( vertexMap[i] === undefined ) continue;

				vertexMap[i] = newVertexMap[i];

			}

		}

		/* Carry the new sorted buffers locally */
		this.attributes[ 'index' ].array = indexBuffer;
		for ( var attr in this.attributes ) {
			if ( attr == 'index' )
				continue;
			this.attributes[ attr ].array = sortedAttributes[ attr ];
			this.attributes[ attr ].numItems = this.attributes[ attr ].itemSize * vertexCount;
		}
	},

	toJSON: function() {

		// we will store all serialization data on 'data'
		var data = {};

		// add metadata
		data.metadata = {
			version: 4.4,
			type: 'BufferGeometry',
			generator: 'BufferGeometry.toJSON'
		};

		// standard BufferGeometry serialization

		data.type = this.type;
		data.uuid = this.uuid;
		if ( this.name !== '' ) data.name = this.name;
		data.data = {};
		data.data.attributes = {};

		var attributes = this.attributes;
		var offsets = this.offsets;
		var boundingSphere = this.boundingSphere;

		for ( var key in attributes ) {

			var attribute = attributes[ key ];

			var array = Array.prototype.slice.call( attribute.array );

			data.data.attributes[ key ] = {
				itemSize: attribute.itemSize,
				type: attribute.array.constructor.name,
				array: array
			}

		}

		if ( offsets.length > 0 ) {

			data.data.offsets = JSON.parse( JSON.stringify( offsets ) );

		}

		if ( boundingSphere !== null ) {

			data.data.boundingSphere = {
				center: boundingSphere.center.toArray(),
				radius: boundingSphere.radius
			}

		}

		return data;

	},

	clone: function () {

		var geometry = new THREE.BufferGeometry();

		for ( var attr in this.attributes ) {

			var sourceAttr = this.attributes[ attr ];
			geometry.addAttribute( attr, sourceAttr.clone() );

		}

		for ( var i = 0, il = this.offsets.length; i < il; i ++ ) {

			var offset = this.offsets[ i ];

			geometry.offsets.push( {

				start: offset.start,
				index: offset.index,
				count: offset.count

			} );

		}

		return geometry;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.BufferGeometry.prototype );

THREE.BufferGeometry.MaxIndex = 65535;
