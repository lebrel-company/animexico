const Usuario = require('../models/Usuarios');
const Producto = require ('../models/Producto')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const crearToken = (usuario, secreta, expiresIn) => {
    //console.log(usuario);
    const { id, email, nombre, apellido } = usuario;

    return jwt.sign({ id, email, nombre, apellido }, secreta, { expiresIn })
}

const resolvers = {
    Query: {
        obtenerUsuario:async (_, {token}) =>  {
            const usuarioId = await jwt.verify(token, process.env.SECRETA)

            return usuarioId
        },
        obtenerProductos: async () => {
            try {
                const productos = await Producto.find({});
                return productos;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerProducto: async (_, { id }) => {
            //revisar si el producto existe o no
            const producto = await Producto.findById(id);

            if(!producto){
                throw new Error('Producto no encontrado')
            }

            return producto;
        }
        
    },
    
    
    Mutation:{
        nuevoUsuario: async (_, {input}) => {

            const { email, password } = input;
            
            //Revisar si el usuario ya esta registrado
            const existeUsuario = await Usuario.findOne({email});
            if (existeUsuario){
                throw new Error ('El usuario ya esta registrado');
            }

            //Hashear su password
            const salt = bcryptjs.genSaltSync(10)
            input.password = bcryptjs.hashSync(password, salt);
 
           
            try {
                 //Guardarlo en la base de datos
                 const usuario = new Usuario(input);
                 usuario.save();//guardarlo
                 return usuario;
            } catch (error) {
                console.log(error)
            }
        },
        autenticarUsuario: async (_, {input}) => {

            const { email, password } = input;
            
            //si el usuario existe
            const existeUsuario = await Usuario.findOne({email});
            if (!existeUsuario){
                throw new Error ('El usuario no existe');
            }

            //revisar si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password)
            if(!passwordCorrecto){
                throw new Error('El password es Incorrecto')
            }

            //Crear el token
            return{
                token: crearToken(existeUsuario, process.env.SECRETA, '24h')
            }
        },
        nuevoProducto: async (_, {input}) => {
            try {
                const producto = new Producto(input);

                //almacenar en la bd
                const resultado = await producto.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        actualizarProducto: async (_, { id, input }) => {
             //revisar si el producto existe o no
             let producto = await Producto.findById(id);

             if(!producto){
                 throw new Error('Producto no encontrado');
             }
             
             //guardarlo en la base de datos
             producto = await Producto.findOneAndUpdate( {_id : id}, input, {new: true});

             return producto;
 
        },

        eliminarProducto: async (_, {id}) => {
            
            let producto = await Producto.findById(id);

            if(!producto){
                throw new Error('Producto no encontrado');
            }

            //Eliminar
            await Producto.findOneAndDelete({_id : id});

            return "Producto Eliminado";
        }
    }
}

module.exports = resolvers;