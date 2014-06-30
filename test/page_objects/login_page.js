'use strict';

var LoginPage = function() {

  this.githubButton = element(by.css('.login'));
  this.username = element(by.css('#login_field'));
  this.password = element(by.css('#password'));
  this.loginButton = element(by.css('.auth-form-body .button'));
  this.targetUrl ='http://localhost:9000/#/auth';

  this.setName = function(name) {
    this.username.sendKeys(name);
  }

  this.load = function(){
    browser.ignoreSynchronization = true;
    browser.get(this.targetUrl);
  }

  this.setPassword = function(password){
    this.password.sendKeys(password);
  }


  this.accessPopup = function(){
    this.load();
    this.githubButton.click();
    browser.sleep(10000)
  }

  this.loginWith = function(name, password) {
    this.setName(name);
    this.setPassword(password);
    this.loginButton.click();
  }

};

module.exports = new LoginPage();


