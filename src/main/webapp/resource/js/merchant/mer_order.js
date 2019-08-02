/**
 * 商户端 我的账单 头统计
 * */
function get_order_title(){
    $.ajax({
        async : true,
        cache : false,
        type : 'POST',
        url : '/admin/changeDepart',// 请求的action路径
        data : {},
        error : function(XMLHttpRequest, textStatus, errorThrown) {// 请求失败处理函数
            alert("操作异常!");
        },
        success : function(data) {
            if(data.status==0){
                // layer.msg("操作成功");
            }else{
                layer.msg(data.msg, {icon: 5});
            }
        }
    });
}