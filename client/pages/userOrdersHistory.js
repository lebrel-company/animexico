import Link from 'next/link';

function Homepage() {
    return (
        <div>
            <div>{data.title}</div>
            
            
            <div>{data.Producto}</div>        
            <div>{data.fecha}</div>
            <div>{data.estadoDePago}</div>
            <div>{data.estadoDePedido}</div>
            <div>{data.total}</div>

            <Link href="/userProfile">
                <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                value={data.perfil}                    
                />
            </Link>
        </div>
       
        
    );
}

var data = {
    title: 'Hitorial de pedidos',
    Producto: 'Producto',
    fecha: 'Fecha de compra',
    estadoDePago: 'Estado de pago',
    estadoDePedido: 'Estado de Pedido',
    total: 'Total',
    perfil: 'Perfil de Usuario'
}

export default Homepage;