import {
	Box3,
	BufferGeometry,
	IcosahedronGeometry,
	InstancedMesh,
	Matrix4,
	Mesh,
	Object3D,
	Quaternion,
	SphereGeometry,
	Vector3,
} from "three";

/**
 * @typedef {{} & import('@dimforge/rapier3d')} Rapier
 */

/**
 * @typedef {{
 *   rigidBodyDesc: Rapier.RigidBodyDesc;
 *   rigidBody: Rapier.RigidBody;
 *   colliderDesc: Rapier.ColliderDesc;
 *   collider: Rapier.Collider;
 * }} PhysicsProperties
 */

/**
 * @typedef {{
 *   geometry?: BufferGeometry;
 * } & Object3D } Object3DWithGeometry
 */

const RAPIER_PATH = "https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.12.0";

/** @type {Rapier | null | undefined} */
let RAPIER = null;

/**
 * @initial_author mrdoob | info@mrdoob.com
 *
 * @description Physics helper based on `Rapier`
 *
 * @docs https://rapier.rs/docs/api/javascript/JavaScript3D/
 */
export class Physics {
	/** @access private */
	_vector = new Vector3();
	/** @access private */
	_position = new Vector3();
	/** @access private */
	_quaternion = new Quaternion();
	/** @access private */
	_scale = new Vector3(1, 1, 1);
	/** @access private */
	_matrix = new Matrix4();

	/**
	 * @description `Rapier3D.js`.
	 *
	 * @type {Rapier}
	 */
	rapier;
	/**
	 * @description {@link Rapier.World} instance.
	 *
	 * @type {Rapier.World}
	 */
	world;
	/**
	 * @description List of {@link Object3D} with applied physics.
	 *
	 * @type {Object3DWithGeometry[]}
	 */
	dynamicObjects = [];
	/**
	 * @description {@link WeakMap} of dynamic objects {@link Rapier.RigidBody}
	 *
	 * @type {WeakMap<WeakKey, Rapier.RigidBody | Rapier.RigidBody[]>}
	 */
	dynamicObjectMap = new WeakMap();

	constructor(rapier) {
		this.rapier = rapier;

		const gravity = new this.rapier.Vector3(0.0, -9.81, 0.0);
		this.world = new this.rapier.World(gravity);
	}

	/**
	 * @description Add the specified `object` to the physics `dynamicObjects` map.
	 *
	 * @param {Object3DWithGeometry} object `Object3D` based.
	 * @param {number} mass Physics object mass.
	 * @param {number} restitution Physics Object restitution.
	 *
	 * @access private
	 */
	_addObject(object, mass = 0, restitution = 0) {
		const { colliderDesc } = this.getShape(object);
		if (!colliderDesc) return;

		colliderDesc.setMass(mass);
		colliderDesc.setRestitution(restitution);

		const physicsProperties =
			object instanceof InstancedMesh
				? this.createInstancedPhysicsProperties(object, colliderDesc, mass)
				: this.createPhysicsProperties(
						colliderDesc,
						object.position,
						object.quaternion,
						mass
				  );

		if (mass > 0) {
			this.dynamicObjects.push(object);
			this.dynamicObjectMap.set(object, physicsProperties);
		}

		return physicsProperties;
	}

	/**
	 * Add objects children from the specified {@link Object3D} to the physics world using `userData`.
	 *
	 * @param {Object3DWithGeometry} object Object3D based.
	 *
	 * @example ```ts
	 *  const floor = new Mesh(
	 *    new BoxGeometry(500, 5, 500),
	 *    new MeshBasicMaterial({})
	 *  );
	 *  floor.position.setY(-10);
	 *  floor.userData.physics = { mass: 0, restitution: restitution };
	 *
	 *  rapierPhysicsHelper?.addToWorld(floor, 0);
	 * ```
	 */
	addSceneToWorld(object) {
		object.traverse((child) => {
			if (!(child instanceof Object3D) || !child.userData.physics) return;

			const physics = child.userData.physics;

			this._addObject(child, physics.mass, physics.restitution);
		});
	}

	/**
	 * @description Apply physics to the specified object. Add the object to the physical `world`.
	 *
	 * @param {Object3D} object Object3D based.
	 * @param {number} mass Physics mass.
	 * @param {number} restitution Physics restitution.
	 */
	addToWorld(object, mass = 0, restitution = 0) {
		if (object instanceof Object3D)
			return this._addObject(object, Number(mass), Number(restitution));
		return undefined;
	}

