import Sidebar from '../components/Sidebar'


export default function AdministratorLayout(props){
    return(
        <div className="w-screen h-screen">
            <img className='
                fixed bg-cover bg-center
                z-0 opacity-20 transform
                md:scale-150 rotate-12 xl:translate-x-1/2
                -translate-y-20
            ' src='/background/tamashii_vignettes.png'/>

            <div className='flex h-full'>
                <div className='w-1/6'>
                    <Sidebar/>
                </div>
                <div className='w-full m-10 p-5 container-scrollbar overflow-y-scroll'>
                    {props.children}
                </div>
            </div>               
        </div>
    )
};