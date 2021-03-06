import Header from '../components/Header';
import Footer from "../components/Footer";


export default function ClientLayout(props) {
    return (
        <div>
            <div className="
            flex flex-col justify-center items-center
            min-h-screen
            md:w-screen md:h-screen
            ">
                <div className='w-full relative z-30'>
                    <Header/>
                </div>
                <div className='
                overflow-y-scroll
                m-auto
                w-full
                flex flex-col
                '>
                    {props.children}
                    <div className='w-full relative z-30 bottom-0'>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    );
};