import React from 'react';
import { useFormik, ErrorMessage } from 'formik';
import { gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';

const NEW_USER = gql `
    mutation createNewUser($input: UserInput){
        createNewUser(input: $input){
            id
            name
            lastname
            middlename
            secondLastname
            email
            birthday
            cellphone
            address{
                city
                state
                country
                zipcode
                suburb
                street
                buildingNumber
                apartmentNumber
                }
        }
    }
`;

 
 const SignupForm = () => {

    //Mutation to create new user
    const [ createNewUser ] = useMutation(NEW_USER)


   const formik = useFormik({
     initialValues: {
       name: '',
       middleName: '',
       lastName: '',
       secondLastname: '',
       email: '',
       password:'',
       birthday: '',
       cellphone: '',
       address:{
           city: '',
           state: '',
           country: '',
           zipcode: '',
           suburb: '',
           street: '',
           buildingNumber: '',
           apartmentNumber: '',
       }
     },
     validationSchema: Yup.object({
        name: Yup.string()
                    .required('Espacio Obligatorio'),
        lastName: Yup.string()
                    .required('Espacio Obligatorio'),
        secondLastname: Yup.string()
                    .required('Espacio Obligatorio'),
        email: Yup.string()
                    .email('El correo no es valido')
                    .required('Espacio Obligatorio'),
        password: Yup.string()                    
                    .required('Espacio Obligatorio'),
        birthday: Yup.string()                    
                    .required('Espacio Obligatorio'),
        cellphone: Yup.string()                    
                    .required('Espacio Obligatorio'), 
        address: Yup.string()
                    .required('Espacio Obligatorio'),         
           
        
        
     }),
     onSubmit: async values => {
      console.log(values)
        const {
            name,
            middleName,
            lastName,
            secondLastname,
            email,
            password,
            birthday,
            cellphone,
            address:{
                city,
                state,
                country,
                zipcode,
                suburb,
                street,
                buildingNumber,
                apartmentNumber
            } 

        }= values


        try {
            const { data } = await createNewUser ({
                variables: {
                    input: {
                        name,
                        middleName,
                        lastName,
                        secondLastname,
                        email,
                        password,
                        birthday,
                        cellphone,
                        address:{
                            city,
                            state,
                            country,
                            zipcode,
                            suburb,
                            street,
                            buildingNumber,
                            apartmentNumber
                        } 
                    }
                }
            });
            console.log(data.createNewUser);
        } catch (error) {
            console.log(error)
        }
     },
   });
   return (
     <form onSubmit={formik.handleSubmit}>
       <div>
            <input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
            />
       </div>
       {formik.touched.name && formik.errors.name ? (
            <div>                   
                <p>{formik.errors.name}</p>
            </div>
            ): null }

       <div>
            <input
                id="middleName"
                name="middleName"
                type="text"
                placeholder="Segundo Nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.middleName}
            />
       </div>
       
       <div>
            <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Primer Apellido"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
            />
       </div>

       {formik.touched.lastName && formik.errors.lastName ? (
            <div>                   
                <p>{formik.errors.lastName}</p>
            </div>
            ): null }

       <div>
            <input
                id="secondLastname"
                name="secondLastname"
                type="text"
                placeholder="Segundo Apellido"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.secondLastname}
            />
       </div>
       {formik.touched.secondLastname && formik.errors.secondLastname ? (
            <div>                   
                <p>{formik.errors.secondLastname}</p>
            </div>
            ): null }
       
       <div>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Correo Electronico"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
       </div>
       {formik.touched.email && formik.errors.email ? (
            <div>                   
                <p>{formik.errors.email}</p>
            </div>
            ): null }

       <div>
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
       </div>
       
       {formik.touched.password && formik.errors.password ? (
            <div>                   
                <p>{formik.errors.password}</p>
            </div>
            ): null }

       <div>
            <input
                id="birthday"
                name="birthday"
                type="date"
                placeholder="Fecha de nacimiento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthday}
            />
       </div>
       {formik.touched.birthday && formik.errors.birthday ? (
            <div>                   
                <p>{formik.errors.birthday}</p>
            </div>
            ): null }
       <div>
            <input
                id="cellphone"
                name="cellphone"
                type="text"
                placeholder="Celular"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cellphone}
            />
       </div>
       {formik.touched.cellphone && formik.errors.cellphone ? (
            <div>                   
                <p>{formik.errors.cellphone}</p>
            </div>
            ): null }
       <div>
            <input
                id="address.city"
                name="address.city"
                type="text"
                placeholder="Ciudad"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address.city}
            />
       </div>
       {formik.touched.city && formik.errors.city ? (
            <div>                   
                <p>{formik.errors.city}</p>
            </div>
            ): null }
       <div>
            <input
                id="address.state"
                name="address.state"
                type="text"
                placeholder="Estado"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address.state}
            />
       </div>
       <div>
            <input
                id="address.country"
                name="address.country"
                type="text"
                placeholder="Mexico"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address.country}
            />
       </div>
       <div>
            <input
                id="address.zipcode"
                name="address.zipcode"
                type="number"
                placeholder="Codigo Postal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address.zipcode}
            />
       </div>
       <div>
            <input
                id="address.suburb"
                name="address.suburb"
                type="text"
                placeholder="Colonia"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address.suburb}
            />
       </div>
       <div>
            <input
                id="address.street"
                name="address.street"
                type="text"
                placeholder="Calle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address.street}
            />
       </div>
       <div>
            <input
                id="address.buildingNumber"
                name="address.buildingNumber"
                type="text"
                placeholder="Numero Exterior"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address.buildingNumber}
            />
       </div>
       <div>
            <input
                id="address.apartmentNumber"
                name="address.apartmentNumber"
                type="text"
                placeholder="Numero Exterior"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address.apartmentNumber}
            />
       </div>
       
       
       <button type="submit">Submit</button>
     </form>
   );
 };


 export default SignupForm;