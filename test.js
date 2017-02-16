/**
 * External dependencies
 */
const fs = require( 'fs' );
const test = require( 'tape' );

/**
 * Internal dependencies
 */
const parser = require( './parser' );

test( 'parser works', t => {
	parser( fs.createReadStream( __dirname + '/demo.csv' ), ( _, output ) => {
		t.equals(
				output,
				'date,text/plain,text/html,text/rtf\n2017-02-07,10,8,3\n2017-02-08,26,20,7\n2017-02-09,2,2,1\n2017-02-10,18,18,0\n' // eslint-disable-line max-len
			);
		t.end();
	} );
} );
