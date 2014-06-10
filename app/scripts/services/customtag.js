'use strict';

app.factory('CustomTag',['$firebase', 'FIREBASE_URL', function($firebase, FIREBASE_URL){
  var ref = new Firebase(FIREBASE_URL + 'customtags');
  var customTags = $firebase(ref);

  var CustomTag = {
    all: customTags,

    addNewCustomTag: function(tag){
      customTags.$add(tag);
    }
  };
  return CustomTag;
}]);

