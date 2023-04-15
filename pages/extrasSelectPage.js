const Page = require('./basePage');
const LoginPage = require('./loginPage');
const Waits = require('../helper/protractorWaits');
const Browser = require('../helper/browser');
const {element} = require("protractor");

class ExtrasSelectPage extends Page {

    get dismissInsurance () {
        return element(by.xpath('//button[@data-ref="enhanced-takeover-desktop__dismiss-cta"]'));
    }

    get continueButton(){
        return element(by.xpath('//button[@color="gradient-yellow"]'));
    }

    get carHeader(){
        return element(by.xpath('//div[@class="car-hire-header__right"]'));
    }

    async closeInsuranceWindow(){
        await Waits.waitForElementVisible(this.dismissInsurance);
        return  this.dismissInsurance.click();
    }

    async clickContinue(){
        await Waits.waitForElementExist(this.continueButton);
        await Browser.scrollToElement(this.continueButton);
        await this.continueButton.click();
        return LoginPage;
    }

    waitForCarHeader(){
        return Waits.waitForElementExist(this.carHeader);
    }



}

module.exports = new ExtrasSelectPage();