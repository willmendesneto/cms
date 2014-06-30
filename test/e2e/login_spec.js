'use strict';


describe('Creating a new post', function(){

  var postsUrl = 'http://localhost:9000/#/posts';
  var loginUrl = 'http://localhost:9000/#/auth'
  var loginPage = require('../page_objects/login_page.js');

  beforeEach(function(){
    var browser = protractor.getInstance();
  });

  it('should not login user with wrong password or username', function() {

    var username = 'mmmmmmmm';
    var password = 'ccccccccc';

    loginPage.accessPopup();

    browser.getAllWindowHandles().then(function (handles) {
      browser.switchTo().window(handles[1]);
      loginPage.loginWith(username, password);

      browser.switchTo().window(handles[0]);
    });

    expect(browser.getCurrentUrl()).toEqual(loginUrl)
  });

  it('should login user with correct credentials', function(){

    var username = 'mst-test-user';
    var password = 'GVvm6uvmfX6GeT';

    loginPage.accessPopup();

    browser.getAllWindowHandles().then(function (handles) {
      browser.switchTo().window(handles[1]);
      loginPage.loginWith(username, password);

      browser.switchTo().window(handles[0]);
    });

    expect(browser.getCurrentUrl()).toEqual(postsUrl)
  });

});
