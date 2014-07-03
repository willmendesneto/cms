'use strict';

var PostPage =  function() {

  this.hat = element(by.css('input[name="hat"]'));
  this.title = element(by.css('input[name="title"]'));
  this.support_line = element(by.css('textarea[name="abstract"]'));
  this.menuTag = element(by.model('menuTag'));
  this.section = element(by.model('section'));
  this.label = element(by.model('label'));
  this.imagesHD = element(by.model('imagesHD'));
  this.tags = element(by.css('tags-input input'));
  this.targetUrl = 'http://localhost:9000/#/post';

  this.setHat = function(value) {
    this.hat.sendKeys(value);
  }
  this.setTitle = function(value) {
    this.title.sendKeys(value);
  }
  this.setSupportLine = function(value) {
    this.support_line.sendKeys(value);
  }
  this.setMenuTag = function(value) {
    this.menuTag.sendKeys(value);
  }
  this.setSection = function(value) {
    this.section.sendKeys(value);
  }
  this.setLabel = function(value) {
    this.label.sendKeys(value);
  }
  this.setImagesHD = function(value) {
    this.imagesHD.sendKeys(value);
  }
  this.setTags = function(value) {
    this.tags.sendKeys(value);
  }
  this.setContent = function(value) {
    this.content.sendKeys(value);
  }

  this.load = function(){
    browser.ignoreSynchronization = true;
    browser.get(this.targetUrl);
  }

};

module.exports = new PostPage();