	/**
	 * @description Retrieve the shape of the passed `object`.
	 *
	 * @param {Object3DWithGeometry} object `Object3D` based.
	 */
	getShape(object) {
		const positions = object?.geometry?.attributes?.position?.array;
		let width = 0;
		let height = 0;
		let depth = 0;
		let halfWidth = 0;
		let halfHeight = 0;
		let halfDepth = 0;
		let radius = 0;
		/** @type {Rapier.ColliderDesc} */
		let colliderDesc;

		if (
			object instanceof Mesh &&
			(object.geometry instanceof SphereGeometry ||
				object.geometry instanceof IcosahedronGeometry)
		) {
			const parameters = object.geometry.parameters;

			radius = parameters.radius ?? 1;
			colliderDesc = this.rapier.ColliderDesc.ball(radius);
		} else if (positions) {
			let minX = 0,
				minY = 0,
				minZ = 0,
				maxX = 0,
				maxY = 0,
				maxZ = 0;

			for (let i = 0; i < positions.length; i += 3) {
				const _vector = new this.rapier.Vector3(
					positions[i],
					positions[i + 1],
					positions[i + 2]
				);

				minX = Math.min(minX, _vector.x);
				minY = Math.min(minY, _vector.y);
				minZ = Math.min(minZ, _vector.z);
				maxX = Math.max(maxX, _vector.x);
				maxY = Math.max(maxY, _vector.y);
				maxZ = Math.max(maxZ, _vector.z);
			}

			width = maxX - minX;
			height = maxY - minY;
			depth = maxZ - minZ;

			halfWidth = width / 2;
			halfHeight = height / 2;
			halfDepth = depth / 2;

			colliderDesc = this.rapier.ColliderDesc.cuboid(
				halfWidth,
				halfHeight,
				halfDepth
			);
		} else {
			const boundingBox = new Box3().setFromObject(object);

			width = boundingBox.max.x - boundingBox.min.x;
			height = boundingBox.max.y - boundingBox.min.y;
			depth = boundingBox.max.z - boundingBox.min.z;

			halfWidth = width / 2;
			halfHeight = height / 2;
			halfDepth = depth / 2;

			colliderDesc = this.rapier.ColliderDesc.cuboid(
				halfWidth,
				halfHeight,
				halfDepth
			);
		}

		return {
			width,
			height,
			depth,
			halfWidth,
			halfHeight,
			halfDepth,
			colliderDesc,
		};
	}

	/**
	 * @description Create a {@link Rapier.RigidBody} for each instance of the specified {@link InstancedMesh}
	 *
	 * @param {InstancedMesh} mesh {@link InstancedMesh}
	 * @param {Rapier.ColliderDesc} colliderDesc {@link Rapier.ColliderDesc}
	 * @param {number | undefined} mass
	 */
	createInstancedPhysicsProperties(mesh, colliderDesc, mass) {
		const array = mesh.instanceMatrix.array;
		const bodies = [];

		for (let i = 0; i < mesh.count; i++) {
			const position = this._vector.fromArray(array, i * 16 + 12);
			bodies.push(
				this.createPhysicsProperties(colliderDesc, position, null, mass)
			);
		}

		return bodies;
	}

	/**
	 * @description Create a {@link Rapier.RigidBody} for the specified {@link Rapier.Collider}
	 *
	 * @param {Rapier.ColliderDesc} colliderDesc {@link Rapier.ColliderDesc}
	 * @param {Rapier.Vector3} position {@link Rapier.Vector3}
	 * @param {Rapier.Rotation} rotation {@link Rapier.Rotation}
	 * @param {number | null | undefined} mass
	 */
	createPhysicsProperties(colliderDesc, position, rotation, mass = 0) {
		const rigidBodyDesc =
			mass > 0
				? this.rapier.RigidBodyDesc.dynamic()
				: this.rapier.RigidBodyDesc.fixed();
		rigidBodyDesc.setTranslation(position.x, position.y, position.z);
		if (rotation) rigidBodyDesc.setRotation(rotation);

		const rigidBody = this.world.createRigidBody(rigidBodyDesc);
		const collider = this.world.createCollider(colliderDesc, rigidBody);

		return { rigidBodyDesc, rigidBody, colliderDesc, collider };
	}

