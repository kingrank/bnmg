var nodeId = getUrlParam("nodeId");
$("#departname").text(decodeURI(getUrlParam("context")));
var adminTable;
var adminTable2;
layui.use('table', function(){
    var table = layui.table;
    adminTable = table.render({
        elem: '#test'
        ,url:'/getUserOrRoleByAuth'
        //,contentType: 'application/json'
        ,toolbar: '#toolbarDemo'
        ,defaultToolbar:['filter','print']
        ,where:{authcode:nodeId,type:0}
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
            ,{field:'name', title:'用户姓名',unresize: true , sort: true}
            ,{field:'username', title:'帐号名称',unresize: true , sort: true}
        ]]
        ,page: true
    });
    //头工具栏事件
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            //添加管理员
            case 'addUser':
                layer.open({
                    title: '管理员选择：'
                    ,area: ['70%', '80%']
                    ,type:2
                    ,offset: '10%'
                    ,content: '/jump?page=admin/admin_select',
                    success:function () {

                    },
                    yes: function(index, layero){
                        layer.close(index); //如果设定了yes回调，需进行手工关闭

                    }
                });
                break;
            //删除管理员
            case 'removeUser':
                var data = checkStatus.data;
                if(data.length==0){
                    layer.msg('请选择管理员');
                }else{
                    var admin_str = "";
                    for(i in data){
                        admin_str = admin_str+((i==0?"":",")+data[i].username);
                    }
                    layer.confirm('确定删除？', function(index){
                        editUserOrRoleAuth(admin_str,0,2);
                    });
                }
                break;
        };
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
if($("#roleEdit")){
//角色操作 需验证权限
    layui.use('table', function(){
        var table = layui.table;
        adminTable2 = table.render({
            elem: '#test2'
            ,url:'/getUserOrRoleByAuth'
            ,method:'POST'
            //,contentType: 'application/json'
            ,toolbar: '#toolbarDemo2'
            ,defaultToolbar:['filter','print']
            ,where:{
                authcode:nodeId,
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
                ,{field:'name', title:'角色名称',unresize: true , sort: true}
            ]]
            ,page: true
        });
        //头工具栏事件
        table.on('toolbar(test2)', function(obj){
            var checkStatus = table.checkStatus(obj.config.id);
            switch(obj.event){
                //添加角色
                case 'addRole':
                    layer.open({
                        title: '角色选择：'
                        ,area: ['70%', '80%']
                        ,type:2
                        ,offset: '10%'
                        ,content: '/jump?page=sys/role_select&authcode='+nodeId,
                        success:function () {

                        },
                        yes: function(index, layero){
                            layer.close(index); //如果设定了yes回调，需进行手工关闭

                        }
                    });
                    break;

                //删除角色
                case 'removeRole':
                    var data = checkStatus.data;
                    if(data.length==0){
                        layer.msg('请选择角色');
                    }else{
                        var admin_str = "";
                        for(i in data){
                            admin_str = admin_str+((i==0?"":",")+data[i].id);
                        }
                        layer.confirm('确定删除？', function(index){
                            editUserOrRoleAuth(admin_str,1,2);
                        });
                    }
                    break;
            };
        });

    });
}

/**
 * 赋权人员
 * */
function editUserOrRoleAuth(ids,type,edittype){
    $.ajax({
        async : true,
        cache : false,
        type : 'POST',
        url : '/editUserOrRoleAuth',// 请求的action路径
        data : {authcode:nodeId,ids:ids,type:type,edittype:edittype},
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
        }
    });
}