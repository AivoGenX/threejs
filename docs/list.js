var list = {

	"Manual": {

		"Getting Started": {

			"Creating a scene": "manual/introduction/Creating-a-scene",
			"Import via modules": "manual/introduction/Import-via-modules",
			"Browser support": "manual/introduction/Browser-support",
			"WebGL compatibility check": "manual/introduction/WebGL-compatibility-check",
			"How to run things locally": "manual/introduction/How-to-run-things-locally",
			"Drawing Lines": "manual/introduction/Drawing-lines",
			"Creating Text": "manual/introduction/Creating-text",
			"Migration Guide": "manual/introduction/Migration-guide",
			"Code Style Guide": "manual/introduction/Code-style-guide",
			"FAQ": "manual/introduction/FAQ",
			"Useful links": "manual/introduction/Useful-links"

		},

		"Next Steps": {

			"How to update things": "manual/introduction/How-to-update-things",
			"Matrix transformations": "manual/introduction/Matrix-transformations",
			"Animation System": "manual/introduction/Animation-system"

		},

		"Build Tools": {

			"Testing with NPM": "manual/buildTools/Testing-with-NPM"

		}


	},

	"Reference": {

		"Animation": {

			"AnimationAction": {

				"#URL": "api/animation/AnimationAction",
				"clampWhenFinished": "AnimationAction.clampWhenFinished",
				"crossFadeFrom": "AnimationAction.crossFadeFrom",
				"crossFadeTo": "AnimationAction.crossFadeTo",
				"enabled": "AnimationAction.enabled",
				"fadeIn": "AnimationAction.fadeIn",
				"fadeOut": "AnimationAction.fadeOut",
				"getClip": "AnimationAction.getClip",
				"getEffectiveTimeScale": "AnimationAction.getEffectiveTimeScale",
				"getEffectiveWeight": "AnimationAction.getEffectiveWeight",
				"getMixer": "AnimationAction.getMixer",
				"getRoot": "AnimationAction.getRoot",
				"halt": "AnimationAction.halt",
				"isRunning": "AnimationAction.isRunning",
				"isScheduled": "AnimationAction.isScheduled",
				"loop": "AnimationAction.loop",
				"paused": "AnimationAction.paused",
				"play": "AnimationAction.play",
				"repetitions": "AnimationAction.repetitions",
				"reset": "AnimationAction.reset",
				"setDuration": "AnimationAction.setDuration",
				"setEffectiveTimeScale": "AnimationAction.setEffectiveTimeScale",
				"setEffectiveWeight": "AnimationAction.setEffectiveWeight",
				"setLoop": "AnimationAction.setLoop",
				"startAt": "AnimationAction.startAt",
				"stop": "AnimationAction.stop",
				"stopFading": "AnimationAction.stopFading",
				"stopWarping": "AnimationAction.stopWarping",
				"syncWith": "AnimationAction.syncWith",
				"time": "AnimationAction.time",
				"timeScale": "AnimationAction.timeScale",
				"warp": "AnimationAction.warp",
				"weight": "AnimationAction.weight",
				"zeroSlopeAtEnd": "AnimationAction.zeroSlopeAtEnd",
				"zeroSlopeAtStart": "AnimationAction.zeroSlopeAtStart"

			},

			"AnimationClip": {

				"#URL": "api/animation/AnimationClip",
				"CreateClipsFromMorphTargetSequences": "AnimationClip.CreateClipsFromMorphTargetSequences",
				"CreateFromMorphTargetSequence": "AnimationClip.CreateFromMorphTargetSequence",
				"duration": "AnimationClip.duration",
				"findByName": "AnimationClip.findByName",
				"name": "AnimationClip.name",
				"optimize": "AnimationClip.optimize",
				"parse": "AnimationClip.parse",
				"parseAnimation": "AnimationClip.parseAnimation",
				"resetDuration": "AnimationClip.resetDuration",
				"toJSON": "AnimationClip.toJSON",
				"tracks": "AnimationClip.tracks",
				"trim": "AnimationClip.trim",
				"uuid": "AnimationClip.uuid"

			},

			"AnimationMixer": {

				"#URL": "api/animation/AnimationMixer",
				"clipAction": "AnimationMixer.clipAction",
				"existingAction": "AnimationMixer.existingAction",
				"getRoot": "AnimationMixer.getRoot",
				"stopAllAction": "AnimationMixer.stopAllAction",
				"time": "AnimationMixer.time",
				"timeScale": "AnimationMixer.timeScale",
				"uncacheAction": "AnimationMixer.uncacheAction",
				"uncacheClip": "AnimationMixer.uncacheClip",
				"uncacheRoot": "AnimationMixer.uncacheRoot",
				"update": "AnimationMixer.update"

			},

			"AnimationObjectGroup": {

				"#URL": "api/animation/AnimationObjectGroup",
				"add": "AnimationObjectGroup.add",
				"remove": "AnimationObjectGroup.remove",
				"stats": "AnimationObjectGroup.stats",
				"uncache": "AnimationObjectGroup.uncache",
				"uuid": "AnimationObjectGroup.uuid"

			},

			"AnimationUtils": {

				"#URL": "api/animation/AnimationUtils",
				"arraySlice": "AnimationUtils.arraySlice",
				"convertArray": "AnimationUtils.convertArray",
				"flattenJSON": "AnimationUtils.flattenJSON",
				"getKeyframeOrder": "AnimationUtils.getKeyframeOrder",
				"isTypedArray": "AnimationUtils.isTypedArray",
				"sortedArray": "AnimationUtils.sortedArray"

			},

			"KeyframeTrack": {

				"#URL": "api/animation/KeyframeTrack",
				"DefaultInterpolation": "KeyframeTrack.DefaultInterpolation",
				"InterpolantFactoryMethodDiscrete": "KeyframeTrack.InterpolantFactoryMethodDiscrete",
				"InterpolantFactoryMethodLinear": "KeyframeTrack.InterpolantFactoryMethodLinear",
				"InterpolantFactoryMethodSmooth": "KeyframeTrack.InterpolantFactoryMethodSmooth",
				"TimeBufferType ": "KeyframeTrack.TimeBufferType ",
				"ValueBufferType ": "KeyframeTrack.ValueBufferType ",
				"createInterpolant": "KeyframeTrack.createInterpolant",
				"getInterpolation": "KeyframeTrack.getInterpolation",
				"getValueSize": "KeyframeTrack.getValueSize",
				"name": "KeyframeTrack.name",
				"optimize": "KeyframeTrack.optimize",
				"parse": "KeyframeTrack.parse",
				"scale": "KeyframeTrack.scale",
				"setInterpolation": "KeyframeTrack.setInterpolation",
				"shift": "KeyframeTrack.shift",
				"times": "KeyframeTrack.times",
				"toJSON": "KeyframeTrack.toJSON",
				"trim": "KeyframeTrack.trim",
				"validate": "KeyframeTrack.validate",
				"values": "KeyframeTrack.values"

			},

			"PropertyBinding": {

				"#URL": "api/animation/PropertyBinding",
				"BindingType": "PropertyBinding.BindingType",
				"Composite": "PropertyBinding.Composite",
				"GetterByBindingType": "PropertyBinding.GetterByBindingType",
				"SetterByBindingTypeAndVersioning": "PropertyBinding.SetterByBindingTypeAndVersioning",
				"Versioning": "PropertyBinding.Versioning",
				"bind": "PropertyBinding.bind",
				"create": "PropertyBinding.create",
				"findNode": "PropertyBinding.findNode",
				"getValue": "PropertyBinding.getValue",
				"node": "PropertyBinding.node",
				"parseTrackName": "PropertyBinding.parseTrackName",
				"parsedPath": "PropertyBinding.parsedPath",
				"path": "PropertyBinding.path",
				"rootNode": "PropertyBinding.rootNode",
				"setValue": "PropertyBinding.setValue",
				"unbind": "PropertyBinding.unbind"

			},

			"PropertyMixer": {

				"#URL": "api/animation/PropertyMixer",
				"accumulate": "PropertyMixer.accumulate",
				"apply": "PropertyMixer.apply",
				"binding": "PropertyMixer.binding",
				"buffer": "PropertyMixer.buffer",
				"cumulativeWeight": "PropertyMixer.cumulativeWeight",
				"referenceCount": "PropertyMixer.referenceCount",
				"restoreOriginalState": "PropertyMixer.restoreOriginalState",
				"saveOriginalState": "PropertyMixer.saveOriginalState",
				"useCount": "PropertyMixer.useCount",
				"valueSize": "PropertyMixer.valueSize"

			}


		},

		"Animation / Tracks": {

			"BooleanKeyframeTrack": {

				"#PARENT": "KeyframeTrack",
				"#URL": "api/animation/tracks/BooleanKeyframeTrack",
				"DefaultInterpolation": "BooleanKeyframeTrack.DefaultInterpolation",
				"InterpolantFactoryMethodLinear ": "BooleanKeyframeTrack.InterpolantFactoryMethodLinear ",
				"InterpolantFactoryMethodSmooth ": "BooleanKeyframeTrack.InterpolantFactoryMethodSmooth ",
				"ValueBufferType": "BooleanKeyframeTrack.ValueBufferType",
				"ValueTypeName": "BooleanKeyframeTrack.ValueTypeName"

			},

			"ColorKeyframeTrack": {

				"#PARENT": "KeyframeTrack",
				"#URL": "api/animation/tracks/ColorKeyframeTrack",
				"ValueTypeName": "ColorKeyframeTrack.ValueTypeName"

			},

			"NumberKeyframeTrack": {

				"#PARENT": "KeyframeTrack",
				"#URL": "api/animation/tracks/NumberKeyframeTrack",
				"ValueTypeName": "NumberKeyframeTrack.ValueTypeName"

			},

			"QuaternionKeyframeTrack": {

				"#PARENT": "KeyframeTrack",
				"#URL": "api/animation/tracks/QuaternionKeyframeTrack",
				"DefaultInterpolation": "QuaternionKeyframeTrack.DefaultInterpolation",
				"InterpolantFactoryMethodLinear": "QuaternionKeyframeTrack.InterpolantFactoryMethodLinear",
				"ValueTypeName": "QuaternionKeyframeTrack.ValueTypeName"

			},

			"StringKeyframeTrack": {

				"#PARENT": "KeyframeTrack",
				"#URL": "api/animation/tracks/StringKeyframeTrack",
				"DefaultInterpolation": "StringKeyframeTrack.DefaultInterpolation",
				"InterpolantFactoryMethodLinear": "StringKeyframeTrack.InterpolantFactoryMethodLinear",
				"InterpolantFactoryMethodSmooth": "StringKeyframeTrack.InterpolantFactoryMethodSmooth",
				"ValueBufferType": "StringKeyframeTrack.ValueBufferType",
				"ValueTypeName": "StringKeyframeTrack.ValueTypeName"

			},

			"VectorKeyframeTrack": {

				"#PARENT": "KeyframeTrack",
				"#URL": "api/animation/tracks/VectorKeyframeTrack",
				"ValueTypeName": "VectorKeyframeTrack.ValueTypeName"

			}


		},

		"Audio": {

			"Audio": {

				"#PARENT": "Object3D",
				"#URL": "api/audio/Audio",
				"autoplay": "Audio.autoplay",
				"connect": "Audio.connect",
				"context": "Audio.context",
				"disconnect": "Audio.disconnect",
				"filters": "Audio.filters",
				"gain": "Audio.gain",
				"getFilter": "Audio.getFilter",
				"getFilters": "Audio.getFilters",
				"getLoop": "Audio.getLoop",
				"getOutput": "Audio.getOutput",
				"getPlaybackRate": "Audio.getPlaybackRate",
				"getVolume": "Audio.getVolume",
				"hasPlaybackControl": "Audio.hasPlaybackControl",
				"isPlaying": "Audio.isPlaying",
				"offset": "Audio.offset",
				"onEnded": "Audio.onEnded",
				"pause": "Audio.pause",
				"play": "Audio.play",
				"playbackRate": "Audio.playbackRate",
				"setBuffer": "Audio.setBuffer",
				"setFilter": "Audio.setFilter",
				"setFilters": "Audio.setFilters",
				"setLoop": "Audio.setLoop",
				"setNodeSource": "Audio.setNodeSource",
				"setPlaybackRate": "Audio.setPlaybackRate",
				"setVolume": "Audio.setVolume",
				"source": "Audio.source",
				"sourceType": "Audio.sourceType",
				"startTime": "Audio.startTime",
				"stop": "Audio.stop",
				"type": "Audio.type"

			},

			"AudioAnalyser": {

				"#URL": "api/audio/AudioAnalyser",
				"analyser": "AudioAnalyser.analyser",
				"data": "AudioAnalyser.data",
				"fftSize": "AudioAnalyser.fftSize",
				"getAverageFrequency": "AudioAnalyser.getAverageFrequency",
				"getFrequencyData": "AudioAnalyser.getFrequencyData"

			},

			"AudioContext": {

				"#URL": "api/audio/AudioContext",
				"getContext": "AudioContext.getContext",
				"setContext": "AudioContext.setContext"

			},

			"AudioListener": {

				"#PARENT": "Object3D",
				"#URL": "api/audio/AudioListener",
				"context": "AudioListener.context",
				"filter": "AudioListener.filter",
				"gain": "AudioListener.gain",
				"getFilter": "AudioListener.getFilter",
				"getInput": "AudioListener.getInput",
				"getMasterVolume": "AudioListener.getMasterVolume",
				"removeFilter": "AudioListener.removeFilter",
				"setFilter": "AudioListener.setFilter",
				"setMasterVolume": "AudioListener.setMasterVolume"

			},

			"PositionalAudio": {

				"#PARENT": "Audio",
				"#URL": "api/audio/PositionalAudio",
				"getDistanceModel": "PositionalAudio.getDistanceModel",
				"getMaxDistance": "PositionalAudio.getMaxDistance",
				"getOutput": "PositionalAudio.getOutput",
				"getRefDistance": "PositionalAudio.getRefDistance",
				"getRolloffFactor": "PositionalAudio.getRolloffFactor",
				"panner": "PositionalAudio.panner",
				"setDistanceModel": "PositionalAudio.setDistanceModel",
				"setMaxDistance": "PositionalAudio.setMaxDistance",
				"setRefDistance": "PositionalAudio.setRefDistance",
				"setRolloffFactor": "PositionalAudio.setRolloffFactor"

			}


		},

		"Cameras": {

			"Camera": {

				"#PARENT": "Object3D",
				"#URL": "api/cameras/Camera",
				"clone": "Camera.clone",
				"copy": "Camera.copy",
				"getWorldDirection": "Camera.getWorldDirection",
				"isCamera": "Camera.isCamera",
				"layers": "Camera.layers",
				"matrixWorldInverse": "Camera.matrixWorldInverse",
				"projectionMatrix": "Camera.projectionMatrix"

			},

			"CubeCamera": {

				"#PARENT": "Object3D",
				"#URL": "api/cameras/CubeCamera",
				"clear": "CubeCamera.clear",
				"renderTarget": "CubeCamera.renderTarget",
				"update": "CubeCamera.update"

			},

			"OrthographicCamera": {

				"#PARENT": "Camera",
				"#URL": "api/cameras/OrthographicCamera",
				"bottom": "OrthographicCamera.bottom",
				"clearViewOffset": "OrthographicCamera.clearViewOffset",
				"far": "OrthographicCamera.far",
				"isOrthographicCamera": "OrthographicCamera.isOrthographicCamera",
				"left": "OrthographicCamera.left",
				"near": "OrthographicCamera.near",
				"right": "OrthographicCamera.right",
				"setViewOffset": "OrthographicCamera.setViewOffset",
				"toJSON": "OrthographicCamera.toJSON",
				"top": "OrthographicCamera.top",
				"updateProjectionMatrix": "OrthographicCamera.updateProjectionMatrix",
				"view": "OrthographicCamera.view",
				"zoom": "OrthographicCamera.zoom"

			},

			"PerspectiveCamera": {

				"#PARENT": "Camera",
				"#URL": "api/cameras/PerspectiveCamera",
				"aspect": "PerspectiveCamera.aspect",
				"clearViewOffset": "PerspectiveCamera.clearViewOffset",
				"far": "PerspectiveCamera.far",
				"filmGauge": "PerspectiveCamera.filmGauge",
				"filmOffset": "PerspectiveCamera.filmOffset",
				"focus": "PerspectiveCamera.focus",
				"fov": "PerspectiveCamera.fov",
				"getEffectiveFOV": "PerspectiveCamera.getEffectiveFOV",
				"getFilmHeight": "PerspectiveCamera.getFilmHeight",
				"getFilmWidth": "PerspectiveCamera.getFilmWidth",
				"getFocalLength": "PerspectiveCamera.getFocalLength",
				"isPerspectiveCamera": "PerspectiveCamera.isPerspectiveCamera",
				"near": "PerspectiveCamera.near",
				"setFocalLength": "PerspectiveCamera.setFocalLength",
				"setViewOffset": "PerspectiveCamera.setViewOffset",
				"toJSON": "PerspectiveCamera.toJSON",
				"updateProjectionMatrix": "PerspectiveCamera.updateProjectionMatrix",
				"view": "PerspectiveCamera.view",
				"zoom": "PerspectiveCamera.zoom"

			},

			"StereoCamera": {

				"#URL": "api/cameras/StereoCamera",
				"aspect": "StereoCamera.aspect",
				"cameraL": "StereoCamera.cameraL",
				"cameraR": "StereoCamera.cameraR",
				"eyeSep": "StereoCamera.eyeSep",
				"update": "StereoCamera.update"

			}


		},

		"Constants": {

			"Animation": {

				"#URL": "api/constants/Animation"

			},

			"Core": {

				"#URL": "api/constants/Core"

			},

			"CustomBlendingEquation": {

				"#URL": "api/constants/CustomBlendingEquations"

			},

			"DrawModes": {

				"#URL": "api/constants/DrawModes"

			},

			"Materials": {

				"#URL": "api/constants/Materials",
				"color": "Materials.color",
				"vertexColors": "Materials.vertexColors"

			},

			"Renderer": {

				"#URL": "api/constants/Renderer"

			},

			"Textures": {

				"#URL": "api/constants/Textures"

			}


		},

		"Core": {

			"BufferAttribute": {

				"#URL": "api/core/BufferAttribute",
				"array": "BufferAttribute.array",
				"clone": "BufferAttribute.clone",
				"copyArray": "BufferAttribute.copyArray",
				"copyAt": "BufferAttribute.copyAt",
				"copyColorsArray": "BufferAttribute.copyColorsArray",
				"copyIndicesArray": "BufferAttribute.copyIndicesArray",
				"copyVector2sArray": "BufferAttribute.copyVector2sArray",
				"copyVector3sArray": "BufferAttribute.copyVector3sArray",
				"copyVector4sArray": "BufferAttribute.copyVector4sArray",
				"count": "BufferAttribute.count",
				"dynamic": "BufferAttribute.dynamic",
				"getW": "BufferAttribute.getW",
				"getX": "BufferAttribute.getX",
				"getY": "BufferAttribute.getY",
				"getZ": "BufferAttribute.getZ",
				"isBufferAttribute": "BufferAttribute.isBufferAttribute",
				"itemSize": "BufferAttribute.itemSize",
				"name": "BufferAttribute.name",
				"needsUpdate": "BufferAttribute.needsUpdate",
				"normalized": "BufferAttribute.normalized",
				"onUpload": "BufferAttribute.onUpload",
				"onUploadCallback": "BufferAttribute.onUploadCallback",
				"set": "BufferAttribute.set",
				"setArray": "BufferAttribute.setArray",
				"setDynamic": "BufferAttribute.setDynamic",
				"setW": "BufferAttribute.setW",
				"setX": "BufferAttribute.setX",
				"setXY": "BufferAttribute.setXY",
				"setXYZ": "BufferAttribute.setXYZ",
				"setXYZW": "BufferAttribute.setXYZW",
				"setY": "BufferAttribute.setY",
				"setZ": "BufferAttribute.setZ",
				"updateRange": "BufferAttribute.updateRange",
				"uuid": "BufferAttribute.uuid",
				"version": "BufferAttribute.version"

			},

			"BufferGeometry": {

				"#URL": "api/core/BufferGeometry",
				"addAttribute": "BufferGeometry.addAttribute",
				"addGroup": "BufferGeometry.addGroup",
				"applyMatrix": "BufferGeometry.applyMatrix",
				"attributes": "BufferGeometry.attributes",
				"boundingBox": "BufferGeometry.boundingBox",
				"boundingSphere": "BufferGeometry.boundingSphere",
				"center": "BufferGeometry.center",
				"clearGroups": "BufferGeometry.clearGroups",
				"clone": "BufferGeometry.clone",
				"computeBoundingBox": "BufferGeometry.computeBoundingBox",
				"computeBoundingSphere": "BufferGeometry.computeBoundingSphere",
				"computeVertexNormals": "BufferGeometry.computeVertexNormals",
				"copy": "BufferGeometry.copy",
				"dispose": "BufferGeometry.dispose",
				"drawRange": "BufferGeometry.drawRange",
				"drawcalls": "BufferGeometry.drawcalls",
				"fromDirectGeometry": "BufferGeometry.fromDirectGeometry",
				"fromGeometry": "BufferGeometry.fromGeometry",
				"getAttribute": "BufferGeometry.getAttribute",
				"getIndex": "BufferGeometry.getIndex",
				"groups": "BufferGeometry.groups",
				"id": "BufferGeometry.id",
				"index": "BufferGeometry.index",
				"isBufferGeometry": "BufferGeometry.isBufferGeometry",
				"lookAt": "BufferGeometry.lookAt",
				"merge": "BufferGeometry.merge",
				"morphAttributes": "BufferGeometry.morphAttributes",
				"name": "BufferGeometry.name",
				"normalizeNormals": "BufferGeometry.normalizeNormals",
				"removeAttribute": "BufferGeometry.removeAttribute",
				"rotateX": "BufferGeometry.rotateX",
				"rotateY": "BufferGeometry.rotateY",
				"rotateZ": "BufferGeometry.rotateZ",
				"scale": "BufferGeometry.scale",
				"setDrawRange": "BufferGeometry.setDrawRange",
				"setFromObject": "BufferGeometry.setFromObject",
				"setFromPoints": "BufferGeometry.setFromPoints",
				"setIndex": "BufferGeometry.setIndex",
				"toJSON": "BufferGeometry.toJSON",
				"toNonIndexed": "BufferGeometry.toNonIndexed",
				"translate": "BufferGeometry.translate",
				"updateFromObject": "BufferGeometry.updateFromObject",
				"uuid": "BufferGeometry.uuid"

			},

			"Clock": {

				"#URL": "api/core/Clock",
				"autoStart": "Clock.autoStart",
				"elapsedTime": "Clock.elapsedTime",
				"getDelta": "Clock.getDelta",
				"getElapsedTime": "Clock.getElapsedTime",
				"oldTime": "Clock.oldTime",
				"running": "Clock.running",
				"start": "Clock.start",
				"startTime": "Clock.startTime",
				"stop": "Clock.stop"

			},

			"DirectGeometry": {

				"#URL": "api/core/DirectGeometry",
				"boundingBox": "DirectGeometry.boundingBox",
				"boundingSphere": "DirectGeometry.boundingSphere",
				"colors": "DirectGeometry.colors",
				"colorsNeedUpdate": "DirectGeometry.colorsNeedUpdate",
				"computeBoundingBox": "DirectGeometry.computeBoundingBox",
				"computeBoundingSphere": "DirectGeometry.computeBoundingSphere",
				"computeGroups": "DirectGeometry.computeGroups",
				"dispose": "DirectGeometry.dispose",
				"fromGeometry": "DirectGeometry.fromGeometry",
				"groups": "DirectGeometry.groups",
				"groupsNeedUpdate": "DirectGeometry.groupsNeedUpdate",
				"id": "DirectGeometry.id",
				"indices": "DirectGeometry.indices",
				"morphTargets": "DirectGeometry.morphTargets",
				"name": "DirectGeometry.name",
				"normals": "DirectGeometry.normals",
				"normalsNeedUpdate": "DirectGeometry.normalsNeedUpdate",
				"skinIndices": "DirectGeometry.skinIndices",
				"skinWeights": "DirectGeometry.skinWeights",
				"type": "DirectGeometry.type",
				"uvs": "DirectGeometry.uvs",
				"uvs2": "DirectGeometry.uvs2",
				"uvsNeedUpdate": "DirectGeometry.uvsNeedUpdate",
				"vertices": "DirectGeometry.vertices",
				"verticesNeedUpdate": "DirectGeometry.verticesNeedUpdate"

			},

			"EventDispatcher": {

				"#URL": "api/core/EventDispatcher",
				"addEventListener": "EventDispatcher.addEventListener",
				"dispatchEvent": "EventDispatcher.dispatchEvent",
				"hasEventListener": "EventDispatcher.hasEventListener",
				"removeEventListener": "EventDispatcher.removeEventListener"

			},

			"Face3": {

				"#URL": "api/core/Face3",
				"a": "Face3.a",
				"b": "Face3.b",
				"c": "Face3.c",
				"clone": "Face3.clone",
				"color": "Face3.color",
				"copy": "Face3.copy",
				"materialIndex": "Face3.materialIndex",
				"normal": "Face3.normal",
				"vertexColors": "Face3.vertexColors",
				"vertexNormals": "Face3.vertexNormals"

			},

			"Geometry": {

				"#URL": "api/core/Geometry",
				"applyMatrix": "Geometry.applyMatrix",
				"boundingBox": "Geometry.boundingBox",
				"boundingSphere": "Geometry.boundingSphere",
				"center": "Geometry.center",
				"clone": "Geometry.clone",
				"colors": "Geometry.colors",
				"colorsNeedUpdate": "Geometry.colorsNeedUpdate",
				"computeBoundingBox": "Geometry.computeBoundingBox",
				"computeBoundingSphere": "Geometry.computeBoundingSphere",
				"computeFaceNormals": "Geometry.computeFaceNormals",
				"computeFlatVertexNormals": "Geometry.computeFlatVertexNormals",
				"computeLineDistances": "Geometry.computeLineDistances",
				"computeMorphNormals": "Geometry.computeMorphNormals",
				"computeVertexNormals": "Geometry.computeVertexNormals",
				"copy": "Geometry.copy",
				"dispose": "Geometry.dispose",
				"elementsNeedUpdate": "Geometry.elementsNeedUpdate",
				"faceVertexUvs": "Geometry.faceVertexUvs",
				"faces": "Geometry.faces",
				"fromBufferGeometry": "Geometry.fromBufferGeometry",
				"groupsNeedUpdate": "Geometry.groupsNeedUpdate",
				"id": "Geometry.id",
				"isGeometry": "Geometry.isGeometry",
				"lineDistances": "Geometry.lineDistances",
				"lineDistancesNeedUpdate": "Geometry.lineDistancesNeedUpdate",
				"lookAt": "Geometry.lookAt",
				"merge": "Geometry.merge",
				"mergeMesh": "Geometry.mergeMesh",
				"mergeVertices": "Geometry.mergeVertices",
				"morphNormals": "Geometry.morphNormals",
				"morphTargets": "Geometry.morphTargets",
				"name": "Geometry.name",
				"normalize": "Geometry.normalize",
				"normalsNeedUpdate": "Geometry.normalsNeedUpdate",
				"rotateX": "Geometry.rotateX",
				"rotateY": "Geometry.rotateY",
				"rotateZ": "Geometry.rotateZ",
				"scale": "Geometry.scale",
				"setFromPoints": "Geometry.setFromPoints",
				"skinIndices": "Geometry.skinIndices",
				"skinWeights": "Geometry.skinWeights",
				"sortFacesByMaterialIndex": "Geometry.sortFacesByMaterialIndex",
				"toJSON": "Geometry.toJSON",
				"translate": "Geometry.translate",
				"uuid": "Geometry.uuid",
				"uvsNeedUpdate": "Geometry.uvsNeedUpdate",
				"vertices": "Geometry.vertices",
				"verticesNeedUpdate": "Geometry.verticesNeedUpdate"

			},

			"InstancedBufferAttribute": {

				"#PARENT": "BufferAttribute",
				"#URL": "api/core/InstancedBufferAttribute",
				"isInstancedBufferAttribute": "InstancedBufferAttribute.isInstancedBufferAttribute",
				"meshPerAttribute": "InstancedBufferAttribute.meshPerAttribute"

			},

			"InstancedBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/core/InstancedBufferGeometry",
				"addGroup": "InstancedBufferGeometry.addGroup",
				"isInstancedBufferGeometry": "InstancedBufferGeometry.isInstancedBufferGeometry",
				"maxInstancedCount": "InstancedBufferGeometry.maxInstancedCount"

			},

			"InstancedInterleavedBuffer": {

				"#PARENT": "InterleavedBuffer",
				"#URL": "api/core/InstancedInterleavedBuffer",
				"isInstancedInterleavedBuffer": "InstancedInterleavedBuffer.isInstancedInterleavedBuffer",
				"meshPerAttribute": "InstancedInterleavedBuffer.meshPerAttribute"

			},

			"InterleavedBuffer": {

				"#URL": "api/core/InterleavedBuffer",
				"array": "InterleavedBuffer.array",
				"clone": "InterleavedBuffer.clone",
				"copy": "InterleavedBuffer.copy",
				"copyAt": "InterleavedBuffer.copyAt",
				"count": "InterleavedBuffer.count",
				"dynamic": "InterleavedBuffer.dynamic",
				"isInterleavedBuffer": "InterleavedBuffer.isInterleavedBuffer",
				"needsUpdate": "InterleavedBuffer.needsUpdate",
				"set": "InterleavedBuffer.set",
				"setArray": "InterleavedBuffer.setArray",
				"setDynamic": "InterleavedBuffer.setDynamic",
				"stride": "InterleavedBuffer.stride",
				"updateRange": "InterleavedBuffer.updateRange",
				"updateRange.count": "InterleavedBuffer.updateRange.count",
				"updateRange.offset": "InterleavedBuffer.updateRange.offset",
				"version": "InterleavedBuffer.version"

			},

			"InterleavedBufferAttribute": {

				"#URL": "api/core/InterleavedBufferAttribute",
				"array": "InterleavedBufferAttribute.array",
				"count": "InterleavedBufferAttribute.count",
				"data": "InterleavedBufferAttribute.data",
				"getW": "InterleavedBufferAttribute.getW",
				"getX": "InterleavedBufferAttribute.getX",
				"getY": "InterleavedBufferAttribute.getY",
				"getZ": "InterleavedBufferAttribute.getZ",
				"isInterleavedBufferAttribute": "InterleavedBufferAttribute.isInterleavedBufferAttribute",
				"itemSize": "InterleavedBufferAttribute.itemSize",
				"normalized": "InterleavedBufferAttribute.normalized",
				"offset": "InterleavedBufferAttribute.offset",
				"setW": "InterleavedBufferAttribute.setW",
				"setX": "InterleavedBufferAttribute.setX",
				"setXY": "InterleavedBufferAttribute.setXY",
				"setXYZ": "InterleavedBufferAttribute.setXYZ",
				"setXYZW": "InterleavedBufferAttribute.setXYZW",
				"setY": "InterleavedBufferAttribute.setY",
				"setZ": "InterleavedBufferAttribute.setZ"

			},

			"Layers": {

				"#URL": "api/core/Layers",
				"disable": "Layers.disable",
				"enable": "Layers.enable",
				"mask": "Layers.mask",
				"set": "Layers.set",
				"test": "Layers.test",
				"toggle": "Layers.toggle"

			},

			"Object3D": {

				"#URL": "api/core/Object3D",
				"DefaultMatrixAutoUpdate": "Object3D.DefaultMatrixAutoUpdate",
				"DefaultUp": "Object3D.DefaultUp",
				"add": "Object3D.add",
				"applyMatrix": "Object3D.applyMatrix",
				"applyQuaternion": "Object3D.applyQuaternion",
				"castShadow": "Object3D.castShadow",
				"children": "Object3D.children",
				"clone": "Object3D.clone",
				"copy": "Object3D.copy",
				"frustumCulled": "Object3D.frustumCulled",
				"getObjectById": "Object3D.getObjectById",
				"getObjectByName": "Object3D.getObjectByName",
				"getObjectByProperty": "Object3D.getObjectByProperty",
				"getWorldDirection": "Object3D.getWorldDirection",
				"getWorldPosition": "Object3D.getWorldPosition",
				"getWorldQuaternion": "Object3D.getWorldQuaternion",
				"getWorldRotation": "Object3D.getWorldRotation",
				"getWorldScale": "Object3D.getWorldScale",
				"id": "Object3D.id",
				"isObject": "Object3D.isObject",
				"layers": "Object3D.layers",
				"localToWorld": "Object3D.localToWorld",
				"lookAt": "Object3D.lookAt",
				"matrix": "Object3D.matrix",
				"matrixAutoUpdate": "Object3D.matrixAutoUpdate",
				"matrixWorld": "Object3D.matrixWorld",
				"matrixWorldNeedsUpdate": "Object3D.matrixWorldNeedsUpdate",
				"modelViewMatrix": "Object3D.modelViewMatrix",
				"name": "Object3D.name",
				"normalMatrix": "Object3D.normalMatrix",
				"onAfterRender": "Object3D.onAfterRender",
				"onBeforeRender": "Object3D.onBeforeRender",
				"parent": "Object3D.parent",
				"position": "Object3D.position",
				"quaternion": "Object3D.quaternion",
				"raycast": "Object3D.raycast",
				"receiveShadow": "Object3D.receiveShadow",
				"remove": "Object3D.remove",
				"renderOrder": "Object3D.renderOrder",
				"rotateOnAxis": "Object3D.rotateOnAxis",
				"rotateOnWorldAxis": "Object3D.rotateOnWorldAxis",
				"rotateX": "Object3D.rotateX",
				"rotateY": "Object3D.rotateY",
				"rotateZ": "Object3D.rotateZ",
				"rotation": "Object3D.rotation",
				"scale": "Object3D.scale",
				"setRotationFromAxisAngle": "Object3D.setRotationFromAxisAngle",
				"setRotationFromEuler": "Object3D.setRotationFromEuler",
				"setRotationFromMatrix": "Object3D.setRotationFromMatrix",
				"setRotationFromQuaternion": "Object3D.setRotationFromQuaternion",
				"toJSON": "Object3D.toJSON",
				"translateOnAxis": "Object3D.translateOnAxis",
				"translateX": "Object3D.translateX",
				"translateY": "Object3D.translateY",
				"translateZ": "Object3D.translateZ",
				"traverse": "Object3D.traverse",
				"traverseAncestors": "Object3D.traverseAncestors",
				"traverseVisible": "Object3D.traverseVisible",
				"up": "Object3D.up",
				"updateMatrix": "Object3D.updateMatrix",
				"updateMatrixWorld": "Object3D.updateMatrixWorld",
				"userData": "Object3D.userData",
				"uuid": "Object3D.uuid",
				"visible": "Object3D.visible",
				"worldToLocal": "Object3D.worldToLocal"

			},

			"Raycaster": {

				"#URL": "api/core/Raycaster",
				"far": "Raycaster.far",
				"intersectObject": "Raycaster.intersectObject",
				"intersectObjects": "Raycaster.intersectObjects",
				"linePrecision": "Raycaster.linePrecision",
				"near": "Raycaster.near",
				"params": "Raycaster.params",
				"ray": "Raycaster.ray",
				"set": "Raycaster.set",
				"setFromCamera": "Raycaster.setFromCamera"

			},

			"Uniform": {

				"#URL": "api/core/Uniform",
				"clone": "Uniform.clone",
				"value": "Uniform.value"

			}


		},

		"Core / BufferAttributes": {

			"BufferAttribute Types": {

				"#PARENT": "BufferAttribute",
				"#URL": "api/core/bufferAttributeTypes/BufferAttributeTypes"

			}


		},

		"Deprecated": {

			"DeprecatedList": {

				"#URL": "api/deprecated/DeprecatedList"

			}


		},

		"Extras": {

			"Earcut": {

				"#URL": "api/extras/Earcut",
				"triangulate": "Earcut.triangulate"

			},

			"ShapeUtils": {

				"#URL": "api/extras/ShapeUtils",
				"area": "ShapeUtils.area",
				"isClockwise": "ShapeUtils.isClockwise",
				"triangulateShape": "ShapeUtils.triangulateShape"

			}


		},

		"Extras / Core": {

			"Curve": {

				"#URL": "api/extras/core/Curve",
				"arcLengthDivisions": "Curve.arcLengthDivisions",
				"clone": "Curve.clone",
				"computeFrenetFrames": "Curve.computeFrenetFrames",
				"copy": "Curve.copy",
				"fromJSON": "Curve.fromJSON",
				"getLength": "Curve.getLength",
				"getLengths": "Curve.getLengths",
				"getPoint": "Curve.getPoint",
				"getPointAt": "Curve.getPointAt",
				"getPoints": "Curve.getPoints",
				"getSpacedPoints": "Curve.getSpacedPoints",
				"getTangent": "Curve.getTangent",
				"getTangentAt": "Curve.getTangentAt",
				"getUtoTmapping": "Curve.getUtoTmapping",
				"toJSON": "Curve.toJSON",
				"updateArcLengths": "Curve.updateArcLengths"

			},

			"CurvePath": {

				"#PARENT": "Curve",
				"#URL": "api/extras/core/CurvePath",
				"add": "CurvePath.add",
				"autoClose": "CurvePath.autoClose",
				"closePath": "CurvePath.closePath",
				"curves": "CurvePath.curves",
				"getCurveLengths": "CurvePath.getCurveLengths"

			},

			"Font": {

				"#URL": "api/extras/core/Font",
				"data": "Font.data",
				"generateShapes": "Font.generateShapes",
				"isFont": "Font.isFont"

			},

			"Interpolations": {

				"#URL": "api/extras/core/Interpolations",
				"CatmullRom": "Interpolations.CatmullRom",
				"CubicBezier": "Interpolations.CubicBezier",
				"QuadraticBezier": "Interpolations.QuadraticBezier"

			},

			"Path": {

				"#PARENT": "CurvePath",
				"#URL": "api/extras/core/Path",
				"absarc": "Path.absarc",
				"absellipse": "Path.absellipse",
				"arc": "Path.arc",
				"bezierCurveTo": "Path.bezierCurveTo",
				"currentPoint": "Path.currentPoint",
				"ellipse": "Path.ellipse",
				"lineTo": "Path.lineTo",
				"moveTo": "Path.moveTo",
				"quadraticCurveTo": "Path.quadraticCurveTo",
				"setFromPoints": "Path.setFromPoints",
				"splineThru": "Path.splineThru"

			},

			"Shape": {

				"#PARENT": "Path",
				"#URL": "api/extras/core/Shape",
				"extractPoints": "Shape.extractPoints",
				"getPointsHoles": "Shape.getPointsHoles",
				"holes": "Shape.holes",
				"uuid": "Shape.uuid"

			},

			"ShapePath": {

				"#PARENT": "CurvePath",
				"#URL": "api/extras/core/ShapePath",
				"bezierCurveTo": "ShapePath.bezierCurveTo",
				"currentPath": "ShapePath.currentPath",
				"lineTo": "ShapePath.lineTo",
				"moveTo": "ShapePath.moveTo",
				"quadraticCurveTo": "ShapePath.quadraticCurveTo",
				"splineThru": "ShapePath.splineThru",
				"subPaths": "ShapePath.subPaths",
				"toShapes": "ShapePath.toShapes"

			}


		},

		"Extras / Curves": {

			"ArcCurve": {

				"#PARENT": "EllipseCurve",
				"#URL": "api/extras/curves/ArcCurve",
				"isArcCurve": "ArcCurve.isArcCurve"

			},

			"CatmullRomCurve3": {

				"#PARENT": "Curve",
				"#URL": "api/extras/curves/CatmullRomCurve3",
				"closed": "CatmullRomCurve3.closed",
				"curveType": "CatmullRomCurve3.curveType",
				"isCatmullRomCurve3": "CatmullRomCurve3.isCatmullRomCurve3",
				"points": "CatmullRomCurve3.points",
				"tension": "CatmullRomCurve3.tension"

			},

			"CubicBezierCurve": {

				"#PARENT": "Curve",
				"#URL": "api/extras/curves/CubicBezierCurve",
				"isCubicBezierCurve": "CubicBezierCurve.isCubicBezierCurve",
				"v0": "CubicBezierCurve.v0",
				"v1": "CubicBezierCurve.v1",
				"v2": "CubicBezierCurve.v2",
				"v3": "CubicBezierCurve.v3"

			},

			"CubicBezierCurve3": {

				"#PARENT": "Curve",
				"#URL": "api/extras/curves/CubicBezierCurve3",
				"isCubicBezierCurve3": "CubicBezierCurve3.isCubicBezierCurve3",
				"v0": "CubicBezierCurve3.v0",
				"v1": "CubicBezierCurve3.v1",
				"v2": "CubicBezierCurve3.v2",
				"v3": "CubicBezierCurve3.v3"

			},

			"EllipseCurve": {

				"#PARENT": "Curve",
				"#URL": "api/extras/curves/EllipseCurve",
				"aClockwise": "EllipseCurve.aClockwise",
				"aEndAngle": "EllipseCurve.aEndAngle",
				"aRotation": "EllipseCurve.aRotation",
				"aStartAngle": "EllipseCurve.aStartAngle",
				"aX": "EllipseCurve.aX",
				"aY": "EllipseCurve.aY",
				"isEllipseCurve": "EllipseCurve.isEllipseCurve",
				"xRadius": "EllipseCurve.xRadius",
				"yRadius": "EllipseCurve.yRadius"

			},

			"LineCurve": {

				"#PARENT": "Curve",
				"#URL": "api/extras/curves/LineCurve",
				"isLineCurve": "LineCurve.isLineCurve",
				"v1": "LineCurve.v1",
				"v2": "LineCurve.v2"

			},

			"LineCurve3": {

				"#PARENT": "Curve",
				"#URL": "api/extras/curves/LineCurve3",
				"isLineCurve3": "LineCurve3.isLineCurve3",
				"v1": "LineCurve3.v1",
				"v2": "LineCurve3.v2"

			},

			"QuadraticBezierCurve": {

				"#PARENT": "Curve",
				"#URL": "api/extras/curves/QuadraticBezierCurve",
				"isQuadraticBezierCurve": "QuadraticBezierCurve.isQuadraticBezierCurve",
				"v0": "QuadraticBezierCurve.v0",
				"v1": "QuadraticBezierCurve.v1",
				"v2": "QuadraticBezierCurve.v2"

			},

			"QuadraticBezierCurve3": {

				"#PARENT": "Curve",
				"#URL": "api/extras/curves/QuadraticBezierCurve3",
				"isQuadraticBezierCurve3": "QuadraticBezierCurve3.isQuadraticBezierCurve3",
				"v0": "QuadraticBezierCurve3.v0",
				"v1": "QuadraticBezierCurve3.v1",
				"v2": "QuadraticBezierCurve3.v2"

			},

			"SplineCurve": {

				"#PARENT": "Curve",
				"#URL": "api/extras/curves/SplineCurve",
				"isSplineCurve": "SplineCurve.isSplineCurve",
				"points": "SplineCurve.points"

			}


		},

		"Extras / Objects": {

			"ImmediateRenderObject": {

				"#PARENT": "Object3D",
				"#URL": "api/extras/objects/ImmediateRenderObject",
				"render": "ImmediateRenderObject.render"

			}


		},

		"Geometries": {

			"BoxBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/BoxBufferGeometry"

			},

			"BoxGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/BoxGeometry"

			},

			"CircleBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/CircleBufferGeometry"

			},

			"CircleGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/CircleGeometry"

			},

			"ConeBufferGeometry": {

				"#PARENT": "CylinderBufferGeometry",
				"#URL": "api/geometries/ConeBufferGeometry"

			},

			"ConeGeometry": {

				"#PARENT": "CylinderGeometry",
				"#URL": "api/geometries/ConeGeometry"

			},

			"CylinderBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/CylinderBufferGeometry"

			},

			"CylinderGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/CylinderGeometry"

			},

			"DodecahedronBufferGeometry": {

				"#PARENT": "PolyhedronBufferGeometry",
				"#URL": "api/geometries/DodecahedronBufferGeometry",
				"parameters": "DodecahedronBufferGeometry.parameters"

			},

			"DodecahedronGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/DodecahedronGeometry",
				"parameters": "DodecahedronGeometry.parameters"

			},

			"EdgesGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/EdgesGeometry"

			},

			"ExtrudeGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/ExtrudeGeometry",
				"addShape": "ExtrudeGeometry.addShape",
				"addShapeList": "ExtrudeGeometry.addShapeList"

			},

			"ExtrudeBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/ExtrudeBufferGeometry",
				"addShape": "ExtrudeBufferGeometry.addShape",
				"addShapeList": "ExtrudeBufferGeometry.addShapeList"

			},

			"IcosahedronBufferGeometry": {

				"#PARENT": "PolyhedronBufferGeometry",
				"#URL": "api/geometries/IcosahedronBufferGeometry",
				"parameters": "IcosahedronBufferGeometry.parameters"

			},

			"IcosahedronGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/IcosahedronGeometry",
				"parameters": "IcosahedronGeometry.parameters"

			},

			"LatheBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/LatheBufferGeometry"

			},

			"LatheGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/LatheGeometry"

			},

			"OctahedronBufferGeometry": {

				"#PARENT": "PolyhedronBufferGeometry",
				"#URL": "api/geometries/OctahedronBufferGeometry",
				"parameters": "OctahedronBufferGeometry.parameters"

			},

			"OctahedronGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/OctahedronGeometry",
				"parameters": "OctahedronGeometry.parameters"

			},

			"ParametricBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/ParametricBufferGeometry"

			},

			"ParametricGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/ParametricGeometry"

			},

			"PlaneBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/PlaneBufferGeometry"

			},

			"PlaneGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/PlaneGeometry"

			},

			"PolyhedronBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/PolyhedronBufferGeometry",
				"parameters": "PolyhedronBufferGeometry.parameters"

			},

			"PolyhedronGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/PolyhedronGeometry",
				"parameters": "PolyhedronGeometry.parameters"

			},

			"RingBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/RingBufferGeometry"

			},

			"RingGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/RingGeometry"

			},

			"ShapeBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/ShapeBufferGeometry"

			},

			"ShapeGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/ShapeGeometry"

			},

			"SphereBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/SphereBufferGeometry"

			},

			"SphereGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/SphereGeometry"

			},

			"TetrahedronBufferGeometry": {

				"#PARENT": "PolyhedronBufferGeometry",
				"#URL": "api/geometries/TetrahedronBufferGeometry",
				"parameters": "TetrahedronBufferGeometry.parameters"

			},

			"TetrahedronGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/TetrahedronGeometry",
				"parameters": "TetrahedronGeometry.parameters"

			},

			"TextBufferGeometry": {

				"#PARENT": "ExtrudeBufferGeometry",
				"#URL": "api/geometries/TextBufferGeometry"

			},

			"TextGeometry": {

				"#PARENT": "ExtrudeGeometry",
				"#URL": "api/geometries/TextGeometry"

			},

			"TorusBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/TorusBufferGeometry"

			},

			"TorusGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/TorusGeometry"

			},

			"TorusKnotBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/TorusKnotBufferGeometry"

			},

			"TorusKnotGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/TorusKnotGeometry"

			},

			"TubeBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/TubeBufferGeometry",
				"binormals": "TubeBufferGeometry.binormals",
				"normals": "TubeBufferGeometry.normals",
				"parameters": "TubeBufferGeometry.parameters",
				"tangents": "TubeBufferGeometry.tangents"

			},

			"TubeGeometry": {

				"#PARENT": "Geometry",
				"#URL": "api/geometries/TubeGeometry",
				"binormals": "TubeGeometry.binormals",
				"normals": "TubeGeometry.normals",
				"parameters": "TubeGeometry.parameters",
				"tangents": "TubeGeometry.tangents"

			},

			"WireframeGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "api/geometries/WireframeGeometry"

			}


		},

		"Helpers": {

			"ArrowHelper": {

				"#PARENT": "Object3D",
				"#URL": "api/helpers/ArrowHelper",
				"cone": "ArrowHelper.cone",
				"line": "ArrowHelper.line",
				"setColor": "ArrowHelper.setColor",
				"setDirection": "ArrowHelper.setDirection",
				"setLength": "ArrowHelper.setLength"

			},

			"AxesHelper": {

				"#PARENT": "LineSegments",
				"#URL": "api/helpers/AxesHelper"

			},

			"BoxHelper": {

				"#PARENT": "LineSegments",
				"#URL": "api/helpers/BoxHelper",
				"setFromObject": "BoxHelper.setFromObject",
				"update": "BoxHelper.update"

			},

			"Box3Helper": {

				"#PARENT": "LineSegments",
				"#URL": "api/helpers/Box3Helper",
				"box": "Box3Helper.box",
				"updateMatrixWorld": "Box3Helper.updateMatrixWorld"

			},

			"CameraHelper": {

				"#PARENT": "LineSegments",
				"#URL": "api/helpers/CameraHelper",
				"camera": "CameraHelper.camera",
				"matrix": "CameraHelper.matrix",
				"matrixAutoUpdate": "CameraHelper.matrixAutoUpdate",
				"pointMap": "CameraHelper.pointMap",
				"update": "CameraHelper.update"

			},

			"DirectionalLightHelper": {

				"#PARENT": "Object3D",
				"#URL": "api/helpers/DirectionalLightHelper",
				"color": "DirectionalLightHelper.color",
				"dispose": "DirectionalLightHelper.dispose",
				"light": "DirectionalLightHelper.light",
				"lightPlane": "DirectionalLightHelper.lightPlane",
				"matrix": "DirectionalLightHelper.matrix",
				"matrixAutoUpdate": "DirectionalLightHelper.matrixAutoUpdate",
				"update": "DirectionalLightHelper.update"

			},

			"FaceNormalsHelper": {

				"#PARENT": "LineSegments",
				"#URL": "api/helpers/FaceNormalsHelper",
				"matrixAutoUpdate": "FaceNormalsHelper.matrixAutoUpdate",
				"object": "FaceNormalsHelper.object",
				"size": "FaceNormalsHelper.size",
				"update": "FaceNormalsHelper.update"

			},

			"GridHelper": {

				"#PARENT": "Line",
				"#URL": "api/helpers/GridHelper"

			},

			"PolarGridHelper": {

				"#PARENT": "Line",
				"#URL": "api/helpers/PolarGridHelper"

			},

			"HemisphereLightHelper": {

				"#PARENT": "Object3D",
				"#URL": "api/helpers/HemisphereLightHelper",
				"color": "HemisphereLightHelper.color",
				"dispose": "HemisphereLightHelper.dispose",
				"light": "HemisphereLightHelper.light",
				"matrix": "HemisphereLightHelper.matrix",
				"matrixAutoUpdate": "HemisphereLightHelper.matrixAutoUpdate",
				"update": "HemisphereLightHelper.update"

			},

			"PlaneHelper": {

				"#PARENT": "LineSegments",
				"#URL": "api/helpers/PlaneHelper",
				"plane": "PlaneHelper.plane",
				"size": "PlaneHelper.size",
				"updateMatrixWorld": "PlaneHelper.updateMatrixWorld"

			},

			"PointLightHelper": {

				"#PARENT": "Mesh",
				"#URL": "api/helpers/PointLightHelper",
				"color": "PointLightHelper.color",
				"dispose": "PointLightHelper.dispose",
				"light": "PointLightHelper.light",
				"matrix": "PointLightHelper.matrix",
				"matrixAutoUpdate": "PointLightHelper.matrixAutoUpdate",
				"update": "PointLightHelper.update"

			},

			"RectAreaLightHelper": {

				"#PARENT": "Object3D",
				"#URL": "api/helpers/RectAreaLightHelper",
				"color": "RectAreaLightHelper.color",
				"dispose": "RectAreaLightHelper.dispose",
				"light": "RectAreaLightHelper.light",
				"update": "RectAreaLightHelper.update"

			},

			"SkeletonHelper": {

				"#PARENT": "LineSegments",
				"#URL": "api/helpers/SkeletonHelper",
				"bones": "SkeletonHelper.bones",
				"root": "SkeletonHelper.root"

			},

			"SpotLightHelper": {

				"#PARENT": "Object3D",
				"#URL": "api/helpers/SpotLightHelper",
				"color": "SpotLightHelper.color",
				"cone": "SpotLightHelper.cone",
				"dispose": "SpotLightHelper.dispose",
				"light": "SpotLightHelper.light",
				"matrix": "SpotLightHelper.matrix",
				"matrixAutoUpdate": "SpotLightHelper.matrixAutoUpdate",
				"update": "SpotLightHelper.update"

			},

			"VertexNormalsHelper": {

				"#PARENT": "Line",
				"#URL": "api/helpers/VertexNormalsHelper",
				"matrixAutoUpdate": "VertexNormalsHelper.matrixAutoUpdate",
				"object": "VertexNormalsHelper.object",
				"size": "VertexNormalsHelper.size",
				"update": "VertexNormalsHelper.update"

			}


		},

		"Lights": {

			"AmbientLight": {

				"#PARENT": "Light",
				"#URL": "api/lights/AmbientLight",
				"castShadow": "AmbientLight.castShadow",
				"isAmbientLight": "AmbientLight.isAmbientLight"

			},

			"DirectionalLight": {

				"#PARENT": "Light",
				"#URL": "api/lights/DirectionalLight",
				"castShadow": "DirectionalLight.castShadow",
				"copy": "DirectionalLight.copy",
				"isDirectionalLight": "DirectionalLight.isDirectionalLight",
				"position": "DirectionalLight.position",
				"shadow": "DirectionalLight.shadow",
				"target": "DirectionalLight.target"

			},

			"HemisphereLight": {

				"#PARENT": "Light",
				"#URL": "api/lights/HemisphereLight",
				"castShadow": "HemisphereLight.castShadow",
				"color": "HemisphereLight.color",
				"copy": "HemisphereLight.copy",
				"groundColor": "HemisphereLight.groundColor",
				"isHemisphereLight": "HemisphereLight.isHemisphereLight",
				"position": "HemisphereLight.position"

			},

			"Light": {

				"#PARENT": "Object3D",
				"#URL": "api/lights/Light",
				"color": "Light.color",
				"copy": "Light.copy",
				"intensity": "Light.intensity",
				"isLight": "Light.isLight",
				"toJSON": "Light.toJSON"

			},

			"PointLight": {

				"#PARENT": "Light",
				"#URL": "api/lights/PointLight",
				"copy": "PointLight.copy",
				"decay": "PointLight.decay",
				"distance": "PointLight.distance",
				"isPointLight": "PointLight.isPointLight",
				"power": "PointLight.power",
				"shadow": "PointLight.shadow"

			},

			"RectAreaLight": {

				"#PARENT": "Light",
				"#URL": "api/lights/RectAreaLight",
				"copy": "RectAreaLight.copy",
				"isRectAreaLight": "RectAreaLight.isRectAreaLight"

			},

			"SpotLight": {

				"#PARENT": "Light",
				"#URL": "api/lights/SpotLight",
				"angle": "SpotLight.angle",
				"castShadow": "SpotLight.castShadow",
				"copy": "SpotLight.copy",
				"decay": "SpotLight.decay",
				"distance": "SpotLight.distance",
				"isSpotLight": "SpotLight.isSpotLight",
				"penumbra": "SpotLight.penumbra",
				"position": "SpotLight.position",
				"power": "SpotLight.power",
				"shadow": "SpotLight.shadow",
				"target": "SpotLight.target"

			}


		},

		"Lights / Shadows": {

			"DirectionalLightShadow": {

				"#PARENT": "LightShadow",
				"#URL": "api/lights/shadows/DirectionalLightShadow",
				"camera": "DirectionalLightShadow.camera"

			},

			"LightShadow": {

				"#URL": "api/lights/shadows/LightShadow",
				"bias": "LightShadow.bias",
				"camera": "LightShadow.camera",
				"clone": "LightShadow.clone",
				"copy": "LightShadow.copy",
				"map": "LightShadow.map",
				"mapSize": "LightShadow.mapSize",
				"matrix": "LightShadow.matrix",
				"radius": "LightShadow.radius",
				"toJSON": "LightShadow.toJSON"

			},

			"SpotLightShadow": {

				"#PARENT": "LightShadow",
				"#URL": "api/lights/shadows/SpotLightShadow",
				"camera": "SpotLightShadow.camera",
				"isSpotLightShadow": "SpotLightShadow.isSpotLightShadow",
				"update": "SpotLightShadow.update"

			}


		},

		"Loaders": {

			"AnimationLoader": {

				"#URL": "api/loaders/AnimationLoader",
				"load": "AnimationLoader.load",
				"manager": "AnimationLoader.manager",
				"parse": "AnimationLoader.parse"

			},

			"AudioLoader": {

				"#URL": "api/loaders/AudioLoader",
				"load": "AudioLoader.load",
				"manager": "AudioLoader.manager"

			},

			"BufferGeometryLoader": {

				"#URL": "api/loaders/BufferGeometryLoader",
				"load": "BufferGeometryLoader.load",
				"manager": "BufferGeometryLoader.manager",
				"parse": "BufferGeometryLoader.parse"

			},

			"Cache": {

				"#URL": "api/loaders/Cache",
				"add": "Cache.add",
				"clear": "Cache.clear",
				"enabled": "Cache.enabled",
				"files": "Cache.files",
				"get": "Cache.get",
				"remove": "Cache.remove"

			},

			"CompressedTextureLoader": {

				"#URL": "api/loaders/CompressedTextureLoader",
				"load": "CompressedTextureLoader.load",
				"manager": "CompressedTextureLoader.manager",
				"path": "CompressedTextureLoader.path",
				"setPath": "CompressedTextureLoader.setPath"

			},

			"CubeTextureLoader": {

				"#URL": "api/loaders/CubeTextureLoader",
				"crossOrigin": "CubeTextureLoader.crossOrigin",
				"load": "CubeTextureLoader.load",
				"manager": "CubeTextureLoader.manager",
				"path": "CubeTextureLoader.path",
				"setCrossOrigin": "CubeTextureLoader.setCrossOrigin",
				"setPath": "CubeTextureLoader.setPath"

			},

			"DataTextureLoader": {

				"#URL": "api/loaders/DataTextureLoader",
				"load": "DataTextureLoader.load",
				"manager": "DataTextureLoader.manager"

			},

			"FileLoader": {

				"#URL": "api/loaders/FileLoader",
				"cache": "FileLoader.cache",
				"load": "FileLoader.load",
				"manager": "FileLoader.manager",
				"mimeType": "FileLoader.mimeType",
				"path": "FileLoader.path",
				"responseType": "FileLoader.responseType",
				"setMimeType": "FileLoader.setMimeType",
				"setPath": "FileLoader.setPath",
				"setResponseType": "FileLoader.setResponseType",
				"setWithCredentials": "FileLoader.setWithCredentials",
				"withCredentials": "FileLoader.withCredentials"

			},

			"FontLoader": {

				"#URL": "api/loaders/FontLoader",
				"load": "FontLoader.load",
				"manager": "FontLoader.manager",
				"parse": "FontLoader.parse",
				"path": "FontLoader.path",
				"setPath": "FontLoader.setPath"

			},

			"ImageBitmapLoader": {

				"#URL": "api/loaders/ImageBitmapLoader",
				"load": "ImageBitmapLoader.load",
				"manager": "ImageBitmapLoader.manager",
				"options": "ImageBitmapLoader.options",
				"path": "ImageBitmapLoader.path",
				"setCrossOrigin": "ImageBitmapLoader.setCrossOrigin",
				"setOptions": "ImageBitmapLoader.setOptions",
				"setPath": "ImageBitmapLoader.setPath"

			},

			"ImageLoader": {

				"#URL": "api/loaders/ImageLoader",
				"crossOrigin": "ImageLoader.crossOrigin",
				"load": "ImageLoader.load",
				"manager": "ImageLoader.manager",
				"path": "ImageLoader.path",
				"setCrossOrigin": "ImageLoader.setCrossOrigin",
				"setPath": "ImageLoader.setPath"

			},

			"JSONLoader": {

				"#URL": "api/loaders/JSONLoader",
				"load": "JSONLoader.load",
				"manager": "JSONLoader.manager",
				"parse": "JSONLoader.parse",
				"setTexturePath": "JSONLoader.setTexturePath",
				"withCredentials": "JSONLoader.withCredentials"

			},

			"Loader": {

				"#URL": "api/loaders/Loader",
				"createMaterial": "Loader.createMaterial",
				"crossOrigin": "Loader.crossOrigin",
				"initMaterials": "Loader.initMaterials",
				"onLoadComplete": "Loader.onLoadComplete",
				"onLoadProgress": "Loader.onLoadProgress",
				"onLoadStart": "Loader.onLoadStart"

			},

			"LoaderUtils": {

				"#URL": "api/loaders/LoaderUtils",
				"decodeText": "LoaderUtils.decodeText",
				"extractUrlBase": "LoaderUtils.extractUrlBase"

			},

			"MaterialLoader": {

				"#URL": "api/loaders/MaterialLoader",
				"load": "MaterialLoader.load",
				"manager": "MaterialLoader.manager",
				"parse": "MaterialLoader.parse",
				"setTextures": "MaterialLoader.setTextures",
				"textures": "MaterialLoader.textures"

			},

			"ObjectLoader": {

				"#URL": "api/loaders/ObjectLoader",
				"crossOrigin": "ObjectLoader.crossOrigin",
				"load": "ObjectLoader.load",
				"manager": "ObjectLoader.manager",
				"parse": "ObjectLoader.parse",
				"parseAnimations": "ObjectLoader.parseAnimations",
				"parseGeometries": "ObjectLoader.parseGeometries",
				"parseImages": "ObjectLoader.parseImages",
				"parseMaterials": "ObjectLoader.parseMaterials",
				"parseObject": "ObjectLoader.parseObject",
				"parseTextures": "ObjectLoader.parseTextures",
				"setCrossOrigin": "ObjectLoader.setCrossOrigin",
				"setTexturePath": "ObjectLoader.setTexturePath",
				"texturePath": "ObjectLoader.texturePath"

			},

			"TextureLoader": {

				"#URL": "api/loaders/TextureLoader",
				"crossOrigin": "TextureLoader.crossOrigin",
				"load": "TextureLoader.load",
				"manager": "TextureLoader.manager",
				"path": "TextureLoader.path",
				"setCrossOrigin": "TextureLoader.setCrossOrigin",
				"setPath": "TextureLoader.setPath",
				"setWithCredentials": "TextureLoader.setWithCredentials",
				"withCredentials": "TextureLoader.withCredentials"

			}


		},

		"Loaders / Managers": {

			"DefaultLoadingManager": {

				"#URL": "api/loaders/managers/DefaultLoadingManager"

			},

			"LoadingManager": {

				"#URL": "api/loaders/managers/LoadingManager",
				"itemEnd": "LoadingManager.itemEnd",
				"itemError": "LoadingManager.itemError",
				"itemStart": "LoadingManager.itemStart",
				"onError": "LoadingManager.onError",
				"onLoad": "LoadingManager.onLoad",
				"onProgress": "LoadingManager.onProgress",
				"onStart": "LoadingManager.onStart",
				"resolveURL": "LoadingManager.resolveURL",
				"setURLModifier": "LoadingManager.setURLModifier"

			}


		},

		"Materials": {

			"LineBasicMaterial": {

				"#PARENT": "Material",
				"#URL": "api/materials/LineBasicMaterial",
				"color": "LineBasicMaterial.color",
				"isLineBasicMaterial": "LineBasicMaterial.isLineBasicMaterial",
				"lights": "LineBasicMaterial.lights",
				"linecap": "LineBasicMaterial.linecap",
				"linejoin": "LineBasicMaterial.linejoin",
				"linewidth": "LineBasicMaterial.linewidth"

			},

			"LineDashedMaterial": {

				"#PARENT": "Material",
				"#URL": "api/materials/LineDashedMaterial",
				"color": "LineDashedMaterial.color",
				"dashSize": "LineDashedMaterial.dashSize",
				"gapSize": "LineDashedMaterial.gapSize",
				"isLineDashedMaterial": "LineDashedMaterial.isLineDashedMaterial",
				"lights": "LineDashedMaterial.lights",
				"linewidth": "LineDashedMaterial.linewidth",
				"scale": "LineDashedMaterial.scale"

			},

			"Material": {

				"#URL": "api/materials/Material",
				"alphaTest": "Material.alphaTest",
				"blendDst": "Material.blendDst",
				"blendDstAlpha": "Material.blendDstAlpha",
				"blendEquation": "Material.blendEquation",
				"blendEquationAlpha": "Material.blendEquationAlpha",
				"blendSrc": "Material.blendSrc",
				"blendSrcAlpha": "Material.blendSrcAlpha",
				"blending": "Material.blending",
				"clipIntersection": "Material.clipIntersection",
				"clipShadows": "Material.clipShadows",
				"clippingPlanes": "Material.clippingPlanes",
				"clone": "Material.clone",
				"colorWrite": "Material.colorWrite",
				"copy": "Material.copy",
				"customDepthMaterial": "Material.customDepthMaterial",
				"customDistanceMaterial": "Material.customDistanceMaterial",
				"defines": "Material.defines",
				"depthFunc": "Material.depthFunc",
				"depthTest": "Material.depthTest",
				"depthWrite": "Material.depthWrite",
				"dispatchEvent": "Material.dispatchEvent",
				"dispose": "Material.dispose",
				"dithering": "Material.dithering",
				"flatShading": "Material.flatShading",
				"fog": "Material.fog",
				"id": "Material.id",
				"isMaterial": "Material.isMaterial",
				"lights": "Material.lights",
				"name": "Material.name",
				"needsUpdate": "Material.needsUpdate",
				"opacity": "Material.opacity",
				"overdraw": "Material.overdraw",
				"polygonOffset": "Material.polygonOffset",
				"polygonOffsetFactor": "Material.polygonOffsetFactor",
				"polygonOffsetUnits": "Material.polygonOffsetUnits",
				"precision": "Material.precision",
				"premultipliedAlpha": "Material.premultipliedAlpha",
				"renderOrder": "Material.renderOrder",
				"setValues": "Material.setValues",
				"side": "Material.side",
				"toJSON": "Material.toJSON",
				"transparent": "Material.transparent",
				"type": "Material.type",
				"update": "Material.update",
				"userData": "Material.userData",
				"uuid": "Material.uuid",
				"vertexColors": "Material.vertexColors",
				"visible": "Material.visible"

			},

			"MeshBasicMaterial": {

				"#PARENT": "Material",
				"#URL": "api/materials/MeshBasicMaterial",
				"alphaMap": "MeshBasicMaterial.alphaMap",
				"aoMap": "MeshBasicMaterial.aoMap",
				"aoMapIntensity": "MeshBasicMaterial.aoMapIntensity",
				"color": "MeshBasicMaterial.color",
				"combine": "MeshBasicMaterial.combine",
				"envMap": "MeshBasicMaterial.envMap",
				"isMeshBasicMaterial": "MeshBasicMaterial.isMeshBasicMaterial",
				"lightMap": "MeshBasicMaterial.lightMap",
				"lightMapIntensity": "MeshBasicMaterial.lightMapIntensity",
				"lights": "MeshBasicMaterial.lights",
				"map": "MeshBasicMaterial.map",
				"morphTargets": "MeshBasicMaterial.morphTargets",
				"reflectivity": "MeshBasicMaterial.reflectivity",
				"refractionRatio": "MeshBasicMaterial.refractionRatio",
				"skinning": "MeshBasicMaterial.skinning",
				"specularMap": "MeshBasicMaterial.specularMap",
				"wireframe": "MeshBasicMaterial.wireframe",
				"wireframeLinecap": "MeshBasicMaterial.wireframeLinecap",
				"wireframeLinejoin": "MeshBasicMaterial.wireframeLinejoin",
				"wireframeLinewidth": "MeshBasicMaterial.wireframeLinewidth"

			},

			"MeshDepthMaterial": {

				"#PARENT": "Material",
				"#URL": "api/materials/MeshDepthMaterial",
				"alphaMap": "MeshDepthMaterial.alphaMap",
				"depthPacking": "MeshDepthMaterial.depthPacking",
				"displacementBias": "MeshDepthMaterial.displacementBias",
				"displacementMap": "MeshDepthMaterial.displacementMap",
				"displacementScale": "MeshDepthMaterial.displacementScale",
				"fog": "MeshDepthMaterial.fog",
				"isMeshDepthMaterial": "MeshDepthMaterial.isMeshDepthMaterial",
				"lights": "MeshDepthMaterial.lights",
				"map": "MeshDepthMaterial.map",
				"morphTargets": "MeshDepthMaterial.morphTargets",
				"skinning": "MeshDepthMaterial.skinning",
				"wireframe": "MeshDepthMaterial.wireframe",
				"wireframeLinewidth": "MeshDepthMaterial.wireframeLinewidth"

			},

			"MeshLambertMaterial": {

				"#PARENT": "Material",
				"#URL": "api/materials/MeshLambertMaterial",
				"alphaMap": "MeshLambertMaterial.alphaMap",
				"aoMap": "MeshLambertMaterial.aoMap",
				"aoMapIntensity": "MeshLambertMaterial.aoMapIntensity",
				"color": "MeshLambertMaterial.color",
				"combine": "MeshLambertMaterial.combine",
				"emissive": "MeshLambertMaterial.emissive",
				"emissiveIntensity": "MeshLambertMaterial.emissiveIntensity",
				"emissiveMap": "MeshLambertMaterial.emissiveMap",
				"envMap": "MeshLambertMaterial.envMap",
				"isMeshLambertMaterial": "MeshLambertMaterial.isMeshLambertMaterial",
				"lightMap": "MeshLambertMaterial.lightMap",
				"lightMapIntensity": "MeshLambertMaterial.lightMapIntensity",
				"map": "MeshLambertMaterial.map",
				"morphNormals": "MeshLambertMaterial.morphNormals",
				"morphTargets": "MeshLambertMaterial.morphTargets",
				"reflectivity": "MeshLambertMaterial.reflectivity",
				"refractionRatio": "MeshLambertMaterial.refractionRatio",
				"skinning": "MeshLambertMaterial.skinning",
				"specularMap": "MeshLambertMaterial.specularMap",
				"wireframe": "MeshLambertMaterial.wireframe",
				"wireframeLinecap": "MeshLambertMaterial.wireframeLinecap",
				"wireframeLinejoin": "MeshLambertMaterial.wireframeLinejoin",
				"wireframeLinewidth": "MeshLambertMaterial.wireframeLinewidth"

			},

			"MeshNormalMaterial": {

				"#PARENT": "Material",
				"#URL": "api/materials/MeshNormalMaterial",
				"fog": "MeshNormalMaterial.fog",
				"isMeshNormalMaterial": "MeshNormalMaterial.isMeshNormalMaterial",
				"lights": "MeshNormalMaterial.lights",
				"morphTargets": "MeshNormalMaterial.morphTargets",
				"wireframe": "MeshNormalMaterial.wireframe",
				"wireframeLinewidth": "MeshNormalMaterial.wireframeLinewidth"

			},

			"MeshPhongMaterial": {

				"#PARENT": "Material",
				"#URL": "api/materials/MeshPhongMaterial",
				"alphaMap": "MeshPhongMaterial.alphaMap",
				"aoMap": "MeshPhongMaterial.aoMap",
				"aoMapIntensity": "MeshPhongMaterial.aoMapIntensity",
				"bumpMap": "MeshPhongMaterial.bumpMap",
				"bumpScale": "MeshPhongMaterial.bumpScale",
				"color": "MeshPhongMaterial.color",
				"combine": "MeshPhongMaterial.combine",
				"displacementBias": "MeshPhongMaterial.displacementBias",
				"displacementMap": "MeshPhongMaterial.displacementMap",
				"displacementScale": "MeshPhongMaterial.displacementScale",
				"emissive": "MeshPhongMaterial.emissive",
				"emissiveIntensity": "MeshPhongMaterial.emissiveIntensity",
				"emissiveMap": "MeshPhongMaterial.emissiveMap",
				"envMap": "MeshPhongMaterial.envMap",
				"isMeshPhongMaterial": "MeshPhongMaterial.isMeshPhongMaterial",
				"lightMap": "MeshPhongMaterial.lightMap",
				"lightMapIntensity": "MeshPhongMaterial.lightMapIntensity",
				"map": "MeshPhongMaterial.map",
				"morphNormals": "MeshPhongMaterial.morphNormals",
				"morphTargets": "MeshPhongMaterial.morphTargets",
				"normalMap": "MeshPhongMaterial.normalMap",
				"normalScale": "MeshPhongMaterial.normalScale",
				"reflectivity": "MeshPhongMaterial.reflectivity",
				"refractionRatio": "MeshPhongMaterial.refractionRatio",
				"shininess": "MeshPhongMaterial.shininess",
				"skinning": "MeshPhongMaterial.skinning",
				"specular": "MeshPhongMaterial.specular",
				"specularMap": "MeshPhongMaterial.specularMap",
				"wireframe": "MeshPhongMaterial.wireframe",
				"wireframeLinecap": "MeshPhongMaterial.wireframeLinecap",
				"wireframeLinejoin": "MeshPhongMaterial.wireframeLinejoin",
				"wireframeLinewidth": "MeshPhongMaterial.wireframeLinewidth"

			},

			"MeshPhysicalMaterial": {

				"#PARENT": "MeshStandardMaterial",
				"#URL": "api/materials/MeshPhysicalMaterial",
				"clearCoat": "MeshPhysicalMaterial.clearCoat",
				"clearCoatRoughness": "MeshPhysicalMaterial.clearCoatRoughness",
				"defines": "MeshPhysicalMaterial.defines",
				"isMeshPhysicalMaterial": "MeshPhysicalMaterial.isMeshPhysicalMaterial",
				"reflectivity": "MeshPhysicalMaterial.reflectivity"

			},

			"MeshStandardMaterial": {

				"#PARENT": "Material",
				"#URL": "api/materials/MeshStandardMaterial",
				"alphaMap": "MeshStandardMaterial.alphaMap",
				"aoMap": "MeshStandardMaterial.aoMap",
				"aoMapIntensity": "MeshStandardMaterial.aoMapIntensity",
				"bumpMap": "MeshStandardMaterial.bumpMap",
				"bumpScale": "MeshStandardMaterial.bumpScale",
				"color": "MeshStandardMaterial.color",
				"defines": "MeshStandardMaterial.defines",
				"displacementBias": "MeshStandardMaterial.displacementBias",
				"displacementMap": "MeshStandardMaterial.displacementMap",
				"displacementScale": "MeshStandardMaterial.displacementScale",
				"emissive": "MeshStandardMaterial.emissive",
				"emissiveIntensity": "MeshStandardMaterial.emissiveIntensity",
				"emissiveMap": "MeshStandardMaterial.emissiveMap",
				"envMap": "MeshStandardMaterial.envMap",
				"envMapIntensity": "MeshStandardMaterial.envMapIntensity",
				"isMeshStandardMaterial": "MeshStandardMaterial.isMeshStandardMaterial",
				"lightMap": "MeshStandardMaterial.lightMap",
				"lightMapIntensity": "MeshStandardMaterial.lightMapIntensity",
				"map": "MeshStandardMaterial.map",
				"metalness": "MeshStandardMaterial.metalness",
				"metalnessMap": "MeshStandardMaterial.metalnessMap",
				"morphNormals": "MeshStandardMaterial.morphNormals",
				"morphTargets": "MeshStandardMaterial.morphTargets",
				"normalMap": "MeshStandardMaterial.normalMap",
				"normalScale": "MeshStandardMaterial.normalScale",
				"refractionRatio": "MeshStandardMaterial.refractionRatio",
				"roughness": "MeshStandardMaterial.roughness",
				"roughnessMap": "MeshStandardMaterial.roughnessMap",
				"skinning": "MeshStandardMaterial.skinning",
				"wireframe": "MeshStandardMaterial.wireframe",
				"wireframeLinecap": "MeshStandardMaterial.wireframeLinecap",
				"wireframeLinejoin": "MeshStandardMaterial.wireframeLinejoin",
				"wireframeLinewidth": "MeshStandardMaterial.wireframeLinewidth"

			},

			"MeshToonMaterial": {

				"#PARENT": "MeshPhongMaterial",
				"#URL": "api/materials/MeshToonMaterial",
				"defines": "MeshToonMaterial.defines",
				"gradientMap": "MeshToonMaterial.gradientMap",
				"isMeshToonMaterial": "MeshToonMaterial.isMeshToonMaterial"

			},

			"PointsMaterial": {

				"#PARENT": "Material",
				"#URL": "api/materials/PointsMaterial",
				"color": "PointsMaterial.color",
				"isPointsMaterial": "PointsMaterial.isPointsMaterial",
				"lights": "PointsMaterial.lights",
				"map": "PointsMaterial.map",
				"size": "PointsMaterial.size",
				"sizeAttenuation": "PointsMaterial.sizeAttenuation"

			},

			"RawShaderMaterial": {

				"#PARENT": "ShaderMaterial",
				"#URL": "api/materials/RawShaderMaterial",
				"isRawShaderMaterial": "RawShaderMaterial.isRawShaderMaterial"

			},

			"ShaderMaterial": {

				"#PARENT": "Material",
				"#URL": "api/materials/ShaderMaterial",
				"clipping": "ShaderMaterial.clipping",
				"clone": "ShaderMaterial.clone",
				"defaultAttributeValues": "ShaderMaterial.defaultAttributeValues",
				"defines": "ShaderMaterial.defines",
				"extensions": "ShaderMaterial.extensions",
				"flatShading": "ShaderMaterial.flatShading",
				"fog": "ShaderMaterial.fog",
				"fragmentShader": "ShaderMaterial.fragmentShader",
				"index0AttributeName": "ShaderMaterial.index0AttributeName",
				"isShaderMaterial": "ShaderMaterial.isShaderMaterial",
				"lights": "ShaderMaterial.lights",
				"linewidth": "ShaderMaterial.linewidth",
				"morphNormals": "ShaderMaterial.morphNormals",
				"morphTargets": "ShaderMaterial.morphTargets",
				"program": "ShaderMaterial.program",
				"skinning": "ShaderMaterial.skinning",
				"uniforms": "ShaderMaterial.uniforms",
				"vertexColors": "ShaderMaterial.vertexColors",
				"vertexShader": "ShaderMaterial.vertexShader",
				"wireframe": "ShaderMaterial.wireframe",
				"wireframeLinewidth": "ShaderMaterial.wireframeLinewidth"

			},

			"ShadowMaterial": {

				"#PARENT": "ShaderMaterial",
				"#URL": "api/materials/ShadowMaterial",
				"isShadowMaterial": "ShadowMaterial.isShadowMaterial",
				"lights": "ShadowMaterial.lights",
				"transparent": "ShadowMaterial.transparent"

			},

			"SpriteMaterial": {

				"#PARENT": "Material",
				"#URL": "api/materials/SpriteMaterial",
				"color": "SpriteMaterial.color",
				"fog": "SpriteMaterial.fog",
				"lights": "SpriteMaterial.lights",
				"map": "SpriteMaterial.map",
				"rotation": "SpriteMaterial.rotation"

			}


		},

		"Math": {

			"Box2": {

				"#URL": "api/math/Box2",
				"clampPoint": "Box2.clampPoint",
				"clone": "Box2.clone",
				"containsBox": "Box2.containsBox",
				"containsPoint": "Box2.containsPoint",
				"copy": "Box2.copy",
				"distanceToPoint": "Box2.distanceToPoint",
				"equals": "Box2.equals",
				"expandByPoint": "Box2.expandByPoint",
				"expandByScalar": "Box2.expandByScalar",
				"expandByVector": "Box2.expandByVector",
				"getCenter": "Box2.getCenter",
				"getParameter": "Box2.getParameter",
				"getSize": "Box2.getSize",
				"intersect": "Box2.intersect",
				"intersectsBox": "Box2.intersectsBox",
				"isEmpty": "Box2.isEmpty",
				"makeEmpty": "Box2.makeEmpty",
				"max": "Box2.max",
				"min": "Box2.min",
				"set": "Box2.set",
				"setFromCenterAndSize": "Box2.setFromCenterAndSize",
				"setFromPoints": "Box2.setFromPoints",
				"translate": "Box2.translate",
				"union": "Box2.union"

			},

			"Box3": {

				"#URL": "api/math/Box3",
				"applyMatrix4": "Box3.applyMatrix4",
				"clampPoint": "Box3.clampPoint",
				"clone": "Box3.clone",
				"containsBox": "Box3.containsBox",
				"containsPoint": "Box3.containsPoint",
				"copy": "Box3.copy",
				"distanceToPoint": "Box3.distanceToPoint",
				"equals": "Box3.equals",
				"expandByObject": "Box3.expandByObject",
				"expandByPoint": "Box3.expandByPoint",
				"expandByScalar": "Box3.expandByScalar",
				"expandByVector": "Box3.expandByVector",
				"getBoundingSphere": "Box3.getBoundingSphere",
				"getCenter": "Box3.getCenter",
				"getParameter": "Box3.getParameter",
				"getSize": "Box3.getSize",
				"intersect": "Box3.intersect",
				"intersectsBox": "Box3.intersectsBox",
				"intersectsPlane": "Box3.intersectsPlane",
				"intersectsSphere": "Box3.intersectsSphere",
				"isBox3": "Box3.isBox3",
				"isEmpty": "Box3.isEmpty",
				"makeEmpty": "Box3.makeEmpty",
				"max": "Box3.max",
				"min": "Box3.min",
				"set": "Box3.set",
				"setFromArray": "Box3.setFromArray",
				"setFromBufferAttribute": "Box3.setFromBufferAttribute",
				"setFromCenterAndSize": "Box3.setFromCenterAndSize",
				"setFromObject": "Box3.setFromObject",
				"setFromPoints": "Box3.setFromPoints",
				"translate": "Box3.translate",
				"union": "Box3.union"

			},

			"Color": {

				"#URL": "api/math/Color",
				"add": "Color.add",
				"addColors": "Color.addColors",
				"addScalar": "Color.addScalar",
				"b": "Color.b",
				"clone": "Color.clone",
				"convertGammaToLinear": "Color.convertGammaToLinear",
				"convertLinearToGamma": "Color.convertLinearToGamma",
				"copy": "Color.copy",
				"copyGammaToLinear": "Color.copyGammaToLinear",
				"copyLinearToGamma": "Color.copyLinearToGamma",
				"equals": "Color.equals",
				"fromArray": "Color.fromArray",
				"g": "Color.g",
				"getHSL": "Color.getHSL",
				"getHex": "Color.getHex",
				"getHexString": "Color.getHexString",
				"getStyle": "Color.getStyle",
				"isColor": "Color.isColor",
				"lerp": "Color.lerp",
				"multiply": "Color.multiply",
				"multiplyScalar": "Color.multiplyScalar",
				"offsetHSL": "Color.offsetHSL",
				"r": "Color.r",
				"set": "Color.set",
				"setHSL": "Color.setHSL",
				"setHex": "Color.setHex",
				"setRGB": "Color.setRGB",
				"setScalar": "Color.setScalar",
				"setStyle": "Color.setStyle",
				"sub": "Color.sub",
				"toArray": "Color.toArray"

			},

			"Cylindrical": {

				"#URL": "api/math/Cylindrical",
				"clone": "Cylindrical.clone",
				"copy": "Cylindrical.copy",
				"radius": "Cylindrical.radius",
				"set": "Cylindrical.set",
				"setFromVector3": "Cylindrical.setFromVector3",
				"theta": "Cylindrical.theta",
				"y": "Cylindrical.y"

			},

			"Euler": {

				"#URL": "api/math/Euler",
				"clone": "Euler.clone",
				"copy": "Euler.copy",
				"equals": "Euler.equals",
				"fromArray": "Euler.fromArray",
				"isEuler": "Euler.isEuler",
				"onChange": "Euler.onChange",
				"onChangeCallback": "Euler.onChangeCallback",
				"order": "Euler.order",
				"reorder": "Euler.reorder",
				"set": "Euler.set",
				"setFromQuaternion": "Euler.setFromQuaternion",
				"setFromRotationMatrix": "Euler.setFromRotationMatrix",
				"setFromVector3": "Euler.setFromVector3",
				"toArray": "Euler.toArray",
				"toVector3": "Euler.toVector3",
				"x": "Euler.x",
				"y": "Euler.y",
				"z": "Euler.z"

			},

			"Frustum": {

				"#URL": "api/math/Frustum",
				"clone": "Frustum.clone",
				"containsPoint": "Frustum.containsPoint",
				"copy": "Frustum.copy",
				"intersectsBox": "Frustum.intersectsBox",
				"intersectsObject": "Frustum.intersectsObject",
				"intersectsSphere": "Frustum.intersectsSphere",
				"intersectsSprite": "Frustum.intersectsSprite",
				"planes": "Frustum.planes",
				"set": "Frustum.set",
				"setFromMatrix": "Frustum.setFromMatrix"

			},

			"Interpolant": {

				"#URL": "api/math/Interpolant",
				"evaluate": "Interpolant.evaluate",
				"parameterPositions": "Interpolant.parameterPositions",
				"resultBuffer": "Interpolant.resultBuffer",
				"sampleValues": "Interpolant.sampleValues",
				"settings": "Interpolant.settings",
				"valueSize": "Interpolant.valueSize"

			},

			"Line3": {

				"#URL": "api/math/Line3",
				"applyMatrix4": "Line3.applyMatrix4",
				"at": "Line3.at",
				"clone": "Line3.clone",
				"closestPointToPoint": "Line3.closestPointToPoint",
				"closestPointToPointParameter": "Line3.closestPointToPointParameter",
				"copy": "Line3.copy",
				"delta": "Line3.delta",
				"distance": "Line3.distance",
				"distanceSq": "Line3.distanceSq",
				"end": "Line3.end",
				"equals": "Line3.equals",
				"getCenter": "Line3.getCenter",
				"set": "Line3.set",
				"start": "Line3.start"

			},

			"Math": {

				"#URL": "api/math/Math",
				"ceilPowerOfTwo": "Math.ceilPowerOfTwo",
				"clamp": "Math.clamp",
				"degToRad": "Math.degToRad",
				"euclideanModulo": "Math.euclideanModulo",
				"floorPowerOfTwo": "Math.floorPowerOfTwo",
				"generateUUID": "Math.generateUUID",
				"isPowerOfTwo": "Math.isPowerOfTwo",
				"lerp": "Math.lerp",
				"mapLinear": "Math.mapLinear",
				"radToDeg": "Math.radToDeg",
				"randFloat": "Math.randFloat",
				"randFloatSpread": "Math.randFloatSpread",
				"randInt": "Math.randInt",
				"smootherstep": "Math.smootherstep",
				"smoothstep": "Math.smoothstep"

			},

			"Matrix3": {

				"#URL": "api/math/Matrix3",
				"applyToBufferAttribute": "Matrix3.applyToBufferAttribute",
				"clone": "Matrix3.clone",
				"copy": "Matrix3.copy",
				"determinant": "Matrix3.determinant",
				"elements": "Matrix3.elements",
				"equals": "Matrix3.equals",
				"fromArray": "Matrix3.fromArray",
				"getInverse": "Matrix3.getInverse",
				"getNormalMatrix": "Matrix3.getNormalMatrix",
				"identity": "Matrix3.identity",
				"isMatrix3": "Matrix3.isMatrix3",
				"multiply": "Matrix3.multiply",
				"multiplyMatrices": "Matrix3.multiplyMatrices",
				"multiplyScalar": "Matrix3.multiplyScalar",
				"premultiply": "Matrix3.premultiply",
				"set": "Matrix3.set",
				"setFromMatrix4": "Matrix3.setFromMatrix4",
				"setUvTransform": "Matrix3.setUvTransform",
				"toArray": "Matrix3.toArray",
				"transpose": "Matrix3.transpose",
				"transposeIntoArray": "Matrix3.transposeIntoArray"

			},

			"Matrix4": {

				"#URL": "api/math/Matrix4",
				"applyToBufferAttribute": "Matrix4.applyToBufferAttribute",
				"clone": "Matrix4.clone",
				"compose": "Matrix4.compose",
				"copy": "Matrix4.copy",
				"copyPosition": "Matrix4.copyPosition",
				"decompose": "Matrix4.decompose",
				"determinant": "Matrix4.determinant",
				"elements": "Matrix4.elements",
				"equals": "Matrix4.equals",
				"extractBasis": "Matrix4.extractBasis",
				"extractRotation": "Matrix4.extractRotation",
				"fromArray": "Matrix4.fromArray",
				"getInverse": "Matrix4.getInverse",
				"getMaxScaleOnAxis": "Matrix4.getMaxScaleOnAxis",
				"identity": "Matrix4.identity",
				"isMatrix4": "Matrix4.isMatrix4",
				"lookAt": "Matrix4.lookAt",
				"makeBasis": "Matrix4.makeBasis",
				"makeOrthographic": "Matrix4.makeOrthographic",
				"makePerspective": "Matrix4.makePerspective",
				"makeRotationAxis": "Matrix4.makeRotationAxis",
				"makeRotationFromEuler": "Matrix4.makeRotationFromEuler",
				"makeRotationFromQuaternion": "Matrix4.makeRotationFromQuaternion",
				"makeRotationX": "Matrix4.makeRotationX",
				"makeRotationY": "Matrix4.makeRotationY",
				"makeRotationZ": "Matrix4.makeRotationZ",
				"makeScale": "Matrix4.makeScale",
				"makeShear": "Matrix4.makeShear",
				"makeTranslation": "Matrix4.makeTranslation",
				"multiply": "Matrix4.multiply",
				"multiplyMatrices": "Matrix4.multiplyMatrices",
				"multiplyScalar": "Matrix4.multiplyScalar",
				"premultiply": "Matrix4.premultiply",
				"scale": "Matrix4.scale",
				"set": "Matrix4.set",
				"setPosition": "Matrix4.setPosition",
				"toArray": "Matrix4.toArray",
				"transpose": "Matrix4.transpose"

			},

			"Plane": {

				"#URL": "api/math/Plane",
				"applyMatrix4": "Plane.applyMatrix4",
				"clone": "Plane.clone",
				"constant": "Plane.constant",
				"coplanarPoint": "Plane.coplanarPoint",
				"copy": "Plane.copy",
				"distanceToPoint": "Plane.distanceToPoint",
				"distanceToSphere": "Plane.distanceToSphere",
				"equals": "Plane.equals",
				"intersectLine": "Plane.intersectLine",
				"intersectsBox": "Plane.intersectsBox",
				"intersectsLine": "Plane.intersectsLine",
				"intersectsSphere": "Plane.intersectsSphere",
				"negate": "Plane.negate",
				"normal": "Plane.normal",
				"normalize": "Plane.normalize",
				"projectPoint": "Plane.projectPoint",
				"set": "Plane.set",
				"setComponents": "Plane.setComponents",
				"setFromCoplanarPoints": "Plane.setFromCoplanarPoints",
				"setFromNormalAndCoplanarPoint": "Plane.setFromNormalAndCoplanarPoint",
				"translate": "Plane.translate"

			},

			"Quaternion": {

				"#URL": "api/math/Quaternion",
				"clone": "Quaternion.clone",
				"conjugate": "Quaternion.conjugate",
				"copy": "Quaternion.copy",
				"dot": "Quaternion.dot",
				"equals": "Quaternion.equals",
				"fromArray": "Quaternion.fromArray",
				"inverse": "Quaternion.inverse",
				"length": "Quaternion.length",
				"lengthSq": "Quaternion.lengthSq",
				"multiply": "Quaternion.multiply",
				"multiplyQuaternions": "Quaternion.multiplyQuaternions",
				"normalize": "Quaternion.normalize",
				"onChange": "Quaternion.onChange",
				"onChangeCallback": "Quaternion.onChangeCallback",
				"premultiply": "Quaternion.premultiply",
				"set": "Quaternion.set",
				"setFromAxisAngle": "Quaternion.setFromAxisAngle",
				"setFromEuler": "Quaternion.setFromEuler",
				"setFromRotationMatrix": "Quaternion.setFromRotationMatrix",
				"setFromUnitVectors": "Quaternion.setFromUnitVectors",
				"slerp": "Quaternion.slerp",
				"slerpFlat": "Quaternion.slerpFlat",
				"toArray": "Quaternion.toArray",
				"w": "Quaternion.w",
				"x": "Quaternion.x",
				"y": "Quaternion.y",
				"z": "Quaternion.z"

			},

			"Ray": {

				"#URL": "api/math/Ray",
				"applyMatrix4": "Ray.applyMatrix4",
				"at": "Ray.at",
				"clone": "Ray.clone",
				"closestPointToPoint": "Ray.closestPointToPoint",
				"copy": "Ray.copy",
				"direction": "Ray.direction",
				"distanceSqToPoint": "Ray.distanceSqToPoint",
				"distanceSqToSegment": "Ray.distanceSqToSegment",
				"distanceToPlane": "Ray.distanceToPlane",
				"distanceToPoint": "Ray.distanceToPoint",
				"equals": "Ray.equals",
				"intersectBox": "Ray.intersectBox",
				"intersectPlane": "Ray.intersectPlane",
				"intersectSphere": "Ray.intersectSphere",
				"intersectTriangle": "Ray.intersectTriangle",
				"intersectsBox": "Ray.intersectsBox",
				"intersectsPlane": "Ray.intersectsPlane",
				"intersectsSphere": "Ray.intersectsSphere",
				"lookAt": "Ray.lookAt",
				"origin": "Ray.origin",
				"recast": "Ray.recast",
				"set": "Ray.set"

			},

			"Sphere": {

				"#URL": "api/math/Sphere",
				"applyMatrix4": "Sphere.applyMatrix4",
				"center": "Sphere.center",
				"clampPoint": "Sphere.clampPoint",
				"clone": "Sphere.clone",
				"containsPoint": "Sphere.containsPoint",
				"copy": "Sphere.copy",
				"distanceToPoint": "Sphere.distanceToPoint",
				"empty": "Sphere.empty",
				"equals": "Sphere.equals",
				"getBoundingBox": "Sphere.getBoundingBox",
				"intersectsBox": "Sphere.intersectsBox",
				"intersectsPlane": "Sphere.intersectsPlane",
				"intersectsSphere": "Sphere.intersectsSphere",
				"radius": "Sphere.radius",
				"set": "Sphere.set",
				"setFromPoints": "Sphere.setFromPoints",
				"translate": "Sphere.translate"

			},

			"Spherical": {

				"#URL": "api/math/Spherical",
				"clone": "Spherical.clone",
				"copy": "Spherical.copy",
				"makeSafe": "Spherical.makeSafe",
				"phi": "Spherical.phi",
				"radius": "Spherical.radius",
				"set": "Spherical.set",
				"setFromVector3": "Spherical.setFromVector3",
				"theta": "Spherical.theta"

			},

			"Triangle": {

				"#URL": "api/math/Triangle",
				"a": "Triangle.a",
				"area": "Triangle.area",
				"b": "Triangle.b",
				"barycoordFromPoint": "Triangle.barycoordFromPoint",
				"c": "Triangle.c",
				"clone": "Triangle.clone",
				"closestPointToPoint": "Triangle.closestPointToPoint",
				"containsPoint": "Triangle.containsPoint",
				"copy": "Triangle.copy",
				"equals": "Triangle.equals",
				"midpoint": "Triangle.midpoint",
				"normal": "Triangle.normal",
				"plane": "Triangle.plane",
				"set": "Triangle.set",
				"setFromPointsAndIndices": "Triangle.setFromPointsAndIndices"

			},

			"Vector2": {

				"#URL": "api/math/Vector2",
				"add": "Vector2.add",
				"addScalar": "Vector2.addScalar",
				"addScaledVector": "Vector2.addScaledVector",
				"addVectors": "Vector2.addVectors",
				"angle": "Vector2.angle",
				"applyMatrix3": "Vector2.applyMatrix3",
				"ceil": "Vector2.ceil",
				"clamp": "Vector2.clamp",
				"clampLength": "Vector2.clampLength",
				"clampScalar": "Vector2.clampScalar",
				"clone": "Vector2.clone",
				"copy": "Vector2.copy",
				"distanceTo": "Vector2.distanceTo",
				"distanceToSquared": "Vector2.distanceToSquared",
				"divide": "Vector2.divide",
				"divideScalar": "Vector2.divideScalar",
				"dot": "Vector2.dot",
				"equals": "Vector2.equals",
				"floor": "Vector2.floor",
				"fromArray": "Vector2.fromArray",
				"fromBufferAttribute": "Vector2.fromBufferAttribute",
				"getComponent": "Vector2.getComponent",
				"height": "Vector2.height",
				"isVector2": "Vector2.isVector2",
				"length": "Vector2.length",
				"lengthSq": "Vector2.lengthSq",
				"lerp": "Vector2.lerp",
				"lerpVectors": "Vector2.lerpVectors",
				"manhattanDistanceTo": "Vector2.manhattanDistanceTo",
				"manhattanLength": "Vector2.manhattanLength",
				"max": "Vector2.max",
				"min": "Vector2.min",
				"multiply": "Vector2.multiply",
				"multiplyScalar": "Vector2.multiplyScalar",
				"negate": "Vector2.negate",
				"normalize": "Vector2.normalize",
				"rotateAround": "Vector2.rotateAround",
				"round": "Vector2.round",
				"roundToZero": "Vector2.roundToZero",
				"set": "Vector2.set",
				"setComponent": "Vector2.setComponent",
				"setLength": "Vector2.setLength",
				"setScalar": "Vector2.setScalar",
				"setX": "Vector2.setX",
				"setY": "Vector2.setY",
				"sub": "Vector2.sub",
				"subScalar": "Vector2.subScalar",
				"subVectors": "Vector2.subVectors",
				"toArray": "Vector2.toArray",
				"width": "Vector2.width",
				"x": "Vector2.x",
				"y": "Vector2.y"

			},

			"Vector3": {

				"#URL": "api/math/Vector3",
				"add": "Vector3.add",
				"addScalar": "Vector3.addScalar",
				"addScaledVector": "Vector3.addScaledVector",
				"addVectors": "Vector3.addVectors",
				"angleTo": "Vector3.angleTo",
				"applyAxisAngle": "Vector3.applyAxisAngle",
				"applyEuler": "Vector3.applyEuler",
				"applyMatrix3": "Vector3.applyMatrix3",
				"applyMatrix4": "Vector3.applyMatrix4",
				"applyQuaternion": "Vector3.applyQuaternion",
				"ceil": "Vector3.ceil",
				"clamp": "Vector3.clamp",
				"clampLength": "Vector3.clampLength",
				"clampScalar": "Vector3.clampScalar",
				"clone": "Vector3.clone",
				"copy": "Vector3.copy",
				"cross": "Vector3.cross",
				"crossVectors": "Vector3.crossVectors",
				"distanceTo": "Vector3.distanceTo",
				"distanceToSquared": "Vector3.distanceToSquared",
				"divide": "Vector3.divide",
				"divideScalar": "Vector3.divideScalar",
				"dot": "Vector3.dot",
				"equals": "Vector3.equals",
				"floor": "Vector3.floor",
				"fromArray": "Vector3.fromArray",
				"fromBufferAttribute": "Vector3.fromBufferAttribute",
				"getComponent": "Vector3.getComponent",
				"isVector3": "Vector3.isVector3",
				"length": "Vector3.length",
				"lengthSq": "Vector3.lengthSq",
				"lerp": "Vector3.lerp",
				"lerpVectors": "Vector3.lerpVectors",
				"manhattanDistanceTo": "Vector3.manhattanDistanceTo",
				"manhattanLength": "Vector3.manhattanLength",
				"max": "Vector3.max",
				"min": "Vector3.min",
				"multiply": "Vector3.multiply",
				"multiplyScalar": "Vector3.multiplyScalar",
				"multiplyVectors": "Vector3.multiplyVectors",
				"negate": "Vector3.negate",
				"normalize": "Vector3.normalize",
				"project": "Vector3.project",
				"projectOnPlane": "Vector3.projectOnPlane",
				"projectOnVector": "Vector3.projectOnVector",
				"reflect": "Vector3.reflect",
				"round": "Vector3.round",
				"roundToZero": "Vector3.roundToZero",
				"set": "Vector3.set",
				"setComponent": "Vector3.setComponent",
				"setFromCylindrical": "Vector3.setFromCylindrical",
				"setFromMatrixColumn": "Vector3.setFromMatrixColumn",
				"setFromMatrixPosition": "Vector3.setFromMatrixPosition",
				"setFromMatrixScale": "Vector3.setFromMatrixScale",
				"setFromSpherical": "Vector3.setFromSpherical",
				"setLength": "Vector3.setLength",
				"setScalar": "Vector3.setScalar",
				"setX": "Vector3.setX",
				"setY": "Vector3.setY",
				"setZ": "Vector3.setZ",
				"sub": "Vector3.sub",
				"subScalar": "Vector3.subScalar",
				"subVectors": "Vector3.subVectors",
				"toArray": "Vector3.toArray",
				"transformDirection": "Vector3.transformDirection",
				"unproject": "Vector3.unproject",
				"x": "Vector3.x",
				"y": "Vector3.y",
				"z": "Vector3.z"

			},

			"Vector4": {

				"#URL": "api/math/Vector4",
				"add": "Vector4.add",
				"addScalar": "Vector4.addScalar",
				"addScaledVector": "Vector4.addScaledVector",
				"addVectors": "Vector4.addVectors",
				"applyMatrix4": "Vector4.applyMatrix4",
				"ceil": "Vector4.ceil",
				"clamp": "Vector4.clamp",
				"clampLength": "Vector4.clampLength",
				"clampScalar": "Vector4.clampScalar",
				"clone": "Vector4.clone",
				"copy": "Vector4.copy",
				"divideScalar": "Vector4.divideScalar",
				"dot": "Vector4.dot",
				"equals": "Vector4.equals",
				"floor": "Vector4.floor",
				"fromArray": "Vector4.fromArray",
				"fromBufferAttribute": "Vector4.fromBufferAttribute",
				"getComponent": "Vector4.getComponent",
				"isVector4": "Vector4.isVector4",
				"length": "Vector4.length",
				"lengthSq": "Vector4.lengthSq",
				"lerp": "Vector4.lerp",
				"lerpVectors": "Vector4.lerpVectors",
				"manhattanLength": "Vector4.manhattanLength",
				"max": "Vector4.max",
				"min": "Vector4.min",
				"multiplyScalar": "Vector4.multiplyScalar",
				"negate": "Vector4.negate",
				"normalize": "Vector4.normalize",
				"round": "Vector4.round",
				"roundToZero": "Vector4.roundToZero",
				"set": "Vector4.set",
				"setAxisAngleFromQuaternion": "Vector4.setAxisAngleFromQuaternion",
				"setAxisAngleFromRotationMatrix": "Vector4.setAxisAngleFromRotationMatrix",
				"setComponent": "Vector4.setComponent",
				"setLength": "Vector4.setLength",
				"setScalar": "Vector4.setScalar",
				"setW": "Vector4.setW",
				"setX": "Vector4.setX",
				"setY": "Vector4.setY",
				"setZ": "Vector4.setZ",
				"sub": "Vector4.sub",
				"subScalar": "Vector4.subScalar",
				"subVectors": "Vector4.subVectors",
				"toArray": "Vector4.toArray",
				"w": "Vector4.w",
				"x": "Vector4.x",
				"y": "Vector4.y",
				"z": "Vector4.z"

			}


		},

		"Math / Interpolants": {

			"CubicInterpolant": {

				"#PARENT": "Interpolant",
				"#URL": "api/math/interpolants/CubicInterpolant",
				"evaluate": "CubicInterpolant.evaluate",
				"parameterPositions": "CubicInterpolant.parameterPositions",
				"resultBuffer": "CubicInterpolant.resultBuffer",
				"sampleValues": "CubicInterpolant.sampleValues",
				"settings": "CubicInterpolant.settings",
				"valueSize": "CubicInterpolant.valueSize"

			},

			"DiscreteInterpolant": {

				"#PARENT": "Interpolant",
				"#URL": "api/math/interpolants/DiscreteInterpolant",
				"evaluate": "DiscreteInterpolant.evaluate",
				"parameterPositions": "DiscreteInterpolant.parameterPositions",
				"resultBuffer": "DiscreteInterpolant.resultBuffer",
				"sampleValues": "DiscreteInterpolant.sampleValues",
				"settings": "DiscreteInterpolant.settings",
				"valueSize": "DiscreteInterpolant.valueSize"

			},

			"LinearInterpolant": {

				"#PARENT": "Interpolant",
				"#URL": "api/math/interpolants/LinearInterpolant",
				"evaluate": "LinearInterpolant.evaluate",
				"parameterPositions": "LinearInterpolant.parameterPositions",
				"resultBuffer": "LinearInterpolant.resultBuffer",
				"sampleValues": "LinearInterpolant.sampleValues",
				"settings": "LinearInterpolant.settings",
				"valueSize": "LinearInterpolant.valueSize"

			},

			"QuaternionLinearInterpolant": {

				"#PARENT": "Interpolant",
				"#URL": "api/math/interpolants/QuaternionLinearInterpolant",
				"evaluate": "QuaternionLinearInterpolant.evaluate",
				"parameterPositions": "QuaternionLinearInterpolant.parameterPositions",
				"resultBuffer": "QuaternionLinearInterpolant.resultBuffer",
				"sampleValues": "QuaternionLinearInterpolant.sampleValues",
				"settings": "QuaternionLinearInterpolant.settings",
				"valueSize": "QuaternionLinearInterpolant.valueSize"

			}


		},

		"Objects": {

			"Bone": {

				"#PARENT": "Object3D",
				"#URL": "api/objects/Bone",
				"isBone": "Bone.isBone",
				"type": "Bone.type"

			},

			"Group": {

				"#PARENT": "Object3D",
				"#URL": "api/objects/Group",
				"type": "Group.type"

			},

			"LensFlare": {

				"#PARENT": "Object3D",
				"#URL": "api/objects/LensFlare",
				"add": "LensFlare.add",
				"clone": "LensFlare.clone",
				"copy": "LensFlare.copy",
				"customUpdateCallback": "LensFlare.customUpdateCallback",
				"isLensFlare": "LensFlare.isLensFlare",
				"lensFlares": "LensFlare.lensFlares",
				"positionScreen": "LensFlare.positionScreen",
				"updateLensFlares": "LensFlare.updateLensFlares"

			},

			"Line": {

				"#PARENT": "Object3D",
				"#URL": "api/objects/Line",
				"clone": "Line.clone",
				"geometry": "Line.geometry",
				"isLine": "Line.isLine",
				"material": "Line.material",
				"raycast": "Line.raycast"

			},

			"LineLoop": {

				"#PARENT": "Line",
				"#URL": "api/objects/LineLoop",
				"isLineLoop": "LineLoop.isLineLoop"

			},

			"LineSegments": {

				"#PARENT": "Line",
				"#URL": "api/objects/LineSegments",
				"isLineSegments": "LineSegments.isLineSegments"

			},

			"LOD": {

				"#PARENT": "Object3D",
				"#URL": "api/objects/LOD",
				"addLevel": "LOD.addLevel",
				"clone": "LOD.clone",
				"getObjectForDistance": "LOD.getObjectForDistance",
				"levels": "LOD.levels",
				"raycast": "LOD.raycast",
				"toJSON": "LOD.toJSON",
				"update": "LOD.update"

			},

			"Mesh": {

				"#PARENT": "Object3D",
				"#URL": "api/objects/Mesh",
				"clone": "Mesh.clone",
				"drawMode": "Mesh.drawMode",
				"geometry": "Mesh.geometry",
				"isMesh": "Mesh.isMesh",
				"material": "Mesh.material",
				"morphTargetDictionary": "Mesh.morphTargetDictionary",
				"morphTargetInfluences": "Mesh.morphTargetInfluences",
				"raycast": "Mesh.raycast",
				"setDrawMode": "Mesh.setDrawMode",
				"updateMorphTargets": "Mesh.updateMorphTargets"

			},

			"Points": {

				"#PARENT": "Object3D",
				"#URL": "api/objects/Points",
				"clone": "Points.clone",
				"geometry": "Points.geometry",
				"isPoints": "Points.isPoints",
				"material": "Points.material",
				"raycast": "Points.raycast"

			},

			"Skeleton": {

				"#URL": "api/objects/Skeleton",
				"boneInverses": "Skeleton.boneInverses",
				"boneMatrices": "Skeleton.boneMatrices",
				"boneTexture": "Skeleton.boneTexture",
				"bones": "Skeleton.bones",
				"calculateInverses": "Skeleton.calculateInverses",
				"clone": "Skeleton.clone",
				"pose": "Skeleton.pose",
				"update": "Skeleton.update"

			},

			"SkinnedMesh": {

				"#PARENT": "Mesh",
				"#URL": "api/objects/SkinnedMesh",
				"bind": "SkinnedMesh.bind",
				"bindMatrix": "SkinnedMesh.bindMatrix",
				"bindMatrixInverse": "SkinnedMesh.bindMatrixInverse",
				"bindMode": "SkinnedMesh.bindMode",
				"clone": "SkinnedMesh.clone",
				"initBones": "SkinnedMesh.initBones",
				"isSkinnedMesh": "SkinnedMesh.isSkinnedMesh",
				"normalizeSkinWeights": "SkinnedMesh.normalizeSkinWeights",
				"pose": "SkinnedMesh.pose",
				"skeleton": "SkinnedMesh.skeleton",
				"updateMatrixWorld": "SkinnedMesh.updateMatrixWorld"

			},

			"Sprite": {

				"#PARENT": "Object3D",
				"#URL": "api/objects/Sprite",
				"clone": "Sprite.clone",
				"isSprite": "Sprite.isSprite",
				"material": "Sprite.material",
				"raycast": "Sprite.raycast"

			}


		},

		"Renderers": {

			"WebGLRenderer": {

				"#URL": "api/renderers/WebGLRenderer",
				"allocTextureUnit": "WebGLRenderer.allocTextureUnit",
				"autoClear": "WebGLRenderer.autoClear",
				"autoClearColor": "WebGLRenderer.autoClearColor",
				"autoClearDepth": "WebGLRenderer.autoClearDepth",
				"autoClearStencil": "WebGLRenderer.autoClearStencil",
				"capabilities": "WebGLRenderer.capabilities",
				"clear": "WebGLRenderer.clear",
				"clearColor": "WebGLRenderer.clearColor",
				"clearDepth": "WebGLRenderer.clearDepth",
				"clearStencil": "WebGLRenderer.clearStencil",
				"clearTarget": "WebGLRenderer.clearTarget",
				"clippingPlanes": "WebGLRenderer.clippingPlanes",
				"compile": "WebGLRenderer.compile",
				"context": "WebGLRenderer.context",
				"dispose": "WebGLRenderer.dispose",
				"domElement": "WebGLRenderer.domElement",
				"extensions": "WebGLRenderer.extensions",
				"extensions.get": "WebGLRenderer.extensions.get",
				"floatFragmentTextures": "WebGLRenderer.floatFragmentTextures",
				"floatVertexTextures": "WebGLRenderer.floatVertexTextures",
				"forceContextLoss": "WebGLRenderer.forceContextLoss",
				"gammaFactor": "WebGLRenderer.gammaFactor",
				"gammaInput": "WebGLRenderer.gammaInput",
				"gammaOutput": "WebGLRenderer.gammaOutput",
				"getClearAlpha": "WebGLRenderer.getClearAlpha",
				"getClearColor": "WebGLRenderer.getClearColor",
				"getContext": "WebGLRenderer.getContext",
				"getContextAttributes": "WebGLRenderer.getContextAttributes",
				"getCurrentRenderTarget": "WebGLRenderer.getCurrentRenderTarget",
				"getDrawingBufferSize": "WebGLRenderer.getDrawingBufferSize",
				"getMaxAnisotropy": "WebGLRenderer.getMaxAnisotropy",
				"getMaxPrecision": "WebGLRenderer.getMaxPrecision",
				"getPixelRatio": "WebGLRenderer.getPixelRatio",
				"getPrecision": "WebGLRenderer.getPrecision",
				"getSize": "WebGLRenderer.getSize",
				"info": "WebGLRenderer.info",
				"localClippingEnabled": "WebGLRenderer.localClippingEnabled",
				"logarithmicDepthBuffer": "WebGLRenderer.logarithmicDepthBuffer",
				"maxAttributes": "WebGLRenderer.maxAttributes",
				"maxCubemapSize": "WebGLRenderer.maxCubemapSize",
				"maxFragmentUniforms": "WebGLRenderer.maxFragmentUniforms",
				"maxMorphNormals": "WebGLRenderer.maxMorphNormals",
				"maxMorphTargets": "WebGLRenderer.maxMorphTargets",
				"maxTextureSize": "WebGLRenderer.maxTextureSize",
				"maxTextures": "WebGLRenderer.maxTextures",
				"maxVaryings": "WebGLRenderer.maxVaryings",
				"maxVertexTextures": "WebGLRenderer.maxVertexTextures",
				"maxVertexUniforms": "WebGLRenderer.maxVertexUniforms",
				"physicallyCorrectLights": "WebGLRenderer.physicallyCorrectLights",
				"precision": "WebGLRenderer.precision",
				"properties": "WebGLRenderer.properties",
				"readRenderTargetPixels": "WebGLRenderer.readRenderTargetPixels",
				"render": "WebGLRenderer.render",
				"renderBufferDirect": "WebGLRenderer.renderBufferDirect",
				"renderBufferImmediate": "WebGLRenderer.renderBufferImmediate",
				"renderLists": "WebGLRenderer.renderLists",
				"resetGLState": "WebGLRenderer.resetGLState",
				"setClearAlpha": "WebGLRenderer.setClearAlpha",
				"setClearColor": "WebGLRenderer.setClearColor",
				"setFaceCulling": "WebGLRenderer.setFaceCulling",
				"setPixelRatio": "WebGLRenderer.setPixelRatio",
				"setRenderTarget": "WebGLRenderer.setRenderTarget",
				"setScissor": "WebGLRenderer.setScissor",
				"setScissorTest": "WebGLRenderer.setScissorTest",
				"setSize": "WebGLRenderer.setSize",
				"setTexture": "WebGLRenderer.setTexture",
				"setTexture2D": "WebGLRenderer.setTexture2D",
				"setTextureCube": "WebGLRenderer.setTextureCube",
				"setViewport": "WebGLRenderer.setViewport",
				"shadowMap": "WebGLRenderer.shadowMap",
				"shadowMap.autoUpdate": "WebGLRenderer.shadowMap.autoUpdate",
				"shadowMap.enabled": "WebGLRenderer.shadowMap.enabled",
				"shadowMap.needsUpdate": "WebGLRenderer.shadowMap.needsUpdate",
				"shadowMap.renderReverseSided": "WebGLRenderer.shadowMap.renderReverseSided",
				"shadowMap.renderSingleSided": "WebGLRenderer.shadowMap.renderSingleSided",
				"shadowMap.type": "WebGLRenderer.shadowMap.type",
				"sortObjects": "WebGLRenderer.sortObjects",
				"state": "WebGLRenderer.state",
				"supportsVertexTextures": "WebGLRenderer.supportsVertexTextures",
				"toneMapping": "WebGLRenderer.toneMapping",
				"toneMappingExposure": "WebGLRenderer.toneMappingExposure",
				"toneMappingWhitePoint": "WebGLRenderer.toneMappingWhitePoint",
				"vertexTextures": "WebGLRenderer.vertexTextures"

			},

			"WebGLRenderTarget": {

				"#URL": "api/renderers/WebGLRenderTarget",
				"clone": "WebGLRenderTarget.clone",
				"copy": "WebGLRenderTarget.copy",
				"depthBuffer": "WebGLRenderTarget.depthBuffer",
				"depthTexture": "WebGLRenderTarget.depthTexture",
				"dispose": "WebGLRenderTarget.dispose",
				"height": "WebGLRenderTarget.height",
				"scissor": "WebGLRenderTarget.scissor",
				"scissorTest": "WebGLRenderTarget.scissorTest",
				"setSize": "WebGLRenderTarget.setSize",
				"stencilBuffer": "WebGLRenderTarget.stencilBuffer",
				"texture": "WebGLRenderTarget.texture",
				"uuid": "WebGLRenderTarget.uuid",
				"viewport": "WebGLRenderTarget.viewport",
				"width": "WebGLRenderTarget.width"

			},

			"WebGLRenderTargetCube": {

				"#PARENT": "WebGLRenderTarget",
				"#URL": "api/renderers/WebGLRenderTargetCube",
				"activeCubeFace": "WebGLRenderTargetCube.activeCubeFace"

			}


		},

		"Renderers / Shaders": {

			"ShaderChunk": {

				"#URL": "api/renderers/shaders/ShaderChunk"

			},

			"ShaderLib": {

				"#URL": "api/renderers/shaders/ShaderLib"

			},

			"UniformsLib": {

				"#URL": "api/renderers/shaders/UniformsLib"

			},

			"UniformsUtils": {

				"#URL": "api/renderers/shaders/UniformsUtils"

			}


		},

		"Scenes": {

			"Fog": {

				"#URL": "api/scenes/Fog",
				"clone": "Fog.clone",
				"color": "Fog.color",
				"far": "Fog.far",
				"name": "Fog.name",
				"near": "Fog.near",
				"toJSON": "Fog.toJSON"

			},

			"FogExp2": {

				"#URL": "api/scenes/FogExp2",
				"clone": "FogExp2.clone",
				"color": "FogExp2.color",
				"density": "FogExp2.density",
				"name": "FogExp2.name",
				"toJSON": "FogExp2.toJSON"

			},

			"Scene": {

				"#PARENT": "Object3D",
				"#URL": "api/scenes/Scene",
				"autoUpdate": "Scene.autoUpdate",
				"background": "Scene.background",
				"fog": "Scene.fog",
				"overrideMaterial": "Scene.overrideMaterial",
				"toJSON": "Scene.toJSON"

			}


		},

		"Textures": {

			"CanvasTexture": {

				"#PARENT": "Texture",
				"#URL": "api/textures/CanvasTexture",
				"needsUpdate": "CanvasTexture.needsUpdate"

			},

			"CompressedTexture": {

				"#PARENT": "Texture",
				"#URL": "api/textures/CompressedTexture",
				"flipY": "CompressedTexture.flipY",
				"generateMipmaps": "CompressedTexture.generateMipmaps"

			},

			"CubeTexture": {

				"#PARENT": "Texture",
				"#URL": "api/textures/CubeTexture"

			},

			"DataTexture": {

				"#PARENT": "Texture",
				"#URL": "api/textures/DataTexture",
				"image": "DataTexture.image"

			},

			"DepthTexture": {

				"#PARENT": "Texture",
				"#URL": "api/textures/DepthTexture"

			},

			"Texture": {

				"#URL": "api/textures/Texture",
				"anisotropy": "Texture.anisotropy",
				"center": "Texture.center",
				"clone": "Texture.clone",
				"dispose": "Texture.dispose",
				"encoding": "Texture.encoding",
				"flipY": "Texture.flipY",
				"format": "Texture.format",
				"generateMipmaps": "Texture.generateMipmaps",
				"id": "Texture.id",
				"image": "Texture.image",
				"magFilter": "Texture.magFilter",
				"mapping": "Texture.mapping",
				"matrix": "Texture.matrix",
				"matrixAutoUpdate": "Texture.matrixAutoUpdate",
				"minFilter": "Texture.minFilter",
				"mipmaps": "Texture.mipmaps",
				"name": "Texture.name",
				"needsUpdate": "Texture.needsUpdate",
				"offset": "Texture.offset",
				"onUpdate": "Texture.onUpdate",
				"premultiplyAlpha": "Texture.premultiplyAlpha",
				"repeat": "Texture.repeat",
				"rotation": "Texture.rotation",
				"toJSON": "Texture.toJSON",
				"transformUv": "Texture.transformUv",
				"type": "Texture.type",
				"unpackAlignment": "Texture.unpackAlignment",
				"uuid": "Texture.uuid",
				"version": "Texture.version",
				"wrapS": "Texture.wrapS",
				"wrapT": "Texture.wrapT"

			},

			"VideoTexture": {

				"#PARENT": "Texture",
				"#URL": "api/textures/VideoTexture",
				"needsUpdate": "VideoTexture.needsUpdate",
				"update": "VideoTexture.update"

			}


		}


	},

	"Examples": {

		"Controls": {

			"OrbitControls": {

				"#URL": "examples/controls/OrbitControls",
				"autoRotate": "OrbitControls.autoRotate",
				"autoRotateSpeed": "OrbitControls.autoRotateSpeed",
				"dampingFactor": "OrbitControls.dampingFactor",
				"dispose": "OrbitControls.dispose",
				"domElement": "OrbitControls.domElement",
				"enableDamping": "OrbitControls.enableDamping",
				"enableKeys": "OrbitControls.enableKeys",
				"enablePan": "OrbitControls.enablePan",
				"enableRotate": "OrbitControls.enableRotate",
				"enableZoom": "OrbitControls.enableZoom",
				"enabled": "OrbitControls.enabled",
				"getAzimuthalAngle": "OrbitControls.getAzimuthalAngle",
				"getPolarAngle": "OrbitControls.getPolarAngle",
				"keyPanSpeed": "OrbitControls.keyPanSpeed",
				"keys": "OrbitControls.keys",
				"maxAzimuthAngle": "OrbitControls.maxAzimuthAngle",
				"maxDistance": "OrbitControls.maxDistance",
				"maxPolarAngle": "OrbitControls.maxPolarAngle",
				"maxZoom": "OrbitControls.maxZoom",
				"minAzimuthAngle": "OrbitControls.minAzimuthAngle",
				"minDistance": "OrbitControls.minDistance",
				"minPolarAngle": "OrbitControls.minPolarAngle",
				"minZoom": "OrbitControls.minZoom",
				"mouseButtons": "OrbitControls.mouseButtons",
				"object": "OrbitControls.object",
				"position0": "OrbitControls.position0",
				"reset": "OrbitControls.reset",
				"rotateSpeed": "OrbitControls.rotateSpeed",
				"saveState": "OrbitControls.saveState",
				"target": "OrbitControls.target",
				"target0": "OrbitControls.target0",
				"update": "OrbitControls.update",
				"zoom0": "OrbitControls.zoom0",
				"zoomSpeed": "OrbitControls.zoomSpeed"

			}


		},

		"Geometries": {

			"ConvexBufferGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "examples/geometries/ConvexBufferGeometry"

			},

			"ConvexGeometry": {

				"#PARENT": "Geometry",
				"#URL": "examples/geometries/ConvexGeometry"

			},

			"DecalGeometry": {

				"#PARENT": "BufferGeometry",
				"#URL": "examples/geometries/DecalGeometry"

			}


		},

		"Loaders": {

			"BabylonLoader": {

				"#URL": "examples/loaders/BabylonLoader",
				"load": "BabylonLoader.load",
				"parse": "BabylonLoader.parse"

			},

			"GLTFLoader": {

				"#PARENT": "Loader",
				"#URL": "examples/loaders/GLTFLoader",
				"load": "GLTFLoader.load",
				"parse": "GLTFLoader.parse",
				"setCrossOrigin": "GLTFLoader.setCrossOrigin",
				"setPath": "GLTFLoader.setPath"

			},

			"MTLLoader": {

				"#URL": "examples/loaders/MTLLoader",
				"load": "MTLLoader.load",
				"parse": "MTLLoader.parse",
				"setCrossOrigin": "MTLLoader.setCrossOrigin",
				"setMaterialOptions": "MTLLoader.setMaterialOptions",
				"setPath": "MTLLoader.setPath",
				"setTexturePath": "MTLLoader.setTexturePath"

			},

			"OBJLoader": {

				"#URL": "examples/loaders/OBJLoader",
				"load": "OBJLoader.load",
				"parse": "OBJLoader.parse"

			},

			"OBJLoader2": {

				"#URL": "examples/loaders/OBJLoader2",
				"getLogger": "OBJLoader2.getLogger",
				"load": "OBJLoader2.load",
				"parse": "OBJLoader2.parse",
				"parseAsync": "OBJLoader2.parseAsync",
				"run": "OBJLoader2.run",
				"setDisregardNormals": "OBJLoader2.setDisregardNormals",
				"setMaterialPerSmoothingGroup": "OBJLoader2.setMaterialPerSmoothingGroup",
				"setMaterials": "OBJLoader2.setMaterials",
				"setModelName": "OBJLoader2.setModelName",
				"setPath": "OBJLoader2.setPath",
				"setStreamMeshesTo": "OBJLoader2.setStreamMeshesTo",
				"setUseIndices": "OBJLoader2.setUseIndices"

			},

			"LoaderSupport": {

				"#URL": "examples/loaders/LoaderSupport",
				"addMesh": "LoaderSupport.addMesh",
				"addResource": "LoaderSupport.addResource",
				"applyProperties": "LoaderSupport.applyProperties",
				"buildMeshes": "LoaderSupport.buildMeshes",
				"enqueueForRun": "LoaderSupport.enqueueForRun",
				"getCallbacks": "LoaderSupport.getCallbacks",
				"getLogger": "LoaderSupport.getLogger",
				"getMaterials": "LoaderSupport.getMaterials",
				"getMaterialsJSON": "LoaderSupport.getMaterialsJSON",
				"getMaxQueueSize": "LoaderSupport.getMaxQueueSize",
				"getMaxWebWorkers": "LoaderSupport.getMaxWebWorkers",
				"isDebug": "LoaderSupport.isDebug",
				"isDisregardMesh": "LoaderSupport.isDisregardMesh",
				"isEnabled": "LoaderSupport.isEnabled",
				"isRunning": "LoaderSupport.isRunning",
				"isValid": "LoaderSupport.isValid",
				"logDebug": "LoaderSupport.logDebug",
				"logError": "LoaderSupport.logError",
				"logInfo": "LoaderSupport.logInfo",
				"logTimeEnd": "LoaderSupport.logTimeEnd",
				"logTimeStart": "LoaderSupport.logTimeStart",
				"logWarn": "LoaderSupport.logWarn",
				"onProgress": "LoaderSupport.onProgress",
				"prepareWorkers": "LoaderSupport.prepareWorkers",
				"processPayload": "LoaderSupport.processPayload",
				"processQueue": "LoaderSupport.processQueue",
				"providesAlteredMeshes": "LoaderSupport.providesAlteredMeshes",
				"run": "LoaderSupport.run",
				"setCallbackOnLoad": "LoaderSupport.setCallbackOnLoad",
				"setCallbackOnLoadMaterials": "LoaderSupport.setCallbackOnLoadMaterials",
				"setCallbackOnMeshAlter": "LoaderSupport.setCallbackOnMeshAlter",
				"setCallbackOnProgress": "LoaderSupport.setCallbackOnProgress",
				"setCallbacks": "LoaderSupport.setCallbacks",
				"setCrossOrigin": "LoaderSupport.setCrossOrigin",
				"setDebug": "LoaderSupport.setDebug",
				"setDisregardNormals": "LoaderSupport.setDisregardNormals",
				"setEnabled": "LoaderSupport.setEnabled",
				"setMaterialPerSmoothingGroup": "LoaderSupport.setMaterialPerSmoothingGroup",
				"setMaterials": "LoaderSupport.setMaterials",
				"setModelName": "LoaderSupport.setModelName",
				"setPath": "LoaderSupport.setPath",
				"setStreamMeshesTo": "LoaderSupport.setStreamMeshesTo",
				"setTerminateRequested": "LoaderSupport.setTerminateRequested",
				"setUseAsync": "LoaderSupport.setUseAsync",
				"setUseIndices": "LoaderSupport.setUseIndices",
				"tearDown": "LoaderSupport.tearDown",
				"updateMaterials": "LoaderSupport.updateMaterials",
				"validate": "LoaderSupport.validate",
				"verifyInput": "LoaderSupport.verifyInput"

			},

			"PCDLoader": {

				"#URL": "examples/loaders/PCDLoader",
				"load": "PCDLoader.load",
				"parse": "PCDLoader.parse"

			},

			"PDBLoader": {

				"#URL": "examples/loaders/PDBLoader",
				"load": "PDBLoader.load",
				"parse": "PDBLoader.parse"

			},

			"SVGLoader": {

				"#URL": "examples/loaders/SVGLoader",
				"load": "SVGLoader.load"

			},

			"TGALoader": {

				"#URL": "examples/loaders/TGALoader",
				"load": "TGALoader.load"

			},

			"PRWMLoader": {

				"#URL": "examples/loaders/PRWMLoader",
				"load": "PRWMLoader.load",
				"parse": "PRWMLoader.parse"

			}


		},

		"Exporters": {

			"GLTFExporter": {

				"#URL": "examples/exporters/GLTFExporter",
				"parse": "GLTFExporter.parse"

			}


		},

		"Plugins": {

			"LookupTable": {

				"#URL": "examples/Lut",
				"addColorMap": "LookupTable.addColorMap",
				"changeColorMap": "LookupTable.changeColorMap",
				"changeNumberOfColors": "LookupTable.changeNumberOfColors",
				"copy": "LookupTable.copy",
				"getColor": "LookupTable.getColor",
				"maxV": "LookupTable.maxV",
				"minV": "LookupTable.minV",
				"setmaxV": "LookupTable.setmaxV",
				"setminV": "LookupTable.setminV"

			},

			"SpriteCanvasMaterial": {

				"#PARENT": "Material",
				"#URL": "examples/SpriteCanvasMaterial",
				"color": "SpriteCanvasMaterial.color",
				"program": "SpriteCanvasMaterial.program"

			}


		},

		"QuickHull": {

			"Face": {

				"#URL": "examples/quickhull/Face",
				"area": "Face.area",
				"compute": "Face.compute",
				"constant": "Face.constant",
				"create": "Face.create",
				"distanceToPoint": "Face.distanceToPoint",
				"edge": "Face.edge",
				"getEdge": "Face.getEdge",
				"mark": "Face.mark",
				"midpoint": "Face.midpoint",
				"normal": "Face.normal",
				"outside": "Face.outside"

			},

			"HalfEdge": {

				"#URL": "examples/quickhull/HalfEdge",
				"face": "HalfEdge.face",
				"head": "HalfEdge.head",
				"length": "HalfEdge.length",
				"lengthSquared": "HalfEdge.lengthSquared",
				"next": "HalfEdge.next",
				"prev": "HalfEdge.prev",
				"setTwin": "HalfEdge.setTwin",
				"tail": "HalfEdge.tail",
				"twin": "HalfEdge.twin",
				"vertex": "HalfEdge.vertex"

			},

			"QuickHull": {

				"#URL": "examples/quickhull/QuickHull",
				"addAdjoiningFace": "QuickHull.addAdjoiningFace",
				"addNewFaces": "QuickHull.addNewFaces",
				"addVertexToFace": "QuickHull.addVertexToFace",
				"addVertexToHull": "QuickHull.addVertexToHull",
				"assigned": "QuickHull.assigned",
				"cleanup": "QuickHull.cleanup",
				"compute": "QuickHull.compute",
				"computeExtremes": "QuickHull.computeExtremes",
				"computeHorizon": "QuickHull.computeHorizon",
				"computeInitialHull": "QuickHull.computeInitialHull",
				"deleteFaceVertices": "QuickHull.deleteFaceVertices",
				"faces": "QuickHull.faces",
				"makeEmpty": "QuickHull.makeEmpty",
				"newFaces": "QuickHull.newFaces",
				"nextVertexToAdd": "QuickHull.nextVertexToAdd",
				"reindexFaces": "QuickHull.reindexFaces",
				"removeAllVerticesFromFace": "QuickHull.removeAllVerticesFromFace",
				"removeVertexFromFace": "QuickHull.removeVertexFromFace",
				"resolveUnassignedPoints": "QuickHull.resolveUnassignedPoints",
				"setFromObject": "QuickHull.setFromObject",
				"setFromPoints": "QuickHull.setFromPoints",
				"tolerance": "QuickHull.tolerance",
				"unassigned": "QuickHull.unassigned",
				"vertices": "QuickHull.vertices"

			},

			"VertexNode": {

				"#URL": "examples/quickhull/VertexNode",
				"face": "VertexNode.face",
				"next": "VertexNode.next",
				"point": "VertexNode.point",
				"prev": "VertexNode.prev"

			},

			"VertexList": {

				"#URL": "examples/quickhull/VertexList",
				"append": "VertexList.append",
				"appendChain": "VertexList.appendChain",
				"clear": "VertexList.clear",
				"first": "VertexList.first",
				"head": "VertexList.head",
				"insertAfter": "VertexList.insertAfter",
				"insertBefore": "VertexList.insertBefore",
				"isEmpty": "VertexList.isEmpty",
				"last": "VertexList.last",
				"remove": "VertexList.remove",
				"removeSubList": "VertexList.removeSubList",
				"tail": "VertexList.tail"

			}


		},

		"Renderers": {

			"CanvasRenderer": {

				"#URL": "examples/renderers/CanvasRenderer",
				"autoClear": "CanvasRenderer.autoClear",
				"clear": "CanvasRenderer.clear",
				"clearColor": "CanvasRenderer.clearColor",
				"clearDepth": "CanvasRenderer.clearDepth",
				"clearStencil": "CanvasRenderer.clearStencil",
				"domElement": "CanvasRenderer.domElement",
				"getClearAlpha": "CanvasRenderer.getClearAlpha",
				"getClearColorHex": "CanvasRenderer.getClearColorHex",
				"getMaxAnisotropy": "CanvasRenderer.getMaxAnisotropy",
				"info": "CanvasRenderer.info",
				"render": "CanvasRenderer.render",
				"setClearColor": "CanvasRenderer.setClearColor",
				"setClearColorHex": "CanvasRenderer.setClearColorHex",
				"setFaceCulling": "CanvasRenderer.setFaceCulling",
				"setSize": "CanvasRenderer.setSize",
				"sortElements": "CanvasRenderer.sortElements",
				"sortObjects": "CanvasRenderer.sortObjects",
				"supportsVertexTextures": "CanvasRenderer.supportsVertexTextures"

			}


		},

		"Utils": {

			"SceneUtils": {

				"#URL": "examples/utils/SceneUtils",
				"attach": "SceneUtils.attach",
				"createMultiMaterialObject": "SceneUtils.createMultiMaterialObject",
				"detach": "SceneUtils.detach"

			}


		}


	},

	"Developer Reference": {

		"Polyfills": {

			"Polyfills": "api/Polyfills"

		},

		"WebGLRenderer": {

			"WebGLProgram": "api/renderers/webgl/WebGLProgram",
			"WebGLShader": "api/renderers/webgl/WebGLShader",
			"WebGLState": "api/renderers/webgl/WebGLState"

		},

		"WebGLRenderer / Plugins": {

			"LensFlarePlugin": "api/renderers/webgl/plugins/LensFlarePlugin",
			"SpritePlugin": "api/renderers/webgl/plugins/SpritePlugin"

		}


	}

}