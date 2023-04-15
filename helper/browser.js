const {browser} = require("protractor");

class Browser {

    static scrollToElement(elementForScroll){
        return  browser.actions().mouseMove(elementForScroll).perform();
    }

}

module.exports = Browser;