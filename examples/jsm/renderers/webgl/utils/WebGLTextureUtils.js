import { LinearFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, NearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, FloatType, MirroredRepeatWrapping, ClampToEdgeWrapping, RepeatWrapping, SRGBColorSpace, NeverCompare, AlwaysCompare, LessCompare, LessEqualCompare, EqualCompare, GreaterEqualCompare, GreaterCompare, NotEqualCompare } from 'three';

let initialized = false, wrappingToGL, filterToGL, compareToGL;

class WebGLTextureUtils {

	constructor( backend ) {

		this.backend = backend;

		this.gl = backend.gl;
		this.extensions = backend.extensions;
		this.defaultTextures = {};

		if ( initialized === false ) {

			this._init( this.gl );

			initialized = true;

		}

	}

	_init( gl ) {

		// Store only WebGL constants here.

		wrappingToGL = {
			[ RepeatWrapping ]: gl.REPEAT,
			[ ClampToEdgeWrapping ]: gl.CLAMP_TO_EDGE,
			[ MirroredRepeatWrapping ]: gl.MIRRORED_REPEAT
		};

		filterToGL = {
			[ NearestFilter ]: gl.NEAREST,
			[ NearestMipmapNearestFilter ]: gl.NEAREST_MIPMAP_NEAREST,
			[ NearestMipmapLinearFilter ]: gl.NEAREST_MIPMAP_LINEAR,

			[ LinearFilter ]: gl.LINEAR,
			[ LinearMipmapNearestFilter ]: gl.LINEAR_MIPMAP_NEAREST,
			[ LinearMipmapLinearFilter ]: gl.LINEAR_MIPMAP_LINEAR
		};

		compareToGL = {
			[ NeverCompare ]: gl.NEVER,
			[ AlwaysCompare ]: gl.ALWAYS,
			[ LessCompare ]: gl.LESS,
			[ LessEqualCompare ]: gl.LEQUAL,
			[ EqualCompare ]: gl.EQUAL,
			[ GreaterEqualCompare ]: gl.GEQUAL,
			[ GreaterCompare ]: gl.GREATER,
			[ NotEqualCompare ]: gl.NOTEQUAL
		};

	}

	filterFallback( f ) {

		const { gl } = this;

		if ( f === NearestFilter || f === NearestMipmapNearestFilter || f === NearestMipmapLinearFilter ) {

			return gl.NEAREST;

		}

		return gl.LINEAR;

	}

	getGLTextureType( texture ) {

		const { gl } = this;

		let glTextureType;

		if ( texture.isCubeTexture === true ) {

			glTextureType = gl.TEXTURE_CUBE_MAP;

		} else if ( texture.isDataArrayTexture === true ) {

			glTextureType = gl.TEXTURE_2D_ARRAY;

		} else {

			glTextureType = gl.TEXTURE_2D;


		}

		return glTextureType;

	}

	getInternalFormat( internalFormatName, glFormat, glType, colorSpace, forceLinearTransfer = false ) {

		const { gl, extensions } = this;

		if ( internalFormatName !== null ) {

			if ( gl[ internalFormatName ] !== undefined ) return gl[ internalFormatName ];

			console.warn( 'THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format \'' + internalFormatName + '\'' );

		}

		let internalFormat = glFormat;

		if ( glFormat === gl.RED ) {

			if ( glType === gl.FLOAT ) internalFormat = gl.R32F;
			if ( glType === gl.HALF_FLOAT ) internalFormat = gl.R16F;
			if ( glType === gl.UNSIGNED_BYTE ) internalFormat = gl.R8;

		}

		if ( glFormat === gl.RED_INTEGER ) {

			if ( glType === gl.UNSIGNED_BYTE ) internalFormat = gl.R8UI;
			if ( glType === gl.UNSIGNED_SHORT ) internalFormat = gl.R16UI;
			if ( glType === gl.UNSIGNED_INT ) internalFormat = gl.R32UI;
			if ( glType === gl.BYTE ) internalFormat = gl.R8I;
			if ( glType === gl.SHORT ) internalFormat = gl.R16I;
			if ( glType === gl.INT ) internalFormat = gl.R32I;

		}

		if ( glFormat === gl.RG ) {

			if ( glType === gl.FLOAT ) internalFormat = gl.RG32F;
			if ( glType === gl.HALF_FLOAT ) internalFormat = gl.RG16F;
			if ( glType === gl.UNSIGNED_BYTE ) internalFormat = gl.RG8;

		}

		if ( glFormat === gl.RGBA ) {

			if ( glType === gl.FLOAT ) internalFormat = gl.RGBA32F;
			if ( glType === gl.HALF_FLOAT ) internalFormat = gl.RGBA16F;
			if ( glType === gl.UNSIGNED_BYTE ) internalFormat = ( colorSpace === SRGBColorSpace && forceLinearTransfer === false ) ? gl.SRGB8_ALPHA8 : gl.RGBA8;
			if ( glType === gl.UNSIGNED_SHORT_4_4_4_4 ) internalFormat = gl.RGBA4;
			if ( glType === gl.UNSIGNED_SHORT_5_5_5_1 ) internalFormat = gl.RGB5_A1;

		}

		if ( glFormat === gl.DEPTH_COMPONENT ) {

			if ( glType === gl.UNSIGNED_INT ) internalFormat = gl.DEPTH24_STENCIL8;
			if ( glType === gl.FLOAT ) internalFormat = gl.DEPTH_COMPONENT32F;

		}

		if ( glFormat === gl.DEPTH_STENCIL ) {

			if ( glType === gl.UNSIGNED_INT_24_8 ) internalFormat = gl.DEPTH24_STENCIL8;

		}

		if ( internalFormat === gl.R16F || internalFormat === gl.R32F ||
			internalFormat === gl.RG16F || internalFormat === gl.RG32F ||
			internalFormat === gl.RGBA16F || internalFormat === gl.RGBA32F ) {

			extensions.get( 'EXT_color_buffer_float' );

		}

		return internalFormat;

	}

