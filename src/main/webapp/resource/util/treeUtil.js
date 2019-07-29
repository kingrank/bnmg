var TreeData = {
    barname:"部门",
    elem:"",
    url:"",
    toolbarBtn:[],
    toolbarFun:{},
    data:null,
    create:function(){
        var obj = this;
        layui.extend({
            dtree: '{/}/resource/layui/layui_ext/dtree/dtree'   // {/}的意思即代表采用自有路径，即不跟随 base 路径
        }).use(['dtree','layer','jquery'], function(){
            var dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;
            // 初始化树
            DemoTree = dtree.render({
                elem: "#"+obj.elem,
                load: true,
                data: data,// 使用data加载
                //url:'/getDeparts',
                line:true,
                initLevel: "3",
                toolbar:true,
                record:true,
                //dataFormat: "list",
                toolbarWay:"fixed", // "contextmenu"：右键菜单（默认），"fixed"："固定在节点后","follow"："跟随节点动态呈现"
                toolbarFun:{
                    loadToolbarBefore: function(buttons, param, $div){
                        console.log(buttons);
                        console.log(param);
                        console.log($div);
                        if(param.leaf){ // 如果是叶子节点
                            buttons.addToolbar = "";  // 取消新增功能
                        }
                        return buttons; // 将按钮对象返回
                    }
                },//当你使用这种方式加载菜单时，就不需要配置toolbarScroll了
                toolbarScroll:"#toolbar"+obj.elem,
                formatter: {
                    title: function(data) {  // 示例给有子集的节点返回节点统计
                        var s = data.title;
                        if (data.children){
                            s += '(' + data.children.length + ')';
                        }
                        return s;
                    }
                },
                toolbarStyle: {
                    title: obj.barname,
                    area: ["50%", "400px"]
                },
                toolbarFun: {
                    addTreeNode: function (treeNode, $div) {
                        $.ajax({
                            type: "post",
                            data: treeNode,
                            url: "/departEdit",
                            success: function (result) {
                            },
                            error: function () {
                            }
                        });
                    },
                    editTreeNode: function (treeNode, $div) {
                        $.ajax({
                            type: "post",
                            data: treeNode,
                            url: "/departEdit",
                            success: function (result) {
                            },
                            error: function () {
                            }
                        });
                    },
                    delTreeNode: function (treeNode, $div) {
                        $.ajax({
                            type: "post",
                            data: treeNode,
                            url: "/departEdit",
                            success: function (result) {
                            },
                            error: function () {
                            }
                        });
                    }
                }
            });
            dtree.on("node('"+elemid+"')", function(data){
                layer.msg(JSON.stringify(data.param));
            });
        });
    }
};
/**
 * 部门编辑树
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
            toolbar:true,
            record:true,
            useIframe: true,  //启用iframe
            iframe: {
                iframeElem: "#"+elemid+"iframe",  // iframe的ID
                iframeLoad: "all",
                iframeUrl: "/editDepartOther" // iframe路由到的地址
            },
            toolbarScroll:"#toolbar"+elemid,
            formatter: {
                title: function(data) {  // 示例给有子集的节点返回节点统计
                    var s = data.title;
                    if (data.children){
                        s += '(' + data.children.length + ')';
                    }
                    return s;
                }
            },
            toolbarStyle: {
                title: "部门",
                area: ["50%", "400px"]
            },
            toolbarBtn:[
                [],
                [
                    {"label":"状态","name":"status","type":"select","optionsData":function(){
                        return {"0":"正常","1":"禁用"};
                    }}
                ] // 这就是自定义新增中的内容
            ],
            toolbarFun: {
                //新增部门
                addTreeNode: function (treeNode, $div) {
                    treeNode.pid = treeNode.parentId;
                    treeNode.name = treeNode.addNodeName;
                    treeNode.type = 0;
                    $.ajax({
                        type: "post",
                        data: treeNode,
                        url: "/departEdit",
                        success: function (result) {
                            layer.msg("操作成功");
                            thisIframeReload();
                        },
                        error: function () {
                            DemoTree.changeTreeNodeAdd(false); // 添加失败
                        }
                    });
                },
                //编辑部门初始数据获取
                editTreeLoad: function(treeNode){
                    $.ajax({
                        type: "post",
                        data: {id:treeNode.nodeId},
                        url: "/getDepartById",
                        success: function (result) {
                            if(result.status==0){
                                DemoTree.changeTreeNodeDone(result.data); // 配套使用
                            }else{
                                layer.msg("获取部门信息失败", {icon:5});
                            }

                        },
                        error: function () {
                            DemoTree.changeTreeNodeAdd(false); // 添加失败
                        }
                    });
                },
                //编辑部门
                editTreeNode: function (treeNode, $div) {
                    treeNode.type = 1;
                    treeNode.id = treeNode.nodeId;
                    treeNode.name = treeNode.editNodeName;
                    //alert(JSON.stringify(treeNode));
                    $.ajax({
                        type: "post",
                        data: treeNode,
                        url: "/departEdit",
                        success: function (result) {
                            layer.msg("操作成功");
                            DemoTree.changeTreeNodeEdit(true);//修改失败
                        },
                        error: function () {
                            DemoTree.changeTreeNodeEdit(false);//修改失败
                        }
                    });
                },
                //删除部门
                delTreeNode: function (treeNode, $div) {
                    treeNode.type = 2;
                    treeNode.id = treeNode.nodeId;
                    $.ajax({
                        type: "post",
                        data: treeNode,
                        url: "/departEdit",
                        success: function (result) {
                            if(result.status==0){
                                DemoTree.changeTreeNodeDel(true); // 删除成功
                                layer.msg("操作成功");
                            }else{
                                layer.msg(result.msg,{icon:5});
                            }

                        },
                        error: function () {
                            DemoTree.changeTreeNodeDel(false);// 删除失败
                        }
                    });
                }
            }
        });
        dtree.on("node('"+elemid+"')", function(data){
            layer.msg(JSON.stringify(data.param));
        });
    });
}
/**
 * 部门选择树数据获取 并创建
 * */
