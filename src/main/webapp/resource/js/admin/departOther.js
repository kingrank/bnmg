var nodeId = getUrlParam("nodeId");
$("#departname").text(decodeURI(getUrlParam("context")));
var adminTable;
var adminTable2;
layui.use('table', function(){
    var table = layui.table;
    adminTable = table.render({
        elem: '#test'
        ,url:'/getAdminByDepart'
        //,contentType: 'application/json'
        ,toolbar: '#toolbarDemo'
        ,defaultToolbar:['filter','print']
        ,where:{pcode:nodeId,type:0}
        ,title: '用户数据表'
        ,initSort: {
            field: 'id' //排序字段，对应 cols 设定的各字段名
            ,type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
        }
        //数据格式解析的回调函数，用于将返回的任意数据格式解析成 table 组件规定的数据格式
        ,parseData: function(res){ //res 即为原始返回的数据
            return {
                "code": res.status, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.total, //解析数据长度
                "data": res.data //解析数据列表
            };
        }
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field:'id', title:'ID', width:80, fixed: 'left', unresize: true, sort: true}
            ,{field:'username', title:'账户名称',unresize: true , sort: true}
            ,{field:'name', title:'用户名称',unresize: true , sort: true}
            ,{field:'phone', title:'联系电话', edit: 'text', sort: true}
            ,{field:'depname', title:'部门', sort: true}
        ]]
        ,page: true
    });
    //头工具栏事件
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'getCheckData':
                var data = checkStatus.data;
                layer.alert(JSON.stringify(data));
                break;
            case 'getCheckLength':
                var data = checkStatus.data;
                layer.msg('选中了：'+ data.length + ' 个');
                break;
            case 'updateDepart'://部门变更
                var data = checkStatus.data;
                if(data.length==0){
                    layer.msg('请选择要变更的管理员');
                }else{
                    var admin_str = "";
                    for(i in data){
                        admin_str = admin_str+((i==0?"'":",'")+data[i].username+"'");
                    }
                    layer.open({
                        title: '部门选择：'
                        ,offset: '10%'
                        ,content: '<div style="width: 100%;overflow: auto;float: left;" id="toolbartree">\n' +
                        '            <ul id="departSelect" class="dtree" data-id="0"></ul>\n' +
                        '        </div>',
                        success:function () {
                            createDepTree("departSelect",onselect);
                        },
                        yes: function(index, layero){
                            layer.close(index); //如果设定了yes回调，需进行手工关闭
                            changeDepart({depcode:choose.nodeId,usernames:admin_str},adminTable);
                        }
                    });
                }
                break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选': '未全选');
                break;
        };
    });

    //监听行工具事件
    table.on('tool(test)', function(obj){
        var data = obj.data;
        //console.log(obj)
        if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            var content = getFormDom(data);

            layer.open({
                title:'信息编辑',
                area: ['70%', '80%'],
                resize:true,
                offset: '10%',
                content: content,
                yes: function(index, layero){
                    layer.msg($("#nameid").val());
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                }
            });
        }
    });
    //监听排序事件
    table.on('sort(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        console.log(obj.field); //当前排序的字段名
        console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
        console.log(this); //当前排序的 th 对象

        //尽管我们的 table 自带排序功能，但并没有请求服务端。
        //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
        table.reload('test', {
            initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
            ,where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                field: obj.field //排序字段
                ,order: obj.type //排序方式
            }
        });

        //layer.msg('服务端排序。order by '+ obj.field + ' ' + obj.type);
    });
});
//商户操作
layui.use('table', function(){
    var table = layui.table;
    adminTable2 = table.render({
        elem: '#test2'
        ,url:'/getAdminByDepart'
        ,method:'POST'
        //,contentType: 'application/json'
        ,toolbar: '#toolbarDemo2'
        ,defaultToolbar:['filter','print']
        ,where:{
            pcode:nodeId,
            type:1
        }
        ,title: '用户数据表'
        //数据格式解析的回调函数，用于将返回的任意数据格式解析成 table 组件规定的数据格式
        ,parseData: function(res){ //res 即为原始返回的数据
            return {
                "code": res.status, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.total, //解析数据长度
                "data": res.data //解析数据列表
            };
        }
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field:'id', title:'ID', width:80, fixed: 'left', unresize: true, sort: true}
            ,{field:'username', title:'账户名称',unresize: true , sort: true}
            ,{field:'name', title:'商户名称',unresize: true , sort: true}
            ,{field:'phone', title:'联系电话', edit: 'text', sort: true}
            ,{field:'depname', title:'部门', sort: true}
        ]]
        ,page: true
    });
    //头工具栏事件
    table.on('toolbar(test2)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'getCheckData':
                var data = checkStatus.data;
                layer.alert(JSON.stringify(data));
                break;
            case 'getCheckLength':
                var data = checkStatus.data;
                layer.msg('选中了：'+ data.length + ' 个');
                break;
            case 'updateDepart'://部门变更
                var data = checkStatus.data;
                if(data.length==0){
                    layer.msg('请选择要变更的商户');
                }else{
                    var admin_str = "";
                    for(i in data){
                        admin_str = admin_str+((i==0?"'":",'")+data[i].username+"'");
                    }
                    layer.open({
                        title: '部门选择：'
                        ,offset: '10%'
                        ,content: '<div style="width: 100%;overflow: auto;float: left;" id="toolbartree">\n' +
                        '            <ul id="departSelect" class="dtree" data-id="0"></ul>\n' +
                        '        </div>',
                        success:function () {
                            createDepTree("departSelect",onselect);
                        },
                        yes: function(index, layero){
                            layer.close(index); //如果设定了yes回调，需进行手工关闭
                            changeDepart({depcode:choose.nodeId,usernames:admin_str},adminTable2);
                        }
                    });
                }
                break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选': '未全选');
                break;
        };
    });
    //监听行工具事件
    table.on('tool(test2)', function(obj){
        var data = obj.data;
        //console.log(obj)
        if(obj.event === 'detail'){
            layer.msg('ID：'+ data.id + ' 的查看操作');
        }else if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            var content = getFormDom(data);

            layer.open({
                title:'信息编辑',
                area: ['70%', '80%'],
                resize:true,
                offset: '10%',
                content: content,
                yes: function(index, layero){
                    layer.msg($("#nameid").val());
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                }
            });
        }
    });
});
function getFormDom(data){
    var content = "<form class=\"layui-form layui-form-pane\" action=\"\" id=\"\" method=\"post\">\n" ;
    for(i in data){
        content = content +"            <div class=\"layui-form-item\">\n" +
            "                <label class=\"layui-form-label\">"+i+"</label>\n" +
            "                <div class=\"layui-input-inline\">\n" +
            "                    <input type=\"text\" value=\""+data[i]+"\"name=\"username\" lay-verify=\"required\" placeholder=\"请输入\" autocomplete=\"off\" class=\"layui-input\">\n" +
            "                </div>\n" +
            "            </div>" ;
    }
    content = content+"</form>";
    return content;
}
var choose;
function onselect(data){
    choose = data.param;
}
function changeDepart(obj,tables){
    $.ajax({
        async : true,
        cache : false,
        type : 'POST',
        url : '/admin/changeDepart',// 请求的action路径
        data : obj,
        error : function(XMLHttpRequest, textStatus, errorThrown) {// 请求失败处理函数
            alert("操作异常!");
        },
        success : function(data) {
            if(data.status==0){
                layer.msg("操作成功");
                tables.reload();
            }else{
                layer.msg(data.msg, {icon: 5});
            }
        }
    });
}