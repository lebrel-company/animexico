'use strict';
// libraries:
import util from 'util'

const mongoose = require('mongoose');
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {KEYS} from '../config/keys'

var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================


const connection = async function () {
    try {
        await mongoose.connect(
            KEYS.mongodb.host,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            })
        console.log('MongoDB its connected');
    } catch (error) {
        console.log('There was an error connecting to MongoDB');
        console.log(error);
        process.exit(1);// stop the app
    }
}

module.exports = connection;
