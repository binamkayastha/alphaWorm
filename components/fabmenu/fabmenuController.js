var app = angular.module('fabmenu', ['ngMaterial']);

app.directive('fabmenuView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/fabmenu/fabmenuView.html'
  };
});
