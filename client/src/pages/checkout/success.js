'use strict';
// libraries:
import {v4 as uuid} from 'uuid'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:

// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import ClientLayout from '../../layout/Client';

var pp = (el) => console.log(el)
//=============================================================================


const TEXTS = {
    title: '!Tu orden ha sido creada con éxito!',
    subtitle: `IMPORTANTE: Usa el siguiente link para más información.`,
    body: [
        'Recuerda que el envío de tu producto es en base a la fecha de liberación de la preventa'
    ]
}

export default function PaymentSuccess() {
    return (
        <ClientLayout>
            <div className="
            flex flex-col container mx-auto justify-center font-simp
            ">
                <div className="text-5xl text-center font-deco font-bold py-4">
                    {TEXTS.title}
                </div>
                <div className="text-3xl text-center">
                    {TEXTS.subtitle}
                </div>
                <div className="w-2/3 mx-auto">
                    <ul className="text-lg text-center">
                        {
                            TEXTS.body.map(function (t) {
                                    return (
                                        <li
                                            className="
                                            bg-lightpale shadow py-2
                                            rounded
                                            "
                                            key={uuid()}>
                                            {t}
                                        </li>
                                    )
                                }
                            )
                        }
                    </ul>
                </div>
            </div>
        </ClientLayout>
    )
}