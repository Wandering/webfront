/**
 * Created by admin on 2016/3/8.
 */
app.controller('ContainerController', ['$scope', function($scope,$http) {
    ajaxFun(JSON.parse(localStorage.getItem("urlConfig")).container, "GET", {},false, function(res){
        $scope.tests=res.bizData.rows;
        //console.log(res.bizData.rows);
        //console.log("$scope.test="+$scope.tests);
    });

}]);
