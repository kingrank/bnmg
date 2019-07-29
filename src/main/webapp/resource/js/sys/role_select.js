var nodeId = $("#depcode").val();
var authcode = getUrlParam("authcode");
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
        ,url:'/getUserOrRoleByAuth'
        //,contentType: 'application/json'
        ,toolbar: '#toolbarDemo'
        ,defaultToolbar:['filter','print']
        ,where:{noauthcode:authcode,type:1}
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
            ,{field:'name', title:"角色名称",unresize: true , sort: true}
            ,{field:'status', title:'状态', edit: 'text', sort: true,templet: function(d){
                return (d.status==0?"正常":"禁用")
                }
            }
        ]]
        ,page: true
    });
    //头工具栏事件
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'add':
                var data = checkStatus.data;
                if(data.length>0){
                    layer.confirm('确定添加？', function(index){
                        var role_str = "";
                        for(i in data){
                            role_str = role_str+((i==0?"":",")+data[i].id);
                        }
                        window.parent.editUserOrRoleAuth(role_str,1,0);
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index); //再执行关闭
                    });

                }else{
                    layer.msg("请选择", {icon: 5});
                }
                break;
        };
    });
});
var choose;
function onselect(data){
    choose = data.param;
    $("input[ name='depcode']").val(choose.context);
}
