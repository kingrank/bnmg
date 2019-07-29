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
    <link rel="stylesheet" href="${context}/resource/layui/layui_ext/dtree/dtree.css">
    <link rel="stylesheet" href="${context}/resource/layui/layui_ext/dtree/font/dtreefont.css">
    <script src="${context}/resource/jquery/jquery.min.js" type="text/javascript"></script>
    <script src="${context}/resource/layui/layui.all.js" type="text/javascript"></script>
    <script src="${context}/resource/util/util.js" type="text/javascript"></script>
    <script src="${context}/resource/util/treeUtil.js" type="text/javascript"></script>
</head>
<body>
<input type="hidden" id="depcode" value="<shiro:principal property="depcode"/>">
    <div class="layui-tab">
        <ul class="layui-tab-title">
            <li class="layui-this">已分配</li>
            <li>未分配</li>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
                <table class="layui-hide" id="test" lay-filter="test"></table>
                <script type="text/html" id="toolbarDemo">
                    <div class="layui-btn-container">
                        <button class="layui-btn layui-btn-sm" lay-event="del">移除</button>
                    </div>
                </script>
            </div>
            <div class="layui-tab-item">
                <table class="layui-hide" id="nouser" lay-filter="nouser"></table>
                <script type="text/html" id="nouserBar">
                    <div class="layui-btn-container">
                        <button class="layui-btn layui-btn-sm" lay-event="add">添加</button>
                    </div>
                </script>
            </div>
        </div>
    </div>

</body>
<script src="${context}/resource/js/sys/role_user.js" type="text/javascript"></script>
<script>

</script>
</html>