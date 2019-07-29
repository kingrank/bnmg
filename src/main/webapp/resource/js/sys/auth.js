/**
 * 权限树
 * */
var createTree = function(data,elemid){
    layui.extend({
        dtree: '{/}/resource/layui/layui_ext/dtree/dtree'   // {/}的意思即代表采用自有路径，即不跟随 base 路径
    }).use(['dtree','layer','jquery'], function(){
        var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;
        // 初始化树
        DemoTree = dtree.render({
            elem: "#"+elemid,
            load: true,
            data: data,// 使用data加载
            //url:'/getDeparts',
            line:true,
            initLevel: "3",
            toolbar:false,
            record:true,
            useIframe: true,  //启用iframe
            iframe: {
                iframeElem: "#"+elemid+"iframe",  // iframe的ID
                iframeLoad: "all",
                iframeUrl: "/editAuthOther" // iframe路由到的地址
            },
            formatter: {
                title: function(data) {  // 示例给有子集的节点返回节点统计
                    var s = data.title;
                    if (data.children){
                        s += '(' + data.children.length + ')';
                    }
                    return s;
                }
            }
        });
        dtree.on("node('"+elemid+"')", function(data){
            layer.msg(JSON.stringify(data.param));
        });
    });
}