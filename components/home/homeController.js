var app = angular.module('App', ['studio', 'header']);

app.directive('homeView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/home/homeView.html'
  };
});
