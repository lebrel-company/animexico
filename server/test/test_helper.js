const mongoose = require('mongoose')

var DATABASE = 'mongodb://localhost:27017/database'

mongoose.connect(DATABASE)
mongoose.connection
    .once('open', () => {
        console.log('Mongoose its good to go')
    })
    .on('error', (_error)=>{
        console.warn('Error:', _error)
    })

