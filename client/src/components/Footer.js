import Link from 'next/link'
import routes from '../utils/routes'

function Footer() {
    return (
        <div className='
        bg-dark text-pale font-simp shadow-lg w-screen
        bg-gradient-to-t from-dark to-darkindigo'
        >
            <div className='container mx-auto p-8'>
                <div className='flex flex-1 justify-center items-center'>
                    <div className='mx-auto'>
                        <span className='px-4'>
                            <Link className='m-4' href={routes.privacy.route}>
                                <a>{routes.privacy.title}</a>
                            </Link>
                        </span>
                        <span>
                            <Link href={routes.terms.route}>
                                <a>{routes.terms.title}</a>
                            </Link>
                        </span>
                    </div>
                    <div className='mx-auto'>
                        <img src='/tamashii_white_outline.png'
                             className='w-20 opacity-90'/>
                    </div>
                    <div className='mx-auto'>
                        <span className='px-4'>
                            <Link className='m-4' href={routes.privacy.route}>
                                <a>{routes.privacy.title}</a>
                            </Link>
                        </span>
                        <span>
                            <Link href={routes.terms.route}>
                                <a>{routes.terms.title}</a>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer