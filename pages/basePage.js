const {browser} = require("protractor");

module.exports = class Page {

    open (path) {
        return browser.get(`${path}`)
    }
}