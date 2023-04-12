import { NodeUpdateType } from './constants.js';

class NodeFrame {

	constructor() {

		this.time = 0;
		this.deltaTime = 0;

		this.frameId = 0;

		this.startTime = null;

		this.updateMap = new WeakMap();

		this.renderer = null;
		this.material = null;
		this.camera = null;
		this.object = null;

	}

	updateNode( node ) {

		const updateType = node.getUpdateType();

		if ( updateType === NodeUpdateType.FRAME ) {

			if ( this.updateMap.get( node ) !== this.frameId ) {

				this.updateMap.set( node, this.frameId );

				node.update( this );

			}

		} else if ( updateType === NodeUpdateType.RENDER ) {

			if ( this.rendererMap.get( node ) !== this.renderId || this.updateMap.get( node ) !== this.frameId ) {

				this.rendererMap.set( node, this.renderId );
				this.updateMap.set( node, this.frameId );

				node.update( this );

			}

		} else if ( updateType === NodeUpdateType.OBJECT ) {

			node.update( this );

		}

	}

	update() {

		this.frameId ++;

		if ( this.lastTime === undefined ) this.lastTime = performance.now();

		this.deltaTime = ( performance.now() - this.lastTime ) / 1000;

		this.lastTime = performance.now();

		this.time += this.deltaTime;

	}

}

export default NodeFrame;
