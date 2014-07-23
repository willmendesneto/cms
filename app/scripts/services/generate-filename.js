'use strict';

angular.module('cmsApp').factory('GenerateFilename', ['DateUtil', function(DateUtil) {

  function removeSpecialChar(string) {
    return string.replace(/[^\w\s]/gi, '');
  }

  function replaceSpaceWithDash(string) {

    var result = string.replace(/[ ]([a-zA-Z0-9])/g, function (match, firstGroup) {
      return '-' + firstGroup;
    });

    return result;
  }

  function formatTitle(title) {
    var result = removeSpecialChar(title);
    return replaceSpaceWithDash(result);
  }

  function formatDate() {
    var today = DateUtil.getTime();
    return today.toISOString().split('T')[0];
  }

  var GenerateFilename = {
    create: function(post) {
      if(!!post.name){
        return post.name;
      }

      var fileName = formatTitle(post.metadata.title.toLowerCase());

      return formatDate()+'-'+fileName+'.md';
    }
  };

  return GenerateFilename;
}]);
