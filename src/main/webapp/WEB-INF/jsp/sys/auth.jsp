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
    <script src="${context}/resource/js/sys/auth.js" type="text/javascript"></script>
</head>
<body>
<div style="padding: 0 3% 0 3%;">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
        <legend>权限管理</legend>
    </fieldset>
    <div style="width: 25%;overflow: auto;float: left;" id="toolbartree">
        <ul id="tree" class="dtree" data-id="0"></ul>
    </div>
    <div style="width: 75%;overflow: auto;float: left;text-align: center;">
        <iframe id="treeiframe"  style="border: 0px #4f8383 solid;width: 90%;height: 80%;margin: auto;"></iframe>
    </div>
</div>
</body>
<script>
    //结构树
    var DemoTree;
    var treeData;
    $(function(){
        $.ajax({
            async : true,
            cache : false,
            type : 'POST',
            url : '/getAuthTree',// 请求的action路径
            data : {isshow:true},
            error : function(XMLHttpRequest, textStatus, errorThrown) {// 请求失败处理函数
                alert("操作异常!");
            },
            success : function(data) {
                if(data.status==0){
                    treeData  = data.data;
                    createTree(data.data,"tree");
                }else{
                    alert(data.msg)
                }
            }
        });

    });
</script>
</html>