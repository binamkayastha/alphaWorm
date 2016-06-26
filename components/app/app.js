var app = angular.module('App', ['ngRoute', 'home', 'header', 'fabmenu', 'settings']);

app.directive('mainView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/app/mainView.html'
  };
});

// configure our routes
app.config(function($routeProvider) {
   $routeProvider
       .when('/', {
           templateUrl : 'components/home/homeView.html',
           controller  : 'components/home/homeController'
       })

       .when('/home', {
           templateUrl : 'components/home/homeView.html',
           controller  : 'components/home/homeController'
       })

       .when('/about', {
           templateUrl : 'components/about/about.html'
       })

       .when('/settings', {
           templateUrl : 'components/settings/settingsView.html',
           controller  : 'components/settings/settingsController'
       })
});
