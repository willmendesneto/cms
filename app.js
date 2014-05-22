var cms = angular.module('cms', ['ngRoute']);

cms.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/auth', { controller: 'AuthenticationController', templateUrl: 'partials/auth.html' })
    .when('/posts', { controller: 'PostsController', templateUrl: 'partials/posts.html' })
    .when('/posts/:sha', { controller: 'PostController', templateUrl: 'partials/post.html' })
    .otherwise({ redirectTo: '/auth' });
});

cms.factory('oauth', function () {
  OAuth.initialize('nOLmdocECLWfvTKz_ftqQWWVgUc');
  return OAuth;
});

cms.controller('AuthenticationController', function AuthenticationController($scope, $rootScope, $location, oauth) {
  $scope.authenticate = function() {
    oauth.popup('github', function(err, res) {
      if(err) return alert(err);
      $rootScope.github = res;
      $location.path('/posts');
      $scope.$apply();
    });
  };
});

cms.controller('PostsController', function PostsController($scope, $rootScope) {
  $rootScope.github.get('/repos/movimento-sem-terra/site-novo/contents/_drafts').done(function(data) {
    $rootScope.posts = _.map(data, makePost);
    $scope.$apply();
  });
});

cms.controller('PostController', function PostController($scope, $rootScope, $routeParams) {
  var sha = $routeParams.sha;
  $scope.post = findPost(sha);

  $scope.menuTagOptions = [
    "agricultura camponesa",
    "agronegócio",
    "direitos humanos",
    "educação, cultura e comunicação",
    "lutas e mobilizações",
    "solidariedade internacional",
    "meio ambiente",
    "projeto popular",
    "reforma agrária",
    "transgênicos"
  ];

  $rootScope.github.get(contentPath(sha)).done(function(data) {
    $scope.post.loadContentFromJekyllData(atob(data.content));
    $scope.$apply();
  });

  $scope.save = function(post) {
    $rootScope.github.put(filePath(post.name), {
      data: JSON.stringify(post.commitData())
    }).done(function(data) {
      alert('Post salvo com sucesso!');
    }).fail(function(data) {
      alert('Erro ao salvar post. Tente novamente.');
      console.log('error data:', data);
    });
  };

  function findPost(sha) {
    return $rootScope.posts.filter(function(post) {
      return post.sha == sha;
    }).shift(0);
  }

  function contentPath(sha) {
    return 'https://api.github.com/repos/movimento-sem-terra/site-novo/git/blobs/'+sha;
  }

  function filePath(name) {
    return '/repos/movimento-sem-terra/site-novo/contents/_posts/'+name;
  }
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

function makePost(data) {
  var self = {};
  _.extend(self, data);

  self.loadContentFromJekyllData = function (data) {
    var parts = decodeURIComponent(escape(data)).split('---');
    self.content = {
      text: parts.pop(),
      meta: jsyaml.load(parts.pop())
    };
  };

  self.convertContentToJekyllData = function () {
    if (!self.content) return "";

    var compiled = ['---', jsyaml.dump(self.content.meta), '---' + self.content.text].join('\n');
    return unescape(encodeURIComponent(compiled));
  };

  self. commitData = function() {
    return {
      sha: self.sha,
      content: btoa(self.convertContentToJekyllData()),
      message: 'commit from cms'
    };
  };

  self.setMenuItem = function(menuItemName) {
    self.content.meta.tags = _.filter(self.content.meta.tags, function (el) {
      return !(/^menu:/).test(el);
    });

    self.content.meta.tags.push("menu:"+menuItemName);
  };

  return self;
}
