const keys = require('../keys');
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const username = keys.mongoUsername;
const password = keys.mongoPassword;
const host = keys.mongoHost;
const database = keys.mongoDatabase;

var connection_string = null;
if (process.env.NODE_ENV == 'production'){
    connection_string = `mongodb://${username}:${password}@${host}/${database}`;
}
else{
    connection_string = process.env.TEST_DB || 'mongodb://tamashii-mongo/database';
}

const connection = async function () {
    try {
        await mongoose.connect(
            connection_string,
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
