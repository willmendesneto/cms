'use strict';

describe('customtag factory', function(){
  var CustomTag, firebase, FIREBASE_URL;

  beforeEach(module('cmsApp'));

  beforeEach(inject(function(_CustomTag_, $firebase, _FIREBASE_URL_){
    CustomTag = _CustomTag_;
    firebase = $firebase;
    FIREBASE_URL = _FIREBASE_URL_;
  }));

  it('should be defined', function () {
    expect(!!CustomTag).toBe(true);
  });

  it('firebase should be defined', function(){
    expect(!!firebase).toBe(true);
  });

  it('firebase url should be defined', function(){
    expect(!!FIREBASE_URL).toBe(true);
  });
});
