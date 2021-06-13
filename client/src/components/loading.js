'use strict';
// libraries:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Contexts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => {
    console.log(el)
}
//==============================================================================

export default function Loading(props) {
    return (
        <div>
            <div
                className={`
                    flex justify-center items-center h-screen w-full
                `}
            >
                <div className={`text-6xl font-deco`}>
                    Loading...
                </div>
            </div>
        </div>
    )
}