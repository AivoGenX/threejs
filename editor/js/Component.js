// ComponentClass

var _defaultSrc = [
	'// hello world',
	'this.update = function () {',
	'  // target.position',
	'};',
].join('\n');

function ComponentClass ( opts ) {

	opts = opts || {};

	this.uuid = opts.uuid || THREE.Math.generateUUID();
	this.name = opts.name || 'Unnamed Component';
	this.src = opts.src || _defaultSrc;
	this.instances = [];

}

ComponentClass.prototype = {

	getCode: function () {

		return this.src;

	},

	setCode: function ( newCode ) {

		this.src = newCode;
		this.updateInstances();

		return this;

	},

	instantiate: function ( target ) {

		var newInstance = new ComponentInstance( {
			class: this,
			target: target,
		} );

		this.instances.push( newInstance );

		return newInstance;

	},

	updateInstances: function() {

		this.instances.forEach( function ( instance ) {

			instance.updateClass();

		} );

	},

	toJSON: function () {

		var data = {};

		data.uuid = this.uuid;
		data.name = this.name;
		data.src = this.src;

		data.instances = [];
		this.instances.forEach( function (instance) {

			data.instances.push( instance.toJSON() );

		} );

		return data;

	},

}

// ComponentInstance

function ComponentInstance ( opts ) {

	this.uuid = THREE.Math.generateUUID();
	this.class = opts.class;
	this.target = opts.target;

	this.updateClass();

}

ComponentInstance.prototype = {

	updateClass: function () {

		var Class = eval( '(function(target){\n\n' + this.class.src + '\n\n})' );
		this.instance = new Class( this.target );

	},

	run: function ( methodName ) {

		var fn = this.instance[ methodName ];

		if ( fn === undefined ) return;

		// collect any additional args after methodName
		var args = [].slice.call( arguments, 1 );
		fn.apply( this.instance, args );

	},

	toJSON: function () {

		var data = {};

		data.uuid = this.uuid;
		data.target = this.target.uuid;
		data.class = this.class.uuid;

		return data;

	},

}