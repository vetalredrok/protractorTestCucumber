const Page = require('./basePage');
const Waits = require('../helper/protractorWaits');
const {element} = require("protractor");

class LoginPage extends Page {

    get loginForm () {
        return element(by.xpath('//form[@data-ref="login_modal"]'));
    }

    get popupHeader(){
        return element(by.xpath('//h3[@class="auth-popup__header-title"]'));
    }

    waitForPopup(){
        return Waits.waitForElementVisible(this.popupHeader);
    }
}

module.exports = new LoginPage();