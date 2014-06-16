'use strict';

describe('workout tableSorter application', function () {

  var tableSorter;

  it('changes active table order based in user\'s choice', function () {

    browser.get('#/posts');

    element.all(by.css('.table-order')).then(function(items) {

      expect(items.length).toBe(3);

      //  Testing all elements with ordenation method
      ['Título'].forEach(function(text, key){

        describe('Testing Item "'+text+'"', function(){
          //  Order Asc
          it('ASC ordenation', function () {
            expect(items[key].getText()).toBe(text);
            items[key].click();
            tableSorter = element(by.css('.table-order.asc'));
            expect(tableSorter.getText()).toEqual(text);
          });
          //  Order Desc
          it('DESC ordenation', function () {
            items[key].click();
            tableSorter = element(by.css('.table-order.desc'));
            expect(tableSorter.getText()).toEqual(text);
          });
        });
      });
    });
  });

});
