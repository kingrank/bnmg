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
        ,defaultToolbar:[]
        ,where:{
                pcode:nodeId,
                type:admintype
            ,order_time:$("#order_time").val() // 缴费起止时间
            ,order_pay_state:$("#order_pay_state").val() // 账期缴费开发票状态
            ,order_text:$("#order_text").val() // 请输入发票号、缴费金额
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
            ,{field:'phone', title:'缴费金额(元)', fixed: 'left',align:'center',unresize: true , sort: false}
            ,{field:'phone', title:'缴费时间', fixed: 'left',align:'center',unresize: true , sort: false}
            ,{field:'depname', title:'发票开具', fixed: 'left',align:'center',unresize: true , sort: false}
            ,{field:'phone', title:'发票号', fixed: 'left',align:'center',unresize: true , sort: false}
            ,{field:'phone', title:'备注', fixed: 'left',align:'center',unresize: true , sort: false}
            ,{fixed: 'right', title:'操作', align:'center',toolbar: '#table_bar'}
            /*
            ,{field:'name', title:(admintype==0?'用户名称':'商户名称'),unresize: true , sort: true}
            ,{fixed: 'right', title:'操作', toolbar: '#table_bar'}
            */
        ]]
        , done: function (res, curr, count) {// 表格渲染完成之后的回调
            /*
<script src="${context}/resource/js/merchant/DataTableExtend.js" type="text/javascript"></script>
            // $(".layui-table th").css("font-weight", "bold");// 设定表格标题字体加粗
            LayUIDataTable.SetJqueryObj($);// 第一步：设置jQuery对象
            var currentRowDataList = LayUIDataTable.ParseDataTable(function (index, currentData, rowData) {});
            // 对相关数据进行判断处理--此处对mk2大于30的进行高亮显示
            $.each(currentRowDataList, function (index, obj) {
                if (obj['username'] ) {
                    console.log(obj['username'].cell);
                    console.log(obj['username'].cell.addClass('xinbai_bg_color_success'));
                    obj['username'].cell.addClass('xinbai_bg_color_success');
                    if( obj['username'].value == 'hah' ){ // 已缴费
                        obj['username'].cell.css({ 'background-color': '#12C14F'});
                    }else if( obj['username'].value == 'kendeji' ){ // 未交齐
                        obj['username'].cell.css({ 'background-color': '#F67F0B'});
                    }else{// 未缴费
                        obj['username'].cell.css({ 'background-color': '#FF5353'});
                    }
                }
            });
            */
            $(".layui-table").find('td[data-field="depname"]').each(function(){
                var _div = $(this).find("div").eq(0);
                var _div_value = _div.html();
                if( _div_value == '五棵松店' ){ // 未开具
                    _div.addClass("xinbai_color_danger");
                }
            });

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
        };
    });

    //监听行工具事件
    table.on('tool(test)', function(obj){
        var data = obj.data;
        //console.log(obj)
        switch(obj.event){
            case 'table_detail'://缴费记录
                var content = createPayLog_content();
                layer.open({
                    type:1,
                    title:['去缴费','color: #182A63;font-size: 16px;font-weight: bold;background-color:#E9F2FF;'],
                    area: ['50%', '95%'],
                    resize:true,
                    offset: '1%',
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
                break;
            case 'del':
                layer.confirm('该操作将清楚商户所有信息，且无法恢复，真的删除行么', function(index){
                    //obj.del();
                    editUser('admininfo',adminTable,2,{userNames:data.username});
                    layer.close(index);
                });
                break;
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

//日期时间范围
    laydate.render({
        elem: '#order_time'
        ,type: 'datetime'
        ,range: true
    });

    // var content = createPayDetail_content(); // 正常账单
    var content = createPayDetail_Split_content(); // 拆分账单
    $("#order_detail").html(content);
    layui.form.render();

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

/**
 * 制作 账单信息
 * @returns {string}
 */
function createPayDetail_content(){
    var content = "<form class=\"layui-form\" action=\"\" style='background-color: #fff;'>" +
                    "<div class='layui-row' style='font-size: 14px;margin-top: 5px;padding: 5px 30px;'>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>商户号:</div>" +
                        "<div class='layui-col-sm4'>L01F002，L02F001，L02F002，L02F003，L02F004</div>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>通知单编号：</div>" +
                        "<div class='layui-col-sm4'>42</div>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>租户名称:</div>" +
                        "<div class='layui-col-sm4'>汉堡王(北京)餐饮管理有限公司</div>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>费用计费周期：</div>" +
                        "<div class='layui-col-sm4'>05/01/2019 - 05/31/2019</div>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>租赁品牌：</div>" +
                        "<div class='layui-col-sm4'>汉堡王</div>" +
                    "</div>";
    content = content
        +"<div class='layui-row' style='margin: 5px 30px;border: 2px #247CFF solid; '>" +
        "<table class='layui-table' lay-skin='nob' >"
        +"<thead>"
        +"    <tr style='background-color: #F3F8FF;color: #182A63;'>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>项目</span></div></th>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>内容</span></div></th>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>RMB</span></div></th>"
        +"    </tr> "
        +"</thead>"
        +"<tbody>"
        +"    <tr>"
        +"        <td align=\"left\" colspan='3' style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>固定</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">" +
        "           固定租金" +
        "           <button type='button' class='layui-btn layui-btn-danger xinbai_bg_color_success layui-btn-xs xinbai-btn-small'>已缴费</button>" +
        "        </td>"
        +"        <td align=\"center\">1989-10-14 - 1989-10-14</td>"
        +"        <td align=\"center\">164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">" +
        "           提成租金" +
        "           <button type='button' class='layui-btn layui-btn-danger layui-btn-xs xinbai-btn-small'>未交齐</button>" +
        "        </td>"
        +"        <td align=\"center\">1989-10-14 - 1989-10-14</td>"
        +"        <td align=\"center\">164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>" +
        "           小计" +
        "        </td>"
        +"        <td align=\"center\">&nbsp;</td>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"left\" colspan='3' style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>管理费</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">" +
        "           物业管理费" +
        "           <button type='button' class='layui-btn layui-btn-danger layui-btn-xs xinbai_bg_color_danger xinbai-btn-small'>未缴费</button>" +
        "        </td>"
        +"        <td align=\"center\">1989-10-14 - 1989-10-14</td>"
        +"        <td align=\"center\">11,375.83</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>" +
        "           小计" +
        "        </td>"
        +"        <td align=\"center\">&nbsp;</td>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"left\" colspan='3' style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>费用</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">水费</td>"
        +"        <td align=\"center\">2019年5月 水费</td>"
        +"        <td align=\"center\">39，600.00</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">电费</td>"
        +"        <td align=\"center\">2019年5月 电费</td>"
        +"        <td align=\"center\">670.00</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">公共电力设备维护费</td>"
        +"        <td align=\"center\">2019年5月 公共电力维护管理费</td>"
        +"        <td align=\"center\">15,120.00</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>" +
        "           小计" +
        "        </td>"
        +"        <td align=\"center\">&nbsp;</td>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"left\" style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>" +
        "           总计" +
        "        </td>"
        +"        <td align=\"center\">&nbsp;</td>"
        +"        <td align=\"center\" style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>164，987.46</td>"
        +"    </tr>"
        +"</tbody>"
        +"</table>"
        +"</div>";

    content = content + "<div class='layui-row' style='background-color: #F3F8FF;font-size: 20px;font-weight:600;margin-top: 10px;padding: 5px 35px;'>" +
        "<div class='layui-col-sm4 layui-col-md-offset4' style='text-align: center;'>本期账单总计：132,465.00</div>" +
        "</div>";

    var remark = createXinbaiRemark();
    content = content + remark + "<div class='layui-row' style='padding: 0px 0px;color: #1C1C1C;font-size: 16px;font-weight: 600;'>" +
        "<div class='layui-col-sm3 layui-col-md-offset9'>北京易喜新世界百货有限公司财务部</div>" +
        "<div class='layui-col-sm1 layui-col-md-offset10'>07/09/2019</div>" +
        "</form>";

    return content;
}
/**
 * 制作 拆分账单信息
 * @returns {string}
 */
function createPayDetail_Split_content(){
    var content = "<form class=\"layui-form\" action=\"\" style='background-color: #fff;'>" +
                    "<div class='layui-row' style='font-size: 14px;margin-top: 5px;padding: 5px 30px;'>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>商户号:</div>" +
                        "<div class='layui-col-sm4'>L01F002，L02F001，L02F002，L02F003，L02F004</div>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>通知单编号：</div>" +
                        "<div class='layui-col-sm4'>42</div>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>租户名称:</div>" +
                        "<div class='layui-col-sm4'>汉堡王(北京)餐饮管理有限公司</div>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>费用计费周期：</div>" +
                        "<div class='layui-col-sm4'>05/01/2019 - 05/31/2019</div>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>租赁品牌：</div>" +
                        "<div class='layui-col-sm4'>汉堡王</div>" +
                    "</div>";
    content = content
        +"<div class='layui-row' style='margin: 5px 30px;border: 2px #247CFF solid; '>"
        +"<table class='layui-table' lay-skin='nob' >"
        +"<thead>"
        +"    <tr style='background-color: #F3F8FF;color: #182A63;'>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>项目</span></div></th>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>内容</span></div></th>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>RMB</span></div></th>"
        +"    </tr> "
        +"</thead>"
        +"<tbody>"
        +"    <tr>"
        +"        <td align=\"left\" colspan='3' style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>固定</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">" +
        "           固定租金" +
        "           <button type='button' class='layui-btn layui-btn-danger xinbai_bg_color_success layui-btn-xs xinbai-btn-small'>已缴费</button>" +
        "        </td>"
        +"        <td align=\"center\">1989-10-14 - 1989-10-14</td>"
        +"        <td align=\"center\">164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>" +
        "           小计" +
        "        </td>"
        +"        <td align=\"center\">&nbsp;</td>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"left\" colspan='3' style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>管理费</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">" +
        "           物业管理费" +
        "           <button type='button' class='layui-btn layui-btn-danger layui-btn-xs xinbai_bg_color_danger xinbai-btn-small'>未缴费</button>" +
        "        </td>"
        +"        <td align=\"center\">1989-10-14 - 1989-10-14</td>"
        +"        <td align=\"center\">11,375.83</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>" +
        "           小计" +
        "        </td>"
        +"        <td align=\"center\">&nbsp;</td>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"left\" colspan='3' style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>费用</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">水费</td>"
        +"        <td align=\"center\">2019年5月 水费</td>"
        +"        <td align=\"center\">39，600.00</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">电费</td>"
        +"        <td align=\"center\">2019年5月 电费</td>"
        +"        <td align=\"center\">670.00</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">公共电力设备维护费</td>"
        +"        <td align=\"center\">2019年5月 公共电力维护管理费</td>"
        +"        <td align=\"center\">15,120.00</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>" +
        "           小计" +
        "        </td>"
        +"        <td align=\"center\">&nbsp;</td>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"left\" style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>" +
        "           总计" +
        "        </td>"
        +"        <td align=\"center\">&nbsp;</td>"
        +"        <td align=\"center\" style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>164，987.46</td>"
        +"    </tr>"
        +"</tbody>"
        +"</table>"
        +"</div>"
        +"<div class='layui-row' style='margin: 5px 30px;border: 2px #247CFF solid; '>"
        +"<table class='layui-table' lay-skin='nob' >"
        +"<thead>"
        +"    <tr style='background-color: #F3F8FF;color: #182A63;'>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>项目</span></div></th>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>内容</span></div></th>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>RMB</span></div></th>"
        +"    </tr> "
        +"</thead>"
        +"<tbody>"
        +"    <tr>"
        +"        <td align=\"center\" style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>" +
        "           提成租金" +
        "           <button type='button' class='layui-btn layui-btn-danger layui-btn-xs xinbai-btn-small'  style='font-weight: normal;'>未交齐</button>" +
        "        </td>"
        +"        <td align=\"center\">1989-10-14 - 1989-10-14</td>"
        +"        <td align=\"center\">164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>" +
        "           小计" +
        "        </td>"
        +"        <td align=\"center\">&nbsp;</td>"
        +"        <td align=\"center\" style='font-size: 16px;font-weight: bold;margin-left: 50px;'>164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"left\" style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>" +
        "           总计" +
        "        </td>"
        +"        <td align=\"center\">&nbsp;</td>"
        +"        <td align=\"center\" style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>164，987.46</td>"
        +"    </tr>"
        +"</tbody>"
        +"</table>"
        +"</div>";

    content = content + "<div class='layui-row' style='background-color: #F3F8FF;font-size: 20px;font-weight:600;margin-top: 10px;padding: 5px 35px;'>" +
        "<div class='layui-col-sm4 layui-col-md-offset4' style='text-align: center;'>本期账单总计：132,465.00</div>" +
        "</div>";

    var remark = createXinbaiRemark();
    content = content + remark + "<div class='layui-row' style='padding: 0px 0px;color: #1C1C1C;font-size: 16px;font-weight: 600;'>" +
        "<div class='layui-col-sm3 layui-col-md-offset9'>北京易喜新世界百货有限公司财务部</div>" +
        "<div class='layui-col-sm1 layui-col-md-offset10'>07/09/2019</div>" +
        "</form>";

    return content;
}

/*创建 新百 默认描述备注信息*/
function createXinbaiRemark(){
    var remark = "<div class='layui-row' style='padding: 0px 0px;'>" +
            "<div class='layui-col-sm6' style='padding-top: 10px;font-size: 12px;color: #8894B2;'>" +
            "1. 请您收到本结算通知后速将上述款项汇至我司。如逾期未付款，我司将根据合同条款规定按日收取违约金。 </br>" +
            "2. 通知单I 的内容包括该租户下期固定租金、本期浮动租金金额及本期发生的水电费、信用卡费、其他费用等。</br>" +
            "3. 本公司的汇款帐户为如下:</br>" +
            " &nbsp;&nbsp;&nbsp;&nbsp;币&nbsp;&nbsp;种:  人民币</br>" +
            " &nbsp;&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;名: 北京易喜新世界百货有限公司</br>" +
            " &nbsp;&nbsp;&nbsp;&nbsp;帐&nbsp;&nbsp;号:  0200015819024533565</br>" +
            " &nbsp;&nbsp;&nbsp;&nbsp;开户银行:  工行新世界支行</br>" +
            "4. 联系方式:\n" +
            " &nbsp;&nbsp;&nbsp;&nbsp;* 传真号码: 010-67080940 联系电话: 010-67083794 联系人: 北京二期</br>" +
            "5、如已付款或款项在途请忽视本通知书。"+
            "</div>" +
        "</div>";
    return remark;
}
/**
 * 制作 缴费详情 弹出窗
 * @returns {string}
 */
function createPayLog_content(){
    var content = "<form class=\"layui-form\" action=\"\">" +
                    "<div class='layui-row' style='font-size: 14px;margin-top: 5px;padding: 5px 30px;'>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>缴费账期：</div>" +
                        "<div class='layui-col-sm2'>2019-07</div>" +
                        "<div class='layui-col-sm2' style='color:#98A2BC;'>本期应缴：</div>" +
                        "<div class='layui-col-sm2'>40000.00</div>" +
                    "</div>";
    content = content
        +"<div class='layui-row' style='margin: 5px 30px;border: 2px #247CFF solid; '>" +
        "<table class='layui-table' lay-skin='nob' >"
        +"<thead>"
        +"    <tr style='background-color: #F3F8FF;color: #182A63;'>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>项目</span></div></th>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>内容</span></div></th>"
        +"        <th style='font-size: 16px;font-weight: bold;'><div class=\"layui-table-cell\" align=\"center\"><span>RMB</span></div></th>"
        +"    </tr> "
        +"</thead>"
        +"<tbody>"
        +"    <tr>"
        +"        <td align=\"left\" colspan='3' style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>固定</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">固定租金</td>"
        +"        <td align=\"center\">1989-10-14 - 1989-10-14</td>"
        +"        <td align=\"center\">164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">提成租金</td>"
        +"        <td align=\"center\">1989-10-14 - 1989-10-14</td>"
        +"        <td align=\"center\">164，987.46</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"left\" colspan='3' style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>管理费</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">物业管理费</td>"
        +"        <td align=\"center\">1989-10-14 - 1989-10-14</td>"
        +"        <td align=\"center\">11,375.83</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"left\" colspan='3' style='font-size: 16px;color:#182A63;font-weight: bold;margin-left: 50px;'>费用</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">水费</td>"
        +"        <td align=\"center\">2019年5月 水费</td>"
        +"        <td align=\"center\">39，600.00</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">电费</td>"
        +"        <td align=\"center\">2019年5月 电费</td>"
        +"        <td align=\"center\">670.00</td>"
        +"    </tr>"
        +"    <tr>"
        +"        <td align=\"center\">公共电力设备维护费</td>"
        +"        <td align=\"center\">2019年5月 公共电力维护管理费</td>"
        +"        <td align=\"center\">15,120.00</td>"
        +"    </tr>"
        +"</tbody>"
        +"</table>"
        +"</div>";

    content = content + "<div class='layui-row' style='background-color: #F3F8FF;font-size: 20px;font-weight:600;margin-top: 10px;padding: 5px 35px;'>" +
        "<div class='layui-col-sm4 layui-col-md-offset4' style='text-align: center;'>总计：132,465.00</div>" +
        "</div>";

    content = content +

        "<div class='layui-row' style='font-size: 14px;margin-top: 5px;padding: 2px 30px;'>" +
        "<div class='layui-col-sm2' style='color:#98A2BC;'>开具发票：</div>" +
        "<div class='layui-col-sm3'>已开具</div>" +
        "</div>"+

        "<div class='layui-row' style='font-size: 14px;padding: 2px 30px;'>" +
        "<div class='layui-col-sm2' style='color:#98A2BC;'>发票编号：</div>" +
        "<div class='layui-col-sm5'>13486318946</div>" +
        "</div>"+

        "<div class='layui-row' style='font-size: 14px;padding: 2px 30px;'>" +
        "<div class='layui-col-sm2' style='color:#98A2BC;'>备注信息：</div>" +
        "<div class='layui-col-sm5'>这里是发票备注</div>" +
        "</div>"+
        "</form>";

    return content;
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