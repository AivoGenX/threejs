var fs, path, argparse, uglify, spawn;
try {
    fs = require("fs");
    path = require("path");
    argparse =  require( "argparse" );
    uglify = require("uglify-js2");
    spawn = require('child_process').spawn;
}
catch( e ) {
    console.log( "!!!" );
    console.log( "!!! Please run 'npm install' to install dependencies prior to running build.js" );
    console.log( "!!!" );
    console.log( e );
}

function main(){

    "use strict";
    
    var parser = new argparse.ArgumentParser();
    parser.addArgument(['--include'], {"action":'append', 'required':true});
    parser.addArgument(['--externs'], {"action":'append', "defaultValue":['./externs/common.js']});
    parser.addArgument(['--minify'], {"action":'storeTrue', "defaultValue":false});
    parser.addArgument(['--output'], {"defaultValue":'../build/three.js'});  
    parser.addArgument(['--sourcemaps'], {"action":'storeTrue', "defaultValue":false});
    
    
	var args = parser.parseArgs();
    
    var output = args.output;
    console.log(' * Building ' + output);
    
    var sourcemap,sourcemapping,sourcemapargs;
    if (args.sourcemaps){
		sourcemap = output + '.map';
    	sourcemapping = '\n//@ sourceMappingURL=' + sourcemap;
	}else{
		sourcemap = sourcemapping = sourcemapargs = '';
	}
    
    var buffer = [];
    var sources = [];
    for (var i = 0;i < args.include.length;i++){
        
        var files = JSON.parse(fs.readFileSync('./includes/' + args.include[i] + '.json', 'utf8'));
        for (var file = 0;file < files.length;file++){
    		sources.push(files[file]);
            buffer.push(fs.readFileSync(files[file], 'utf8'));
        }
    }
    console.log(buffer.length);
    var temp = buffer.join("");
    
    if (!args.minify){
        fs.writeFileSync(output,temp,'utf8');
    } else {
        var result = uglify.minify(sources, {
            outSourceMap: sourcemap
        });
        
        
        fs.writeFileSync(output,'// three.js - http://github.com/mrdoob/three.js\n' + result.code + sourcemapping,'utf8');
        
        if (args.sourcemaps){
            fs.writeFileSync(sourcemap,result.map,'utf8');
        }
    
    }

}

main();


