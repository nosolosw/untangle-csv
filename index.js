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
	// cat demo.csv | node index.js > demo-untangled.csv
	process.stdin.setEncoding( 'utf-8' );
	process.stdin.on( 'data', ( data ) => {
		parser( data, ( err, output ) => {
			if ( err ) {
				process.stderr.write( err );
			} else {
				process.stdout.write( output );
			}
		} );
	} );
} else {
	// node index.js inputFile outputFile

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

	fs.readFile( __dirname + '/' + process.argv[ 2 ], 'utf8', ( err, data ) => {
		if ( err ) {
			throw err;
		}
		parser( data, writeToFile );
	} );
}
