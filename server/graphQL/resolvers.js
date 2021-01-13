const User = require('../models/User');


const resolvers = {
    Query:{
        obtenerCurso:() => "something"
    },
    Mutation:{
        newUser:(_, { input } ) => {

            console.log(input)
            //deconstruct the email and password
            //const { email, password } = input;

            //check if the user is already registered
            //const userExist = await User.findOne({email});
            //console.log(userExist)

            //hash password


            //save in the data base
            return "creando"
        }
    }
}

module.exports = resolvers;
