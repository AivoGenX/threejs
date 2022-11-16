import {
	Color,
	Matrix4,
	Mesh,
	PerspectiveCamera,
	Plane,
	Quaternion,
	ShaderMaterial,
	UniformsUtils,
	Vector3,
	Vector4,
	WebGLRenderTarget,
	LinearEncoding,
	NoToneMapping,
	HalfFloatType,
} from "three";

class Refractor extends Mesh {
	constructor(geometry, options = {}) {
		super(geometry);

		this.isRefractor = true;

		this.type = "Refractor";
		this.camera = new PerspectiveCamera();

		const scope = this;

		const color =
			options.color !== undefined
				? new Color(options.color)
				: new Color(0x7f7f7f);
		const textureWidth = options.textureWidth || 512;
		const textureHeight = options.textureHeight || 512;
		const clipBias = options.clipBias || 0;
		const shader = options.shader || Refractor.RefractorShader;
		const multisample =
			options.multisample !== undefined ? options.multisample : 4;

		//

		const virtualCamera = this.camera;
		virtualCamera.matrixAutoUpdate = false;
		virtualCamera.userData.refractor = true;

		//

		const refractorPlane = new Plane();
		const textureMatrix = new Matrix4();

		// render target

		const renderTarget = new WebGLRenderTarget(textureWidth, textureHeight, {
			samples: multisample,
			type: HalfFloatType,
		});

		// material

		this.material = new ShaderMaterial({
			uniforms: UniformsUtils.clone(shader.uniforms),
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			transparent: true, // ensures, refractors are drawn from farthest to closest
		});

		this.material.uniforms["color"].value = color;
		this.material.uniforms["tDiffuse"].value = renderTarget.texture;
		this.material.uniforms["textureMatrix"].value = textureMatrix;

		// functions

		const visible = (function () {
			const refractorWorldPosition = new Vector3();
			const cameraWorldPosition = new Vector3();
			const rotationMatrix = new Matrix4();

			const view = new Vector3();
			const normal = new Vector3();

			return function visible(camera) {
				refractorWorldPosition.setFromMatrixPosition(scope.matrixWorld);
				cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);

				view.subVectors(refractorWorldPosition, cameraWorldPosition);

				rotationMatrix.extractRotation(scope.matrixWorld);

				normal.set(0, 0, 1);
				normal.applyMatrix4(rotationMatrix);

				return view.dot(normal) < 0;
			};
		})();

		const updateRefractorPlane = (function () {
			const normal = new Vector3();
			const position = new Vector3();
			const quaternion = new Quaternion();
			const scale = new Vector3();

			return function updateRefractorPlane() {
				scope.matrixWorld.decompose(position, quaternion, scale);
				normal.set(0, 0, 1).applyQuaternion(quaternion).normalize();

				// flip the normal because we want to cull everything above the plane

				normal.negate();

				refractorPlane.setFromNormalAndCoplanarPoint(normal, position);
			};
		})();

		const updateVirtualCamera = (function () {
			const clipPlane = new Plane();
			const clipVector = new Vector4();
			const q = new Vector4();

			return function updateVirtualCamera(camera) {
				virtualCamera.matrixWorld.copy(camera.matrixWorld);
				virtualCamera.matrixWorldInverse
					.copy(virtualCamera.matrixWorld)
					.invert();
				virtualCamera.projectionMatrix.copy(camera.projectionMatrix);
				virtualCamera.far = camera.far; // used in WebGLBackground

				// The following code creates an oblique view frustum for clipping.
				// see: Lengyel, Eric. “Oblique View Frustum Depth Projection and Clipping”.
				// Journal of Game Development, Vol. 1, No. 2 (2005), Charles River Media, pp. 5–16

				clipPlane.copy(refractorPlane);
				clipPlane.applyMatrix4(virtualCamera.matrixWorldInverse);

				clipVector.set(
					clipPlane.normal.x,
					clipPlane.normal.y,
					clipPlane.normal.z,
					clipPlane.constant
				);

				// calculate the clip-space corner point opposite the clipping plane and
				// transform it into camera space by multiplying it by the inverse of the projection matrix

				const projectionMatrix = virtualCamera.projectionMatrix;

				q.x =
					(Math.sign(clipVector.x) + projectionMatrix.elements[8]) /
					projectionMatrix.elements[0];
				q.y =
					(Math.sign(clipVector.y) + projectionMatrix.elements[9]) /
					projectionMatrix.elements[5];
				q.z = -1.0;
				q.w =
					(1.0 + projectionMatrix.elements[10]) / projectionMatrix.elements[14];

				// calculate the scaled plane vector

				clipVector.multiplyScalar(2.0 / clipVector.dot(q));

				// replacing the third row of the projection matrix

				projectionMatrix.elements[2] = clipVector.x;
				projectionMatrix.elements[6] = clipVector.y;
				projectionMatrix.elements[10] = clipVector.z + 1.0 - clipBias;
				projectionMatrix.elements[14] = clipVector.w;
			};
		})();

