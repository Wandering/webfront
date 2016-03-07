/**
 * Created by admin on 2016/3/7.
 */
var app = angular.module('busApp', []);
app.controller('NewsController', ['$scope', function($scope) {
    $scope.person = { name: "Ari Lerner" };
}]);