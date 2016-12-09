import { Material } from './Material';
import { MultiplyOperation } from '../constants';
import { Color } from '../math/Color';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  emissive: <hex>,
 *  emissiveIntensity: <float>
 *  emissiveMap: new THREE.Texture( <Image> ),
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */

function MeshLambertMaterial( parameters ) {

	Material.call( this );

	this.type = 'MeshLambertMaterial';

	this.isExperimentalMaterial = true;

	this.addParameter( 'color', new Color( 0xffffff ), 'diffuse' ); // diffuse

	this.addParameter( 'map', null );

	this.addParameter( 'lightMap', null );
	this.addParameter( 'lightMapIntensity', 1.0 );

	this.addParameter( 'aoMap', null );
	this.addParameter( 'aoMapIntensity', 1.0 );

	this.addParameter( 'emissive', new Color( 0x000000 ), 'emissiveColor' );
	this.addParameter( 'emissiveIntensity',  1.0 );
	this.addParameter( 'emissiveMap', null );

	this.addParameter( 'specularMap', null );

	this.addParameter( 'alphaMap', null );

	this.addParameter( '_envMap', null, 'envMap' );
	this.addParameter( 'flipEnvMap', 1, null );

	Object.defineProperty( this, 'envMap', {
		set: function ( value ) { this._envMap = value; this.flipEnvMap = ( ! ( value && value.isCubeTexture ) ) ? 1 : - 1 },
		get: function () { return this._envMap }
	} );

	this.combine = MultiplyOperation;
	this.addParameter( 'reflectivity', 1 );
	this.addParameter( 'refractionRatio', 0.98 );

	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.wireframeLinecap = 'round';
	this.wireframeLinejoin = 'round';

	this.skinning = false;
	this.morphTargets = false;
	this.morphNormals = false;

	this.setValues( parameters );

}

MeshLambertMaterial.prototype = Object.create( Material.prototype );
MeshLambertMaterial.prototype.constructor = MeshLambertMaterial;

MeshLambertMaterial.prototype.isMeshLambertMaterial = true;

MeshLambertMaterial.prototype.copy = function ( source ) {

	Material.prototype.copy.call( this, source );

	this.color.copy( source.color );

	this.map = source.map;

	this.lightMap = source.lightMap;
	this.lightMapIntensity = source.lightMapIntensity;

	this.aoMap = source.aoMap;
	this.aoMapIntensity = source.aoMapIntensity;

	this.emissive.copy( source.emissive );
	this.emissiveMap = source.emissiveMap;
	this.emissiveIntensity = source.emissiveIntensity;

	this.specularMap = source.specularMap;

	this.alphaMap = source.alphaMap;

	this.envMap = source.envMap;
	this.combine = source.combine;
	this.reflectivity = source.reflectivity;
	this.refractionRatio = source.refractionRatio;

	this.wireframe = source.wireframe;
	this.wireframeLinewidth = source.wireframeLinewidth;
	this.wireframeLinecap = source.wireframeLinecap;
	this.wireframeLinejoin = source.wireframeLinejoin;

	this.skinning = source.skinning;
	this.morphTargets = source.morphTargets;
	this.morphNormals = source.morphNormals;

	return this;

};


export { MeshLambertMaterial };
