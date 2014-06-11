'use strict';

app.factory('CustomTag',['$firebase', 'FIREBASE_REF', function($firebase, FIREBASE_REF){
  var tags = $firebase(FIREBASE_REF);

  var CustomTag = {
    all: tags,

    addNewCustomTag: function(tag){
      tags.$add(tag);
    }
  };
  return CustomTag;
}]);

