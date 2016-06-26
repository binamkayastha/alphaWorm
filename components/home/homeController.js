var app = angular.module('home', ['studio']);

app.controller('homeController', function() {
    var colors = ["red", "green", "darkBlue", "blue", "pink", "purple", "deepBlue", "lightPurple", "yellow"]
    console.log(colors)
    this.items = [
      {
        done: true,
        title: "A",
        font: "Arial",
        fontsize: 300
      },
      {
        done: true,
        title: "B",
        font: "Arial",
        fontsize: 300
      },
      {
        done: false,
        title: "C",
        font: "Arial",
        fontsize: 300
      },
      {
        done: false,
        title: "D",
        font: "Arial",
        fontsize: 300
      },
      {
        done: false,
        title: "E",
        font: "Arial",
        fontsize: 300
      }
    ]
    this.transportation = [
      {
        done: true,
        title: "Car",
        font: "Arial",
        fontsize: 300
      },
      {
        done: true,
        title: "Bus",
        font: "Arial",
        fontsize: 300
      },
      {
        done: false,
        title: "Plane",
        font: "Arial",
        fontsize: 300
      },
      {
        done: false,
        title: "Truck",
        font: "Arial",
        fontsize: 300
      }
    ]
    this.getRandomColor = function () {
      return colors[Math.floor(Math.random() * colors.length)];
    }
})

app.directive('homeView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/home/homeView.html',
    controller: 'homeController',
    controllerAs: 'vm'
  };
});
