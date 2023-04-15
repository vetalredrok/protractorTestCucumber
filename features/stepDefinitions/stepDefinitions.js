const {Given, When, Then,BeforeAll, setDefaultTimeout, After, Status} = require('@cucumber/cucumber');
const {browser} = require("protractor");
const assertChai = require('chai').assert;

const CookiesWindow = require('../../pages/cookiesWindow');
const MainPage = require('../../pages/mainPage');

setDefaultTimeout(20000);
this.currentPage = null;

BeforeAll(()=>{
     browser.manage().window().maximize();
});

After(async function(scenario) {
    let world = this;
    if (scenario.result.status === Status.FAILED)
    return browser.takeScreenshot().then((screenShot) => {
        // screenShot is a base-64 encoded PNG
        world.attach(screenShot, 'image/png');
    });
});

Given(/^I search for a flight from "([^"]*)" to "([^"]*)" on "([^"]*)" for 1 adult$/, async (departurePoint, destinationPoint, date)=>{
    this.currentPage = MainPage;
    this.currentPage.open();
    await CookiesWindow.clickAgreeWithPolicy();
    await this.currentPage.selectOneWayRouteWithDeparturePoint(departurePoint);
    await this.currentPage.selectDestinationPoint(destinationPoint);
    await this.currentPage.clickOnDate(date);
    this.currentPage = await this.currentPage.clickSearchButton();
});

When(/^I select the flight and fill the data with "([^"]*)", "([^"]*)" and "([^"]*)"$/, async (titleOfPassenger, nameOfPassenger, surnameOfPassenger)=>{
    await this.currentPage.clickOnFlight();
    await this.currentPage.scrollToValueFareButton();

    assertChai.isTrue(await this.currentPage.valueFareButton.isPresent(), 'Value fare must be present');

    await this.currentPage.confirmValueFare();
    await this.currentPage.doSkipLogin();
    await this.currentPage.chooseTitle(titleOfPassenger);
    this.currentPage = await this.currentPage.provideFirstAndLastName(nameOfPassenger, surnameOfPassenger);

    assertChai.deepEqual(await this.currentPage.getPassengerDetails(), `${nameOfPassenger} ${surnameOfPassenger}`, 'Passenger details must be correct');
});

Then(/^I choose the available seat$/, async ()=>{
    await this.currentPage.chooseAvailableSeat();
    this.currentPage = await this.currentPage.clickContinue();
});

Then(/^I add 20 kg bag$/, async ()=>{
    await this.currentPage.clickSmallBagOnly();
    await this.currentPage.add20kgBag();
    this.currentPage = await this.currentPage.clickContinue();
});

Then(/^I skip the extras options$/, async ()=>{
    await this.currentPage.closeInsuranceWindow();
    await this.currentPage.clickContinue();
    await this.currentPage.waitForCarHeader();
    this.currentPage = await this.currentPage.clickContinue();
});

Then(/^login popup shows up$/, async ()=>{
    await this.currentPage.waitForPopup();
    assertChai.isTrue(await this.currentPage.loginForm.isDisplayed(), 'Login form must be presented');

});
