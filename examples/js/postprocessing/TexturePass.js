/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.TexturePass = function ( texture, opacity ) {

	THREE.Pass.call( this );

	if ( THREE.CopyShader === undefined )
		console.error( "THREE.TexturePass relies on THREE.CopyShader" );

	var shader = THREE.CopyShader;

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.uniforms[ "opacity" ].value = ( opacity !== undefined ) ? opacity : 1.0;
	this.uniforms[ "tDiffuse" ].value = texture;

	this.material = new THREE.ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	this.needsSwap = false;

};

THREE.TexturePass.prototype = Object.create( THREE.Pass.prototype );

THREE.TexturePass.prototype = {

	constructor: THREE.TexturePass,

	render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {
		
		THREE.EffectRenderer.renderPass( renderer, this.material, readBuffer, this.clear ? renderer.getClearColor() : null, this.clear ? renderer.getClearAlpha() : null );

	}

};
