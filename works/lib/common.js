/**
 * Created by admin on 2016/3/4.
 */
var app = angular.module('busApp', []);
app.controller('IndexController', ['$scope', function($scope) {}]);
app.controller('NewsController', ['$scope', function($scope) {
    ajaxFun(JSON.parse(localStorage.getItem("urlConfig")).news, "GET", {},false, function(res){
        $scope.news=res.bizData.rows;
        console.log(res.bizData.rows)
    });

}]);

app.controller('ContainerController', ['$scope', function($scope) {
    ajaxFun(JSON.parse(localStorage.getItem("urlConfig")).container, "GET", {},false, function(res){
        $scope.containers=res.bizData.rows;
    });

}]);

app.controller('ourWorkController', ['$scope', function($scope) {
    ajaxFun(JSON.parse(localStorage.getItem("urlConfig")).ourwork, "GET", {},false, function(res){
        $scope.ourworks=res.bizData.rows;
    });

}]);

app.controller('menuController', ['$scope', function($scope) {
    ajaxFun(JSON.parse(localStorage.getItem("urlConfig")).menu, "GET", {},false, function(res){
        $scope.menus=res.bizData;
        console.log(res.bizData);
    });
}]);
//Gallery
app.controller('GalleryController', ['$scope', function($scope) {
    ajaxFun(JSON.parse(localStorage.getItem("urlConfig")).gallery, "GET", {},false, function(res){
        $scope.gallerys=res.bizData.rows;
    });
}]);

var initUrlCofig=function(){
    $.ajax({
        type: "GET",
        url: "/common/config.json",
        data: {},
        dataType: "json",
        success: function(data){
            var baseUrl=data.baseUrl;
            localStorage.removeItem("baseUrl");
            localStorage.setItem("baseUrl",baseUrl);
            $.ajax({
                type: "GET",
                url: "/common/common.json",
                data: {},
                dataType: "json",
                success: function(data){
                    urlConfig=data;
                    for (var s in urlConfig) {
                        urlConfig[s] = baseUrl + urlConfig[s];
                    }
                    localStorage.setItem("urlConfig", JSON.stringify(urlConfig));
                }
            });
        }
    });
}
initUrlCofig();
//ajax拉取数据
var ajaxFun=function(url, method, data,async, callback, callbackError) {

        $.ajax({
            url: url,
            type: method,
            async: async,
            data: data || {},
            success: function (res) {
                callback(res);
            },
            error: function (res) {
                if (callbackError && typeof(callbackError) === "function") {
                    callbackError(res);
                }
            }
        });
};

var changeBaseUrlFun = function (baseUrl) {
    localStorage.removeItem("urlConfig");
    var urlConfig = JSON.parse(localStorage.getItem("baseUrlConfig"));
    for (var s in urlConfig) {
        urlConfig[s] = baseUrl + urlConfig[s];
    }
    localStorage.setItem("urlConfig", JSON.stringify(urlConfig));
};
var changeConfigFun = function (str) {
    switch (str) {
        case "debug":
            changeBaseUrlFun("http://10.10.72.32:8888/qky/qky");
            break;
        case "local":
            changeBaseUrlFun("http://113.140.31.190:18094");
            break;
        case "jsy":
            changeBaseUrlFun("http://qky-dev.thinkjoy.com.cn");
            break;
        case "localhost":
            changeBaseUrlFun("http://localhost:8087");
            break;
        default :
            alert("输入参数不对.");
            break;
    }
};




