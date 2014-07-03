'use strict';

describe('create a new post', function(){
  var loginPage = require('../page_objects/login_page.js');
  var postPage = require('../page_objects/post_page.js');
  var postUrl = 'http://localhost:9000/#/post';

  beforeEach(function(){
    var username = 'mst-test-user';
    var password = 'GVvm6uvmfX6GeT';
    var novoButton = element(by.css('.form-inline a'));

    loginPage.accessPopup();

    browser.getAllWindowHandles().then(function (handles) {
      browser.switchTo().window(handles[1]);
      loginPage.loginWith(username, password);

      browser.switchTo().window(handles[0]);
    });
    novoButton.click();
  });

  afterEach(function(){
    browser.manage().deleteAllCookies();
  });

  it('should save a new one', function(){
    expect(browser.getCurrentUrl()).toEqual(postUrl);
  })
});
