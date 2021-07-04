'use strict';
// libraries:
const nodemailer = require('nodemailer');
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//=============================================================================

// let mailTransporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'jairanpo@gmail.com',
//         pass: '$KeepTheBasicsAtHeart7362891!'
//     }
// });
//
// let mailDetails = {
//     from: 'contacto@tamashii.mx',
//     to: 'jairanpo@gmail.com',
//     subject: 'Compra completada con exito!',
//     text: 'Este es un correo de prueba de nuestro servidor de correos'
// };
//
// mailTransporter.sendMail(mailDetails, function (err, data) {
//     if (err) {
//         console.log(err)
//         console.log('Error Occurs');
//     } else {
//         console.log('Email sent successfully');
//     }
// });



"use strict";

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"tamashii.mx" <ventas@tamashii.mx>', // sender address
        to: "jairanpo@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Testing mail service.", // plain text body
        html: "<b>Este es un correo desde la app</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);