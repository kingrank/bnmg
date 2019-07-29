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
            tabEdit(ele);
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
            //console.log(elem)
            //layer.msg(elem.text());
            var othis = $(this), type = othis.data('type');
            active[type] ? active[type].call(this, othis) : '';
        });
        //触发事件
        var active = {
            tabAdd: function(othis){
                //新增一个Tab项
                if ( $(".layui-tab-title li[lay-id='"+othis.data("id")+"']").length > 0 ) {
                    //已经存在 切换
                    element.tabChange('menutable', othis.data("id"));
                }else{
                    //新增
                    const url = context+othis.data("url");
                    element.tabAdd('menutable', {
                        title: othis.text()+"&nbsp;&nbsp;<i id='i_"+othis.data("id")+"' class=\"layui-icon layui-icon-refresh-3 home-refresh\"></i>"
                        ,content: "<iframe src=\""+url+"\" style=\"border: 0px;width: 100%;height: 100%;\"></iframe>"
                        ,id: othis.data("id")
                    });
                    element.tabChange('menutable', othis.data("id"));
                    reSizeContent();
                }
            }
            ,tabDelete: function(othis){
                //删除指定Tab项
                element.tabDelete('menutable', othis.data("id"));
                othis.addClass('layui-btn-disabled');
            }
            ,tabChange: function(){
                //切换到指定Tab项
                element.tabChange('menutable', othis.data("id"));
            }
        };
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