const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('MongoDB its connected');

    } catch (error){
        console.log('There was an error connecting to MongoDB');
        console.log(error);
        process.exit(1);// stop the app
    }
}

module.exports = conectarDB;


