const {element} = require("protractor");
const Page = require('./basePage');
const BagsSelectPage = require('./bagsSelectPage');
const HeaderControl = require('./headerControl');
const Browser = require('../helper/browser');
const Waits = require('../helper/protractorWaits');

class SeatsSelectPage extends Page {

    get standardSeats () {
        return element.all(by.xpath('//button[contains(@class, "seatmap__seat--standard")]'));
    }

    get passengerDetails(){
        return element(by.xpath('//div[@class="passenger-carousel__pax"]'));
    }

    get continueButton(){
        return element(by.xpath('//span[@class="seats-action__button-wrapper ng-star-inserted"]/button'));
    }

    async getPassengerDetails(){
        await Waits.waitForElementExist(this.passengerDetails);
        return this.passengerDetails.getText();
    }

    async chooseAvailableSeat(){
        const allStandard = await this.standardSeats;
        await Browser.scrollToElement(allStandard[0]);
        return allStandard[0].click();
    }

    async clickContinue(){
        await Browser.scrollToElement(this.continueButton);
        await HeaderControl.waitForCorrectPrice();
        await this.continueButton.click();
        return BagsSelectPage;
    }



}

module.exports = new SeatsSelectPage();
