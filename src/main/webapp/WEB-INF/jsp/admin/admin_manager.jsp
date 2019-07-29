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
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
            <legend>人员管理</legend>
        </fieldset>
        <div class="layui-tab-content">
                <table class="layui-hide" id="test" lay-filter="test"></table>
                <script type="text/html" id="toolbarDemo">
                    <div class="layui-btn-container">
                        <button class="layui-btn layui-btn-sm layui-btn-danger" lay-event="del">删除</button>
                        <button class="layui-btn layui-btn-sm" lay-event="add">添加</button>
                        <button class="layui-btn layui-btn-sm layui-btn-warm" lay-event="updateDepart">部门变更</button>
                    </div>
                </script>
                <script type="text/html" id="barDemo">
                    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="auth">权限管理</a>
                </script>
        </div>
    </div>

</body>
<script src="${context}/resource/js/admin/admin_manager.js" type="text/javascript"></script>
<script>

</script>
</html>