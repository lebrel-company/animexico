'use strict';
// libraries:
import util from 'util'

const mongoose = require('mongoose')
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {KEYS} from '../src/config/keys';

var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================


pp(KEYS.mongodb.connection_string())
mongoose.connect(KEYS.mongodb.connection_string())
mongoose.connection
    .once('open', () => {
        console.log('Mongoose its good to go')
    })
    .on('error', (_error) => {
        console.warn('Error:', _error)
    })


