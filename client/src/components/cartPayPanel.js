import React from 'react'
import Link from 'next/link'

function cartPayPanel() {
    return (
        <div className="pt-4 shadow-md">
            <div className="bg-dark rounded-md">
                <div
                    className="text-pale flex justify-center mx-20 font-deco text-4xl pt-10">
                    Total
                </div>
                <div className="divide-y divide-pale">
                    <div
                        className="text-pale flex justify-center mx-20 font-deco text-4xl p-5">
                        $12,000 MXN
                    </div>
                    <div
                        className="text-pale flex justify-center mx-20 font-deco text-xl py-5">
                        Envio Incluido
                    </div>
                </div>
                <div className="flex justify-center bg-pale bg-opacity-80 py-5">
                    <img src="/PaypalLogo.png"
                         className="h-10"
                    />
                </div>
                <div className="flex justify-center py-10">
                    <Link href="/checkout">
                        <a className={`button-red text-3xl p-2`}
                        >Continuar</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default cartPayPanel
