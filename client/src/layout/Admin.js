import Sidebar from '../components/Sidebar'
import Reports from '../components/admin/reports';
import Products from '../components/admin/products';


export default function AdministratorLayout(props) {

    return (
        <div className="w-screen h-screen">
            <div className={` 
            ${props.hasOwnProperty('pattern') ? props.pattern : 'bg-clouds'} 
            flex flex-col h-screen relative z-50 
            `}
            >
                <div className="flex h-screen fixed">
                    <div className="w-1/6">
                        <Sidebar states={props.states}/>
                    </div>
                    <div
                        className={`
                    w-full container mx-auto h-screen p-5  w-screen
                `}
                    >
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
};