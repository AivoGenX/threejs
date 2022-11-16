!(function (_, t) {
	"object" == typeof exports && "undefined" != typeof module
		? t(exports)
		: "function" == typeof define && define.amd
		? define(["exports"], t)
		: t(((_ || self).KTX = {}));
})(this, function (_) {
	var t = function () {
			(this.vkFormat = 0),
				(this.typeSize = 1),
				(this.pixelWidth = 0),
				(this.pixelHeight = 0),
				(this.pixelDepth = 0),
				(this.layerCount = 0),
				(this.faceCount = 1),
				(this.supercompressionScheme = 0),
				(this.levels = []),
				(this.dataFormatDescriptor = [
					{
						vendorId: 0,
						descriptorType: 0,
						descriptorBlockSize: 0,
						versionNumber: 2,
						colorModel: 0,
						colorPrimaries: 1,
						transferFunction: 2,
						flags: 0,
						texelBlockDimension: [0, 0, 0, 0],
						bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0],
						samples: [],
					},
				]),
				(this.keyValue = {}),
				(this.globalData = null);
		},
		e = /*#__PURE__*/ (function () {
			function _(_, t, e, R) {
				(this._dataView = void 0),
					(this._littleEndian = void 0),
					(this._offset = void 0),
					(this._dataView = new DataView(_.buffer, _.byteOffset + t, e)),
					(this._littleEndian = R),
					(this._offset = 0);
			}
			var t = _.prototype;
			return (
				(t._nextUint8 = function () {
					var _ = this._dataView.getUint8(this._offset);
					return (this._offset += 1), _;
				}),
				(t._nextUint16 = function () {
					var _ = this._dataView.getUint16(this._offset, this._littleEndian);
					return (this._offset += 2), _;
				}),
				(t._nextUint32 = function () {
					var _ = this._dataView.getUint32(this._offset, this._littleEndian);
					return (this._offset += 4), _;
				}),
				(t._nextUint64 = function () {
					var _ = this._dataView.getUint32(this._offset, this._littleEndian),
						t = this._dataView.getUint32(this._offset + 4, this._littleEndian),
						e = _ + Math.pow(2, 32) * t;
					return (this._offset += 8), e;
				}),
				(t._nextInt32 = function () {
					var _ = this._dataView.getInt32(this._offset, this._littleEndian);
					return (this._offset += 4), _;
				}),
				(t._skip = function (_) {
					return (this._offset += _), this;
				}),
				(t._scan = function (_, t) {
					void 0 === t && (t = 0);
					for (
						var e = this._offset, R = 0;
						this._dataView.getUint8(this._offset) !== t && R < _;

					)
						R++, this._offset++;
					return (
						R < _ && this._offset++,
						new Uint8Array(
							this._dataView.buffer,
							this._dataView.byteOffset + e,
							R
						)
					);
				}),
				_
			);
		})(),
		R = new Uint8Array([0]),
		n = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
	function A() {
		return (
			(A = Object.assign
				? Object.assign.bind()
				: function (_) {
						for (var t = 1; t < arguments.length; t++) {
							var e = arguments[t];
							for (var R in e)
								Object.prototype.hasOwnProperty.call(e, R) && (_[R] = e[R]);
						}
						return _;
				  }),
			A.apply(this, arguments)
		);
	}
	function O(_, t) {
		(null == t || t > _.length) && (t = _.length);
		for (var e = 0, R = new Array(t); e < t; e++) R[e] = _[e];
		return R;
	}
	function i(_, t) {
		var e =
			("undefined" != typeof Symbol && _[Symbol.iterator]) || _["@@iterator"];
		if (e) return (e = e.call(_)).next.bind(e);
		if (
			Array.isArray(_) ||
			(e = (function (_, t) {
				if (_) {
					if ("string" == typeof _) return O(_, t);
					var e = Object.prototype.toString.call(_).slice(8, -1);
					return (
						"Object" === e && _.constructor && (e = _.constructor.name),
						"Map" === e || "Set" === e
							? Array.from(_)
							: "Arguments" === e ||
							  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
							? O(_, t)
							: void 0
					);
				}
			})(_)) ||
			(t && _ && "number" == typeof _.length)
		) {
			e && (_ = e);
			var R = 0;
			return function () {
				return R >= _.length ? { done: !0 } : { done: !1, value: _[R++] };
			};
		}
		throw new TypeError(
			"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
		);
	}
	function T(_) {
		return "undefined" != typeof TextEncoder
			? new TextEncoder().encode(_)
			: Buffer.from(_);
	}
	function K(_) {
		return "undefined" != typeof TextDecoder
			? new TextDecoder().decode(_)
			: Buffer.from(_).toString("utf8");
	}
	function r(_) {
		for (var t, e = 0, R = i(_); !(t = R()).done; ) e += t.value.byteLength;
		for (var n, A = new Uint8Array(e), O = 0, T = i(_); !(n = T()).done; ) {
			var K = n.value;
			A.set(new Uint8Array(K), O), (O += K.byteLength);
		}
		return A;
	}
	var a = { keepWriter: !1 };
	(_.KDF_DF_MODEL_UASTC = 166),
		(_.KHR_DF_CHANNEL_RGBSDA_ALPHA = 15),
		(_.KHR_DF_CHANNEL_RGBSDA_BLUE = 2),
		(_.KHR_DF_CHANNEL_RGBSDA_DEPTH = 14),
		(_.KHR_DF_CHANNEL_RGBSDA_GREEN = 1),
		(_.KHR_DF_CHANNEL_RGBSDA_RED = 0),
		(_.KHR_DF_CHANNEL_RGBSDA_STENCIL = 13),
		(_.KHR_DF_FLAG_ALPHA_PREMULTIPLIED = 1),
		(_.KHR_DF_FLAG_ALPHA_STRAIGHT = 0),
		(_.KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT = 0),
		(_.KHR_DF_MODEL_ASTC = 162),
		(_.KHR_DF_MODEL_ETC1 = 160),
		(_.KHR_DF_MODEL_ETC1S = 163),
		(_.KHR_DF_MODEL_ETC2 = 161),
		(_.KHR_DF_MODEL_RGBSDA = 1),
		(_.KHR_DF_MODEL_UNSPECIFIED = 0),
		(_.KHR_DF_PRIMARIES_ACES = 6),
		(_.KHR_DF_PRIMARIES_ACESCC = 7),
		(_.KHR_DF_PRIMARIES_ADOBERGB = 11),
		(_.KHR_DF_PRIMARIES_BT2020 = 4),
		(_.KHR_DF_PRIMARIES_BT601_EBU = 2),
		(_.KHR_DF_PRIMARIES_BT601_SMPTE = 3),
		(_.KHR_DF_PRIMARIES_BT709 = 1),
		(_.KHR_DF_PRIMARIES_CIEXYZ = 5),
		(_.KHR_DF_PRIMARIES_DISPLAYP3 = 10),
		(_.KHR_DF_PRIMARIES_NTSC1953 = 8),
		(_.KHR_DF_PRIMARIES_PAL525 = 9),
		(_.KHR_DF_PRIMARIES_UNSPECIFIED = 0),
		(_.KHR_DF_SAMPLE_DATATYPE_EXPONENT = 32),
		(_.KHR_DF_SAMPLE_DATATYPE_FLOAT = 128),
		(_.KHR_DF_SAMPLE_DATATYPE_LINEAR = 16),
		(_.KHR_DF_SAMPLE_DATATYPE_SIGNED = 64),
		(_.KHR_DF_TRANSFER_ACESCC = 16),
		(_.KHR_DF_TRANSFER_ACESCCT = 17),
		(_.KHR_DF_TRANSFER_ADOBERGB = 18),
		(_.KHR_DF_TRANSFER_BT1886 = 7),
		(_.KHR_DF_TRANSFER_DCIP3 = 12),
		(_.KHR_DF_TRANSFER_HLG_EOTF = 9),
		(_.KHR_DF_TRANSFER_HLG_OETF = 8),
		(_.KHR_DF_TRANSFER_ITU = 3),
		(_.KHR_DF_TRANSFER_LINEAR = 1),
		(_.KHR_DF_TRANSFER_NTSC = 4),
		(_.KHR_DF_TRANSFER_PAL625_EOTF = 14),
		(_.KHR_DF_TRANSFER_PAL_OETF = 13),
		(_.KHR_DF_TRANSFER_PQ_EOTF = 10),
		(_.KHR_DF_TRANSFER_PQ_OETF = 11),
		(_.KHR_DF_TRANSFER_SLOG = 5),
		(_.KHR_DF_TRANSFER_SLOG2 = 6),
		(_.KHR_DF_TRANSFER_SRGB = 2),
		(_.KHR_DF_TRANSFER_ST240 = 15),
		(_.KHR_DF_TRANSFER_UNSPECIFIED = 0),
		(_.KHR_DF_VENDORID_KHRONOS = 0),
		(_.KHR_DF_VERSION = 2),
		(_.KHR_SUPERCOMPRESSION_BASISLZ = 1),
		(_.KHR_SUPERCOMPRESSION_NONE = 0),
		(_.KHR_SUPERCOMPRESSION_ZLIB = 3),
		(_.KHR_SUPERCOMPRESSION_ZSTD = 2),
		(_.KTX2Container = t),
		(_.VK_FORMAT_A1R5G5B5_UNORM_PACK16 = 8),
		(_.VK_FORMAT_A2B10G10R10_SINT_PACK32 = 69),
		(_.VK_FORMAT_A2B10G10R10_SNORM_PACK32 = 65),
		(_.VK_FORMAT_A2B10G10R10_UINT_PACK32 = 68),
		(_.VK_FORMAT_A2B10G10R10_UNORM_PACK32 = 64),
		(_.VK_FORMAT_A2R10G10B10_SINT_PACK32 = 63),
		(_.VK_FORMAT_A2R10G10B10_SNORM_PACK32 = 59),
		(_.VK_FORMAT_A2R10G10B10_UINT_PACK32 = 62),
		(_.VK_FORMAT_A2R10G10B10_UNORM_PACK32 = 58),
		(_.VK_FORMAT_A4B4G4R4_UNORM_PACK16_EXT = 1000340001),
		(_.VK_FORMAT_A4R4G4B4_UNORM_PACK16_EXT = 100034e4),
		(_.VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK_EXT = 1000066011),
		(_.VK_FORMAT_ASTC_10x10_SRGB_BLOCK = 180),
		(_.VK_FORMAT_ASTC_10x10_UNORM_BLOCK = 179),
		(_.VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK_EXT = 1000066008),
		(_.VK_FORMAT_ASTC_10x5_SRGB_BLOCK = 174),
		(_.VK_FORMAT_ASTC_10x5_UNORM_BLOCK = 173),
		(_.VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK_EXT = 1000066009),
		(_.VK_FORMAT_ASTC_10x6_SRGB_BLOCK = 176),
		(_.VK_FORMAT_ASTC_10x6_UNORM_BLOCK = 175),
		(_.VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK_EXT = 1000066010),
		(_.VK_FORMAT_ASTC_10x8_SRGB_BLOCK = 178),
		(_.VK_FORMAT_ASTC_10x8_UNORM_BLOCK = 177),
		(_.VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK_EXT = 1000066012),
		(_.VK_FORMAT_ASTC_12x10_SRGB_BLOCK = 182),
		(_.VK_FORMAT_ASTC_12x10_UNORM_BLOCK = 181),
		(_.VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK_EXT = 1000066013),
		(_.VK_FORMAT_ASTC_12x12_SRGB_BLOCK = 184),
		(_.VK_FORMAT_ASTC_12x12_UNORM_BLOCK = 183),
		(_.VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT = 1000066e3),
		(_.VK_FORMAT_ASTC_4x4_SRGB_BLOCK = 158),
		(_.VK_FORMAT_ASTC_4x4_UNORM_BLOCK = 157),
		(_.VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK_EXT = 1000066001),
		(_.VK_FORMAT_ASTC_5x4_SRGB_BLOCK = 160),
		(_.VK_FORMAT_ASTC_5x4_UNORM_BLOCK = 159),
		(_.VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK_EXT = 1000066002),
		(_.VK_FORMAT_ASTC_5x5_SRGB_BLOCK = 162),
		(_.VK_FORMAT_ASTC_5x5_UNORM_BLOCK = 161),
		(_.VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK_EXT = 1000066003),
		(_.VK_FORMAT_ASTC_6x5_SRGB_BLOCK = 164),
		(_.VK_FORMAT_ASTC_6x5_UNORM_BLOCK = 163),
		(_.VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK_EXT = 1000066004),
		(_.VK_FORMAT_ASTC_6x6_SRGB_BLOCK = 166),
		(_.VK_FORMAT_ASTC_6x6_UNORM_BLOCK = 165),
		(_.VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK_EXT = 1000066005),
		(_.VK_FORMAT_ASTC_8x5_SRGB_BLOCK = 168),
		(_.VK_FORMAT_ASTC_8x5_UNORM_BLOCK = 167),
		(_.VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK_EXT = 1000066006),
		(_.VK_FORMAT_ASTC_8x6_SRGB_BLOCK = 170),
		(_.VK_FORMAT_ASTC_8x6_UNORM_BLOCK = 169),
		(_.VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK_EXT = 1000066007),
		(_.VK_FORMAT_ASTC_8x8_SRGB_BLOCK = 172),
		(_.VK_FORMAT_ASTC_8x8_UNORM_BLOCK = 171),
		(_.VK_FORMAT_B10G11R11_UFLOAT_PACK32 = 122),
		(_.VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16 = 1000156011),
		(_.VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16 = 1000156021),
		(_.VK_FORMAT_B4G4R4A4_UNORM_PACK16 = 3),
		(_.VK_FORMAT_B5G5R5A1_UNORM_PACK16 = 7),
		(_.VK_FORMAT_B5G6R5_UNORM_PACK16 = 5),
		(_.VK_FORMAT_B8G8R8A8_SINT = 49),
		(_.VK_FORMAT_B8G8R8A8_SNORM = 45),
		(_.VK_FORMAT_B8G8R8A8_SRGB = 50),
		(_.VK_FORMAT_B8G8R8A8_UINT = 48),
		(_.VK_FORMAT_B8G8R8A8_UNORM = 44),
		(_.VK_FORMAT_B8G8R8_SINT = 35),
		(_.VK_FORMAT_B8G8R8_SNORM = 31),
		(_.VK_FORMAT_B8G8R8_SRGB = 36),
		(_.VK_FORMAT_B8G8R8_UINT = 34),
		(_.VK_FORMAT_B8G8R8_UNORM = 30),
		(_.VK_FORMAT_BC1_RGBA_SRGB_BLOCK = 134),
		(_.VK_FORMAT_BC1_RGBA_UNORM_BLOCK = 133),
		(_.VK_FORMAT_BC1_RGB_SRGB_BLOCK = 132),
		(_.VK_FORMAT_BC1_RGB_UNORM_BLOCK = 131),
		(_.VK_FORMAT_BC2_SRGB_BLOCK = 136),
		(_.VK_FORMAT_BC2_UNORM_BLOCK = 135),
		(_.VK_FORMAT_BC3_SRGB_BLOCK = 138),
		(_.VK_FORMAT_BC3_UNORM_BLOCK = 137),
		(_.VK_FORMAT_BC4_SNORM_BLOCK = 140),
		(_.VK_FORMAT_BC4_UNORM_BLOCK = 139),
		(_.VK_FORMAT_BC5_SNORM_BLOCK = 142),
		(_.VK_FORMAT_BC5_UNORM_BLOCK = 141),
		(_.VK_FORMAT_BC6H_SFLOAT_BLOCK = 144),
		(_.VK_FORMAT_BC6H_UFLOAT_BLOCK = 143),
		(_.VK_FORMAT_BC7_SRGB_BLOCK = 146),
		(_.VK_FORMAT_BC7_UNORM_BLOCK = 145),
		(_.VK_FORMAT_D16_UNORM = 124),
		(_.VK_FORMAT_D16_UNORM_S8_UINT = 128),
		(_.VK_FORMAT_D24_UNORM_S8_UINT = 129),
		(_.VK_FORMAT_D32_SFLOAT = 126),
		(_.VK_FORMAT_D32_SFLOAT_S8_UINT = 130),
		(_.VK_FORMAT_E5B9G9R9_UFLOAT_PACK32 = 123),
		(_.VK_FORMAT_EAC_R11G11_SNORM_BLOCK = 156),
		(_.VK_FORMAT_EAC_R11G11_UNORM_BLOCK = 155),
		(_.VK_FORMAT_EAC_R11_SNORM_BLOCK = 154),
		(_.VK_FORMAT_EAC_R11_UNORM_BLOCK = 153),
		(_.VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK = 150),
		(_.VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK = 149),
		(_.VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK = 152),
		(_.VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK = 151),
		(_.VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK = 148),
		(_.VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK = 147),
		(_.VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16 = 1000156010),
		(_.VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16 = 1000156020),
		(_.VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG = 1000054004),
		(_.VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG = 1000054e3),
		(_.VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG = 1000054005),
		(_.VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG = 1000054001),
		(_.VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG = 1000054006),
		(_.VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG = 1000054002),
		(_.VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG = 1000054007),
		(_.VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG = 1000054003),
		(_.VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16 = 1000156009),
		(_.VK_FORMAT_R10X6G10X6_UNORM_2PACK16 = 1000156008),
		(_.VK_FORMAT_R10X6_UNORM_PACK16 = 1000156007),
		(_.VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16 = 1000156019),
		(_.VK_FORMAT_R12X4G12X4_UNORM_2PACK16 = 1000156018),
		(_.VK_FORMAT_R12X4_UNORM_PACK16 = 1000156017),
		(_.VK_FORMAT_R16G16B16A16_SFLOAT = 97),
		(_.VK_FORMAT_R16G16B16A16_SINT = 96),
		(_.VK_FORMAT_R16G16B16A16_SNORM = 92),
		(_.VK_FORMAT_R16G16B16A16_UINT = 95),
		(_.VK_FORMAT_R16G16B16A16_UNORM = 91),
		(_.VK_FORMAT_R16G16B16_SFLOAT = 90),
		(_.VK_FORMAT_R16G16B16_SINT = 89),
		(_.VK_FORMAT_R16G16B16_SNORM = 85),
		(_.VK_FORMAT_R16G16B16_UINT = 88),
		(_.VK_FORMAT_R16G16B16_UNORM = 84),
		(_.VK_FORMAT_R16G16_SFLOAT = 83),
		(_.VK_FORMAT_R16G16_SINT = 82),
		(_.VK_FORMAT_R16G16_SNORM = 78),
		(_.VK_FORMAT_R16G16_UINT = 81),
		(_.VK_FORMAT_R16G16_UNORM = 77),
		(_.VK_FORMAT_R16_SFLOAT = 76),
		(_.VK_FORMAT_R16_SINT = 75),
		(_.VK_FORMAT_R16_SNORM = 71),
		(_.VK_FORMAT_R16_UINT = 74),
		(_.VK_FORMAT_R16_UNORM = 70),
		(_.VK_FORMAT_R32G32B32A32_SFLOAT = 109),
		(_.VK_FORMAT_R32G32B32A32_SINT = 108),
		(_.VK_FORMAT_R32G32B32A32_UINT = 107),
		(_.VK_FORMAT_R32G32B32_SFLOAT = 106),
		(_.VK_FORMAT_R32G32B32_SINT = 105),
		(_.VK_FORMAT_R32G32B32_UINT = 104),
		(_.VK_FORMAT_R32G32_SFLOAT = 103),
		(_.VK_FORMAT_R32G32_SINT = 102),
		(_.VK_FORMAT_R32G32_UINT = 101),
		(_.VK_FORMAT_R32_SFLOAT = 100),
		(_.VK_FORMAT_R32_SINT = 99),
		(_.VK_FORMAT_R32_UINT = 98),
		(_.VK_FORMAT_R4G4B4A4_UNORM_PACK16 = 2),
		(_.VK_FORMAT_R4G4_UNORM_PACK8 = 1),
		(_.VK_FORMAT_R5G5B5A1_UNORM_PACK16 = 6),
		(_.VK_FORMAT_R5G6B5_UNORM_PACK16 = 4),
		(_.VK_FORMAT_R64G64B64A64_SFLOAT = 121),
		(_.VK_FORMAT_R64G64B64A64_SINT = 120),
		(_.VK_FORMAT_R64G64B64A64_UINT = 119),
		(_.VK_FORMAT_R64G64B64_SFLOAT = 118),
		(_.VK_FORMAT_R64G64B64_SINT = 117),
		(_.VK_FORMAT_R64G64B64_UINT = 116),
		(_.VK_FORMAT_R64G64_SFLOAT = 115),
		(_.VK_FORMAT_R64G64_SINT = 114),
		(_.VK_FORMAT_R64G64_UINT = 113),
		(_.VK_FORMAT_R64_SFLOAT = 112),
		(_.VK_FORMAT_R64_SINT = 111),
		(_.VK_FORMAT_R64_UINT = 110),
		(_.VK_FORMAT_R8G8B8A8_SINT = 42),
		(_.VK_FORMAT_R8G8B8A8_SNORM = 38),
		(_.VK_FORMAT_R8G8B8A8_SRGB = 43),
		(_.VK_FORMAT_R8G8B8A8_UINT = 41),
		(_.VK_FORMAT_R8G8B8A8_UNORM = 37),
		(_.VK_FORMAT_R8G8B8_SINT = 28),
		(_.VK_FORMAT_R8G8B8_SNORM = 24),
		(_.VK_FORMAT_R8G8B8_SRGB = 29),
		(_.VK_FORMAT_R8G8B8_UINT = 27),
		(_.VK_FORMAT_R8G8B8_UNORM = 23),
		(_.VK_FORMAT_R8G8_SINT = 21),
		(_.VK_FORMAT_R8G8_SNORM = 17),
		(_.VK_FORMAT_R8G8_SRGB = 22),
		(_.VK_FORMAT_R8G8_UINT = 20),
		(_.VK_FORMAT_R8G8_UNORM = 16),
		(_.VK_FORMAT_R8_SINT = 14),
		(_.VK_FORMAT_R8_SNORM = 10),
		(_.VK_FORMAT_R8_SRGB = 15),
		(_.VK_FORMAT_R8_UINT = 13),
		(_.VK_FORMAT_R8_UNORM = 9),
		(_.VK_FORMAT_S8_UINT = 127),
		(_.VK_FORMAT_UNDEFINED = 0),
		(_.VK_FORMAT_X8_D24_UNORM_PACK32 = 125),
		(_.read = function (_) {
			var R = new Uint8Array(_.buffer, _.byteOffset, n.length);
			if (
				R[0] !== n[0] ||
				R[1] !== n[1] ||
				R[2] !== n[2] ||
				R[3] !== n[3] ||
				R[4] !== n[4] ||
				R[5] !== n[5] ||
				R[6] !== n[6] ||
				R[7] !== n[7] ||
				R[8] !== n[8] ||
				R[9] !== n[9] ||
				R[10] !== n[10] ||
				R[11] !== n[11]
			)
				throw new Error("Missing KTX 2.0 identifier.");
			var A = new t(),
				O = 17 * Uint32Array.BYTES_PER_ELEMENT,
				i = new e(_, n.length, O, !0);
			(A.vkFormat = i._nextUint32()),
				(A.typeSize = i._nextUint32()),
				(A.pixelWidth = i._nextUint32()),
				(A.pixelHeight = i._nextUint32()),
				(A.pixelDepth = i._nextUint32()),
				(A.layerCount = i._nextUint32()),
				(A.faceCount = i._nextUint32());
			var T = i._nextUint32();
			A.supercompressionScheme = i._nextUint32();
			for (
				var r = i._nextUint32(),
					a = i._nextUint32(),
					F = i._nextUint32(),
					M = i._nextUint32(),
					s = i._nextUint64(),
					B = i._nextUint64(),
					o = new e(_, n.length + O, 3 * T * 8, !0),
					S = 0;
				S < T;
				S++
			)
				A.levels.push({
					levelData: new Uint8Array(
						_.buffer,
						_.byteOffset + o._nextUint64(),
						o._nextUint64()
					),
					uncompressedByteLength: o._nextUint64(),
				});
			for (
				var U = new e(_, r, a, !0),
					C = {
						vendorId: U._skip(4)._nextUint16(),
						descriptorType: U._nextUint16(),
						versionNumber: U._nextUint16(),
						descriptorBlockSize: U._nextUint16(),
						colorModel: U._nextUint8(),
						colorPrimaries: U._nextUint8(),
						transferFunction: U._nextUint8(),
						flags: U._nextUint8(),
						texelBlockDimension: [
							U._nextUint8(),
							U._nextUint8(),
							U._nextUint8(),
							U._nextUint8(),
						],
						bytesPlane: [
							U._nextUint8(),
							U._nextUint8(),
							U._nextUint8(),
							U._nextUint8(),
							U._nextUint8(),
							U._nextUint8(),
							U._nextUint8(),
							U._nextUint8(),
						],
						samples: [],
					},
					l = (C.descriptorBlockSize / 4 - 6) / 4,
					V = 0;
				V < l;
				V++
			) {
				var f = {
					bitOffset: U._nextUint16(),
					bitLength: U._nextUint8(),
					channelType: U._nextUint8(),
					samplePosition: [
						U._nextUint8(),
						U._nextUint8(),
						U._nextUint8(),
						U._nextUint8(),
					],
					sampleLower: -Infinity,
					sampleUpper: Infinity,
				};
				64 & f.channelType
					? ((f.sampleLower = U._nextInt32()), (f.sampleUpper = U._nextInt32()))
					: ((f.sampleLower = U._nextUint32()),
					  (f.sampleUpper = U._nextUint32())),
					(C.samples[V] = f);
			}
			(A.dataFormatDescriptor.length = 0), A.dataFormatDescriptor.push(C);
			for (var N = new e(_, F, M, !0); N._offset < M; ) {
				var L = N._nextUint32(),
					G = N._scan(L),
					D = K(G),
					E = N._scan(L - G.byteLength);
				(A.keyValue[D] = D.match(/^ktx/i) ? K(E) : E),
					N._offset % 4 && N._skip(4 - (N._offset % 4));
			}
			if (B <= 0) return A;
			for (
				var h = new e(_, s, B, !0),
					x = h._nextUint16(),
					p = h._nextUint16(),
					I = h._nextUint32(),
					c = h._nextUint32(),
					P = h._nextUint32(),
					y = h._nextUint32(),
					u = [],
					g = 0;
				g < T;
				g++
			)
				u.push({
					imageFlags: h._nextUint32(),
					rgbSliceByteOffset: h._nextUint32(),
					rgbSliceByteLength: h._nextUint32(),
					alphaSliceByteOffset: h._nextUint32(),
					alphaSliceByteLength: h._nextUint32(),
				});
			var d = s + h._offset,
				b = d + I,
				m = b + c,
				v = m + P,
				H = new Uint8Array(_.buffer, _.byteOffset + d, I),
				w = new Uint8Array(_.buffer, _.byteOffset + b, c),
				X = new Uint8Array(_.buffer, _.byteOffset + m, P),
				k = new Uint8Array(_.buffer, _.byteOffset + v, y);
			return (
				(A.globalData = {
					endpointCount: x,
					selectorCount: p,
					imageDescs: u,
					endpointsData: H,
					selectorsData: w,
					tablesData: X,
					extendedData: k,
				}),
				A
			);
		}),
		(_.write = function (_, t) {
			void 0 === t && (t = {}), (t = A({}, a, t));
			var e = new ArrayBuffer(0);
			if (_.globalData) {
				var O = new ArrayBuffer(20 + 5 * _.globalData.imageDescs.length * 4),
					i = new DataView(O);
				i.setUint16(0, _.globalData.endpointCount, !0),
					i.setUint16(2, _.globalData.selectorCount, !0),
					i.setUint32(4, _.globalData.endpointsData.byteLength, !0),
					i.setUint32(8, _.globalData.selectorsData.byteLength, !0),
					i.setUint32(12, _.globalData.tablesData.byteLength, !0),
					i.setUint32(16, _.globalData.extendedData.byteLength, !0);
				for (var K = 0; K < _.globalData.imageDescs.length; K++) {
					var F = _.globalData.imageDescs[K];
					i.setUint32(20 + 5 * K * 4 + 0, F.imageFlags, !0),
						i.setUint32(20 + 5 * K * 4 + 4, F.rgbSliceByteOffset, !0),
						i.setUint32(20 + 5 * K * 4 + 8, F.rgbSliceByteLength, !0),
						i.setUint32(20 + 5 * K * 4 + 12, F.alphaSliceByteOffset, !0),
						i.setUint32(20 + 5 * K * 4 + 16, F.alphaSliceByteLength, !0);
				}
				e = r([
					O,
					_.globalData.endpointsData,
					_.globalData.selectorsData,
					_.globalData.tablesData,
					_.globalData.extendedData,
				]);
			}
			var M = [],
				s = _.keyValue;
			for (var B in (t.keepWriter ||
				(s = A({}, _.keyValue, { KTXwriter: "KTX-Parse v0.3.3" })),
			s)) {
				var o = s[B],
					S = T(B),
					U = "string" == typeof o ? T(o) : o,
					C = S.byteLength + 1 + U.byteLength + 1,
					l = C % 4 ? 4 - (C % 4) : 0;
				M.push(
					r([new Uint32Array([C]), S, R, U, R, new Uint8Array(l).fill(0)])
				);
			}
			var V = r(M);
			if (
				1 !== _.dataFormatDescriptor.length ||
				0 !== _.dataFormatDescriptor[0].descriptorType
			)
				throw new Error(
					"Only BASICFORMAT Data Format Descriptor output supported."
				);
			var f = _.dataFormatDescriptor[0],
				N = new ArrayBuffer(28 + 16 * f.samples.length),
				L = new DataView(N),
				G = 24 + 16 * f.samples.length;
			if (
				(L.setUint32(0, N.byteLength, !0),
				L.setUint16(4, f.vendorId, !0),
				L.setUint16(6, f.descriptorType, !0),
				L.setUint16(8, f.versionNumber, !0),
				L.setUint16(10, G, !0),
				L.setUint8(12, f.colorModel),
				L.setUint8(13, f.colorPrimaries),
				L.setUint8(14, f.transferFunction),
				L.setUint8(15, f.flags),
				!Array.isArray(f.texelBlockDimension))
			)
				throw new Error(
					"texelBlockDimension is now an array. For dimensionality `d`, set `d - 1`."
				);
			L.setUint8(16, f.texelBlockDimension[0]),
				L.setUint8(17, f.texelBlockDimension[1]),
				L.setUint8(18, f.texelBlockDimension[2]),
				L.setUint8(19, f.texelBlockDimension[3]);
			for (var D = 0; D < 8; D++) L.setUint8(20 + D, f.bytesPlane[D]);
			for (var E = 0; E < f.samples.length; E++) {
				var h = f.samples[E],
					x = 28 + 16 * E;
				if (h.channelID)
					throw new Error("channelID has been renamed to channelType.");
				L.setUint16(x + 0, h.bitOffset, !0),
					L.setUint8(x + 2, h.bitLength),
					L.setUint8(x + 3, h.channelType),
					L.setUint8(x + 4, h.samplePosition[0]),
					L.setUint8(x + 5, h.samplePosition[1]),
					L.setUint8(x + 6, h.samplePosition[2]),
					L.setUint8(x + 7, h.samplePosition[3]),
					64 & h.channelType
						? (L.setInt32(x + 8, h.sampleLower, !0),
						  L.setInt32(x + 12, h.sampleUpper, !0))
						: (L.setUint32(x + 8, h.sampleLower, !0),
						  L.setUint32(x + 12, h.sampleUpper, !0));
			}
			var p = n.length + 68 + 3 * _.levels.length * 8,
				I = p + N.byteLength,
				c = e.byteLength > 0 ? I + V.byteLength : 0;
			c % 8 && (c += 8 - (c % 8));
			for (
				var P = [],
					y = new DataView(new ArrayBuffer(3 * _.levels.length * 8)),
					u = (c || I + V.byteLength) + e.byteLength,
					g = 0;
				g < _.levels.length;
				g++
			) {
				var d = _.levels[g];
				P.push(d.levelData),
					y.setBigUint64(24 * g + 0, BigInt(u), !0),
					y.setBigUint64(24 * g + 8, BigInt(d.levelData.byteLength), !0),
					y.setBigUint64(24 * g + 16, BigInt(d.uncompressedByteLength), !0),
					(u += d.levelData.byteLength);
			}
			var b = new ArrayBuffer(68),
				m = new DataView(b);
			return (
				m.setUint32(0, _.vkFormat, !0),
				m.setUint32(4, _.typeSize, !0),
				m.setUint32(8, _.pixelWidth, !0),
				m.setUint32(12, _.pixelHeight, !0),
				m.setUint32(16, _.pixelDepth, !0),
				m.setUint32(20, _.layerCount, !0),
				m.setUint32(24, _.faceCount, !0),
				m.setUint32(28, _.levels.length, !0),
				m.setUint32(32, _.supercompressionScheme, !0),
				m.setUint32(36, p, !0),
				m.setUint32(40, N.byteLength, !0),
				m.setUint32(44, I, !0),
				m.setUint32(48, V.byteLength, !0),
				m.setBigUint64(52, BigInt(e.byteLength > 0 ? c : 0), !0),
				m.setBigUint64(60, BigInt(e.byteLength), !0),
				new Uint8Array(
					r(
						[
							new Uint8Array(n).buffer,
							b,
							y.buffer,
							N,
							V,
							c > 0
								? new ArrayBuffer(c - (I + V.byteLength))
								: new ArrayBuffer(0),
							e,
						].concat(P)
					)
				)
			);
		});
});
