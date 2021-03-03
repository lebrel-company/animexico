var mongoose = require('mongoose')
var User = require('../types/user/user.model')


beforeAll(async function testInitialSetup() {
    var url = `mongodb://localhost/test_user`
    await mongoose.connect(url, {useNewUrlParser: true})
})



afterAll(function testFinalSetup() {
    mongoose.connect.close();
})
