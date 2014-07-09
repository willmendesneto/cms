'use strict';

describe('create a new post', function(){
  var loginPage = require('../page_objects/login_page.js');
  var postPage = require('../page_objects/post_page.js');
  var postUrl = 'http://localhost:9000/#/post';
  var postsUrl = 'http://localhost:9000/#/posts';

  var username = process.env.TEST_USER;
  var password = process.env.TEST_PASSWORD;
  var novoButton = element(by.css('.form-inline a'));
  var publicarButton = element(by.css('input[value="Salvar"]'));
  var progressStatus = element(by.binding('status'));

  loginPage.accessPopup();

  browser.getAllWindowHandles().then(function (handles) {
    browser.switchTo().window(handles[1]);
    loginPage.loginWith(username, password);

    browser.switchTo().window(handles[0]);
    browser.sleep(2 * 1000);
  });

  afterEach(function(){
    browser.manage().deleteAllCookies();
  });

  it('should save a new post with valid inputs', function(){
    expect(browser.getCurrentUrl()).toEqual(postsUrl);

    novoButton.click();
    expect(browser.getCurrentUrl()).toEqual(postUrl);

    var date = new Date();
    postPage.setHat('Ash test');
    postPage.setTitle('test title '+date.getTime());
    postPage.setSupportLine('something usefull');
    postPage.setMenuTag('agricultura camponesa');
    postPage.setSection('Destaque');
    postPage.setLabel('Artigo');
    postPage.setImagesHD('https://farm4.staticflickr.com/3874/14406497013_1ecc286de2_b.jpg');
    postPage.setTags('tags,');


    publicarButton.click();

    browser.sleep(3 * 1000);

    expect(progressStatus.getText()).toEqual('Salvo com sucesso');
  })
});