	/**
	 * @param {Object3DWithGeometry} object
	 * @param {number | number} index
	 */
	getPhysicsPropertiesFromObject(object, index = 0) {
		const _physicsProperties = this.dynamicObjectMap.get(object);
		/** @type {PhysicsProperties} */
		let body;

		if (!_physicsProperties) return undefined;
		if (
			object instanceof InstancedMesh &&
			typeof _physicsProperties === "object"
		)
			body = _physicsProperties[index];
		else body = _physicsProperties;

		return body;
	}

	/**
	 *
	 * @param {Object3DWithGeometry} object
	 * @param {Rapier.Vector3} position
	 * @param {number | undefined} index
	 * @returns
	 */
	setObjectPosition(object, position, index = 0) {
		/** @description Object physics properties (rigid body, collider, ...). */
		const physicsProperties = this.getPhysicsPropertiesFromObject(object, index);
		if (!physicsProperties) return;

		const _vectorZero = new this.rapier.Vector3(0, 0, 0);
		physicsProperties.rigidBody.setAngvel(_vectorZero, true);
		physicsProperties.rigidBody.setLinvel(_vectorZero, true);
		physicsProperties.rigidBody.setTranslation(position, true);

		return physicsProperties;
	}

	/**
	 *
	 * @param {Object3DWithGeometry} object
	 * @param {Rapier.Vector3} velocity
	 * @param {number | undefined} index
	 */
	setObjectVelocity(object, velocity, index = 0) {
		const physicsProperties = this.getPhysicsPropertiesFromObject(object, index);
		if (!physicsProperties) return;

		physicsProperties.rigidBody.setLinvel(velocity, true);

		return physicsProperties;
	}

	/**
	 * @description Update the physics world.
	 *
	 * @param {number | undefined} timestep The timestep length, in seconds.
	 */
	step(timestep = undefined) {
		if (typeof timestep === "number") this.world.timestep = timestep;
		this.world.step();

		for (let i = 0, l = this.dynamicObjects.length; i < l; i++) {
			const object = this.dynamicObjects[i];

			if (object instanceof InstancedMesh) {
				const array = object.instanceMatrix.array;
				/** @type {PhysicsProperties[]} */
				const bodies = this.dynamicObjectMap.get(object);

				for (let j = 0; j < bodies.length; j++) {
					const physicsProperties = bodies[j];

					/** @type {Vector3} */
					let position = this._position;
					/** @type {Quaternion} */
					let quaternion = this._quaternion;
					/** @type {Vector3} */
					let scale = this._scale;

					object.getMatrixAt(j, this._matrix);
					this._matrix.decompose(position, quaternion, scale);

					position = this._position.copy(
						physicsProperties.rigidBody.translation()
					);
					quaternion = this._quaternion.copy(
						physicsProperties.rigidBody.rotation()
					);
					scale = this._scale.copy(scale);

					this._matrix
						.compose(position, quaternion, scale)
						.toArray(array, j * 16);
				}

				object.instanceMatrix.needsUpdate = true;
				object.computeBoundingSphere();
			} else {
				/** @type {PhysicsProperties} */
				const physicsProperties = this.dynamicObjectMap.get(object);

				object.position.copy(physicsProperties.rigidBody.translation());
				object.quaternion.copy(physicsProperties.rigidBody.rotation());
			}
		}
	}

	/**
	 * @description Remove the specified object to the physics `world`.
	 *
	 * @param {Object3D} object Object3D based.
	 */
	removeFromWorld(object) {
		for (let i = 0; i < this.dynamicObjects.length; i++) {
			const dynamicObject = this.dynamicObjects[i];
			/** @type PhysicsProperties */
			const dynamicObjectProps = this.dynamicObjectMap.get(dynamicObject);

			if (dynamicObject.id === object.id && dynamicObjectProps) {
				if (object instanceof InstancedMesh)
					dynamicObjectProps.map((props) => {
						this.world.removeRigidBody(props.rigidBody);
						this.world.removeCollider(props.collider, true);
					});
				else {
					this.world.removeRigidBody(dynamicObjectProps.rigidBody);
					this.world.removeCollider(dynamicObjectProps.collider, true);
				}

				this.dynamicObjectMap.delete(dynamicObject);
				this.dynamicObjects.splice(i, 1);
				return;
			}
		}
	}

	/**
	 * @description remove all the stored physical objects.
	 */
	dispose() {
		this.dynamicObjects = [];
		this.dynamicObjectMap = new WeakMap();
	}
}

export async function RapierPhysics() {
	if (RAPIER === null) await (RAPIER = await import(RAPIER_PATH)).init();

	const _rapierPhysics = new Physics(RAPIER);

	return _rapierPhysics;
}
