import Sidebar from '../components/Sidebar'


export default function AdministratorLayout(props){
    return(
        <div className="w-screen h-screen">
            <div className='flex h-full w-full'>
                <div className='w-1/6'>
                    <Sidebar/>
                </div>
                <div className='container m-10 p-5 container-scrollbar overflow-y-scroll'>
                    {props.children}
                </div>
            </div>               
        </div>
        
    )
};