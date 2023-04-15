const {element} = require("protractor");
const Waits = require('../helper/protractorWaits');

class HeaderControl {

    get priceIcon(){
        return element(by.xpath("//div[@data-ref='basket.basket-total__icon-spinner' and @style='opacity: 0;']"));
    }

    waitForCorrectPrice(){
        return Waits.waitForElementExist(this.priceIcon);
    }

}

module.exports = new HeaderControl();