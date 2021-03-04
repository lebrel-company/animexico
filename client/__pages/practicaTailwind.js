import React from 'react'
import Layout from '../components/Layout';

function practicaTailwind() {
    return (
        <div>
            <Layout/>
            
            <div className="flex justify-center mt-20">
                <div className="w-full max-w-lg">
                    <form  className="bg-gray-800 px-8 pt-6 pb-8 mb-4 rounded-md">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    className="bg-gray-800 rounded-sm w-full text-white border border-white"
                                    //id={nombree}
                                    //name={fields.name.id}
                                    type="text"
                                    placeholder="name"
                                    //onChange={formik.handleChange}
                                    //onBlur={formik.handleBlur}
                                    //value={formik.values.name}
                                />
                            </div>
                            <div>
                                <input
                                    className="bg-gray-800 rounded-sm w-full text-white border border-white"
                                    //id={nombree}
                                    //name={fields.name.id}
                                    type="text"
                                    placeholder="name"
                                    //onChange={formik.handleChange}
                                    //onBlur={formik.handleBlur}
                                    //value={formik.values.name}
                                />
                            </div>
                            <div>
                                <input
                                    className="bg-gray-800 rounded-sm w-full text-white border border-white"
                                    //id={nombree}
                                    //name={fields.name.id}
                                    type="text"
                                    placeholder="name"
                                    //onChange={formik.handleChange}
                                    //onBlur={formik.handleBlur}
                                    //value={formik.values.name}
                                />
                            </div>            
                        </div>
                    </form>                   
                </div>
            </div>            
        </div>
    )
}

export default practicaTailwind
