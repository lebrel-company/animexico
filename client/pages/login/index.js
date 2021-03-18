import React, {useState} from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';


const AUTHENTICATE_USER = gql`
    mutation authenticateUser($input: authenticateInput ){
        authenticateUser(input: $input){
            token
        }
    }
`;

function Index(){
    const router = useRouter();
    const [ message, saveMessage ] = useState(null);
    const [ authenticateUser ] = useMutation(AUTHENTICATE_USER);
    const formik = useFormik({
        initialValues: {
            email:'',
            password:'' 
        },
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('Email no es valido')
                        .required('Email es obligatorio.'),
            password: Yup.string()
                        .required('Password es obligatorio.')
        }),
        onSubmit: async function submit_data(values){
            //console.log(values);
            const { email, password } = values;

            try {
                const { data } = await authenticateUser({
                    variables:{
                        input:{
                            email,
                            password
                        }
                    }
                });
                console.log(data);
                saveMessage('Autenticando...')

                //save token in the storage
                const { token } = data.authenticateUser;
                localStorage.setItem('token', token);

                //routing to index

                setTimeout(() => {
                    saveMessage(null);
                    router.push('/');
                },500);


            } catch (error) {
                saveMessage(error.message.replace('GraphQl error: ', ''))
                //console.log(error)

                setTimeout(() => {
                    saveMessage(null)
                },3000);
            }
        }      
    });

    function showMessage(){
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        )
    }

    return(
        <>  

            <Layout>
               

                { message && showMessage()}

                <div className="flex justify-center mt-20">
                    <div className="w-full max-w-lg">
                        
                        <form
                            className="bg-gray-800 px-8 pt-6 pb-8 mb-4 rounded-md"
                            onSubmit={formik.handleSubmit}
                        >
                             <h1 className="text-center py-5 text-white text-2xl font-semibold">Iniciar Sesión</h1>
                            <div className="mb-4">
                                
                                <input
                                    className="bg-gray-500 rounded-sm w-full text-white"
                                    id="email"
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                <div>
                                    <p className="text-red-500">espacio obligatorio</p>
                                </div>
                            </div>
                           
                           

                            { formik.touched.email && formik.errors.email ? (
                                <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ): null }

                            <div>
                                <input
                                    className="bg-gray-500 rounded-sm w-full text-white"
                                    id="password"
                                    type="password"
                                    placeholder="Password Usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                <div>
                                    <p className="text-red-500">espacio obligatorio</p>
                                </div>
                            </div>
                            
                            <div>
                                <Link href="/resetPassword">
                                    <a className="flex justify-end inline-block text-white text-xs">Restaurar Contraseña</a>
                                </Link>
                             </div>    
                            

                            { formik.touched.password && formik.errors.password ? (
                                <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ): null }

                            <div className="grid grid-cols-1 divide-y divide-white">
                                <div className="flex justify-center">
                                    <input
                                        type="submit"
                                        className="bg-red-600 py-2 px-10 rounded-sm shadow-md mt-5 p-2 text-white uppercase hover:bg-red-500"
                                        value="Login"
                                    
                                    />
                            </div>
                                <Link href="/signup">
                                    <a className="flex justify-center py-2 px-5 mt-5 inline-block text-white">Crear Cuenta</a>
                                </Link>
                            </div>

                                
                                                 
                        </form>
                        
                    </div>
                </div>
               
            </Layout>
                
                        
                          
        </>
    )
    
}

export default Index