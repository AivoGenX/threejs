/**
 * @author TristanVALCKE / https://github.com/Itee
 * @author Anonymous
 */
/* global QUnit */

import { BoxHelper } from '../../../../src/helpers/BoxHelper';
import { BoxGeometry } from '../../../../src/geometries/BoxGeometry';
import { SphereGeometry } from '../../../../src/geometries/SphereGeometry';
import { Mesh } from '../../../../src/objects/Mesh';

export default QUnit.module.todo( 'Helpers', () => {

	QUnit.module.todo( 'BoxHelper', ( hooks ) => {

		hooks.beforeEach( function () {

			const parameters = {
				radius: 10,
				widthSegments: 20,
				heightSegments: 30,
				phiStart: 0.5,
				phiLength: 1.0,
				thetaStart: 0.4,
				thetaLength: 2.0,
			};

			// Test with a normal cube and a box helper
			var boxGeometry = new BoxGeometry( parameters.diameter );
			var box = new Mesh( boxGeometry );
			var boxHelper = new BoxHelper( box );

			// The same should happen with a comparable sphere
			var sphereGeometry = new SphereGeometry( parameters.diameter / 2 );
			var sphere = new Mesh( sphereGeometry );
			var sphereBoxHelper = new BoxHelper( sphere );

			// Note that unlike what I'd like to, these doesn't check the equivalency of the two generated geometries
			this.geometries = [ boxHelper.geometry, sphereBoxHelper.geometry ];

		} );

		QUnit.test( 'Standard geometry tests', function ( assert ) {

			runStdGeometryTests( assert, this.geometries );

		} );

	} );

} );
