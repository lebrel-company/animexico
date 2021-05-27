'use strict';
// libraries:
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => {
    console.log(util.inspect(el, false, 5, true))
}

//==============================================================================


function listOfMappedElementIds(listOfElements) {
    return listOfElements.map((el) => {
            return {
                id: el.id
            }
        }
    )
}



export default {
    listOfMappedElementIds,
}
