import { Command } from '../Command.js';

/**
 * @param editor Editor
 * @param object THREE.Object3D
 * @param attributeName string
 * @param newValue number, string, boolean or object
 * @constructor
 */
class SetMaterialValueCommand extends Command {

	constructor( editor, object, attributeName, newValue, materialSlot ) {

		super( editor );

		this.type = 'SetMaterialValueCommand';
		this.updatable = true;

		if ( arguments.length > 1 ) {

			this.name = editor.strings.getKey( 'command/SetMaterialValue' ) + ': ' + attributeName;
			this.object = object;
			this.materialSlot = materialSlot;

			const oldMaterial = this.editor.getObjectMaterial( object, materialSlot );

			this.oldValue = oldMaterial[ attributeName ];
			this.newValue = newValue;

			this.attributeName = attributeName;

		}

	}

	execute() {

		const material = this.editor.getObjectMaterial( this.object, this.materialSlot );

		material[ this.attributeName ] = this.newValue;
		material.needsUpdate = true;

		this.editor.signals.objectChanged.dispatch( this.object );
		this.editor.signals.materialChanged.dispatch( this.object, this.materialSlot );

	}

	undo() {

		const material = this.editor.getObjectMaterial( this.object, this.materialSlot );

		material[ this.attributeName ] = this.oldValue;
		material.needsUpdate = true;

		this.editor.signals.objectChanged.dispatch( this.object );
		this.editor.signals.materialChanged.dispatch( this.object, this.materialSlot );

	}

	update( cmd ) {

		this.newValue = cmd.newValue;

	}

	toJSON() {

		const output = super.toJSON( this );

		output.objectUuid = this.object.uuid;
		output.attributeName = this.attributeName;
		output.oldValue = this.oldValue;
		output.newValue = this.newValue;
		output.materialSlot = this.materialSlot;

		return output;

	}

	fromJSON( json ) {

		super.fromJSON( json );

		this.attributeName = json.attributeName;
		this.oldValue = json.oldValue;
		this.newValue = json.newValue;
		this.object = this.editor.objectByUuid( json.objectUuid );
		this.materialSlot = json.materialSlot;

	}

}

export { SetMaterialValueCommand };
