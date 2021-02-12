import React from 'react';
import Link from 'next/link';


function Homepage() {
    return (
        <div>
            <div>{data.title}</div>
            <div>
                <Link href="/secondaryAddress">
                <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                        value="Añadir Direccion"                    
                    />
                </Link>
            </div>
        </div>
        
    );
}

var data = {
    title: 'Perfil de usuario'
}

export default Homepage;