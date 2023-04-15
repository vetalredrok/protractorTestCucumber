const Page = require('./basePage');
const SeatsSelectPage = require('./seatsSelectPage');
const Waits = require('../helper/protractorWaits');
const Browser = require('../helper/browser');
const {element} = require("protractor");

class FlightSelect extends Page {

    get flight () {
        return element(by.xpath('(//div[contains(@class, "card-wrapper")]//button)[1]'));
    }

    get valueFareButton(){
        return element(by.xpath('//div[@data-e2e="fare-card--standard"]//button'));
    }

    get continueWithValueFare(){
        return element(by.xpath('//button[@data-e2e="value"]'));
    }

    get skipLogin(){
        return element(by.xpath('//button[@class="login-touchpoint__expansion-bar"]'));
    }

    get title(){
        return element(by.xpath('//button[@type="button"]'));
    }

    get mr(){
        return element(by.xpath('//ry-dropdown-item[@data-ref="title-item-0"]/button'));
    }
    get mrs(){
        return element(by.xpath('//ry-dropdown-item[@data-ref="title-item-1"]/button'));
    }

    get ms(){
        return element(by.xpath('//ry-dropdown-item[@data-ref="title-item-2"]/button'));
    }

    get firstName(){
        return element(by.xpath('//input[@id="form.passengers.ADT-0.name"]'));
    }

    get lastName(){
        return element(by.xpath('//input[@id="form.passengers.ADT-0.surname"]'));
    }

    get continueButton(){
        return element(by.xpath('//continue-flow-container[@device="desktop"]//button'));
    }

    async clickOnFlight(){
        await Waits.waitForElementClickable(this.flight)
        return this.flight.click();
    }

    async scrollToValueFareButton(){
        await Waits.waitForElementExist(this.valueFareButton);
        return Browser.scrollToElement(this.valueFareButton);
    }

    async confirmValueFare(){
        await this.valueFareButton.click();
        await Waits.waitForElementClickable(this.continueWithValueFare);
        return this.continueWithValueFare.click();
    }

    async doSkipLogin(){
        await Waits.waitForElementExist(this.skipLogin);
        await Browser.scrollToElement(this.skipLogin);
        return this.skipLogin.click();
    }

    async chooseTitle(title){
        await Waits.waitForElementClickable(this.title);
        await this.title.click();

        switch (title) {
            case 'Mr': {
                await Waits.waitForElementClickable(this.mr);
                await this.mr.click();
                break;
            }
            case 'Mrs': {
                await Waits.waitForElementClickable(this.mrs);
                await this.mrs.click();
                break;
            }
            case 'Ms':{
                await Waits.waitForElementClickable(this.ms);
                await this.ms.click();
                break;
            }
            default:{
                throw new Error('Not valid title for a passenger');
            }
        }
    }

    async provideFirstAndLastName(name, surname){
        await this.firstName.sendKeys(name);
        await this.lastName.sendKeys(surname);
        await Browser.scrollToElement(this.continueButton);
        await this.continueButton.click();
        return SeatsSelectPage;
    }


}

module.exports = new FlightSelect();