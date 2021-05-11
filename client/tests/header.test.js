'use strict';
// libraries:
const puppeteer = require('puppeteer')
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

var host = 'localhost:5000'

test('Adds two numbers', () => {
    var sum = 1 + 2

    expect(sum).toEqual(3)
})

test('We can lauch browser', async () => {
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage()
    await page.goto(host)
})