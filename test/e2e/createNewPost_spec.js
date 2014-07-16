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

    var fecharButton = element(by.css('.btn-primary'));
    fecharButton.click();
  });

  it('should change the background according to the abstract length', function(){
    browser.sleep(3 * 1000);

    browser.get(postsUrl);

    expect(browser.getCurrentUrl()).toEqual(postsUrl);

    novoButton.click();
    expect(browser.getCurrentUrl()).toEqual(postUrl);

    postPage.setSupportLine(Array(10).join("a"));
    browser.sleep(1 * 1000);
    // expect(postPage.support_line.getAttribute('style').getCssValue('background-color')).toEqual('rgba(255, 255, 255, 1)');

    postPage.setSupportLine(Array(150).join("a"));
    browser.sleep(1 * 1000);
    // expect(postPage.support_line.getAttribute('style').getCssValue('background-color')).toEqual('rgba(255, 187, 187, 1)');

    browser.sleep(3 * 1000);
  });

  it('should update the abstracts char count accordingly', function(){
    browser.sleep(3 * 1000);

    browser.get(postsUrl);

    expect(browser.getCurrentUrl()).toEqual(postsUrl);

    novoButton.click();
    expect(browser.getCurrentUrl()).toEqual(postUrl);

    postPage.setSupportLine(Array(16).join("a"));
    expect(postPage.support_line_size.getText()).toEqual('15');

    browser.sleep(3 * 1000);
  });
});
