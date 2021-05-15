'use strict';
// libraries:
import {useState} from 'react'
import {useRouter} from 'next/router'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import AdministratorLayout from '../../layout/Admin';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Products from '../../components/admin/products'
import Reports from '../../components/admin/reports';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

export default function Admin() {
    var [component, setComponent] = useState('products')
    var router = useRouter()

    function renderComponent(component) {
        switch (component) {
            case 'home':
                return router.push('/')
            case 'reports':
                return <Reports/>
            default:
                return <Products/>

        }
    }

    var states = {
        component: {
            getter: component,
            setter: setComponent
        }
    }

    return (
        <AdministratorLayout states={states} pattern={`bg-bevel`}>
            {
                renderComponent(component)
            }
        </AdministratorLayout>
    )
}
