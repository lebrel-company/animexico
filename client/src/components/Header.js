// libraries:
import Link from 'next/link'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import routes from '../utils/routes'
import buttons from '../utils/buttons.text'

//==============================================================================


function Header() {
    return (
        <div
            className='bg-dark shadow-lg bg-gradient-to-t from-dark to-darkindigo'>
            <div className='container mx-auto md:p-2'>
                <div
                    className='flex justify-center items-center md:flex-row flex-wrap p-4'>
                    <img src='/logo.png'
                         className='
                         w-1/4 opacity-90 lg:block hidden
                         '
                    />
                    {
                        createRoutes()
                    }
                    <div className='
                    relative py-4 z-20 md:py-0
                    grid grid-cols-3 gap-4
                    '>
                        <Link href='/signup'>
                            <button className='button-pale-outline'>
                                {buttons.signup.text}
                            </button>
                        </Link>
                        <Link href='/signin'>
                            <button className='button-pale-outline'>
                                {buttons.signin.text}
                            </button>
                        </Link>
                        <Link href='/cart'>
                            <button className='button-red'>
                                {buttons.cart.text}
                            </button>
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
                <div key={index} className='flex-1 text-center
                    transition duration-500 ease-in-out
                    transform hover:scale-110
                    '
                >
                    <Link href={routes[value]['route']}
                    >
                        <a className='
                        text-xl font-deco text-pale
                        border-2
                        px-4
                        py-2
                        rounded-md
                        transform
                        transition
                        ease-in-out
                        duration-200
                        border-transparent
                        hover:border-pale
                        hover:border-opacity-10
                        hover:shadow-md
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