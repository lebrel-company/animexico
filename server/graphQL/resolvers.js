const User = require('../models/User')


//Resolvers
const resolvers = {
    Query:{
        obtenerCurso:() => "something"
    },
    Mutation:{
        createNewUser: createNewUser              
    }
}

async function createNewUser(parent, {input}, context, info){
    const{email, password} = input;
   
    const userExists = await User.findOne({email})
    if (userExists){
        throw new Error('The user is already registered')
    }
    // TODO: Hash the password or any other data that require.
    try {
        const user = new User(input);
        user.save();
        return user
    } catch (error) {
        console.log(error)
    }
}

module.exports = resolvers;
