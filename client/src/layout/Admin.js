import Sidebar from '../components/Sidebar'
import Reports from "../components/admin/reports";
import Products from "../components/admin/products";


export default function AdministratorLayout(props){

    return(
        <div className="w-screen h-screen">
            <img className='
                fixed bg-cover bg-center
                z-0 opacity-20 transform
                md:scale-150 rotate-12 xl:translate-x-1/2
                -translate-y-20
            ' src='/background/tamashii_vignettes.png'/>

            <div className='flex h-screen'>
                <div className='w-1/6'>
                    <Sidebar states={props.states}/>
                </div>
                <div className='w-full h-screen p-5 container-scrollbar overflow-y-scroll'>
                    {props.children}
                </div>
            </div>               
        </div>
    )
};