	setTextureParameters( textureType, texture ) {

		const { gl, extensions } = this;

		gl.texParameteri( textureType, gl.TEXTURE_WRAP_S, wrappingToGL[ texture.wrapS ] );
		gl.texParameteri( textureType, gl.TEXTURE_WRAP_T, wrappingToGL[ texture.wrapT ] );

		if ( textureType === gl.TEXTURE_3D || textureType === gl.TEXTURE_2D_ARRAY ) {

			gl.texParameteri( textureType, gl.TEXTURE_WRAP_R, wrappingToGL[ texture.wrapR ] );

		}

		gl.texParameteri( textureType, gl.TEXTURE_MAG_FILTER, filterToGL[ texture.magFilter ] );
		gl.texParameteri( textureType, gl.TEXTURE_MIN_FILTER, filterToGL[ texture.minFilter ] );

		if ( texture.compareFunction ) {

			gl.texParameteri( textureType, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE );
			gl.texParameteri( textureType, gl.TEXTURE_COMPARE_FUNC, compareToGL[ texture.compareFunction ] );

		}

		if ( extensions.has( 'EXT_texture_filter_anisotropic' ) === true ) {

			//extension = extensions.get( 'EXT_texture_filter_anisotropic' );

			if ( texture.magFilter === NearestFilter ) return;
			if ( texture.minFilter !== NearestMipmapLinearFilter && texture.minFilter !== LinearMipmapLinearFilter ) return;
			if ( texture.type === FloatType && extensions.has( 'OES_texture_float_linear' ) === false ) return; // verify extension for WebGL 1 and WebGL 2

			if ( texture.anisotropy > 1 /*|| properties.get( texture ).__currentAnisotropy*/ ) {

				//gl.texParameterf( textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min( texture.anisotropy, capabilities.getMaxAnisotropy() ) );
				//properties.get( texture ).__currentAnisotropy = texture.anisotropy;

			}

		}

	}

