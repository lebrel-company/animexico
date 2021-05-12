'use strict';
// libraries:
const puppeteer = require('puppeteer')
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================


var _host = 'http://localhost:5000'
var authData = {}

var browser;
var config = {
    _w: 1920,
    _h: 1080,
}
var homepage;
beforeEach(async function _beforeEach() {
    browser = await puppeteer.launch({
        headless: false,
        args: [`--window-size=${config._w},${config._h}`],
    })
    authData.token = localStorage.getItem('token');
    authData.expiresIn = localStorage.getItem('expiresIn');
    authData.userInfo = localStorage.getItem('userInfo');
    //-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
    homepage = await browser.newPage()
    await homepage.setViewport({width: config._w, height: config._h})
    await homepage.goto(_host)
}, 10000)

afterEach(async function _afterEach() {
    await browser.close()
})

test(
    'Header has the correct links for session',
    async function validateNotAuthSessionHeaderLinks() {
        let mapOfLinks = {
            homepage: {
                text: 'Inicio',
            },
            store: {
                text: 'Tienda',
            },
            faqs: {
                text: 'FAQs',
            },
        }

        let listOfMenuLinks = ['homepage', 'store', 'faqs']

        if (authData != null) {
            listOfMenuLinks.push('profile')
        }
        let linkToHomeText = await homepage.$eval(
            'a.homepage', el => el.innerHTML,
        )
        let linkToStoreText = await homepage.$eval(
            'a.store', el => el.innerHTML,
        )
        let linkToFaqsText = await homepage.$eval(
            'a.faqs', el => el.innerHTML,
        )
        expect(linkToHomeText).toEqual(mapOfLinks.homepage.text)
        expect(linkToStoreText).toEqual(mapOfLinks.store.text)
        expect(linkToFaqsText).toEqual(mapOfLinks.faqs.text)
    },
)

test(
    'Header has the correct buttons for session',
    async function header_has_the_correct_buttons_for_session() {
    // async () => {
        let mapOfButtons = {
            signup: {
                text: 'Registrarme',
            },
            login: {
                text: 'Ingresar',
            },
        }

        let signupButton = await homepage.$eval(
            'a.button-signup', el => el.innerHTML,
        )
        let loginButton = await homepage.$eval(
            'a.button-login', el => el.innerHTML,
        )

        // let cartButton = await homepage.$eval(
        //     'a.button-cart', el => el.innerHTML,
        // )

        console.log(signupButton)
        console.log(loginButton)
        // console.log(cartButton)

        expect(signupButton).toEqual(mapOfButtons.signup.text)
        expect(loginButton).toEqual(mapOfButtons.login.text)
        // expect(cartButton).toEqual('')
    },
)

