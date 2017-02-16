#!/usr/bin/env node

/**
 * External dependencies
 */
const fs = require( 'fs' );

/**
 * Internal dependencies
 */
const parser = require( './parser' );

if ( ! process.stdin.isTTY ) {
	// cat demo.csv | ./index.js > demo-untangled.csv
	process.stdin.setEncoding( 'utf-8' );
	parser( process.stdin, ( err, output ) => {
		if ( err ) {
			process.stderr.write( err );
		} else {
			process.stdout.write( output );
		}
	} );
} else {
	// ./index.js inputFile outputFile

	const writeToFile = ( err, output ) => {
		if ( err ) {
			throw err;
		}
		fs.writeFile( __dirname + '/' + process.argv[ 3 ], output, 'utf8', ( errFile ) => {
			if ( errFile ) {
				throw errFile;
			}
		} );
	};

	parser( fs.createReadStream( __dirname + '/' + process.argv[ 2 ] ), writeToFile );
}
