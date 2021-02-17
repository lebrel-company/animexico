import React from 'react';
import Link from 'next/link';
import Singoff from '../components/Singoff';


function Homepage() {
    return (
        <div>
            <div>{data.title}</div>
            <Singoff/>
            <div>
                <Link href="/secondaryAddress">
                <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                        value={data.secondaryAddressTitle}                    
                    />
                </Link>
                <Link href="/userOrdersHistory">
                <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                        value={data.userOrderTitle}                    
                    />
                </Link>
                <Link href="/editUser">
                <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                        value={data.editUser}                    
                    />
                </Link>
            </div>
        </div>
        
    );
}

var data = {
    title: 'Perfil de usuario',
    userOrderTitle: 'Ver historial de compras',
    secondaryAddressTitle: 'Añadir Dirección',
    editUser: 'Editar Usuario'
}

export default Homepage;