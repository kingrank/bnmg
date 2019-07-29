var nodeId = $("#depcode").val();
var adminTable;
var admintype = 1;
var table;
var form;
layui.use(['form', 'table', 'laydate'], function(){
    table = layui.table;
    form = layui.form
    adminTable = table.render({
        elem: '#test'
        ,url:'/getAdminByDepart'
        //,contentType: 'application/json'
        ,toolbar: '#toolbarDemo'
        ,defaultToolbar:['filter','print']
        ,where:{pcode:nodeId,type:admintype}
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
            ,{fixed: 'right', title:'操作', toolbar: '#barDemo'}
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
                    layer.confirm('该操作将清楚商户所有信息，且无法恢复，真的删除？', function(index){
                        var admin_str = "";
                        for(i in data){
                            admin_str = admin_str+((i==0?"":",")+data[i].username);
                        }
                        editUser('admininfo',adminTable,2,{userNames:admin_str});
                        layer.close(index);
                    });

                }else{
                    layer.msg("请选择", {icon: 5});
                }
                //layer.alert(JSON.stringify(data));
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
            case 'add':
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
        if(obj.event === 'del'){
            layer.confirm('该操作将清楚商户所有信息，且无法恢复，真的删除行么', function(index){
                //obj.del();
                editUser('admininfo',adminTable,2,{userNames:data.username});
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            var content = createFormDom('admininfo',data);
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
                    editUser('admininfo',adminTable,1);
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

        //layer.msg('服务端排序。order by '+ obj.field + ' ' + obj.type);
    });
    $(document).on("click",".choosedept",function(){
        layer.open({
            type:1,
            title: '部门选择：'
            ,offset: '10%'
            ,content: '<div style="width: 100%;overflow: auto;float: left;" id="depttree">\n' +
            '            <ul id="departSelect" class="dtree" data-id="0"></ul>\n' +
            '        </div>',
            success:function () {
                createDepTree("departSelect",onselect);
            },
            btn: ['确定'],
            yes: function(index, layero){
                layer.close(index); //如果设定了yes回调，需进行手工关闭
            }
        });
    });
    //监听提交
    form.on('submit(addUserSubmit)', function(data){

        data.field.status = data.status=='on'?1:0;
        data.field .depcode = choose.nodeId;
        //alert(JSON.stringify(data));
        $.ajax({
            async : true,
            cache : false,
            type : 'POST',
            url : '/admin/addUser',// 请求的action路径
            data : data.field,
            error : function(XMLHttpRequest, textStatus, errorThrown) {// 请求失败处理函数
                layer.msg("操作异常!",{icon: 5});
            },
            success : function(data) {
                if(data.status==0){
                    layer.msg("操作成功!");
                    adminTable.reload();
                    layer.closeAll()
                }else{
                    layer.msg("操作失败",{icon:6});
                }
            }
        });
    });
});
function createAddForm(){
    var content = "<form class=\"layui-form layui-form-pane\" action=\"\" id=\"addUser\" style='padding: 5%;text-align: center' method=\"post\">\n" ;
    content = content +"<input type=\"hidden\" value=\""+admintype+"\"name=\"type\"  lay-verify=\"required\" placeholder=\"请输入\" autocomplete=\"off\" class=\"layui-input\">\n";

    content = content +"<div class=\"layui-form-item\"><label class=\"layui-form-label\">用户名</label><div class=\"layui-input-inline\">\n" ;
    content = content +"<input type=\"text\" value=\"\"name=\"name\"  lay-verify=\"required\" placeholder=\"请输入\" autocomplete=\"off\" class=\"layui-input\">\n";
    content = content +"</div></div>" ;

    content = content +"<div class=\"layui-form-item\"><label class=\"layui-form-label\">联系电话</label><div class=\"layui-input-inline\">\n" ;
    content = content +"<input type=\"text\" value=\"\"name=\"phone\"  lay-verify=\"required\" placeholder=\"请输入\" autocomplete=\"off\" class=\"layui-input\">\n";
    content = content +"</div></div>" ;

    content = content +"<div class=\"layui-form-item\"><label class=\"layui-form-label\">部门</label><div class=\"layui-input-inline\">\n" ;
    content = content +"<input type=\"text\" value=\"\"name=\"depcode\" readonly lay-verify=\"required\" placeholder=\"请输入\" autocomplete=\"off\" class=\"layui-input\">\n";
    content = content +"</div><div class=\"layui-form-mid layui-word-aux choosedept\" style='cursor: pointer;'>选择部门</div></div>" ;

    content = content +"<div class=\"layui-form-item\"><label class=\"layui-form-label\">账户名</label><div class=\"layui-input-inline\">\n" ;
    content = content +"<input type=\"text\" value=\"\"name=\"username\"  lay-verify=\"required\" placeholder=\"请输入\" autocomplete=\"off\" class=\"layui-input\">\n";
    content = content +"</div></div>" ;

    content = content +"<div class=\"layui-form-item\"><label class=\"layui-form-label\">密码</label><div class=\"layui-input-inline\">\n" ;
    content = content +"<input type=\"password\" value=\"\"name=\"password\"  lay-verify=\"required\" placeholder=\"请输入\" autocomplete=\"off\" class=\"layui-input\">\n";
    content = content +"</div></div>" ;

    content = content +"<div class=\"layui-form-item\"><label class=\"layui-form-label\">状态</label><div class=\"layui-input-inline\">\n" ;
    content = content +"<input type=\"checkbox\" name=\"status\" lay-skin=\"switch\" lay-text=\"正常|停用\" checked></div></div>" ;
    content = content+"<div class=\"layui-form-item\">\n" +
        "    <div class=\"\">\n" +
        //此处按钮如果不设置类型未button 则弹出层会自动关闭
        "      <button type=\"button\" class=\"layui-btn\" lay-submit=\"\" lay-filter=\"addUserSubmit\">立即提交</button>\n" +
        "    </div>\n" +
        "  </div>";

    content = content+"</form>";
    return content;
}
function createFormDom(formid,data){
    var content = "<form class=\"layui-form layui-form-pane\" action=\"\" id=\""+formid+"\" method=\"post\">\n" ;
    var selectstr = "<select name=\"city\" lay-verify=\"\">\n" +
        "  <option value=\"0\" >正常</option>\n" +
        "  <option value=\"1\" >停用</option>\n" +
        "</select>"
    for(i in data){
        if(CONS.admin[i]==undefined){
            continue;
        }
        content = content +"<div style='display:"+(CONS.admin[i].show==true?"block":"none")+"' class=\"layui-form-item\">\n" +
            "                <label class=\"layui-form-label\">"+CONS.admin[i].title+"</label>\n" +
            "                <div class=\"layui-input-inline\">\n" ;
        if(i=="status"){
            content = content +"<select name=\""+i+"\" lay-verify=\"\">\n" +
                "  <option value=\"0\" "+(data[i]==0?"selected":"")+" >正常</option>\n" +
                "  <option value=\"1\" "+(data[i]==1?"selected":"")+">停用</option>\n" +
                "</select>" ;
        }else{
            content = content +"                    <input type=\"text\" value=\""+CONS.admin[i].format(data[i])+"\"name=\""+i+"\" "+(CONS.admin[i].disable==true?"readonly":"")+" lay-verify=\"required\" placeholder=\"请输入\" autocomplete=\"off\" class=\"layui-input\">\n";
        }
        content = content +"</div>\n" +
            "            </div>" ;

    }
    content = content+"</form>";
    return content;
}
var choose;
function onselect(data){
    choose = data.param;
    $("input[ name='depcode']").val(choose.context);
}
/**
 * 部门更改
 * */
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