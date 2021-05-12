import Header from '../components/Header';


export default function ClientLayout(props) {
    return (
        <div>
            <div className={` 
            bg-clouds flex flex-col h-screen relative z-50 
            `}

            >
                <div className="w-full relative z-30 flex-none">
                    <Header/>
                </div>
                <div
                    className="overflow-y-scroll w-full h-full flex justify-center">
                    {props.children}
                </div>
            </div>
        </div>
    );
};