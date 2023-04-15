const {browser, ExpectedConditions} = require("protractor");


class ProtractorWaits {

    static waitForElementVisible(elementToWaitFor) {
        return browser.wait(ExpectedConditions.visibilityOf(elementToWaitFor), 5000, `Element with selector ${elementToWaitFor.locator()} is not visible`);
    }

    static waitForElementClickable(elementToWaitFor){
        return browser.wait(ExpectedConditions.elementToBeClickable(elementToWaitFor), 5000, `Element with selector ${elementToWaitFor.locator()} is not clickable`);
    }

    static waitForElementExist(elementToWaitFor){
        return browser.wait(ExpectedConditions.presenceOf(elementToWaitFor), 5000, `Element with selector ${elementToWaitFor.locator()} is not exist`);
    }

}

module.exports = ProtractorWaits;
