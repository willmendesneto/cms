// 'use strict';

// describe('Creating a new post', function(){

//   // var hat, title, support_line,
//   // menuTag, section,label, imagesHD,
//   // section, label, imagesHD, tags, content;
//   var browser = protractor.getInstance();
//   var targetUrl = 'http://localhost:9000/#/auth';
//   var postsUrl = 'http://localhost:9000/#/posts';


//   beforeEach(function(){

//   //   hat = element(by.model('post.content.meta.hat'));
//   //   title = element(by.model('post.content.meta.title'));
//   //   support_line = element(by.model('post.content.meta.support_line'));
//   //   menuTag = element(by.model('post.content.meta.menuTag'));
//   //   section = element(by.model('post.content.meta.section'));
//   //   label = element(by.model('post.content.meta.label'));
//   //   imagesHD = element(by.model('post.content.meta.imagesHD'));
//   //   tags = element(by.model('post.tags'));
//   //   content = element(by.model('post.content.text'));


//   //   hat.sendKeys('Chapeu');
//   //   title.sendKeys('3 mitos sobre a agroecologia');
//   //   support_line.sendKeys('Debate realizado no 1º Seminário   Agrotóxicos e Câncer');
//   //   menuTag.sendKeys('agricultura camponesa');
//   //   section.sendKeys('Destaque');
//   //   label.sendKeys('Artigo');
//   //   imagesHD.sendKeys('https://farm4.staticflickr.com/3874/14406497013_1ecc286de2_b.jpg');
//   //   tags.sendKeys('technologia');
//   //   content.sendKeys('Agrotóxicos e Câncer, no Rio de Janeiro.
//   //                          Debate realizado no 1º Seminário   ');
//     browser.ignoreSynchronization = true;
//     browser.get(targetUrl);

//   });

//   it('should login', function(){

//     var githubButton = element(by.css('.login'))

//     expect(githubButton.getText()).toEqual('Login');
//     githubButton.click();

//     expect(browser.getCurrentUrl()).toEqual(postsUrl)
//   });

// });
