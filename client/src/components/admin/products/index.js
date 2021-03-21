'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
import AdministratorLayout from "../../../layout/Admin";
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
import Creator from './creator'
import Editor from './editor'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import buttons from "../../../utils/buttons.helpers";
//==============================================================================


export default function Products(props) {
    return (
        <div>
            <div className='relative z-20'>
                <Creator/>
                <Editor/>
            </div>
        </div>
    )
}

