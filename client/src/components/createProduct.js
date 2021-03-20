import React from 'react'
import {fields} from '../utils/formsProduct'
import Dropzone from '../components/dropzone'


function createProduct() {
    return (
        <div className='
            min-h-screen
            container m-auto md:flex justify-center
        '>
           <form className='form-dark m-auto'>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <input
                            id={fields.name.id}
                            name={fields.name.id}
                            type="text"
                            placeholder={fields.name.placeholder}
                            //onChange={formik.handleChange}
                            //onBlur={formik.handleBlur}
                            //value={formik.values.firstName}
                        />
                    </div>
                    <div>
                        <input
                            id={fields.price.amount.id}
                            name={fields.price.amount.id}
                            type="text"
                            placeholder={fields.price.amount.placeholder}
                            //onChange={formik.handleChange}
                            //onBlur={formik.handleBlur}
                            //value={formik.values.firstName}
                        />
                    </div>
                    <div>
                        <input
                            id={fields.price.currency.id}
                            name={fields.price.currency.id}
                            type="text"
                            placeholder={fields.price.currency.placeholder}
                            //onChange={formik.handleChange}
                            //onBlur={formik.handleBlur}
                            //value={formik.values.firstName}
                        />
                    </div>
                    <div>
                        <input
                            id={fields.code.id}
                            name={fields.code.id}
                            type="text"
                            placeholder={fields.code.placeholder}
                            //onChange={formik.handleChange}
                            //onBlur={formik.handleBlur}
                            //value={formik.values.firstName}
                        />
                    </div>
                    <div>
                        <input
                            id={fields.stock.id}
                            name={fields.stock.id}
                            type="number"
                            placeholder={fields.stock.placeholder}
                            //onChange={formik.handleChange}
                            //onBlur={formik.handleBlur}
                            //value={formik.values.firstName}
                        />
                    </div>
                    <div>
                        <div className='text-pale'>
                            {fields.available.placeholder}
                        </div>
                        <input
                            className="w-5 h-5 bg-dark"
                            id={fields.stock.id}
                            name={fields.stock.id}
                            type="checkbox"
                            placeholder={fields.stock.placeholder}
                            //onChange={formik.handleChange}
                            //onBlur={formik.handleBlur}
                            //value={formik.values.firstName}
                        />
                    </div>
                </div>
                <div className='pt-3'>
                    <textarea
                        placeholder={fields.description.placeholder}                        
                        />
                </div>
                <div>
                    
                    <div>
                        <Dropzone/>       
                    </div>   
                </div>
                            
                
           </form>
        </div>
    )
}



export default createProduct
