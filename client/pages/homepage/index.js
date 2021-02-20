import Link from 'next/link';
import Singoff from '../../components/Singoff';


'use strict';

function Homepage() {
    
    
    return (
        <div>
            <div>{data.title}</div>
            <Singoff/>

            <div>
                <Link href="/userProfile">
                    <a className="bg-black py-2 px-5 mt-5 inline-block text-white">{data.linkPerfil}</a>
                </Link>
            </div>
        </div>
        
    );
}

var data = {
    title: 'TAMASHII MX',
    linkPerfil: 'Perfil de usuario'
}

export default Homepage;