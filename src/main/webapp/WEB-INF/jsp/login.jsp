<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="common.jsp"%>
<html>
<head>
    <title>欢迎光临</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="description" content="登录">
    <link rel="stylesheet" type="text/css" href="${context}/resource/layui/css/layui.css">
    <script src="${context}/resource/jquery/jquery.min.js" type="text/javascript"></script>
    <script src="${context}/resource/layui/layui.all.js" type="text/javascript"></script>
</head>
<style>
    .center{
        width: 50%;
        margin: auto;
        background: rgba(255, 255, 255, 0);
        position: absolute;
        top: 30%;
        left: 25%;
        height: 270px;
        border-radius: 12px;
        min-height: 230px;
        min-width: 510px;
    }
    .layui-form-pane .layui-form-checkbox {
        margin: 4px 0 4px 0px;
    }
    .left{
        float: left;
        width: 65%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 12px 0 0px 12px;
    }
    .right{
        float: left;
        width: 35%;
        height: 100%;
        background: white;
        border-radius: 0px 12px 12px 0px;
    }
    .login_text{
        font-size: 27px;text-indent: 7%;letter-spacing: 40px;margin: 6%;
    }
    .divinput{
        position: relative;
    }
    .divinput img{
        position: absolute;width: 16px;top: 9px;left: 9px;
    }
    .divinput input{
        padding-left: 40px;
        border: 1px #247CFF solid;
    }
    .layui-form-checkbox[lay-skin="primary"]:hover i {

        border-color: #247CFF;
        color: #fff;

    }
    .layui-form-checked[lay-skin="primary"] i {

        border-color: #247CFF !important;
        background-color: #247CFF;
        color: #fff;

    }
</style>
<script>
    if (window.top !== window.self) {
        try {
            top.location.href = window.location.href;
        } catch (ex) {

        }
    }
</script>
<body style="background: url(${context}/resource/img/login/BG@2x.png) top center no-repeat; background-size:cover;">
    <div style="width: 100%;height: 100%;background: rgba(33, 39, 64, 0.5);min-width: 660px;">
        <div class="center">
            <div class="left" style="text-align: center;">
                <img id="clogo" src="${context}/resource/img/login/login_logo@2x.png" style="width: 60%;padding-top: 10%;">
                <div class="login_text">商户缴费系统</div>
            </div>
            <div class="right">
                <form class="layui-form layui-form-pane" action="" id="" method="post" style="padding: 5%;">
                    <div class="layui-form-item" style="text-align: center;font-size: 18px;">
                        管理员登录
                    </div>
                    <div class="layui-form-item divinput">
                            <img src="${context}/resource/img/login/icon_account@2x.png">
                            <input type="text" name="username" lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-form-item divinput">
                        <img src="${context}/resource/img/login/icon_passoword@2x.png">
                            <input type="password" name="password" placeholder="请输入密码" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-form-item">
                        <button style="width: 100%;background: #247CFF;" class="layui-btn" lay-submit="" lay-filter="formDemo" id="login" type="button">登录</button>
                    </div>
                    <div class="layui-form-item">
                        <input type="checkbox" name="rememberMe" title="记住我 " lay-skin="primary">
                        <label id="err" style="font-size:11px;color:red;float: right;"></label>
                    </div>
                </form>
            </div>
        </div>

    </div>
</body>
<script>
    //窗口大小调整结束
    window.onresize = function(){
        resize();
    }
    resize();
    function resize(){
        var wd = $("#clogo").width();
        var df = wd/9.35;
        $(".login_text").css("letter-spacing",df+"px");
    }
    $(document).keydown(function(event){
        if(event.keyCode == 13){
            $("#login").click();
        }　　
    });
    $(function(){
        layui.use('form', function(){
            var form = layui.form;
            form.render();
            //监听提交
            form.on('submit(formDemo)', function(data){
                $.ajax({
                    async : true,
                    cache : false,
                    type : 'POST',
                    url : '/subLogin',// 请求的action路径
                    data : data.field,
                    error : function(XMLHttpRequest, textStatus, errorThrown) {// 请求失败处理函数
                        alert("操作异常!");
                    },
                    success : function(data) {
                        $("#err").text("");
                        if(data=='success'){
                            window.location.href = context+'/home'
                        }else{
                            $("#err").text(data)
                        }
                    }
                });
                return false;
            });
        });
    });
</script>
</html>