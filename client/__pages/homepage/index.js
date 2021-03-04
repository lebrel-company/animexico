import Link from 'next/link';
import Singoff from '../../components/Singoff';
import Layout from '../../components/Layout';


'use strict';

function Homepage() {
    
    
    return (
       
        <body className="antialiased md:bg-gray-100">
            <div>
                <Layout/>
                <Singoff/>
                
            </div>
           <body className="antialiased md:bg-gray-100">
                <div className="container mx-auto mt-10 grid grid-cols-1 min-h-screen md:grid-cols-3 gap-3">
                    <div className="bg-gray-200 md:p-8 p-2 bg-white rounded-lg">
                            goku
                    </div>
                    <div className="bg-gray-200 md:p-8 p-2 bg-white rounded-lg">
                            goku
                    </div>
                    <div className="bg-gray-200 md:p-8 p-2 bg-white rounded-lg">
                            goku
                    </div>
                </div>              
               
           </body>
            
        </body>
       
        
    );
}



export default Homepage;