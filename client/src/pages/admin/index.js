'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import AdministratorLayout from "../../layout/Admin";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Products from '../../components/admin/products'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

export default function Admin(){
    return(
        <AdministratorLayout>
            <Products/>
        </AdministratorLayout>
    )
}
