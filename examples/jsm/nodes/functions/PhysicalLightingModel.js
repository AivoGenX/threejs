import BRDF_Lambert from './BSDF/BRDF_Lambert.js';
import BRDF_GGX from './BSDF/BRDF_GGX.js';
import DFGApprox from './BSDF/DFGApprox.js';
import EnvironmentBRDF from './BSDF/EnvironmentBRDF.js';
import F_Schlick from './BSDF/F_Schlick.js';
import Schlick_to_F0 from './BSDF/Schlick_to_F0.js';
import BRDF_Sheen from './BSDF/BRDF_Sheen.js';
import LightingModel from '../core/LightingModel.js';
import { diffuseColor, specularColor, roughness, clearcoat, clearcoatRoughness, sheen, sheenRoughness, iridescence, iridescenceIOR, iridescenceThickness } from '../core/PropertyNode.js';
import { transformedNormalView, transformedClearcoatNormalView } from '../accessors/NormalNode.js';
import { positionViewDirection } from '../accessors/PositionNode.js';
import { tslFn, float, vec3, mat3 } from '../shadernode/ShaderNode.js';

//
// Iridescence
//

// XYZ to linear-sRGB color space
const XYZ_TO_REC709 = mat3(
	3.2404542, - 0.9692660, 0.0556434,
	- 1.5371385, 1.8760108, - 0.2040259,
	- 0.4985314, 0.0415560, 1.0572252
);

// Assume air interface for top
// Note: We don't handle the case fresnel0 == 1
const Fresnel0ToIor = ( fresnel0 ) => {

	const sqrtF0 = fresnel0.sqrt();
	return vec3( 1.0 ).add( sqrtF0 ).div( vec3( 1.0 ).sub( sqrtF0 ) );

};

// ior is a value between 1.0 and 3.0. 1.0 is air interface
const IorToFresnel0 = ( transmittedIor, incidentIor ) => {

	return transmittedIor.sub( incidentIor ).div( transmittedIor.add( incidentIor ) ).pow2();

};

// Fresnel equations for dielectric/dielectric interfaces.
// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
// Evaluation XYZ sensitivity curves in Fourier space
const evalSensitivity = ( OPD, shift ) => {

	const phase = OPD.mul( 2.0 * Math.PI * 1.0e-9 );
	const val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
	const pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
	const VAR = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

	const x = ( phase.mul( 2.2399e+06 ).add( shift.x ).cos() ).mul( phase.pow2().mul( - 4.5282e+09 ).exp(), 9.7470e-14 * Math.sqrt( 2.0 * Math.PI * 4.5282e+09 ) );

	const xyz = val.mul( VAR.mul( 2.0 * Math.PI ).sqrt(), pos.mul( phase ).add( shift ).cos(), phase.pow2().negate().mul( VAR ).exp() );
	xyz.x.addAssign( x );
	xyz.mulAssign( 1 / 1.0685e-7 );

	const rgb = XYZ_TO_REC709.mul( xyz );

	return rgb;

};

const evalIridescence = tslFn( ( { outsideIOR, eta2, cosTheta1, thinFilmThickness, baseF0 } ) => {

	// Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0
	const iridescenceIOR = thinFilmThickness.smoothstep( 0.0, 0.03 ).mix( outsideIOR, eta2 );
	// Evaluate the cosTheta on the base layer (Snell law)
	const sinTheta2Sq = outsideIOR.div( iridescenceIOR ).pow2().mul( cosTheta1.pow2().oneMinus() );

	// Handle TIR:
	const cosTheta2Sq = sinTheta2Sq.oneMinus();
	/*if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

	}*/

	const cosTheta2 = cosTheta2Sq.sqrt();

	// First interface
	const R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
	const R12 = F_Schlick( { f0: R0, f90: 1.0, dotVH: cosTheta1 } );
	//const R21 = R12;
	const T121 = R12.oneMinus();
	const phi12 = iridescenceIOR.lessThan( outsideIOR ).cond( Math.PI, 0.0 );
	const phi21 = iridescenceIOR.lessThan( outsideIOR ).cond( 0.0, Math.PI );

	// Second interface
	const baseIOR = Fresnel0ToIor( baseF0.clamp( 0.0, 0.9999 ) ); // guard against 1.0
	const R1 = IorToFresnel0( baseIOR, iridescenceIOR.vec3() );
	const R23 = F_Schlick( { f0: R1, f90: 1.0, dotVH: cosTheta2 } );
	const phi23 = vec3(
		baseIOR.x.lessThan( iridescenceIOR ).cond( Math.PI, 0.0 ),
		baseIOR.y.lessThan( iridescenceIOR ).cond( Math.PI, 0.0 ),
		baseIOR.z.lessThan( iridescenceIOR ).cond( Math.PI, 0.0 )
	);

	// Phase shift
	const OPD = iridescenceIOR.mul( thinFilmThickness, cosTheta2, 2.0 );
	const phi = vec3( phi21 ).add( phi23 );

	// Compound terms
	const R123 = R12.mul( R23 ).clamp( 1e-5, 0.9999 );
	const r123 = R123.sqrt();
	const Rs = T121.pow2().mul( R23 ).div( R123.oneMinus() );

	// Reflectance term for m = 0 (DC term amplitude)
	const C0 = R12.add( Rs );

	// Reflectance term for m > 0 (pairs of diracs)
	const Cm = Rs.sub( T121 );

	const S1 = evalSensitivity( OPD, phi );
	const S2 = evalSensitivity( OPD.mul( 2.0 ), phi.mul( 2.0 ) );

	const I = C0.add( Cm.mul( r123, S1 ).add( Cm.mul( R123, S2 ) ).mul( 2.0 ) );

	// Since out of gamut colors might be produced, negative color values are clamped to 0.
	return I.max( 0.0 );

} ).setLayout( {
	name: 'evalIridescence',
	type: 'vec3',
	inputs: [
		{ name: 'outsideIOR', type: 'float' },
		{ name: 'eta2', type: 'float' },
		{ name: 'cosTheta1', type: 'float' },
		{ name: 'thinFilmThickness', type: 'float' },
		{ name: 'baseF0', type: 'vec3' }
	]
} );

