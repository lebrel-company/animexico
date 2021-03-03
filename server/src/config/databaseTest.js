const keys = require('../keys');
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});


const connection = async function () {
    try {
        await mongoose.connect(
            'mongodb://tamashii-mongo/test_database',
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
