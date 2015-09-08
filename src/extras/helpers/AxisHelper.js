/**
 * @author sroucheray / http://sroucheray.org/
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = AxisHelper;

var BufferAttribute = require( "../../core/BufferAttribute" ),
	BufferGeometry = require( "../../core/BufferGeometry" ),
	Constants = require( "../../Constants" ),
	LineBasicMaterial = require( "../../materials/LineBasicMaterial" ),
	LineSegments = require( "../../objects/LineSegments" );

function AxisHelper( size ) {

	size = size || 1;

	var vertices = new Float32Array( [
		0, 0, 0,  size, 0, 0,
		0, 0, 0,  0, size, 0,
		0, 0, 0,  0, 0, size
	] );

	var colors = new Float32Array( [
		1, 0, 0,  1, 0.6, 0,
		0, 1, 0,  0.6, 1, 0,
		0, 0, 1,  0, 0.6, 1
	] );

	var geometry = new BufferGeometry();
	geometry.addAttribute( "position", new BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( "color", new BufferAttribute( colors, 3 ) );

	var material = new LineBasicMaterial( { vertexColors: Constants.VertexColors } );

	LineSegments.call( this, geometry, material );

}

AxisHelper.prototype = Object.create( LineSegments.prototype );
AxisHelper.prototype.constructor = AxisHelper;
