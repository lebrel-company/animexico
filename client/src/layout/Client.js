import Header from '../components/Header';
import Footer from "../components/Footer";


export default function ClientLayout(props) {
    return (
        <div>
            <div className="
            flex flex-col h-screen relative z-50
            ">
                <div className='w-full relative z-30 flex-none'>
                    <Header/>
                </div>
                <div
                    className='overflow-y-scroll w-full h-full flex items-center justify-center'>
                    {props.children}
                </div>
                <div className='w-full relative z-30 bottom-0 flex-none'>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};