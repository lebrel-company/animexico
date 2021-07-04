import Document, {Html, Head, Main, NextScript} from 'next/document'
import __ from 'lodash/fp/__';


function getClientID() {
    let result = 'AWRqzvZX9poAvA67i306KiwGx82vdxVrhy0BcB6aJLCi_ihcalvYmFMzavW6SRngbRLkF2eUqUMGL2BU'

    if (process.env.NODE_ENV === 'pro') {
        result = process.env.PAYPAL_CLIENT_ID
    }
    return result
}

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html>
                <Head
                    title="tamashii.mx"
                >
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Overlock&family=Tajawal&display=swap"
                        rel="stylesheet"/>

                    <script
                        src={`https://www.paypal.com/sdk/js?client-id=${getClientID()}&components=buttons&currency=MXN`}></script>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument