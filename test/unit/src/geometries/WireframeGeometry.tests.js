/**
 * @author TristanVALCKE / https://github.com/Itee
 */
/* global QUnit */

import { WireframeGeometry } from '../../../../src/geometries/WireframeGeometry';

export default QUnit.module.todo( 'Geometries', () => {

	QUnit.module.todo( 'WireframeGeometry', ( hooks ) => {

		hooks.beforeEach( function () {

			const parameters = {};

			this.geometries = [
				new WireframeGeometry()
			];

		} );

		QUnit.test( 'Standard geometry tests', function ( assert ) {

			runStdGeometryTests( assert, this.geometries );

		} );

	} );

} );
