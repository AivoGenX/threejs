/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */

module.exports = InstancedBufferGeometry;

var BufferGeometry = require( "./BufferGeometry" ),
	EventDispatcher = require( "./EventDispatcher" );

function InstancedBufferGeometry() {

	BufferGeometry.call( this );

	this.type = "InstancedBufferGeometry";
	this.maxInstancedCount = undefined;

}

InstancedBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
InstancedBufferGeometry.prototype.constructor = InstancedBufferGeometry;

InstancedBufferGeometry.prototype.addGroup = function ( start, count, instances ) {

	this.groups.push( {

		start: start,
		count: count,
		instances: instances

	} );

};

InstancedBufferGeometry.prototype.copy = function ( source ) {

	var index = source.index;

	if ( index !== null ) {

		this.addIndex( index.clone() );

	}

	var attributes = source.attributes;

	for ( var name in attributes ) {

		var attribute = attributes[ name ];
		this.addAttribute( name, attribute.clone() );

	}

	var groups = source.groups;

	for ( var i = 0, l = groups.length; i < l; i ++ ) {

		var group = groups[ i ];
		this.addGroup( group.start, group.count, group.instances );

	}

	return this;

};

EventDispatcher.prototype.apply( InstancedBufferGeometry.prototype );
