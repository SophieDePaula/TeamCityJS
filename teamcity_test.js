var Webdriver = require("selenium-webdriver");
const { Eyes } = require("@applitools/eyes-selenium");

async function main() {
  var eyes = new Eyes(); // Note 1
  var apiKey = process.env.MY_APPLITOOLS_API_KEY;
  eyes.setApiKey(apiKey); // Note 2
  var innerDriver = new Webdriver.Builder() // Note 3
    .withCapabilities(Webdriver.Capabilities.chrome())
    .build();

  eyes.setBatch(
    process.env.APPLITOOLS_BATCH_NAME,
    process.env.APPLITOOLS_BATCH_ID
  );
  /*
   * Add optional global setup/defaults here                            // Note 4
   */
  var viewportSize = { width: 1024, height: 768 };
  driver = await eyes.open(
    innerDriver, // Note 5                // Note 5
    "My Application Name",
    "TeamCity",
    viewportSize
  );
  //.then(function (driver){ afterOpen(eyes, driver)});
  try {
    var website = "https://applitools.com/helloworld";
    driver.get(website); // Note 6
    await eyes.checkWindow("initial screen"); // Note 7
    let testResults = await eyes.close(false); // Note 8                         // Note 8
  } finally {
    eyes.abortIfNotClosed(); // Note 9
  }
  innerDriver.quit(); // Close the browser.                                  // Note 10
}
main();
