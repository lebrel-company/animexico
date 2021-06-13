'use strict';
// libraries:
import util from 'util'
import _ from 'lodash'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
var pp = (el) => console.log(util.inspect(el, false, 5, true))
//==============================================================================

var __settings = {
    cartTimeout: 5000
}


export function globalSettings() {
    return _.cloneDeep(__settings)
}