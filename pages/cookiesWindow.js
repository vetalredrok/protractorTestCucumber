const {$, browser} = require("protractor");

class CookiesWindow {

    get agreeToPolicy(){
        return $('.cookie-popup-with-overlay__button');
    }

    async clickAgreeWithPolicy(){

        if (await this.agreeToPolicy.isDisplayed()){
            await this.agreeToPolicy.click();
        } else {
            console.log('No cookie this time');
        }

    }
}

module.exports = new CookiesWindow();