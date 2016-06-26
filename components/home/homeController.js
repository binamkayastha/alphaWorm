var app = angular.module('home', ['studio']);

app.directive('homeView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/home/homeView.html'
  };
});
