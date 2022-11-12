import { Object3D } from 'three';

import {
	fetchProfile,
	MotionController
} from '../libs/motion-controllers.module.js';

const DEFAULT_PROFILES_PATH = 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles';
const DEFAULT_PROFILE = 'generic-trigger';

class XRInputEventsDispatcher extends Object3D {

	constructor( xrManager, controllerIndices ) {

		super();

		this.xrManager = xrManager;

		this.controllers = {};
		this.motionControllers = {};

		controllerIndices.forEach( controllerIdx => {

			const controllerGrip = xrManager.getControllerGrip( controllerIdx );
			this.controllers[ controllerIdx ] = controllerGrip;

			controllerGrip.addEventListener( 'connected', ( event ) => {

				const xrInputSource = event.data;

				if ( xrInputSource.targetRayMode !== 'tracked-pointer' || ! xrInputSource.gamepad ) return;

				fetchProfile( xrInputSource, DEFAULT_PROFILES_PATH, DEFAULT_PROFILE ).then( ( { profile, assetPath } ) => {

					this.motionControllers[ controllerIdx ] = new MotionController(
						xrInputSource,
						profile,
						assetPath
					);


					const handedness = xrInputSource.handedness;
					this.partialIds[ handedness ]?.forEach( partialId => {

						/*
						// Find the first component that matches the partial id
						const components = this.motionControllers[ controllerIdx ].components;
						let matchedComponent;
						Object.keys( components ).some( ( componentId ) => {

							const partialMatch = componentId.includes( partialId );
							if ( partialMatch ) {

								matchedComponent = components[ componentId ];

							}

							return !! matchedComponent;

						} );

						if ( ! matchedComponent ) {

							console.warn( `Could not find ${ partialId } on the ${ handedness } controller` );
							return;

						}

						if ( ! this.registeredComponents[ handedness ] ) this.registeredComponents[ handedness ] = [];
						this.registeredComponents[ handedness ].push( matchedComponent.id );
						this._dispatchResolvedComponent( handedness, partialId, matchedComponent );
						*/

						const components = this.motionControllers[ controllerIdx ].components;
						const matchedComponents = Object.values( components ).filter( ( component ) => {

							return component.id.includes( partialId );

					 	} );

						if ( matchedComponents.length > 0 ) {

							this._dispatchMatchedComponents( matchedComponents, handedness, partialId, xrInputSource );

						} else {

							console.warn( `Could not find ${ partialId } on the ${ handedness } controller` );

						}


					} );

				} ).catch( ( err ) => {

					console.warn( err );

				} );

			} );

			controllerGrip.addEventListener( 'disconnected', () => {

				this.controllers[ controllerIdx ] = null;
				this.motionControllers[ controllerIdx ] = null;

			} );

		} );

		return this;

	}

	updateMatrixWorld( force ) {

		super.updateMatrixWorld( force );

		for ( const motionController of Object.values( this.motionControllers ) ) {

			// Cause the MotionController to poll the Gamepad for data
			motionController.updateFromGamepad();

		}

	}

	registerInputForEvents( handedness, partialId ) {

		if ( ! this.partialIds ) this.partialIds = {};
		if ( ! this.partialIds[ handedness ] ) this.partialIds[ handedness ] = [];

		this.partialIds[ handedness ].push( partialId );

	}

	// Private method

	_dispatchMatchedComponents( matchedComponents, handedness, partialId, xrInputSource ) {

		const eventTypeString = `${handedness}-${partialId}`;
		this.dispatchEvent( {
			type: eventTypeString,
			target: this,
			partialId: partialId,
			handedness: handedness,
			xrInputSource: xrInputSource,
			// Send references instead of a copy so that the listener can use it after the initial state change event
			components: matchedComponents
		} );

	}

}

export { XRInputEventsDispatcher };
