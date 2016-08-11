var app = angular.module('app',[]);

app.controller('Controller', ['$scope', function($scope) {
  var alpha = "abcdefghijklmnopqrstuvwxyz";

  $scope.text = "type something";

  $scope.input = 'loaded';

  var mappingWidth = 50;
  $scope.mappings = [
    {key: 'q', top_left: new Point(5, 5)},
    {key: 'w', top_left: new Point(66, 5)},
    {key: 'e', top_left: new Point(127, 5)},
    {key: 'r', top_left: new Point(188, 5)},
    {key: 't', top_left: new Point(249, 5)},
    {key: 'y', top_left: new Point(310, 5)},
    {key: 'u', top_left: new Point(371, 5)},
    {key: 'i', top_left: new Point(432, 5)},
    {key: 'o', top_left: new Point(493, 5)},
    {key: 'p', top_left: new Point(555, 5)},

    {key: 'a', top_left: new Point(30, 63)},
    {key: 's', top_left: new Point(91, 63)},
    {key: 'd', top_left: new Point(152, 63)},
    {key: 'f', top_left: new Point(213, 63)},
    {key: 'g', top_left: new Point(273, 63)},
    {key: 'h', top_left: new Point(334, 63)},
    {key: 'j', top_left: new Point(395, 63)},
    {key: 'k', top_left: new Point(455, 63)},
    {key: 'l', top_left: new Point(515, 63)},

    {key: 'z', top_left: new Point(64, 119)},
    {key: 'x', top_left: new Point(124, 119)},
    {key: 'c', top_left: new Point(184, 119)},
    {key: 'v', top_left: new Point(244, 119)},
    {key: 'b', top_left: new Point(304, 119)},
    {key: 'n', top_left: new Point(364, 119)},
    {key: 'm', top_left: new Point(424, 119)},
  ];
}]);
