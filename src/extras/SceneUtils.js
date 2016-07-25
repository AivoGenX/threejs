import { Matrix4 } from '../math/Matrix4';
import { Mesh } from '../objects/Mesh';
import { Group } from '../objects/Group';

var SceneUtils;

/**
 * @author alteredq / http://alteredqualia.com/
 */

SceneUtils = {

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

		var matrixWorldInverse = new Matrix4();
		matrixWorldInverse.getInverse( parent.matrixWorld );
		child.applyMatrix( matrixWorldInverse );

		scene.remove( child );
		parent.add( child );

	},

	updateMatrixWorldOfAncestors: function ( obj ) {

		var ancestors = [];

		for ( var a = obj; a !== null; a = a.parent) ancestors.push( a );

		for ( var a = ancestors.pop() ; a !== undefined ; a = ancestors.pop() ){

			a.matrix.compose( a.position, a.quaternion, a.scale );

			if ( a.parent === null) a.matrixWorld.copy ( a.matrix );

			if ( a.parent !== null) a.matrixWorld.multiplyMatrices( a.parent.matrixWorld, a.matrix );

		}

	},

	detach: function ( child ) {

		if (child.parent == null) return;

		SceneUtils.updateMatrixWorldOfAncestors( child );
		
		child.matrix.copy( child.matrixWorld );

		child.matrix.decompose( child.position, child.quaternion, child.scale );

		child.parent.remove( child )
	
	},

	attach: function ( child, parent ) {

		SceneUtils.updateMatrixWorldOfAncestors( child );

		SceneUtils.updateMatrixWorldOfAncestors( parent );

		child.matrix.getInverse( parent.matrixWorld ).multiply( child.matrixWorld  );
		 
		child.matrix.decompose( child.position, child.quaternion, child.scale );

		parent.add( child )

	}

};


export { SceneUtils };