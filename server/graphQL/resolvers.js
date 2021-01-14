const User = require('../models/User')


//Resolvers
const resolvers = {
    Query:{
        obtenerCurso:() => "something"
    },
    Mutation:{
        newUser: async(_, {input}) => {

            const{email, password} = input;
           
            //check if  user exist
            const userExist = await User.findOne({email})
            if (userExist){
                throw new Error('The user is already registered')
            }

            // Hashear password


            //save in the data base
            try {
                //save it in the database
                const user = new User(input);
                user.save(); //save user
                return user
            } catch (error) {
                console.log(error)
            }
        }
             
    }
}

module.exports = resolvers;
