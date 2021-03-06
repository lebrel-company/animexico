// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


export default function FieldError(formik, value) {
    if (value.includes('address')) {
        let _value = value.split('.')[1]
        if (!('address' in (formik.touched))) {
            return null
        }
        if (!('address' in (formik.errors))) {
            return null
        }

        return (
            <div className='text-sm'>
                {
                    function () {
                        if (!(_value in formik.touched.address)) {
                            return null
                        }
                        return (
                            formik.touched.address[_value] &&
                            formik.errors.address[_value] ? (
                                <div className='text-palered'>
                                    {formik.errors.address[_value]}
                                </div>
                            ) : null
                        )
                    }()
                }
            </div>
        )
    } else {
        return (
            <div className='text-sm'>
                {
                    function () {
                        return (
                            formik.touched[value] && formik.errors[value] ? (
                                <div className='text-palered'>
                                    {formik.errors[value]}
                                </div>
                            ) : null
                        )
                    }()
                }
            </div>
        )
    }
}

