'use strict';
// libraries:
import util from 'util'
import {DateTime} from 'luxon'

const {GraphQLScalarType, Kind} = require('graphql');
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================


const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return parseInt(value); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new DateTime(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new DateTime(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    }
});

export {dateScalar}