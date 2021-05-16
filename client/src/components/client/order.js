import React from 'react'
import Product from './product'

function orders() {
    return (
        <div
            className="container flex-col justify-center w-full border-2 rounded-md rounded-md">
            <div className="flex-col">
                <div className="rounded-sm bg-dark h-12 grid grid-cols-6 gap-2">
                    <div
                        className="flex flex-col justify-center items-center font-deco text-pale">
                        <div>No. de guia UPS</div>
                        <div>3213213131</div>
                    </div>
                    <div
                        className="flex flex-col justify-center items-center font-deco text-pale">
                        <div>Fecha de compra</div>
                        <div>02 de julio 2021</div>
                    </div>
                    <div
                        className="flex flex-col justify-center items-center font-deco text-pale">
                        <div>Fecha estimada de entrega</div>
                        <div>01 de agosto 2021</div>
                    </div>
                    <div
                        className="flex flex-col justify-center items-center font-deco text-pale">
                        <div>Estado de pago</div>
                        <div>Pagado</div>
                    </div>
                    <div
                        className="flex flex-col justify-center items-center font-deco text-pale">
                        <div>Estado de pedido</div>
                        <div>Por entregar</div>
                    </div>
                    <div
                        className="flex justify-center items-center font-deco text-pale">
                        <div>Total</div>
                        <div>$7,500 MXN</div>
                    </div>
                </div>
                <div
                    className="bg-grayblue m-2 border-2 border-dark rounded-md m-4 p-2">
                    <Product/></div>
                <div
                    className="bg-grayblue m-2 border-2 border-dark rounded-md m-4 p-2">
                    <Product/></div>
                <div
                    className="bg-grayblue m-2 border-2 border-dark rounded-md m-4 p-2">
                    <Product/></div>
                <div
                    className="bg-grayblue m-2 border-2 border-dark rounded-md m-4 p-2">
                    <Product/></div>
                <div
                    className="bg-grayblue m-2 border-2 border-dark rounded-md m-4 p-2">
                    <Product/></div>
                <div
                    className="bg-grayblue m-2 border-2 border-dark rounded-md m-4 p-2">
                    <Product/></div>
            </div>
        </div>


    )
}

export default orders
