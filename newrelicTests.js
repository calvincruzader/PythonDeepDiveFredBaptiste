/**
 * Script Name: BadCredit-NewRelic
 * 
 * Generated script for New Relic Synthetics
 * Generated using se-builder with New Relic Synthetics Formatter
 *
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripted-browsers
 * for details.
 */

/** CONFIGURATIONS **/

// Theshold for duration of entire script - fails test if script lasts longer than X (in ms)
// Script-wide timeout for all wait and waitAndFind functions (in ms)
var DefaultTimeout = 60000;
// Change to any User Agent you want to use.
// Leave as "default" or empty to use the Synthetics default.
var UserAgent = "Bot";

/** HELPER VARIABLES AND FUNCTIONS **/

var assert = require('assert'),
  By = $driver.By,
  browser = $browser.manage(),
  startTime = Date.now(),
  stepStartTime = Date.now(),
  prevMsg = '',
  prevStep = 0,
  lastStep = 9999,
VARS = {};
// Uncomment and use this if you're running Se-Builder 2 and used Manual Entry variables.
// If you don't know what those are, fuggedaboutit!
// VARS = {{scriptManualEntryData}};

var log = function(thisStep, thisMsg) {
  if (thisStep > 1 || thisStep == lastStep) {
    var totalTimeElapsed = Date.now() - startTime;
    var prevStepTimeElapsed = totalTimeElapsed - stepStartTime;
    console.log('Step ' + prevStep + ': ' + prevMsg + ' FINISHED. It took ' + prevStepTimeElapsed + 'ms to complete.');
    $util.insights.set('Step ' + prevStep + ': ' + prevMsg, prevStepTimeElapsed);
    if (DefaultTimeout > 0 && totalTimeElapsed > DefaultTimeout) {
      throw new Error('Script timed out. ' + totalTimeElapsed + 'ms is longer than script timeout threshold of ' + DefaultTimeout + 'ms.');
    }
  }
  if (thisStep > 0 && thisStep != lastStep) {
    stepStartTime = Date.now() - startTime;
    console.log('Step ' + thisStep + ': ' + thisMsg + ' STARTED at ' + stepStartTime + 'ms.');
    prevMsg = thisMsg;
    prevStep = thisStep;
  }
};

/** BEGINNING OF SCRIPT **/

console.log('Starting synthetics script: BadCredit-NewRelic');
console.log('Default timeout is set to ' + (DefaultTimeout/1000) + ' seconds');
console.log('Variables set in this script: ', VARS);

// Setting User Agent is not then-able, so we do this first (if defined and not default)
if (UserAgent && (0 !== UserAgent.trim().length) && (UserAgent != 'default')) {
  log(0, "Setting User-Agent to "+UserAgent+" New Relic");
  $browser.addHeader('User-Agent', UserAgent+" New Relic");
  console.log('Setting User-Agent to ' + UserAgent+" New Relic");
}

// Get browser capabilities and do nothing with it, so that we start with a then-able command
$browser.getCapabilities().then(function () { })

// Step 1
.then(function() {
  log(1, '$browser.get("https://www.creditcards.com/bad-credit/")');
  return $browser.get("https://www.creditcards.com/bad-credit/"); })

// Step 2
.then(function () {
  log(3, 'storeTitle VARS.cardsCategory');
  return $browser.getTitle(); })
  .then(function (title) {
  VARS.cardsCategory = title;
})

// Step 3
.then(function () {
  log(4, 'storeText VARS.cardName');
  return $browser.findElement(By.css(".product-box__title__link")); })
  .then(function (el) { return el.getText(); })
  .then(function (text) {
  VARS.cardName = text;
})

  .then(function () {
  log(5, 'storeElementAttribute VARS.cardNumber');
  return $browser.findElement($driver.By.css(".product-box__title")); })
  .then(function (el) { return el.getAttribute("data-ccid"); })
  .then(function (value) {
  VARS.cardNumber = value;
})

// Step 4
.then(function() {
  log(6, 'clickElement "dtApply__button applyButton"');
  return $browser.waitForAndFindElement(By.css(".product-box__apply-button"), DefaultTimeout); })
.then(function (el) { el.click(); })

.then(function(){
  log(7, 'switchWindow "Just a Moment While We Direct You to Your Offer"');
  $browser.getAllWindowHandles().then(function(windowHandlers) {
    console.log(windowHandlers);
    $browser.switchTo().window(windowHandlers[1]);
  })
})

// Step 5
.then(function () {
  log(8, 'waitForTitle "Just a Moment While We Direct You to Your Offer"');
  return $browser.wait(function() {
    return $browser.getTitle(); })
  .then(function (title) {
    return title == "Just a Moment While We Direct You to Your Offer";
  }, DefaultTimeout);
})

// Step 6
.then(function () {
  log(9, 'waitForTitle !"Just a Moment While We Direct You to Your Offer"');
  return $browser.wait(function() {
    return $browser.getTitle(); })
  .then(function (title) {
    return title != "Just a Moment While We Direct You to Your Offer";
  }, DefaultTimeout);
})

// Step 7
.then(function () {
  log(10, 'waitForTextPresent !"Transfering You"');
  $browser.wait(function () {
     return $browser.findElement(By.tagName('body')).getText().then(function (text) { return text.indexOf("Transfering You") != -1; }).then(function (bool) { return !bool; });
  }, DefaultTimeout);
})

// Step 9
.then(function () {
  log(11, 'Make sure the URL changed');
var currentUrl;
$browser.getCurrentUrl().then(function(url) {
        currentUrl = url;
        log(VARS.cardNumber, 'Verifying the card number in the URL');
        currentUrl.includes(VARS.cardNumber);
        log(11.2,'Verifying cohesion parameters present')
        currentUrl.includes('c_correlation_id');
        currentUrl.includes('c_tenant_id=4b075c45-81db-4c14-8c72-46a1eff91981');
        currentUrl.includes('c_anonymous_id');
        currentUrl.includes('c_instance_id');
        currentUrl.includes('c_session_id');
        log(11.3, 'Verifying other URL parameters')
        currentUrl.includes('oid');
        currentUrl.includes('pgpos=1');
    }
).then(function() {
        $browser.wait(function() {
            return $browser.getCurrentUrl().then(function (url) {
                return url !== currentUrl;
            })
        })})})

.then(function() {
  log(lastStep, '');
  console.log('Browser script execution SUCCEEDED.');
}, function(err) {
  console.log ('Browser script execution FAILED.');
  throw(err);
});

/** END OF SCRIPT **/