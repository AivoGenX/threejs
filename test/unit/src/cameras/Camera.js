/**
 * @author simonThiele / https://github.com/simonThiele
 */
/* global QUnit */

import { Camera } from '../../../../src/cameras/Camera';
import { Vector3 } from '../../../../src/math/Vector3';

export default QUnit.module( 'Cameras', () => {

	QUnit.module.todo( 'Camera', () => {

		QUnit.test( "lookAt", function ( assert ) {

			var cam = new Camera();
			cam.lookAt( new Vector3( 0, 1, - 1 ) );

			assert.numEqual( cam.rotation.x * ( 180 / Math.PI ), 45, "x is equal" );

		} );

		QUnit.test( "clone", function ( assert ) {

			var cam = new Camera();

			// fill the matrices with any nonsense values just to see if they get copied
			cam.matrixWorldInverse.set( 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 );
			cam.projectionMatrix.set( 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 );

			var clonedCam = cam.clone();

			assert.ok( cam.matrixWorldInverse.equals( clonedCam.matrixWorldInverse ), "matrixWorldInverse is equal" );
			assert.ok( cam.projectionMatrix.equals( clonedCam.projectionMatrix ), "projectionMatrix is equal" );

		} );

	} );

} );
