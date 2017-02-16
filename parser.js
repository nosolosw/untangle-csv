const parse = require( 'csv-parse' );
const stringify = require( 'csv-stringify' );
const forOwn = require( 'lodash.forown' );
const moment = require( 'moment' );

module.exports = ( input, callback ) => {
	const options = {
		header: true,
		formatters: {
			date: ( value ) => moment( value ).format( 'YYYY-MM-DD' )
		}
	};

	const splitKey = ( key ) => key.toString().split( ',' ).map( ( k ) => k.trim() );

	const processRow = ( row ) => {
		const rowUntangled = {};
		forOwn( row, ( value, key ) => {
			splitKey( key ).map( ( k ) => {
				rowUntangled[ k ] = rowUntangled[ k ] ? value + rowUntangled[ k ] : value;
			} );
		} );
		return rowUntangled;
	};

	parse( input, {
		auto_parse: true,
		auto_parse_date: true,
		columns: true
	}, ( err, data ) => {
		if ( err ) {
			throw err;
		}
		stringify( data.map( processRow ), options, callback );
	} );
};
