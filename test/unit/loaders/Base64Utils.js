/**
 * @author bhouston / http://exocortex.com
 */

module( "Base64Utils" );

test( "Float32Array Base64 Encode/Decode", function() {
	var originalArrayBuffer = new ArrayBuffer( 5 * 4 );
	var originalFloat32Buffer = new Float32Array( originalArrayBuffer );
	for( var i = 0; i < 5; i ++ ) {
		originalFloat32Buffer[i] = 0.2454 * i + 0.2;
	}
	var base64Encode = THREE.Base64Utils.arrayBufferToBase64( originalArrayBuffer );

	var newArrayBuffer = THREE.Base64Utils.base64ToArrayBuffer( base64Encode );	

	var newFloat32Buffer = new Float32Array( newArrayBuffer );

	ok( newArrayBuffer.byteLength == originalArrayBuffer.byteLength, "Passed!" );
	ok( originalFloat32Buffer.length == newFloat32Buffer.length, "Passed!" );

	for( var i = 0; i < 5; i ++ ) {
		ok( originalFloat32Buffer[i] == newFloat32Buffer[i], "Passed!" );
	}
});

