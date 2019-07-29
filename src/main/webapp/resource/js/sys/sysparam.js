var nodeId = $("#depcode").val();
var adminTable;
var table;
var form;
layui.extend({
    dtree: '{/}/resource/layui/layui_ext/dtree/dtree'   // {/}的意思即代表采用自有路径，即不跟随 base 路径
}).use(['dtree','form', 'table', 'laydate'], function(){
    dtree = layui.dtree;
    table = layui.table;
    form = layui.form
    adminTable = table.render({
        elem: '#test'
        ,url:'/getSysParam'
        //,contentType: 'application/json'
        ,toolbar: '#toolbarDemo'
        ,defaultToolbar:['filter','print']
        ,where:{}
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
            ,{field:'key', title:'标识', width:80, fixed: 'left', unresize: true, sort: true}
            ,{field:'name', title:"名称",unresize: true , sort: true}
            ,{field:'val', title:'值', edit: 'text', sort: true,templet: function(d){
                return (d.val)
                }
            }
            ,{fixed: 'right', title:'操作', toolbar: '#barDemo'}
        ]]
        ,page: true
    });
    //头工具栏事件
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'refresh':
                var content = createAddForm();
                layer.open({
                    type:1,
                    title:'添加',
                    area: ['30%', '70%'],
                    resize:true,
                    offset: '10%',
                    content: content,
                    success:function(layero, index){
                        //新加元素重新渲染表单 否则样式不对
                        layui.form.render();
                    },
                    btn: [],
                    yes: function(index, layero){
                        //alert(JSON.stringify(choose));context
                        var param = getFormData("addUser");
                        param.depcode = choose.nodeId;
                    }
                });
                break;
        };
    });

    //监听行工具事件
    table.on('tool(test)', function(obj){
        var data = obj.data;
        //console.log(obj)
        if(obj.event === 'edit'){
            var content = createFormDom('createinfo',data,'sysparam');
            layer.open({
                title:'信息编辑',
                area: ['40%', '70%'],
                resize:true,
                offset: '10%',
                content: content,
                success:function(layero, index){
                    //新加元素重新渲染表单 否则样式不对
                    layui.form.render();
                },
                yes: function(index, layero){
                    editFun('createinfo',adminTable,1);
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                }
            });
        }
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

    });
    //监听提交
    form.on('submit(addSubmit)', function(data){
        editFun('addinfo',adminTable,0);
        layer.closeAll();
    });
});
var choose;
function onselect(data){
    choose = data.param;
    $("input[ name='depcode']").val(choose.context);
}
/**
 *权限编辑
 * */
function changeAuth(obj){
    $.ajax({
        async : true,
        cache : false,
        type : 'POST',
        url : '/rolePutAuth',// 请求的action路径
        data : obj,
        error : function(XMLHttpRequest, textStatus, errorThrown) {// 请求失败处理函数
            alert("操作异常!");
        },
        success : function(data) {
            if(data.status==0){
                layer.msg("操作成功");
            }else{
                layer.msg(data.msg, {icon: 5});
            }
        }
    });
}
/**
 * 基本信息修改
 * */
function editFun(formid,tables,type,obj){
    var url = "/sysParamEdit";
    if(type==0||type==1){
        obj = getFormData(formid);
        obj.status = obj.status=='on'?0:1;
    }
    obj.type = type;
    //alert(JSON.stringify(url));
    $.ajax({
        async : true,
        cache : false,
        type : 'POST',
        url : url,// 请求的action路径
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