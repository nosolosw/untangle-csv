const csv = require( 'csv-parser' );
const stringify = require( 'csv-stringify' );
const forOwn = require( 'lodash.forown' );

module.exports = ( inputStream, callback ) => {
	const splitKey = ( key ) => key.toString().split( ',' ).map( ( k ) => k.trim() );

	const processRow = ( row ) => {
		const rowUntangled = {};
		forOwn( row, ( value, key ) => {
			splitKey( key ).map( ( k ) => {
				rowUntangled[ k ] = rowUntangled[ k ] ? +value + +rowUntangled[ k ] : value;
			} );
		} );
		return rowUntangled;
	};

	const rows = [];
	const parser = inputStream.pipe( csv() );
	parser.on( 'data', ( data ) => rows.push( processRow( data ) ) );
	parser.on( 'end', () => stringify( rows, { header: true }, callback ) );
	parser.on( 'err', callback );
};
