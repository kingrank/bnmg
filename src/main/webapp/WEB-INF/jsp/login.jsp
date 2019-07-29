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
    .layui-form-pane .layui-form-checkbox {
        margin: 4px 0 4px 0px;
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
<body>
    <div style="padding: 0 3% 0 3%;">
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
            <legend>用户登录</legend>
        </fieldset>
        <form class="layui-form layui-form-pane" action="" id="" method="post">
            <div class="layui-form-item">
                <label class="layui-form-label">用户名</label>
                <div class="layui-input-inline">
                    <input type="text" name="username" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">密码</label>
                <div class="layui-input-inline">
                    <input type="password" name="password" placeholder="请输入密码" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <input type="checkbox" name="remeberMe" title="记住我">
                <label id="err" style="font-size:11px;color:red"></label>
            </div>
            <div class="layui-form-item">
                <button class="layui-btn" lay-submit="" lay-filter="formDemo" id="login" type="button">登录</button>

            </div>
        </form>
    </div>
</body>
<script>

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