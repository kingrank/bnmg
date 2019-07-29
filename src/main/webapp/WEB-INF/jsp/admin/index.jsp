<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common.jsp"%>
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
<body>
    <div style="padding: 0 3% 0 3%;">
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
            <legend>您好</legend>
        </fieldset>
        <shiro:authenticated>
            <label>用户身份验证已通过 </label>
        </shiro:authenticated>
        <!--需要指定property-->
        <%--<shiro:principal/>--%>

        <%--<shiro:principal property="password"/>--%>
    </div>
</body>
<script>

</script>
</html>