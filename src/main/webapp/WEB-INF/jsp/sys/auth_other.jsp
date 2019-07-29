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
    <script src="${context}/resource/js/sys/auth.js" type="text/javascript"></script>
</head>
<body>
    <div class="layui-tab">
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
            <legend>当前选择权限：<label id="departname" style="color:#009688">未选择权限</label></legend>
        </fieldset>
        <ul class="layui-tab-title">
            <li class="layui-this">人员操作</li>
            <shiro:hasPermission name="100002002">
                <li id="roleEdit">角色操作</li>
            </shiro:hasPermission>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
                <table class="layui-hide" id="test" lay-filter="test"></table>
                <script type="text/html" id="toolbarDemo">
                    <div class="layui-btn-container">
                       <%-- <button class="layui-btn layui-btn-sm" lay-event="getCheckData">获取选中行数据</button>
                        <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">获取选中数目</button>--%>
                        <button class="layui-btn layui-btn-sm" lay-event="removeUser">移除</button>
                        <button class="layui-btn layui-btn-sm" lay-event="addUser">添加</button>
                    </div>
                </script>
                <%--<script type="text/html" id="barDemo">
                    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                </script>--%>
            </div>
            <div class="layui-tab-item">
                <table class="layui-hide" id="test2" lay-filter="test2"></table>
                <script type="text/html" id="toolbarDemo2">
                    <div class="layui-btn-container">
                       <%-- <button class="layui-btn layui-btn-sm" lay-event="getCheckData">获取选中行数据</button>
                        <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">获取选中数目</button>
                        <button class="layui-btn layui-btn-sm" lay-event="isAll">验证是否全选</button>--%>
                           <button class="layui-btn layui-btn-sm" lay-event="removeRole">移除</button>
                           <button class="layui-btn layui-btn-sm" lay-event="addRole">添加</button>
                    </div>
                </script>
                <%--<script type="text/html" id="barDemo2">
                    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
                    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                </script>--%>
            </div>
        </div>
    </div>

</body>
<script src="${context}/resource/js/sys/auth_other.js" type="text/javascript"></script>
<script>

</script>
</html>