//
//	Sheen
//

// This is a curve-fit approxmation to the "Charlie sheen" BRDF integrated over the hemisphere from
// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF". The analysis can be found
// in the Sheen section of https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
const IBLSheenBRDF = tslFn( ( { normal, viewDir, roughness } ) => {

	const dotNV = normal.dot( viewDir ).saturate();

	const r2 = roughness.pow2();

	const a = roughness.lessThan( 0.25 ).cond(
		r2.mul( - 339.2 ).add( roughness.mul( 161.4 ) ).sub( 25.9 ),
		r2.mul( - 8.48 ).add( roughness.mul( 14.3 ) ).sub( 9.95 )
	);

	const b = roughness.lessThan( 0.25 ).cond(
		r2.mul( 44.0 ).sub( roughness.mul( 23.7 ) ).add( 3.26 ),
		r2.mul( 1.97 ).sub( roughness.mul( 3.27 ) ).add( 0.72 )
	);

	const expTerm = a.mul( dotNV ).add( b ).exp();
	const DG = roughness.lessThan( 0.25 ).cond( expTerm, roughness.mul( 0.1 ).sub( 0.025 ).add( expTerm ) );

	return DG.mul( 1.0 / Math.PI ).saturate();

} );

const clearcoatF0 = vec3( 0.04 );
const clearcoatF90 = vec3( 1 );

const dotNV = transformedNormalView.dot( positionViewDirection ).clamp(); // @TODO: Move to core dotNV (maybe along with other dotSomethings?)

//

class PhysicalLightingModel extends LightingModel {

	constructor( clearcoat = false, sheen = false, iridescence = false ) {

		super();

		this.clearcoat = clearcoat;
		this.sheen = sheen;
		this.iridescence = iridescence;

		this.clearcoatRadiance = null;
		this.clearcoatSpecularDirect = null;
		this.clearcoatSpecularIndirect = null;
		this.sheenSpecularDirect = null;
		this.sheenSpecularIndirect = null;
		this.iridescenceFresnel = null;
		this.iridescenceF0 = null;

	}

	start( /*context*/ ) {

		if ( this.clearcoat === true ) {

			this.clearcoatRadiance = vec3().temp( 'clearcoatRadiance' );
			this.clearcoatSpecularDirect = vec3().temp( 'clearcoatSpecularDirect' );
			this.clearcoatSpecularIndirect = vec3().temp( 'clearcoatSpecularIndirect' );

		}

		if ( this.sheen === true ) {

			this.sheenSpecularDirect = vec3().temp( 'sheenSpecularDirect' );
			this.sheenSpecularIndirect = vec3().temp( 'sheenSpecularIndirect' );

		}

		if ( this.iridescence === true ) {

			this.iridescenceFresnel = evalIridescence( {
				outsideIOR: 1.0,
				eta2: iridescenceIOR,
				cosTheta1: dotNV,
				thinFilmThickness: iridescenceThickness,
				baseF0: specularColor
			} );

			this.iridescenceF0 = Schlick_to_F0( { f: this.iridescenceFresnel, f90: 1.0, dotVH: dotNV } );

		}

	}

	// Fdez-Agüera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
	// Approximates multiscattering in order to preserve energy.
	// http://www.jcgt.org/published/0008/01/03/

	computeMultiscattering( singleScatter, multiScatter, specularF90 = float( 1 ) ) {

		const fab = DFGApprox( { roughness, dotNV } );

		const Fr = this.iridescenceF0 ? iridescence.mix( specularColor, this.iridescenceF0 ) : specularColor;

		const FssEss = Fr.mul( fab.x ).add( specularF90.mul( fab.y ) );

		const Ess = fab.x.add( fab.y );
		const Ems = Ess.oneMinus();

		const Favg = float( 1 / 21 ).mix( specularColor, 1 );
		const Fms = FssEss.div( Favg.reciprocal().sub( Ems ) );

		singleScatter.addAssign( FssEss );
		multiScatter.addAssign( Fms.mul( Ems ) );

	}

