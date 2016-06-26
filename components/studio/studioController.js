var app = angular.module('studio', ['ngMaterial']);

app.directive('studioView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/studio/studioView.html'
  };
});
