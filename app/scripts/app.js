var cms = angular.module('cms', ['ngRoute']);

cms.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/auth', { controller: 'AuthenticationController', templateUrl: 'views/auth.html' })
    .when('/posts', { controller: 'PostsController', templateUrl: 'views/posts.html' })
    .when('/posts/:sha', { controller: 'PostController', templateUrl: 'views/post.html' })
    .otherwise({ redirectTo: '/auth' });
});

cms.factory('oauth', function () {
  OAuth.initialize('S2shWzj2Cp87Mg4estazc6DFGQc');
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

function postSearchFilter(posts, term) {
  if (!term) return posts;

  return _.filter(posts, function (post) {
    return post.name.indexOf(term) != -1;
  });
}

cms.filter('postSearchFilter', function() {
  return postSearchFilter;
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

  $scope.sectionOptions = [
    {label: "Destaque", value: "featured-news"},
    {label: "Carrossel", value: "carousel"},
    {label: "Artigo", value: "articles"},
    {label: "Entrevista", value: "interviews"},
    {label: "Debate", value: "debate"},
    {label: "Capa", value: "cover"},
    {label: "Recente", value: "recent"},
    {label: "Reportagens Especiais", value: "special-stories"},
    {label: "MST TV", value: "tv"}
  ];

  $scope.menuTag = undefined;
  $scope.section = undefined;

  $scope.$watch('menuTag', function (newval) {
    $scope.post.setMenuItem(newval);
  });

  $scope.$watch('section', function (newval) {
    $scope.post.setSection(newval);
  });

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
    return '/repos/movimento-sem-terra/site-novo/contents/_drafts/'+name;
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
      text: parts.pop().replace(/^\n/, ""),
      meta: jsyaml.load(parts.pop())
    };
  };

  self.convertContentToJekyllData = function () {
    if (!self.content) return "";

    var compiled = ['---', jsyaml.dump(self.content.meta), '---', self.content.text].join('\n');
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
    if (!self.content) return;

    self.content.meta.tags = _.filter(self.content.meta.tags, function (el) {
      return !(/^menu:/).test(el);
    });

    if (!!menuItemName){
      self.content.meta.tags.push("menu:"+menuItemName);
    }
  };

  self.setSection = function(section) {
    if (!self.content) return;

    if (!section) {
      self.content.meta.section = "";
      return;
    }

    self.content.meta.section = section.value;
  };

  return self;
}