	direct( { lightDirection, lightColor, reflectedLight } ) {

		const dotNL = transformedNormalView.dot( lightDirection ).clamp();
		const irradiance = dotNL.mul( lightColor );

		if ( this.sheen === true ) {

			this.sheenSpecularDirect.addAssign( irradiance.mul( BRDF_Sheen( { lightDirection } ) ) );

		}

		if ( this.clearcoat === true ) {

			const dotNLcc = transformedClearcoatNormalView.dot( lightDirection ).clamp();
			const ccIrradiance = dotNLcc.mul( lightColor );

			this.clearcoatSpecularDirect.addAssign( ccIrradiance.mul( BRDF_GGX( {
				lightDirection,
				f0: clearcoatF0,
				f90: clearcoatF90,
				roughness: clearcoatRoughness,
				normalView: transformedClearcoatNormalView
			} ) ) );

		}

		reflectedLight.directDiffuse.addAssign( irradiance.mul( BRDF_Lambert( { diffuseColor: diffuseColor.rgb } ) ) );

		reflectedLight.directSpecular.addAssign( irradiance.mul( BRDF_GGX( {
			lightDirection,
			f0: specularColor,
			f90: 1,
			roughness,
			iridescence: this.iridescence,
			iridescenceFresnel: this.iridescenceFresnel
		} ) ) );

	}

	indirectDiffuse( { irradiance, reflectedLight } ) {

		reflectedLight.indirectDiffuse.addAssign( irradiance.mul( BRDF_Lambert( { diffuseColor: diffuseColor.rgb } ) ) );

	}

	indirectSpecular( { radiance, iblIrradiance, reflectedLight } ) {

		if ( this.sheen === true ) {

			this.sheenSpecularIndirect.addAssign( iblIrradiance.mul( sheen, IBLSheenBRDF( {
				normal: transformedNormalView,
				viewDir: positionViewDirection,
				roughness: sheenRoughness
			} ) ) );

		}

		if ( this.clearcoat === true ) {

			const dotNVcc = transformedClearcoatNormalView.dot( positionViewDirection ).clamp();

			const clearcoatEnv = EnvironmentBRDF( {
				dotNV: dotNVcc,
				specularColor: clearcoatF0,
				specularF90: clearcoatF90,
				roughness: clearcoatRoughness
			} );

			this.clearcoatSpecularIndirect.addAssign( this.clearcoatRadiance.mul( clearcoatEnv ) );

		}

		// Both indirect specular and indirect diffuse light accumulate here

		const singleScattering = vec3().temp( 'singleScattering' );
		const multiScattering = vec3().temp( 'multiScattering' );
		const cosineWeightedIrradiance = iblIrradiance.mul( 1 / Math.PI );

		this.computeMultiscattering( singleScattering, multiScattering );

		const totalScattering = singleScattering.add( multiScattering );

		const diffuse = diffuseColor.rgb.mul( totalScattering.r.max( totalScattering.g, totalScattering.b ).oneMinus() );

		reflectedLight.indirectSpecular.addAssign( radiance.mul( singleScattering ) );
		reflectedLight.indirectSpecular.addAssign( multiScattering.mul( cosineWeightedIrradiance ) );

		reflectedLight.indirectDiffuse.addAssign( diffuse.mul( cosineWeightedIrradiance ) );

	}

	ambientOcclusion( { ambientOcclusion, reflectedLight } ) {

		const aoNV = dotNV.add( ambientOcclusion );
		const aoExp = roughness.mul( - 16.0 ).oneMinus().negate().exp2();

		const aoNode = ambientOcclusion.sub( aoNV.pow( aoExp ).oneMinus() ).clamp();

		if ( this.clearcoat === true ) {

			this.clearcoatSpecularIndirect.mulAssign( ambientOcclusion );

		}

		if ( this.sheen === true ) {

			this.sheenSpecularIndirect.mulAssign( ambientOcclusion );

		}

		reflectedLight.indirectDiffuse.mulAssign( ambientOcclusion );
		reflectedLight.indirectSpecular.mulAssign( aoNode );

	}

	finish( context ) {

		const { outgoingLight } = context;

		if ( this.clearcoat === true ) {

			const dotNVcc = transformedClearcoatNormalView.dot( positionViewDirection ).clamp();

			const Fcc = F_Schlick( {
				dotVH: dotNVcc,
				f0: clearcoatF0,
				f90: clearcoatF90
			} );

			outgoingLight.mulAssign( clearcoat.mul( Fcc ).oneMinus() );
			outgoingLight.addAssign( this.clearcoatSpecularDirect, this.clearcoatSpecularIndirect );
			outgoingLight.mulAssign( clearcoat );

		}

		if ( this.sheen === true ) {

			outgoingLight.mulAssign( sheen.r.max( sheen.g, sheen.b ).mul( 0.157 ).oneMinus() );
			outgoingLight.addAssign( this.sheenSpecularDirect, this.sheenSpecularIndirect );

		}

	}

}

export default PhysicalLightingModel;