		// This will update the texture matrix that is used for projective texture mapping in the shader.
		// see: http://developer.download.nvidia.com/assets/gamedev/docs/projective_texture_mapping.pdf

		function updateTextureMatrix(camera) {
			// this matrix does range mapping to [ 0, 1 ]

			textureMatrix.set(
				0.5,
				0.0,
				0.0,
				0.5,
				0.0,
				0.5,
				0.0,
				0.5,
				0.0,
				0.0,
				0.5,
				0.5,
				0.0,
				0.0,
				0.0,
				1.0
			);

			// we use "Object Linear Texgen", so we need to multiply the texture matrix T
			// (matrix above) with the projection and view matrix of the virtual camera
			// and the model matrix of the refractor

			textureMatrix.multiply(camera.projectionMatrix);
			textureMatrix.multiply(camera.matrixWorldInverse);
			textureMatrix.multiply(scope.matrixWorld);
		}

		//

		function render(renderer, scene, camera) {
			scope.visible = false;

			const currentRenderTarget = renderer.getRenderTarget();
			const currentXrEnabled = renderer.xr.enabled;
			const currentShadowAutoUpdate = renderer.shadowMap.autoUpdate;
			const currentOutputEncoding = renderer.outputEncoding;
			const currentToneMapping = renderer.toneMapping;

			renderer.xr.enabled = false; // avoid camera modification
			renderer.shadowMap.autoUpdate = false; // avoid re-computing shadows
			renderer.outputEncoding = LinearEncoding;
			renderer.toneMapping = NoToneMapping;

			renderer.setRenderTarget(renderTarget);
			if (renderer.autoClear === false) renderer.clear();
			renderer.render(scene, virtualCamera);

			renderer.xr.enabled = currentXrEnabled;
			renderer.shadowMap.autoUpdate = currentShadowAutoUpdate;
			renderer.outputEncoding = currentOutputEncoding;
			renderer.toneMapping = currentToneMapping;
			renderer.setRenderTarget(currentRenderTarget);

			// restore viewport

			const viewport = camera.viewport;

			if (viewport !== undefined) {
				renderer.state.viewport(viewport);
			}

			scope.visible = true;
		}

		//

		this.onBeforeRender = function (renderer, scene, camera) {
			// ensure refractors are rendered only once per frame

			if (camera.userData.refractor === true) return;

			// avoid rendering when the refractor is viewed from behind

			if (!visible(camera) === true) return;

			// update

			updateRefractorPlane();

			updateTextureMatrix(camera);

			updateVirtualCamera(camera);

			render(renderer, scene, camera);
		};

		this.getRenderTarget = function () {
			return renderTarget;
		};

		this.dispose = function () {
			renderTarget.dispose();
			scope.material.dispose();
		};
	}
}

Refractor.RefractorShader = {
	uniforms: {
		color: {
			value: null,
		},

		tDiffuse: {
			value: null,
		},

		textureMatrix: {
			value: null,
		},
	},

	vertexShader: /* glsl */ `

		uniform mat4 textureMatrix;

		varying vec4 vUv;

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */ `

		uniform vec3 color;
		uniform sampler2D tDiffuse;

		varying vec4 vUv;

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <encodings_fragment>

		}`,
};

export { Refractor };
