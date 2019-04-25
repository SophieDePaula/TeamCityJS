var webdriver = require("selenium-webdriver");
var Capabilities = webdriver.Capabilities;
var Builder = webdriver.Builder;
var By = webdriver.By;

var SeleniumSDK = require("eyes.selenium"); //Import Applitools SDK
var Eyes = SeleniumSDK.Eyes;

// Open a Chrome browser.
var driver = new Builder().withCapabilities(Capabilities.chrome()).build();

// Initialize the eyes SDK and set your private API key.
var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

//scroll the entire page
eyes.setForceFullPageScreenshot(true);

try {
  eyes.setBatch(
    process.env.APPLITOOLS_BATCH_NAME,
    process.env.APPLITOOLS_BATCH_ID
  );
  // Start the test and set the browser's viewport size to 600 x 800
  eyes.open(driver, "Test app", "First test", { width: 600, height: 800 });

  // Navigate the browser to the demo app
  driver.get("https://demo.applitools.com");

  // Visual checkpoint #1.
  eyes.checkWindow("Login Window test");
  //🌟 Note: You can have multiple "checkWindow" to create multiple test steps within a test.🌟
  //For example, you may want to test errors in the login window after clicking a login button,
  //In that case, you may add the following before you call eyes.close().
  //This will create a test with two test steps.
  //driver.click("login");
  //eyes.checkWindow("Login Window Error");
  // End the test.
  eyes.close(false);
} finally {
  // Close the browser.
  driver.quit();

  // If the test was aborted before eyes.close was called ends the test as aborted.
  eyes.abortIfNotClosed();
}
