import Layout from "../components/Layout";

function resetPassword(){
    return(
        <>
            <Layout>
                <h1 className="text-center text-black">Reiniciar Contraseña</h1> 

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-gray-100 px-8 pt-6 pb-8 mb-4"
                           
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Nueva Contraseña
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Contraseña"
                                    
                                />
                            </div>

                            

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Confirma Contraseña
                                </label>
                                <input
                                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Confirma Contraseña"
                                   
                                />
                            </div>

                           

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                value="reiniciar contraseña"
                            
                            />
                        </form>
                    </div>
                </div>
                    
            </Layout>            
            
        </>
            
        
        
    )
};

export default resetPassword;