function createDepTree(treeid,callbackFun){
    $.ajax({
        async : true,
        cache : false,
        type : 'POST',
        url : '/getDeparts',// 请求的action路径
        data : '',
        error : function(XMLHttpRequest, textStatus, errorThrown) {// 请求失败处理函数
            alert("操作异常!");
        },
        success : function(data) {
            if(data.status==0){
                treeData  = data.data;
                SelectTree(data.data,treeid,callbackFun);
            }else{
                alert(data.msg)
            }
        }
    });
}
/**
 * 权限选择树数据获取 并创建
 * */
function createAuthTree(treeid,callbackFun,data){
    $.ajax({
        async : false,
        cache : false,
        type : 'POST',
        url : '/getAuthTree',// 请求的action路径
        data : data,
        error : function(XMLHttpRequest, textStatus, errorThrown) {// 请求失败处理函数
            alert("操作异常!");
        },
        success : function(data) {
            if(data.status==0){
                treeData  = data.data;
                SelectTree(data.data,treeid,callbackFun,"true:all");
            }else{
                alert(data.msg)
            }
        }
    });
}
/**
 * 生成选择树
 * */
var SelectTree = function(data,elemid,callbackFun,checkinfo){
    var treeObject;
    var ischeck = false;
    var checkbartype="all";
    if(checkinfo){
        var ck = checkinfo.split(":");
        ischeck=ck[0];
        checkbartype = ck[1];
    }
    layui.extend({
        dtree: '{/}/resource/layui/layui_ext/dtree/dtree'   // {/}的意思即代表采用自有路径，即不跟随 base 路径
    }).use(['dtree','layer','jquery'], function(){
        dtree = layui.dtree, layer = layui.layer, $ = layui.jquery;
        // 初始化树
        treeObject = dtree.render({
            elem: "#"+elemid,
            load: true,
            data: data,// 使用data加载
            line:true,
            initLevel: "3",
            checkbar: ischeck,
            checkbarType: checkbartype ,// 默认就是all，其他的值为： no-all  p-casc   self  only
            toolbar:false,
            formatter: {
                title: function(data) {  // 示例给有子集的节点返回节点统计
                    var s = data.title;
                    return s;
                }
            }
        });
        dtree.on("node('"+elemid+"')", function(data){
            callbackFun(data,treeObject);
        });
    });
}