'use strict';

describe('Creating a new post', function(){

  var browser = protractor.getInstance();
  var targetUrl = 'http://localhost:9000/#/auth';
  var postsUrl = 'http://localhost:9000/#/posts';


  beforeEach(function(){
    browser.ignoreSynchronization = true;
    browser.get(targetUrl);

  });

  it('should login', function(){
    var githubButton = element(by.css('.login'))
    expect(githubButton.getText()).toEqual('Login');

    githubButton.click();

    browser.getAllWindowHandles().then(function (handles) {
      browser.switchTo().window(handles[1]);
      expect(browser.getCurrentUrl()).toContain('https://github.com/login');
      var username = element(by.css('#login_field'));
      var password = element(by.css('#password'));
      var login = element(by.css('.auth-form-body .button'));

      username.sendKeys('mst-test-user');
      password.sendKeys('GVvm6uvmfX6GeT');
      login.click();
      browser.sleep(10000);
      browser.switchTo().window(handles[0]);
      browser.sleep(10000);
    });


    expect(browser.getCurrentUrl()).toEqual(postsUrl)
  });

});
