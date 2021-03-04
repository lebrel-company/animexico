import Link from 'next/link';
import Layout from '../components/Layout';
import Singoff from '../components/Singoff';

function Homepage() {
    return (
        <div>
            <div>
            <Layout/>
            
            
            <div className="container mx-auto mt-20 grid grid-cols-4 gap-4">
                <div>
                    <div className="text-2xl font-semibold">Juan Pérez</div>
                    <div className="ml-20 mt-10 text-xl">
                        <Link href="/userProfile">
                            <a>
                                Perfíl
                            </a>
                        </Link>                        
                    </div>
                    <div className="ml-20 mt-2 text-xl">
                        <Link href="/userOrdersHistory">
                            <a>
                                {text.userOrderTitle} 
                            </a>
                        </Link>
                    </div>
                    <div className="ml-20 mt-2 text-xl">
                        <Link href="/secondaryAddress">
                            <a > {text.secondaryAddressTitle}</a>                                                  
                        </Link>
                    </div>
                    <div className="ml-20 mt-2 text-xl">
                        <Link href="/editUser">
                            <a > {text.editUser}</a>                                                  
                        </Link>
                    </div>                  
                    <div className="ml-20 mt-2 text-xl">
                        <Singoff/>
                    </div>
                    
                </div>
                
                <div className="rounded-md flex flex-col  col-span-3">
                    <div className="p-4 m-2 grid grid-rows-2 grid-cols-7 gap-4">
                        <div className=" grid-cols-1 h-24 text-center font-semibold">
                            
                        </div>
                        <div className="grid-cols-1 h-24 text-center font-semibold">
                            Producto
                        </div>
                        <div className="grid-cols-1 h-24 text-center font-semibold">
                            Fecha de compra
                        </div>
                        <div className="grid-cols-1 h-24 text-center font-semibold">
                            Fecha estimada de entrega
                        </div>
                        <div className="grid-cols-1 h-24 text-center font-semibold">
                            Estado de pago
                        </div>
                        <div className="grid-cols-1 h-24 text-center font-semibold">
                            Estado de pedido
                        </div>
                        <div className="grid-cols-1 h-24 text-center font-semibold">
                            Total
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
       
        
    );
}

var text = {
    title: 'Perfil de usuario',
    userOrderTitle: 'Historial de pedidos',
    secondaryAddressTitle: 'Direción Opcional',
    editUser: 'Editar Usuario'
}

export default Homepage;