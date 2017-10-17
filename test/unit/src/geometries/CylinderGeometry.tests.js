/**
 * @author TristanVALCKE / https://github.com/Itee
 * @author Anonymous
 */
/* global QUnit */

import { CylinderGeometry, CylinderBufferGeometry } from '../../../../src/geometries/CylinderGeometry';

export default QUnit.module.todo( 'Geometries', () => {

	QUnit.module.todo( 'CylinderGeometry', ( hooks ) => {

		hooks.beforeEach( function () {

			const parameters = {
				radiusTop: 10,
				radiusBottom: 20,
				height: 30,
				radialSegments: 20,
				heightSegments: 30,
				openEnded: true,
				thetaStart: 0.1,
				thetaLength: 2.0,
			};

			this.geometries = [
				new CylinderGeometry(),
				new CylinderGeometry( parameters.radiusTop ),
				new CylinderGeometry( parameters.radiusTop, parameters.radiusBottom ),
				new CylinderGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height ),
				new CylinderGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments ),
				new CylinderGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments, parameters.heightSegments ),
				new CylinderGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments, parameters.heightSegments, parameters.openEnded ),
				new CylinderGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments, parameters.heightSegments, parameters.openEnded, parameters.thetaStart ),
				new CylinderGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments, parameters.heightSegments, parameters.openEnded, parameters.thetaStart, parameters.thetaLength ),
			];

		} );

		QUnit.test( 'standard geometry QUnit.tests', ( assert ) => {

			runStdGeometryTests( assert, this.geometries );

		} );

	} );

	QUnit.module.todo( 'CylinderBufferGeometry', ( hooks ) => {

		hooks.beforeEach( function () {

			const parameters = {
				radiusTop: 10,
				radiusBottom: 20,
				height: 30,
				radialSegments: 20,
				heightSegments: 30,
				openEnded: true,
				thetaStart: 0.1,
				thetaLength: 2.0,
			};

			this.geometries = [
				new CylinderBufferGeometry(),
				new CylinderBufferGeometry( parameters.radiusTop ),
				new CylinderBufferGeometry( parameters.radiusTop, parameters.radiusBottom ),
				new CylinderBufferGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height ),
				new CylinderBufferGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments ),
				new CylinderBufferGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments, parameters.heightSegments ),
				new CylinderBufferGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments, parameters.heightSegments, parameters.openEnded ),
				new CylinderBufferGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments, parameters.heightSegments, parameters.openEnded, parameters.thetaStart ),
				new CylinderBufferGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments, parameters.heightSegments, parameters.openEnded, parameters.thetaStart, parameters.thetaLength ),
			];

		} );

		QUnit.test( 'standard geometry QUnit.tests', ( assert ) => {

			runStdGeometryTests( assert, this.geometries );

		} );

	} );

} );
