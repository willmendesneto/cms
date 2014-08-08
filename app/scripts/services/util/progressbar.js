'use strict';

angular.module('cmsApp')
  .factory('ProgressBarUtil',['Alert','$timeout', function(Alert, $timeout) {
    function catchError(error){
      var message = 'Error: '+error.status+', '+error.statusText;
      var content = error.responseJSON.message;
      Alert.showError(message, content);
    }

    function progressBarStatus(scope, show, type){
      $timeout(function(){
        scope.type = type;
        scope.showProgress = show;
      },0);
    }

    function Factory ($scope){
      this.$scope = $scope;

      this.show = function(){
        progressBarStatus(this.$scope,true,'info');
      };

      this.error = function(error){
        progressBarStatus(this.$scope,false,'danger');
        catchError(error);
      };

      this.success = function(){
        progressBarStatus(this.$scope,true,'success');
      };

      this.close = function(){
        progressBarStatus(this.$scope,false);
      };
    }
    
    return Factory;
  }]);
