var app = angular.module('app',[]);

app.controller('Controller', ['$scope', function($scope) {
  var alpha = "abcdefghijklmnopqrstuvwxyz";

  $scope.text = "type something";

  $scope.input = 'loaded';

  $scope.mappings = [
    {key: 'q', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'w', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'e', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'r', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 't', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'y', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'u', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'i', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'o', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'p', top_left: new Point(5, 5), bot_right: new Point(55, 55)},

    {key: 'a', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 's', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'd', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'f', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'g', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'h', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'j', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'k', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'l', top_left: new Point(5, 5), bot_right: new Point(55, 55)},

    {key: 'z', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'x', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'c', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'v', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'b', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'n', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
    {key: 'm', top_left: new Point(5, 5), bot_right: new Point(55, 55)},
  ];


}]);
