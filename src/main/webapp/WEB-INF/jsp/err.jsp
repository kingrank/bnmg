<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="common.jsp"%>
<html>
<head>
    <title>出错了！</title>
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
<body style="background: #f1f1f1;">
<div style="width: 80%;text-align:  center;margin: 5% 10%;font-size:  40px;color: #009688;">
    <i class="layui-icon layui-icon-face-surprised" style="font-size: 150px; color: #F2773E;"></i>
    哎呀出错了
    <div style="background:  white;padding: 2% 4%;color: #5f5f5f;font-size: 18px;">
        ${err}
    </div>
    <button class="layui-btn" style="margin:50px;" onclick="window.history.go(-1)">返回</button>
</div>


</body>
<script>

</script>
</html>