$(function () {
    $(".navshowhide").on("click",function(){
        var is_s = $("#buttomleft").css("display");
        if(is_s=='block'){
            $("#buttomleft").hide(200,function(){
                $(".navshow").removeClass("navshow")
                $("#buttomright").width("100%");
            });
        }else{
            var aw = document.body.clientWidth;
            if(aw<700){
                $("#buttomleft").addClass("navshow");
                $("#buttomleft").show(200);
            }else{
                $("#buttomleft").show(200);
                $("#buttomright").width("90%");
            }

        }

    });
    $(".userinfo").on("click",function(){
        var ele = Object();
        var type = $(this).attr("data-tabtype");
        ele.name = ($(this).html());
        ele.id = ($(this).attr("data-id"));
        ele.url = $(this).attr("data-url");
        if(type=="edit"){
            //alert($(this).attr("data-url"));
            document.getElementById("contentiframe").src = context+$(this).attr("data-url");
        };
        if(type=="logout"){
            window.location.href = context+"/logout"
        }
    });
    /**
     * 刷新
     * */
    $(".layui-tab").on("click",".layui-this .home-refresh",function(){
        var ele = Object();
        var src=$(".layui-tab-item.layui-show").find("iframe").attr("src");
        $(".layui-tab-item.layui-show").find("iframe").attr("src",src);

    });
    layui.use('element', function(){
        var $ = layui.jquery;
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
        //监听导航点击
        element.on('nav(menulist)', function(elem){
            console.log(elem)
            //layer.msg(elem.text());
            var othis = $(this)
            const url = context+othis.data("url");
            //layer.msg(url);
            if(url!=undefined&&url!='undefined'){
                document.getElementById("contentiframe").src = url;
            }
        });
    });
    //窗口大小调整结束
    $(window).resizeEnd({
        delay : 1
    }, function(){
        reSizeContent();
    });
    reSizeContent();
});
function reSizeContent(){
    var ah = document.body.clientHeight;
    var aw = document.body.clientWidth;
    var toph = $("#top").height();
    $("#buttom").height(ah-toph);
    $(".layui-tab-content .layui-tab-item").height(ah-toph-41);
    if(aw<700){
        $("#homeword").hide();
        $("#buttomleft").hide(200,function(){
            $("#buttomright").width("100%");
        });
    }else{
        $("#homeword").show();
        $("#buttomleft").show(200);
        $("#buttomright").width("90%");
    }
    var upw = $("#cinfo").width();
    $("#cinfo").height(40);
    $(".layui-nav-tree").height(ah-toph-40);
}
function tabEdit(ele){
    var type = ele.type;
    var name = ele.name;
    var id = ele.id;
    var action = ele.url;
    layui.use('element', function(){
        var $ = layui.jquery;
        var element = layui.element;
        //新增一个Tab项
        if ( $(".layui-tab-title li[lay-id='"+id+"']").length > 0 ) {
            //已经存在 切换
            element.tabChange('menutable', id); //切换到：用户管理
        }else{
            //新增
            const url = context+action;
            element.tabAdd('menutable', {
                title: name //用于演示
                ,content: "<iframe src=\""+url+"\" style=\"border: 0px;width: 100%;height: 100%;\"></iframe>"
                ,id: id //实际使用一般是规定好的id，这里以时间戳模拟下
            });
            element.tabChange('menutable', id); //切换到：用户管理
            reSizeContent();
            }
    });
}