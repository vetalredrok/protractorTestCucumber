const Page = require('./basePage');
const FlightsSelectPage = require('./flightsSelectPage');
const {$} = require("protractor");
const Waits = require('../helper/protractorWaits')

class MainPage extends Page {

    get departurePoint () {
        return $('#input-button__departure');
    }

    get destinationPoint () {
        return $('#input-button__destination');
    }

    get oneWay () {
        return $('button[aria-label="One way"]');
    }

     selectedAirport(airport) {
        return $(`span[data-id='${airport}']`);
    }

    get searchButton(){
        return $('button[data-ref="flight-search-widget__cta"]')
    }

    async clickOnDate(providedDate){

        const date = new Date(providedDate);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const choseMonth  = months[date.getMonth()];

        const monthElement =  $(`div[data-id='${choseMonth}']`);
        await Waits.waitForElementVisible(monthElement);
        await monthElement.click();

        const fullDateElement = $(`div[data-id='${providedDate}']`);
        await Waits.waitForElementVisible(fullDateElement);
        return  fullDateElement.click();
    }

    async selectOneWayRouteWithDeparturePoint (departureAirport){
        await this.oneWay.click();
        await this.departurePoint.click();
        await this.departurePoint.clear();
        await this.departurePoint.sendKeys(departureAirport);
        await Waits.waitForElementVisible(this.selectedAirport(departureAirport));
        return this.selectedAirport(departureAirport).click();
    }

    async selectDestinationPoint (destinationAirport){
        await this.destinationPoint.sendKeys(destinationAirport);
        await Waits.waitForElementVisible(this.selectedAirport(destinationAirport));
        return this.selectedAirport(destinationAirport).click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
        return FlightsSelectPage;
    }




}

module.exports = new MainPage();