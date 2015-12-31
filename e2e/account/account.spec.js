'use strict';

var config = browser.params;

describe('Account View', function() {
  var page;

  beforeEach(function() {
    browser.get(config.baseUrl + '/account');
    page = require('./account.po');
  });

  it('should register account', function() {
    page.accountName.sendKeys('test_user');
    page.submitButton.click();
    browser.waitForAngular();
    expect(page.accountEl.getText()).toContain('test_user');
  });
});
