/**
 * Created by admin on 2016/3/7.
 */
app.controller('NewsController', ['$scope', function($scope,$http) {
    $scope.person = { name: "Ari Lerner" };
    ajaxFun(JSON.parse(localStorage.getItem("urlConfig")).news, "GET", {},false, function(res){
        $scope.tests=res.bizData.rows;
        console.log(res.bizData.rows);
        console.log("$scope.test="+$scope.tests);
    });
}]);