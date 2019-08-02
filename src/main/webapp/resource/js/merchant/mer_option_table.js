var nodeId = $("#depcode").val();
var adminTable;
var admintype = 1;
var table;
var form;
var laydate;
layui.use(['form', 'table', 'laydate'], function(){
    table = layui.table;
    form = layui.form;
    laydate = layui.laydate;
    adminTable = table.render({
        elem: '#test'
        ,url:'/getAdminByDepart'
        //,contentType: 'application/json'
        ,toolbar: '#table_toolbar'
        ,defaultToolbar:['exports']
        ,where:{
                pcode:nodeId,
                type:admintype
            ,start_time:$("#start_time").val() // 起止时间
            ,end_time:$("#end_time").val() // 结束时间
            ,option_type:$("#option_type").val() // 操作类型
        }
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
            {field:'id', title:'序号', width:80, fixed: 'left',align:'center', unresize: true, sort: false}
            ,{field:'phone', title:'用户', fixed: 'left',align:'center',unresize: true , sort: false}
            ,{field:'phone', title:'类型', fixed: 'left',align:'center',unresize: true , sort: false}
            ,{field:'depname', title:'操作详情', fixed: 'left',align:'center',unresize: true , sort: false}
            ,{field:'phone', title:'时间', fixed: 'left',align:'center',unresize: true , sort: false}
        ]]
        , done: function (res, curr, count) {// 表格渲染完成之后的回调


        }
        ,page: true
    });
    //头工具栏事件
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'table_query': // 表格刷新
                adminTable.reload();
                break;
            case 'table_reset': // 查询条件重置，表格刷新
                adminTable.reload();
                break;
        };
    });
    //头工具栏事件
    table.on('defaultToolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'exports': // 导出
                layer.alert('操作日志导出', {
                    icon: 5,
                    title: "提示"
                });
                adminTable.reload();
                break;
        };
    });

//日期时间
    laydate.render({
        elem: '#start_time'
    });
    laydate.render({
        elem: '#end_time'
    });

    // 去缴费 拆分
    $(document).on("click","#option_to_pay2",function(){
        var content = createToPay_split_content();
        layer.open({
            type:1,
            title:['去缴费','color: #182A63;font-size: 16px;font-weight: bold;background-color:#E9F2FF;'],
            area: ['60%', '90%'],
            resize:true,
            offset: '5%',
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
        layui.form.render();
    });
});

/**
 * 基本信息修改
 * */
function editUser(formid,tables,type,obj){
    var url = "";
    if(type==0){
        url = "/admin/addUser";
        return;
    }
    if(type==1){
        url = "/admin/updateUser";
        obj = getFormData(formid);
    }
    if(type==2){
        url = "/admin/delUser";
    }
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