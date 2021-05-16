import Header from '../components/Header';
import Footer from '../components/Footer';


export default function ClientLayout(props) {
    return (
        <div>
            <div
                className={`
                    h-screen w-screen flex flex-col
                `}
            >
                <div className="w-full relative z-30">
                    <Header/>
                </div>
                <div
                    className={`
                        flex-grow flex items-center relative z-30
                    `}
                >
                    {props.children}
                </div>
                <div
                    className={`
                        w-full relative z-30
                    `}
                >
                    <Footer/>
                </div>
                <div
                    className={` 
                    ${props.hasOwnProperty('pattern') ? props.pattern : 'bg-clouds'} 
                    w-screen z-0 fixed h-screen
                `}
                />
            </div>
        </div>
    );
};