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
var pp = (el)=>console.log(el)
//==============================================================================


export default function Error401() {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="text-xl md:text-4xl font-deco font-black">
                Debes estar registrado para poder ver esta página.
            </div>
        </div>
    )
}
