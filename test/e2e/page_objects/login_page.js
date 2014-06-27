'use strict';

var login = function(){

  this.githubButton = element(by.css('.login'));
  this.username = element(by.css('#login_field'));
  this.password = element(by.css('#password'));
  this.login = element(by.css('.auth-form-body .button'));
  this.browser = protractor.getInstance();
  this.targetUrl ='http://localhost:9000/#/auth';

  this.setName = function(name) {
    username.sendKeys(name);
  }

  this.load = function(name){
    browser.get(targetUrl);
  }

  this.setPassword = function(password){
    password.sendKeys(password);
  }


  this.loginWith = function(name, password) {
    this.load();
    this.githubButton.click();

    this.browser.getAllWindowHandles().then(function (handles) {
      this.browser.switchTo().window(handles[1]);
      this.login.click();
      this.browser.switchTo().window(handles[0]);
      });
  }

};
