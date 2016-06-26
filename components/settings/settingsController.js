var app = angular.module('settings', ['ngMaterial']);

app.controller('settingsController', function(){
  this.language = "English"
  this.languages = ["English", "Russian", "Nepali"]
});

app.directive('settingsView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/settings/settingsView.html',
    controller: 'settingsController',
    controllerAs: 'vm'
  };
});
