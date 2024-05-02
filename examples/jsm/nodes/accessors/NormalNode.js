import Node, { addNodeClass } from '../core/Node.js';
import { attribute } from '../core/AttributeNode.js';
import { varying } from '../core/VaryingNode.js';
import { property } from '../core/PropertyNode.js';
import { normalize } from '../math/MathNode.js';
import { cameraViewMatrix } from './CameraNode.js';
// import { modelNormalMatrix } from './ModelNode.js';
import { nodeImmutable, vec3 } from '../shadernode/ShaderNode.js';
import { positionView } from './PositionNode.js';
import { modelNormalMatrix, modelWorldMatrix } from './ModelNode.js';

class NormalNode extends Node {

	constructor( scope = NormalNode.LOCAL ) {

		super( 'vec3' );

		this.scope = scope;

	}

	isGlobal() {

		return true;

	}

	getHash( /*builder*/ ) {

		return `normal-${this.scope}`;

	}

	generate( builder ) {

		const scope = this.scope;

		let outputNode = null;

		if ( scope === NormalNode.GEOMETRY ) {

			const geometryAttribute = builder.hasGeometryAttribute( 'normal' );

			if ( geometryAttribute === false ) {

				outputNode = vec3( 0, 1, 0 );

			} else {

				outputNode = attribute( 'normal', 'vec3' );

			}

		} else if ( scope === NormalNode.LOCAL ) {

			outputNode = varying( normalGeometry );

		} else if ( scope === NormalNode.VIEW ) {


			// TODO: For static mode prevent the necessary usage of modelViewMatrix and keep camera dynamic
			// TODO: Add inverse() support to WGSL
			// Use positionView for static mode to prevent usage for camera
			// cameraViewMatrix.mul( modelWorldMatrix ).inverse().transpose() And TODO update modelNormalMatrix
			// const vertexNode = cameraViewMatrix.mul( modelWorldMatrix ).transpose().mul( normalLocal );
			const vertexNode = modelNormalMatrix.mul( normalLocal );
			outputNode = normalize( varying( vertexNode ) );

		} else if ( scope === NormalNode.WORLD ) {

			// To use inverseTransformDirection only inverse the param order like this: cameraViewMatrix.transformDirection( normalView )
			const vertexNode = normalView.transformDirection( cameraViewMatrix );
			outputNode = normalize( varying( vertexNode ) );

		}

		return outputNode.build( builder, this.getNodeType( builder ) );

	}

	serialize( data ) {

		super.serialize( data );

		data.scope = this.scope;

	}

	deserialize( data ) {

		super.deserialize( data );

		this.scope = data.scope;

	}

}

NormalNode.GEOMETRY = 'geometry';
NormalNode.LOCAL = 'local';
NormalNode.VIEW = 'view';
NormalNode.WORLD = 'world';

export default NormalNode;

export const normalGeometry = nodeImmutable( NormalNode, NormalNode.GEOMETRY );
export const normalLocal = nodeImmutable( NormalNode, NormalNode.LOCAL ).temp( 'Normal' );
export const normalView = nodeImmutable( NormalNode, NormalNode.VIEW );
export const normalWorld = nodeImmutable( NormalNode, NormalNode.WORLD );
export const transformedNormalView = property( 'vec3', 'TransformedNormalView' );
export const transformedNormalWorld = transformedNormalView.transformDirection( cameraViewMatrix ).normalize();
export const transformedClearcoatNormalView = property( 'vec3', 'TransformedClearcoatNormalView' );

addNodeClass( 'NormalNode', NormalNode );
