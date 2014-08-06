'use strict';

angular.module('cmsApp')
  .service('PostsSearchEngine', function($filter, GitRepository, Alert, $timeout, _) {
    function SearchEnginePosts(){
      this.result = [];
      this.done = false;
      this.find = function(year, month){
        this.done = false;
        find(this,year,month);
      };
    }

    var result = {
      create: function(){
        return new SearchEnginePosts();
      }
    };

    function find(searchEngine, year, month){
      GitRepository.getPosts(year, month)
      .success(function(data){
        var result = _.map(data, function(data){
          return {
            sha: data.sha,
            name: data.name,
            path: data.path,
            year: year,
            month: month,
          };
        });
        
        $timeout(function(){
          searchEngine.result = result;
        },0);
      }).error(function(error){
        if(error.status === 404){
          Alert.showInfo('Vixe, a pesquisa não encontrou nada, tente com outras opções.');
        }else{
          Alert.showError(error.status, error.responseText);
        }
      }).complete(function(){
        searchEngine.done = true;
      });
    }

    return result;
  });
