'use strict';

var PostPage =  function() {

  this.hat = element(by.css('input[name="hat"]'));
  this.title = element(by.css('input[name="title"]'));
  this.support_line = element(by.css('textarea[name="abstract"]'));
  this.support_line_size = element(by.name('abstract-size'));
  this.menuTag = element(by.name('menu'));
  this.section = element(by.name('section'));
  this.label = element(by.name('label'));
  this.imagesHD = element(by.name('images_hd'));
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
