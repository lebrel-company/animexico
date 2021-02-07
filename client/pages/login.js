import Ract, {useState} from 'react'
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';


const AUTHENTICATE_USER = gql`
    mutation authenticateUser($input: authenticateInput ){
        authenticateUser(input: $input){
            token
        }
    }
`;

function Login(){


    //routing
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
                        .email('El email no es valido')
                        .required('El email no puede ir vacio'),
            password: Yup.string()
                        .required('El password es obligatorio')
        }),
        onSubmit: async values => {
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
                <h1 className="text-center text-black">Login</h1>

                { message && showMessage()}

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-gray-100 px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email Usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </div>

                            { formik.touched.email && formik.errors.email ? (
                                <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ): null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    password
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password Usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                            </div>

                            { formik.touched.password && formik.errors.password ? (
                                <div className= "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ): null }

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                value="Iniciar Sesión"
                            
                            />
                        </form>
                    </div>
                </div>
            </Layout>            
        </>
    )
    
}

export default Login