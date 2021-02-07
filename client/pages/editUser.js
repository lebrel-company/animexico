import React from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';


const EDIT_USER = gql`
        mutation updateUser( $input: UpdateUserInput ){
            updateUser(input:$input){
                cellphone
            address{
                city
                state
                country
                zipcode
                street
                buildingNumber
                apartmentNumber
            }
        }
    }

`;

function editUser() {

    //Mutation to Edit User
    const [ updateUser ] = useMutation(EDIT_USER)

    const formik = useFormik({
        initialValues:{
            cellphone:'',
            address:{
            city:'',
            state:'',
            country:'',
            zipcode:'',
            street:'',
            buildingNumber:'',
            apartmentNumber:''
            }            
        },
        validationSchema: Yup.object({
            cellphone: Yup.string(),
            city: Yup.string(),          
            state: Yup.string(),
            country: Yup.string(),
            zipcode: Yup.number(),
            street: Yup.string(),
            buildingNumber: Yup.string(),
            apartmentNumber: Yup.string()

        }),
        onSubmit: async values => {
            

            const {
                cellphone,
                address:{
                    city,
                    state,
                    country,
                    zipcode,
                    street,
                    buildingNumber,
                    apartmentNumber
                }
            } = values;

            console.log(values)
            try {
                const { data } = await updateUser({
                    variables: {
                        input:{
                            cellphone,
                            address:{
                                city,
                                state,
                                country,
                                zipcode,
                                street,
                                buildingNumber,
                                apartmentNumber
                            },                            
                        }
                    }
                });
                console.log(data.updateUser);
            } catch (error) {
                console.log(error);
            }
        }

    })



    return (
        <Layout>
            <div className="text-2xl text-gray-800 font-light">
                Editar Usuario
            </div>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        
                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cellphone">
                                    Celular
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="cellphone"
                                    type="text"
                                    placeholder="Celular"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.cellphone}
                                />
                        </div>
                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.city">
                                    Ciudad
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="address.city"
                                    type="text"
                                    placeholder="Ciudad"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address.city}
                                />
                        </div>
                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.state">
                                    Estado
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="address.state"
                                    type="text"
                                    placeholder="Estado"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address.state}
                                />
                        </div>
                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.country">
                                    Pais
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="address.country"
                                    type="text"
                                    placeholder="Pais"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address.country}
                                />
                        </div>
                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.zipcode">
                                    Codigo Postal
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="address.zipcode"
                                    type="number"
                                    placeholder="Codigo Postal"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address.zipcode}
                                />
                        </div>
                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.street">
                                    Calle
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="address.street"
                                    type="text"
                                    placeholder="Calle"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address.street}
                                />
                        </div>
                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.buildingNumber">
                                    Numero Exterior
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="address.buildingNumber"
                                    type="text"
                                    placeholder="Numero Exterior"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address.buildingNumber}
                                />
                        </div>
                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.apartmentNumber">
                                    Numero Interior
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="address.apartmentNumber"
                                    type="text"
                                    placeholder="Numero Interior"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address.apartmentNumber}
                                />
                        </div>
                                <input
                                    type="submit"
                                    className="bg-black w-full mt-5 p-2 text-white uppercase font-bold"
                                    value="Editar Información"
                                />
                        

                    </form>
                </div>
            </div>
        </Layout>
        
    )
}

export default editUser