	createDefaultTexture( texture ) {

		const { gl, backend, defaultTextures } = this;


		const glTextureType = this.getGLTextureType( texture );

		let textureGPU = defaultTextures[ glTextureType ];

		if ( textureGPU === undefined ) {

			textureGPU = gl.createTexture();

			gl.bindTexture( glTextureType, textureGPU );
			gl.texParameteri( glTextureType, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
			gl.texParameteri( glTextureType, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

			// gl.texImage2D( glTextureType, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data );

			defaultTextures[ glTextureType ] = textureGPU;

		}

		backend.set( texture, {
			textureGPU,
			glTextureType,
			isDefault: true
		} );

	}

	createTexture( texture, options ) {

		const { gl, backend } = this;
		const { levels, width, height, depth } = options;

		const glFormat = backend.utils.convert( texture.format, texture.colorSpace );
		const glType = backend.utils.convert( texture.type );
		const glInternalFormat = this.getInternalFormat( texture.internalFormat, glFormat, glType, texture.colorSpace, texture.isVideoTexture );

		const textureGPU = gl.createTexture();
		const glTextureType = this.getGLTextureType( texture );

		gl.bindTexture( glTextureType, textureGPU );

		gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, texture.flipY );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha );
		gl.pixelStorei( gl.UNPACK_ALIGNMENT, texture.unpackAlignment );
		gl.pixelStorei( gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE );

		this.setTextureParameters( glTextureType, texture );

		gl.bindTexture( glTextureType, textureGPU );

		if ( texture.isDataArrayTexture ) {

			gl.texStorage3D( gl.TEXTURE_2D_ARRAY, levels, glInternalFormat, width, height, depth );

		} else if ( ! texture.isVideoTexture ) {

			gl.texStorage2D( glTextureType, levels, glInternalFormat, width, height );

		}

		backend.set( texture, {
			textureGPU,
			glTextureType,
			glFormat,
			glType,
			glInternalFormat
		} );

	}

	updateTexture( texture, options ) {

		const { gl } = this;
		const { width, height } = options;
		const { textureGPU, glTextureType, glFormat, glType, glInternalFormat } = this.backend.get( texture );

		if ( texture.isRenderTargetTexture || ( textureGPU === undefined /* unsupported texture format */ ) )
			return;

		const getImage = ( source ) => {

			if ( source.isDataTexture ) {

				return source.image.data;

			} else if ( source instanceof ImageBitmap || source instanceof OffscreenCanvas || source instanceof HTMLImageElement || source instanceof HTMLCanvasElement ) {

				return source;

			}

			return source.data;

		};

		gl.bindTexture( glTextureType, textureGPU );

		if ( texture.isCompressedTexture ) {

			const mipmaps = texture.mipmaps;

			for ( let i = 0; i < mipmaps.length; i ++ ) {

				const mipmap = mipmaps[ i ];

				if ( texture.isCompressedArrayTexture ) {

					const image = options.image;

					if ( texture.format !== gl.RGBA ) {

						if ( glFormat !== null ) {

							gl.compressedTexSubImage3D( gl.TEXTURE_2D_ARRAY, i, 0, 0, 0, mipmap.width, mipmap.height, image.depth, glFormat, mipmap.data, 0, 0 );


						} else {

							console.warn( 'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()' );

						}

					} else {

						gl.texSubImage3D( gl.TEXTURE_2D_ARRAY, i, 0, 0, 0, mipmap.width, mipmap.height, image.depth, glFormat, glType, mipmap.data );

					}

				} else {

					if ( glFormat !== null ) {

						gl.compressedTexSubImage2D( gl.TEXTURE_2D, i, 0, 0, mipmap.width, mipmap.height, glFormat, mipmap.data );

					} else {

						console.warn( 'Unsupported compressed texture format' );

					}

				}

			}

		} else if ( texture.isCubeTexture ) {

			const images = options.images;

			for ( let i = 0; i < 6; i ++ ) {

				const image = getImage( images[ i ] );

				gl.texSubImage2D( gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, 0, 0, width, height, glFormat, glType, image );

			}

		} else if ( texture.isDataArrayTexture ) {

			const image = options.image;

			gl.texSubImage3D( gl.TEXTURE_2D_ARRAY, 0, 0, 0, 0, image.width, image.height, image.depth, glFormat, glType, image.data );

		} else if ( texture.isVideoTexture ) {

			texture.update();

			gl.texImage2D( glTextureType, 0, glInternalFormat, glFormat, glType, options.image );


		} else {

			const image = getImage( options.image );

			gl.texSubImage2D( glTextureType, 0, 0, 0, width, height, glFormat, glType, image );

		}

	}

	generateMipmaps( texture ) {

		const { gl, backend } = this;
		const { textureGPU, glTextureType } = backend.get( texture );

		gl.bindTexture( glTextureType, textureGPU );
		gl.generateMipmap( glTextureType );

	}

	destroyTexture( texture ) {

		const { gl, backend } = this;
		const { textureGPU, renderTarget } = backend.get( texture );

		// remove framebuffer reference
		if ( renderTarget ) {

			const renderContextData = backend.get( renderTarget );
			renderContextData.framebuffer = undefined;
			renderContextData.msaaFrameBuffer = undefined;
			renderContextData.depthRenderbuffer = undefined;

		}

		gl.deleteTexture( textureGPU );

		backend.delete( texture );

	}



