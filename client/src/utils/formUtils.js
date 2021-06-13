'use strict';
// libraries:
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el)=>{console.log(util.inspect(el, false, 5, true))}
//==============================================================================


export function appendWarningMessage(formik, value) {
    return (
        <div className="text-sm text-palered">
            {
                function () {
                    return (
                        formik.touched[value] && formik.errors[value] ? (
                            <div className="text-red-400">
                                {formik.errors[value]}
                            </div>
                        ) : null
                    )
                }()
            }
        </div>
    )
}
