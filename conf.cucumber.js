const {setDefaultTimeout} = require('@cucumber/cucumber');

exports.config = {
    directConnect: true,
    // seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    baseUrl: 'https://www.ryanair.com/ie/en',
    getPageTimeout: 10000,
    allScriptsTimeout: 50000,
    //
    // Capabilities to be passed to the webdriver instance.
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    framework: 'custom',
    // multiCapabilities: [
    //     {
    //         'browserName': 'chrome'
    //     },
    //     {
    //         'browserName': 'firefox',
    //         'moz:firefoxOptions': {
    //             // Disable the page load strategy
    //             pageLoadStrategy: 'none'
    //         }
    //     }
    //
    // ],
    plugins: [{
        package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
        options:{
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true
        }
    }],

    maxSessions: 1,

    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: ['./features/*.feature'],

    // onPrepare: function () {
    //     browser.driver.manage().timeouts().implicitlyWait(60000);
    // },

    cucumberOpts: {
        // require step definitions
        timeout: 60000,
        format: 'json:tmp/results.json',
        require: [
            'features/stepDefinitions/stepDefinitions.js', // accepts a glob
        ],
    }
};