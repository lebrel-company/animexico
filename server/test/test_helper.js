const mongoose = require('mongoose')
import {KEYS} from '../src/config/keys';

var DATABASE = `${KEYS.mongodb.host}:${KEYS.mongodb.port}/${KEYS.mongodb.database}`

mongoose.connect(DATABASE)
mongoose.connection
    .once('open', () => {
        console.log('Mongoose its good to go')
    })
    .on('error', (_error) => {
        console.warn('Error:', _error)
    })


