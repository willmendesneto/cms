'use strict';

describe('customtag factory', function(){
  var CustomTag, firebase, FIREBASE_REF;

  beforeEach(module('cmsApp'));

  beforeEach(inject(function(_CustomTag_, $firebase, _FIREBASE_REF_){
    CustomTag = _CustomTag_;
    firebase = $firebase;
    FIREBASE_REF = _FIREBASE_REF_;
  }));

  it('should be defined', function () {
    expect(!!CustomTag).toBe(true);
  });

  it('firebase should be defined', function(){
    expect(!!firebase).toBe(true);
  });

  it('firebase url should be defined', function(){
    expect(!!FIREBASE_REF).toBe(true);
  });

  it('should call $firebase on add method', function() {
    var tag = 'social';
    var firebaseTags = CustomTag.all;

    spyOn(firebaseTags, '$add');

    CustomTag.addNewCustomTag(tag);
    expect(firebaseTags.$add).toHaveBeenCalled();
  });
});
