import React from 'react'

function frequentQuestionsSection() {
    return (
        <div>
            <div>
                <h1>
                    {text.title}
                </h1>
            </div>
            <div>
                <h4>
                    {text.questions.question01}
                </h4>
            </div>
            <div>
                <h5>
                    {text.answers.answer01}
                </h5>
            </div>
            <div>
                <h4>
                    {text.questions.question02}
                </h4>
            </div>
            <div>
                <h5>
                    {text.answers.answer02}
                </h5>
            </div>
            <div>
                <h4>
                    {text.questions.question03}
                </h4>
            </div>
            <div>
                <h5>
                    {text.answers.answer03}
                </h5>
            </div>
            <div>
                <h4>
                    {text.questions.question04}
                </h4>
            </div>
            <div>
                <h5>
                    {text.answers.answer04}
                </h5>
            </div>
            <div>
                <h4>
                    {text.questions.question05}
                </h4>
            </div>
            <div>
                <h5>
                    {text.answers.answer05}
                </h5>
            </div>
            <div>
                <h4>
                    {text.questions.question06}
                </h4>
            </div>
            <div>
                <h5>
                    {text.answers.answer06}
                </h5>
            </div>
        </div>
    )
}

export default frequentQuestionsSection


var text = {
    title: 'Preguntas Frecuentes',
    questions:{
        question01: '¿Compré una pre venta, cuando enviarán mi producto?',
        question02: '¿Por cuál paquetería enviarán mi producto?',
        question03: '¿Cómo puedo rastrear mi producto?',
        question04: '¿Cuánto tiempo tarda en llegar mi paquete?',
        question05: '¿Qué sucede en caso de  daño, extravío o robo de mi paquete?',
        question06: 'UPS Trató de entregar en mi domicilio pero no estaba en mi hogar o llené incorrectamente el formulario de envío, no me di cuenta y puse un dato erróneo ¿Cómo lo soluciono?'
        
    },
    answers:{
        answer01: 'Una vez que tu producto llegue a nuestro almacén (usualmente dentro de la fecha indicada en la publicación de pre orden) se te notificará que ya está en almacén y a partir de ahí tarda en procesar de 2 a 3 días hábiles para su envío a tu domicilio.',
        answer02: 'Todos los productos son procesados por UPS de México y serán enviados a la dirección que registraste al momento de finalizar la orden en tu carrito de compras.',
        answer03: 'Una vez enviado UPS te mandará desde su portal una guía para poder rastrear el status de tu pedido. Es posible que este correo se vaya a SPAM por lo qué les recomendamos también revisar esa bandeja en caso de no recibir la guía.',
        answer04: 'Varía dependiendo la zona de la república mexicana en la que te encuentres. La entrega del paquete puede variar de 1 a 3 días hábiles.  Cualquier situación de demora en la entrega de los paquetes es necesario que se comuniquen directamente con UPS a su número de atención a clientes.',
        answer05: 'Distribuidora Animexico S.A de C.V y/o Tamashii Nations no son responsables de los paquetes en caso de alguna de estas situaciones una vez que estos se envían a través de UPS de México.  Todos los paquetes llevan un seguro básico el cuál cubre cierto monto proporcional del valor del paquete.  En todo caso el cliente debe iniciar el proceso de reclamo con UPS de México.',
        answer06: 'Debes llamar al No. de atención a clientes de UPS para subsanar el error en la dirección o notificar algún domicilio nuevo para entrega. UPS hará 2 a 3 intentos de entrega en el domicilio antes de retornar el paquete a origen. En caso de que el paquete  sea retornado a origen este generará un cargo por el retorno y un cargo por reexpedición del paquete que tendrá que ser cubierto por el comprador antes de que el envío vuelva a ser enviado al domicilio.'
    }
}