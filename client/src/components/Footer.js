import Link from 'next/link'
import routes from '../utils/routes'

function Footer() {
    return (
        <div className='bg-indigo shadow-lg w-screen'>
            <div className='container mx-auto p-8'>
                <div className='flex justify-center items-center'>
                    <img src='/tamashii_white_outline.png'
                         className='w-20 opacity-90'/>
                </div>
            </div>
        </div>
    )
}

export default Footer