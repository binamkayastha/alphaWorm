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
           controller:"homeController"
       })

       .when('/home', {
           templateUrl : 'components/home/homeView.html',
           controller: "homeController"
       })

       .when('/about', {
           templateUrl : 'components/about/about.html'
       })

       .when('/settings', {
           templateUrl : 'components/settings/settingsView.html',
           controller  : 'settingsController'
       })

      //  .when('/studio', {
      //      templateUrl : 'components/studio/studioView.html',
      //      controller  : 'studioController'
      //  })

       .when('/studio/:text/:font/:fontsize', {
           templateUrl : 'components/studio/studioView.html',
           controller  : 'studioController'
       })
});
