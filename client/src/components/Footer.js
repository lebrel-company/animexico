'use strict';
// libraries:
import Link from 'next/link'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {mapOfRoutes} from '../utils/routes'
//==============================================================================


export default function Footer() {
    return (
        <div className="bg-black-gradient text-pale text-xl">
            <div className="container mx-auto p-8">
                <div className="flex justify-between items-center">

                    <div className="px-4">
                        <Link className="m-4" href={mapOfRoutes.privacy.route}>
                            <a>{mapOfRoutes.privacy.title}</a>
                        </Link>
                    </div>

                    <div>
                        <Link href={mapOfRoutes.terms.route}>
                            <a>{mapOfRoutes.terms.title}</a>
                        </Link>
                    </div>

                    <img src="/tamashii_white_outline.png"
                         className="w-20 opacity-90"/>

                    <div className="px-4">
                        <Link className="m-4" href={mapOfRoutes.faqs.route}>
                            <a>{mapOfRoutes.faqs.title}</a>
                        </Link>
                    </div>

                    <div>
                        <Link href={mapOfRoutes.profile.route}>
                            <a>{mapOfRoutes.profile.title}</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

