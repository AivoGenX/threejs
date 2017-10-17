/**
 * @author TristanVALCKE / https://github.com/Itee
 */
/* global QUnit */

import {
	ParametricGeometry,
	ParametricBufferGeometry
} from '../../../../src/geometries/ParametricGeometry';

export default QUnit.module( 'Geometries', () => {

	QUnit.module.todo( 'ParametricGeometry', ( hooks ) => {

		var geometries = undefined;
		hooks.beforeEach( function () {

			const parameters = {};

			geometries = [
				new ParametricGeometry()
			];

		} );

		QUnit.test( 'Standard geometry tests', ( assert ) => {

			runStdGeometryTests( assert, geometries );

		} );

	} );

	QUnit.module.todo( 'ParametricBufferGeometry', ( hooks ) => {

		var geometries = undefined;
		hooks.beforeEach( function () {

			const parameters = {};

			geometries = [
				new ParametricBufferGeometry()
			];

		} );

		QUnit.test( 'Standard geometry tests', ( assert ) => {

			runStdGeometryTests( assert, geometries );

		} );

	} );

} );
