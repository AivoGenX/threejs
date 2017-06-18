import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { Matrix3 } from '../math/Matrix3';
import { Mesh } from '../objects/Mesh';
import { Group } from '../objects/Group';
import { PropertyBinding } from '../animation/PropertyBinding';

/**
 * @author alteredq / http://alteredqualia.com/
 * @author Mugen87 / https://github.com/Mugen87
 */

var SceneUtils = {

	createMultiMaterialObject: function ( geometry, materials ) {

		var group = new Group();

		for ( var i = 0, l = materials.length; i < l; i ++ ) {

			group.add( new Mesh( geometry, materials[ i ] ) );

		}

		return group;

	},

	detach: function ( child, parent, scene ) {

		child.applyMatrix( parent.matrixWorld );
		parent.remove( child );
		scene.add( child );

	},

	attach: function ( child, scene, parent ) {

		child.applyMatrix( new Matrix4().getInverse( parent.matrixWorld ) );

		scene.remove( child );
		parent.add( child );

	},

	convertFromZUp: function ( root, animations ) {

		// see https://gamedev.stackexchange.com/a/7932

		// this matrix will change the coordinate system of an object hierarchy and
		// animations (optional) from right-handed Z-up to right-handed Y-up

		var matrix = new Matrix4().set(
			1,   0,   0,   0,
			0,   0,   1,   0,
			0, - 1,   0,   0,
			0,   0,   0,   1
		);

		var converter = new CoordSystemConverter( matrix );
		converter.convert( root, animations );

	}

};

function CoordSystemConverter( matrix ) {

	this.matrix = matrix;

}

Object.assign( CoordSystemConverter.prototype, {

	convert: function ( root, animations ) {

		var scope = this;

		root.traverse( function( object ) {

			// position, quaternion, scale

			scope.convertMatrix4( object.matrix );
			object.matrix.decompose( object.position, object.quaternion, object.scale );

			// geometry

			var geometry = object.geometry;

			if ( geometry !== undefined &&  geometry.isBufferGeometry === true ) {

				var position = geometry.attributes.position;
				var normal = geometry.attributes.normal;

				var matrix = scope.matrix;

				if ( position !== null ) {

					matrix.applyToBufferAttribute( position );

				}

				if ( normal !== null ) {

					var normalMatrix = new Matrix3().setFromMatrix4( matrix );
					normalMatrix.applyToBufferAttribute( normal );

				}

			}

			// skinned mesh

			if ( object.isSkinnedMesh ) {

				scope.convertMatrix4( object.bindMatrix );
				scope.convertMatrix4( object.bindMatrixInverse );

				var boneInverses = object.skeleton.boneInverses;

				for ( var i = 0, il = boneInverses.length; i < il; i ++ ) {

					scope.convertMatrix4( boneInverses[ i ] );

				}

				// bones are already converted within the scene hierarchy

			}

		} );

		// animations

		if ( animations !== undefined ) {

			for ( var i = 0, il = animations.length; i < il; i ++ ) {

				var clip = animations[ i ];
				var tracks = clip.tracks;

				for ( var j = 0, jl = tracks.length; j < jl; j ++ ) {

					this.convertKeyframeTrack( tracks[ j ] );

				}

			}

		}

	},

	convertMatrix4: function() {

		var xAxis = new Vector3();
		var yAxis = new Vector3();
		var zAxis = new Vector3();
		var translation = new Vector3();

		return function convertMatrix4( matrix ) {

			// columns first

			matrix.extractBasis( xAxis, yAxis, zAxis );
			translation.setFromMatrixColumn( matrix, 3 );

			xAxis.applyMatrix4( this.matrix );
			yAxis.applyMatrix4( this.matrix );
			zAxis.applyMatrix4( this.matrix );

			matrix.makeBasis( xAxis, yAxis, zAxis );

			// then rows

			matrix.transpose();

			matrix.extractBasis( xAxis, yAxis, zAxis );

			xAxis.applyMatrix4( this.matrix );
			yAxis.applyMatrix4( this.matrix );
			zAxis.applyMatrix4( this.matrix );

			matrix.makeBasis( xAxis, yAxis, zAxis );

			matrix.transpose();

			// translation at the end

			translation.applyMatrix4( this.matrix );

			matrix.elements[ 12 ] = translation.x;
			matrix.elements[ 13 ] = translation.y;
			matrix.elements[ 14 ] = translation.z;

			return matrix;

		};

	} (),

	convertKeyframeTrack: function() {

		var vector = new Vector3();
		var quaternion = new Quaternion();
		var rotationMatrix = new Matrix4();

		return function convertKeyframeTrack( track ) {

			var result = PropertyBinding.parseTrackName( track.name );
			var propertyName = result.propertyName;

			var values = track.values;
			var times = track.times;
			var stride = values.length / times.length;

			var i, il, j, jl;

			switch ( propertyName ) {

				case 'position':

					for ( i = 0, il = values.length; i < il; i += stride ) {

						vector.fromArray( values, i ).applyMatrix4( this.matrix );

						for ( j = 0, jl = stride; j < jl; j ++ ) {

							values[ i + j ] = vector.getComponent( j );

						}

					}

					break;

				case 'scale':

					for ( i = 0, il = values.length; i < il; i += stride ) {

						vector.fromArray( values, i ).applyMatrix4( this.matrix );

						for ( j = 0, jl = stride; j < jl; j ++ ) {

							values[ i + j ] =  Math.abs( vector.getComponent( j ) );

						}

					}

					break;

				case 'quaternion':

					for ( i = 0, il = values.length; i < il; i += stride ) {

						quaternion.fromArray( values, i );
						rotationMatrix.makeRotationFromQuaternion( quaternion );
						this.convertMatrix4( rotationMatrix );
						quaternion.setFromRotationMatrix( rotationMatrix );

						values[ i + 0 ] = quaternion.x;
						values[ i + 1 ] = quaternion.y;
						values[ i + 2 ] = quaternion.z;
						values[ i + 3 ] = quaternion.w;

					}

					break;

			}

		};

	} (),

} );


export { SceneUtils };
