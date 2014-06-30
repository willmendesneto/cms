'use strict';


describe('Creating a new post', function(){

  var postsUrl = 'http://localhost:9000/#/posts';
  var loginPage = require('../page_objects/login_page.js');


  it('should login', function(){

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
