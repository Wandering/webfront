//创建和初始化地图函数：
function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMapOverlay();//向地图添加覆盖物
}
function createMap(){
    map = new BMap.Map("baidu-map");
    //设置当前地图级别
    var zoom=16;
    //定位地图中心点
    map.centerAndZoom(new BMap.Point(109.516739,34.505687),zoom);
}
function setMapEvent(){
    map.enableKeyboard();
    map.enableDragging();
    map.enableDoubleClickZoom()
}
function addClickHandler(target,window){
    target.addEventListener("click",function(){
        target.openInfoWindow(window);
    });
}
function addMapOverlay(){
}
//向地图添加控件
function addMapControl(){
    var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    scaleControl.setUnit(BMAP_UNIT_METRIC);
    map.addControl(scaleControl);
    var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:0});
    map.addControl(navControl);
    var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
    map.addControl(overviewControl);
}


var map;

initMap();
var transit = new BMap.TransitRoute(map, {
    renderOptions: {map: map,panel: "baidu-map-results"}
});
var busline = new BMap.BusLineSearch(map,{
    renderOptions:{map:map,panel:"baidu-map-results"},
    onGetBusListComplete: function(result){
        if(result) {
            var fstLine = result.getBusListItem(0);//获取第一个公交列表显示到map上
            busline.getBusLine(fstLine);
        }
    }
});
//站点查询单击事件
$("#station-query").click(function(){
    var start=$("#station-start").val();
    var end=$("#station-end").val();
    transit.search(start,end);

});
//线路查询单击事件
$("#line-query").click(function(){
    var line=$("#station-line").val();
    busline.getBusList(line);
})
