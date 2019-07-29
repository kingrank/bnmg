var nodeId = $("#depcode").val();
var adminTable;
var adminTable2;
var admintype = 0;
var table;
var form;
var roleid = getUrlParam("roleid");
layui.use(['form', 'table', 'laydate'], function(){
    table = layui.table;
    form = layui.form
    adminTable = table.render({
        elem: '#test'
        ,url:'/getAdminByDepart'
        //,contentType: 'application/json'
        ,toolbar: '#toolbarDemo'
        ,defaultToolbar:['filter','print']
        ,where:{pcode:nodeId,type:admintype,roleid:roleid}
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
            ,{field:'name', title:(admintype==0?'用户名称':'商户名称'),unresize: true , sort: true}
            ,{field:'phone', title:'联系电话', edit: 'text', sort: true}
            ,{field:'depname', title:'部门', sort: true}
        ]]
        ,page: true
    });
    //头工具栏事件
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'del':
                var data = checkStatus.data;
                if(data.length>0){
                    layer.confirm('确定移除？', function(index){
                        var admin_str = "";
                        for(i in data){
                            admin_str = admin_str+((i==0?"":",")+data[i].username);
                        }
                        editRoleUser(adminTable,{ids:admin_str,roleid:roleid,type:2});
                    });

                }else{
                    layer.msg("请选择", {icon: 5});
                }
                break;
        };
    });
    //监听排序事件
    table.on('sort(test)', function(obj){ //注：tool是工具条事件名，test是table原始容 器的属性 lay-filter="对应的值"
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
    //未分配数据
    adminTable2 = table.render({
        elem: '#nouser'
        ,url:'/getAdminByDepart'
        //,contentType: 'application/json'
        ,toolbar: '#nouserBar'
        ,defaultToolbar:['filter','print']
        ,where:{pcode:nodeId,type:admintype,noroleid:roleid}
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
            ,{field:'name', title:(admintype==0?'用户名称':'商户名称'),unresize: true , sort: true}
            ,{field:'phone', title:'联系电话', edit: 'text', sort: true}
            ,{field:'depname', title:'部门', sort: true}
        ]]
        ,page: true
    });
    //头工具栏事件
    table.on('toolbar(nouser)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'add':
                var data = checkStatus.data;
                if(data.length>0){
                    layer.confirm('确定添加？', function(index){
                        var admin_str = "";
                        for(i in data){
                            admin_str = admin_str+((i==0?"":",")+data[i].username);
                        }
                        editRoleUser(adminTable2,{ids:admin_str,roleid:roleid,type:0});

                    });

                }else{
                    layer.msg("请选择", {icon: 5});
                }
                break;
        };
    });
    //监听排序事件
    table.on('sort(nouser)', function(obj){ //注：tool是工具条事件名，test是table原始容 器的属性 lay-filter="对应的值"
        console.log(obj.field); //当前排序的字段名
        console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
        console.log(this); //当前排序的 th 对象

        //尽管我们的 table 自带排序功能，但并没有请求服务端。
        //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
        table.reload('nouser', {
            initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
            ,where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                field: obj.field //排序字段
                ,order: obj.type //排序方式
            }
        });

        //layer.msg('服务端排序。order by '+ obj.field + ' ' + obj.type);
    });
});
function editRoleUser(tables,param){
    var url = "/editRoleUser";
    $.ajax({
        async : true,
        cache : false,
        type : 'POST',
        url : url,// 请求的action路径
        data : param,
        error : function(XMLHttpRequest, textStatus, errorThrown) {// 请求失败处理函数
            alert("操作异常!");
        },
        success : function(data) {
            if(data.status==0){
                layer.msg("操作成功");
                adminTable.reload();
                adminTable2.reload();
            }else{
                layer.msg(data.msg, {icon: 5});
            }
            /*window.setTimeout(function(){
                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                parent.layer.close(index); //再执行关闭
            },1000)*/

        }
    });
}