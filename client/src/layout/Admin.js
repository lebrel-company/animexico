import Sidebar from '../components/Sidebar'


export default function AdministratorLayout(props){
    return(
        <div className="w-screen h-screen">
            <div className='flex h-full w-full'>
                <div className='h-full w-1/6'>
                    <Sidebar/>
                </div>
                <div className='container m-auto h-full container-scrollbar overflow-y-scroll'>
                    {props.children} 
                </div>
            </div>               
        </div>
        
    )
};