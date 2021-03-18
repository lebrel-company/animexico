//layouts:
import AdministratorLayout from "../../layout/Admin";
import Product from '../../components/product'
import CreateProduct from '../../components/createProduct'
import buttons from '../../utils/buttons.text'

export default function Admin(){
    return(
        <AdministratorLayout>
            <img className='
                fixed bg-cover bg-center
                z-0 opacity-20 transform
                md:scale-150 rotate-12 xl:translate-x-1/2 -translate-y-20
            ' src='/background/tamashii_vignettes.png'/>

            <div className='relative z-20'>
                <CreateProduct/>
            </div>
            

            {/*Products Section----------------------------------------------------*/}
            
            {/*<div className='container my-10 relative z-20'>
                <div className='flex justify-end py-5'>
                    <div>
                        <button className='button-blue h-20 w-60 text-2xl shadow-md'>
                            {buttons.createProduct.text}
                        </button>   
                    </div>                 
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                </div>                        
            </div>*/}
        </AdministratorLayout>
    )
}