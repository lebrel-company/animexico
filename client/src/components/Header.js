import Link from 'next/link'
import routes from '../utils/routes'

function Header() {
    return (
        <div className='bg-dark shadow-lg'>
            <div className='container mx-auto md:p-4'>
                <div
                    className='flex justify-center items-center md:flex-row flex-wrap p-4'>
                    <img src='/logo.png'
                         className='w-1/4 opacity-90 lg:block hidden'/>
                    {
                        createRoutes()
                    }
                    <div className='
                    relative py-6 z-20 md:py-0
                    md:grid grid-cols-1 md:grid-cols-3 gap-4
                    '>
                        <Link href='/signup'>
                            <a className='
                            text-pale font-bold font-simp text-lg text-center
                            p-2 m-2 rounded-md border-2
                            '>
                                signup
                            </a>
                        </Link>
                        <Link href='/signin'>
                            <a className='
                            text-pale font-bold font-simp text-lg text-center
                            p-2 m-2 rounded-md border-2
                            '>
                                signin
                            </a>
                        </Link>
                        <Link href='/cart'>
                            <a className='
                            text-pale font-bold font-simp text-lg text-center
                            p-2 m-2 rounded-md bg-red border-2 border-red
                            '>
                                cart
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function createRoutes() {
    let listOfKeys = ['homepage', 'profile', 'store', 'faqs']
    return listOfKeys.map(function createLinks(value, index) {
            return (
                <div key={index} className='flex-1 text-center'>
                    <Link href={routes[value]['route']}
                    >
                        <a className='
                        text-2xl font-deco text-pale
                    '>
                            {routes[value]['title']}
                        </a>
                    </Link>
                </div>
            )
        }
    )
}


export default Header
