const Page = require('./basePage');
const ExtrasSelectPage = require('./extrasSelectPage');
const HeaderControl = require('./headerControl');
const Waits = require('../helper/protractorWaits');
const Browser = require('../helper/browser');
const {element} = require("protractor");

class BagsSelectPage extends Page {

    get smallBagRadioButton () {
        return element(by.xpath('//label[@for="ry-radio-button--0"]'));
    }

    get closeIcon(){
        return element(by.xpath('//icon[@class="warning-tooltip-content__icon-close icon-12"]'));
    }

    get add20kgCheckInBag(){
        return element(by.xpath('//div[@class="counter__button-wrapper--enabled"]'));
    }

    get continueButton(){
        return element(by.xpath('//button[@class="ry-button--gradient-yellow"]'));
    }

    async clickSmallBagOnly(){
        await Waits.waitForElementClickable(this.smallBagRadioButton);
        await this.smallBagRadioButton.click();
        await Waits.waitForElementClickable(this.closeIcon);
        return this.closeIcon.click();
    }

    async add20kgBag(){
        await Browser.scrollToElement(this.add20kgCheckInBag);
        return this.add20kgCheckInBag.click();
    }

    async clickContinue(){
        await Browser.scrollToElement(this.continueButton);
        await HeaderControl.waitForCorrectPrice();
        await this.continueButton.click();
        return ExtrasSelectPage;
    }



}

module.exports = new BagsSelectPage();
