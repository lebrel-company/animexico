import Link from 'next/link';
import {useFormik} from "formik";
import {fields} from './_texts';
import {useMutation} from '@apollo/client';
import {createNewProductMutation} from './_mutation';

'use strict';

function createProduct() {
    const [createNewProduct] = useMutation(createNewProductMutation)
    const formik = useFormik({
            initialValues: {
                name: '',
                price: {
                    amount:'',
                    currency:'',
                },
                description:'',
                codes: {
                    barcode:'',
                    jancode:''
                },
                category:'',
                stock:'',
                available:'',
                images:''
            },
            onSubmit: async function submitForm(values){
                
                let _input = {
                    name: values.name,
                    price: {
                        amount:values.price.amount,
                        currency:values.price.currency,
                    },
                    description: values.description,                    
                    jancode:values.codes.jancode,                    
                    category: values.category,
                    stock: values.stock,
                    available: values.available,
                    images: values.images
                }

                try {
                
                 
                    let {data} = await createNewProduct({
                        variables: {
                            input:_input
                        }
                    });
                    console.log(data);
               
                } catch (error) {
                    console.log(error)
                }
            }
        
        });
        

       


    return (
        <div>
            <div>{data.title}</div>

            <form onSubmit={formik.handleSubmit}>
            <div>
                <input
                    id={fields.name.id}
                    name={fields.name.id}
                    type="text"
                    placeholder={fields.name.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
            </div>

            <div>
                <input
                    id={fields.price.amount.id}
                    name={fields.price.amount.id}
                    type="number"
                    step="any"
                    placeholder={fields.price.amount.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price.amount}
                />
            </div>

            <div>
                <input
                    id={fields.price.currency.id}
                    name={fields.price.currency.id}
                    type="text"
                    placeholder={fields.price.currency.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price.currency}
                />
            </div>

            <div>
                <input
                    id={fields.description.id}
                    name={fields.description.id}
                    type="text"
                    placeholder={fields.description.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                />
            </div>

            <div>
                <input
                    id={fields.jancode.id}
                    name={fields.jancode.id}
                    type="text"
                    placeholder={fields.jancode.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.jancode}
                />
            </div>


            <div>
                <input
                    id={fields.category.id}
                    name={fields.category.id}
                    type="text"
                    placeholder={fields.category.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                />
            </div>
        
            <div>
                <input
                    id={fields.stock.id}
                    name={fields.stock.id}
                    type="number"
                    placeholder={fields.stock.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.stock}
                />
            </div>

            <div>
                <div>Disponible</div>
                <input
                    id={fields.available.id}
                    name={fields.available.id}
                    type="checkbox"
                    placeholder={fields.available.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.available}
                />
            </div>
    
            <div>
                <input
                    id={fields.images.id}
                    name={fields.images.id}
                    type="text"
                    placeholder={fields.images.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.images}
                />
            </div>
            <button type="submit" id={fields.submit.id}>{fields.submit.value}</button>
        </form>
        </div>
        
    );
}

var data = {
    title: 'TAMASHII MX',
    linkPerfil: 'Perfil de usuario'
}

export default createProduct;