	// Setup storage for internal depth/stencil buffers and bind to correct framebuffer
	setupRenderBufferStorage( renderbuffer, renderContext ) {

		const { gl } = this;
		const renderTarget = renderContext.renderTarget;

		const { samples, depthTexture, depthBuffer, stencilBuffer, width, height } = renderTarget;

		gl.bindRenderbuffer( gl.RENDERBUFFER, renderbuffer );

		if ( depthBuffer && ! stencilBuffer ) {

			let glInternalFormat = gl.DEPTH_COMPONENT24;

			if ( samples > 0 ) {


				if ( depthTexture && depthTexture.isDepthTexture ) {

					if ( depthTexture.type === gl.FLOAT ) {

						glInternalFormat = gl.DEPTH_COMPONENT32F;

					}

				}

				gl.renderbufferStorageMultisample( gl.RENDERBUFFER, samples, glInternalFormat, width, height );

			} else {

				gl.renderbufferStorage( gl.RENDERBUFFER, glInternalFormat, width, height );

			}

			gl.framebufferRenderbuffer( gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer );

		} else if ( depthBuffer && stencilBuffer ) {

			if ( samples > 0 ) {

				gl.renderbufferStorageMultisample( gl.RENDERBUFFER, samples, gl.DEPTH24_STENCIL8, width, height );

			} else {

				gl.renderbufferStorage( gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height );

			}


			gl.framebufferRenderbuffer( gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, renderbuffer );

		} else {

			const textures = renderContext.textures;

			for ( let i = 0; i < textures.length; i ++ ) {

				const texture = textures[ i ];
				const { glInternalFormat } = this.get( texture );

				if ( samples > 0 ) {

					gl.renderbufferStorageMultisample( gl.RENDERBUFFER, samples, glInternalFormat, width, height );

				} else {

					gl.renderbufferStorage( gl.RENDERBUFFER, glInternalFormat, width, height );

				}

			}

		}

		gl.bindRenderbuffer( gl.RENDERBUFFER, null );

	}

	async copyTextureToBuffer( texture, x, y, width, height ) {

		const { backend, gl } = this;

		const { textureGPU, glFormat, glType } = this.backend.get( texture );

		const fb = gl.createFramebuffer();

		gl.bindFramebuffer( gl.READ_FRAMEBUFFER, fb );
		gl.framebufferTexture2D( gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textureGPU, 0 );

		const typedArrayType = this._getTypedArrayType( glType );
		const bytesPerTexel = this._getBytesPerTexel( glFormat );

		const elementCount = width * height;
		const byteLength = elementCount * bytesPerTexel;

		const buffer = gl.createBuffer();

		gl.bindBuffer( gl.PIXEL_PACK_BUFFER, buffer );
		gl.bufferData( gl.PIXEL_PACK_BUFFER, byteLength, gl.STREAM_READ );
		gl.readPixels( x, y, width, height, glFormat, glType, 0 );
		gl.bindBuffer( gl.PIXEL_PACK_BUFFER, null );

		await backend.utils._clientWaitAsync();

		const dstBuffer = new typedArrayType( elementCount );

		gl.bindBuffer( gl.PIXEL_PACK_BUFFER, buffer );
		gl.getBufferSubData( gl.PIXEL_PACK_BUFFER, 0, dstBuffer );
		gl.bindBuffer( gl.PIXEL_PACK_BUFFER, null );

		gl.deleteFramebuffer( fb );

		return dstBuffer;

	}

	_getTypedArrayType( glType ) {

		const { gl } = this;

		if ( glType === gl.UNSIGNED_BYTE ) return Uint8Array;

		if ( glType === gl.UNSIGNED_SHORT_4_4_4_4 ) return Uint16Array;
		if ( glType === gl.UNSIGNED_SHORT_5_5_5_1 ) return Uint16Array;
		if ( glType === gl.UNSIGNED_SHORT_5_6_5 ) return Uint16Array;
		if ( glType === gl.UNSIGNED_SHORT ) return Uint16Array;

		if ( glType === gl.UNSIGNED_INT ) return Uint32Array;

		if ( glType === gl.UNSIGNED_FLOAT ) return Float32Array;

	}

	_getBytesPerTexel( glFormat ) {

		const { gl } = this;

		if ( glFormat === gl.RGBA ) return 4;
		if ( glFormat === gl.RGB ) return 3;
		if ( glFormat === gl.ALPHA ) return 1;

	}

}

export default WebGLTextureUtils;
