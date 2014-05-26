var cms = angular.module('cmsApp', ['ngRoute']);

cms.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/auth', { controller: 'AuthenticationCtrl', templateUrl: 'views/auth.html' })
    .when('/posts', { controller: 'PostsCtrl', templateUrl: 'views/posts.html' })
    .when('/posts/:sha', { controller: 'PostCtrl', templateUrl: 'views/post.html' })
    .otherwise({ redirectTo: '/auth' });
});

cms.factory('oauth', function () {
  OAuth.initialize('S2shWzj2Cp87Mg4estazc6DFGQc');
  return OAuth;
});

function postSearchFilter(posts, term) {
  if (!term) return posts;

  return _.filter(posts, function (post) {
    return post.name.indexOf(term) != -1;
  });
}

cms.filter('postSearchFilter', function() {
  return postSearchFilter;
});

cms.directive('ckEditor', function() {
  return {
    require : '?ngModel',
    link : function($scope, elm, attr, ngModel) {
      var ck = CKEDITOR.replace(elm[0]);

      ck.on('instanceReady', function() {
        ck.setData(ngModel.$viewValue);
      });

      ck.on('pasteState', function() {
        $scope.$apply(function() {
          ngModel.$setViewValue(ck.getData());
        });
      });

      ngModel.$render = function(value) {
        ck.setData(ngModel.$modelValue);
      };
    }
  };
});
