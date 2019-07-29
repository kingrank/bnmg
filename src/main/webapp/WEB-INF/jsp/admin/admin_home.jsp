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
    <style>
        .layui-tab-title .layui-this {
            color: #fff;
            background: #009688;
        }
        .navshow{
            position: absolute;
            z-index: 11111111;
            width: 120px !important;
        }
        .layui-nav-itemed{
            border-bottom: 1px #009688 solid;
        }
        .home-refresh{
            font-size:13px;
        }
        .home-refresh:hover{
            font-size: 13px;
            color: #FF5722;
        }
    </style>
</head>
<body>
<div style="overflow-y: hidden;">
    <div style="text-align: right;" id="top">
        <ul class="layui-nav" style="border-radius: 0px;background: #282b33;padding: 0 20px 0 0;">
            <div id="homeword" class="layui-nav-item" style="float: left;width: 10%;text-align: center;font-size: 18px;font-weight: 600;height: 60px;" onmouseover="null">
                后台管理系统
            </div>
            <li class="layui-nav-item navshowhide" style="float: left;height: 60px;">
                <i class="layui-icon layui-icon-app" lay- style="font-size: 30px; color: #009688;cursor: pointer;"></i>
            </li>
            <li class="layui-nav-item">
                <a href="javascript:;" class="userinfo" data-tabtype="edit" data-url="/index" data-id="user-control">控制台<span class="layui-badge ">9</span></a>
            </li>
            <li class="layui-nav-item">
                <a href="javascript:;" class="userinfo" data-tabtype="edit" data-url="/index" data-id="user-center">个人中心<span class="layui-badge-dot"></span></a>
            </li>
            <li class="layui-nav-item">
                <a href="javascript:;"><img src="//t.cn/RCzsdCq" class="layui-nav-img">我</a>
                <dl class="layui-nav-child">
                    <dd><a href="javascript:;" class="userinfo" data-tabtype="edit" data-url="/index" data-id="user-infoedit">修改信息</a></dd>
                    <dd><a href="javascript:;" class="userinfo" data-tabtype="logout">退了</a></dd>
                </dl>
            </li>
        </ul>
    </div>
    <div id="buttom">
        <div style="width: 10%;float:  left;" id="buttomleft">
            <ul class="layui-nav layui-nav-tree" lay-filter="menulist" style="height: 100%;width: 100%;border-radius: 0px;">
                <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
                <c:forEach var="nav" items="${mlist}">
                    <c:choose>
                        <c:when test="${nav.isp==1}">
                            <li class="layui-nav-item ${nav.isopen==0?'':'layui-nav-itemed'}">
                                <a href="javascript:;">${nav.name}</a>
                                <dl class="layui-nav-child">
                                    <c:forEach var="nav_c" items="${nav.chird}">
                                        <c:if test="${nav_c.isp==0}">
                                            <dd><a class="menua" data-id="${nav_c.id}" data-url="${nav_c.url}" data-type="tabAdd" href="javascript:;">${nav_c.name}</a></dd>
                                        </c:if>
                                    </c:forEach>
                                </dl>
                            </li>
                        </c:when>
                        <c:otherwise>
                            <li class="layui-nav-item"><a class="menua" data-type="tabAdd" data-id="${nav.id}" data-url="${nav.url}" href="javascript:;">${nav.name}</a></li>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
            </ul>
        </div>
        <div style="float:  left;width: 90%;text-align:  right;" id="buttomright">
            <div>
                <div class="layui-tab" lay-filter="menutable" lay-allowclose="true" style="margin: 0px;">
                    <ul class="layui-tab-title" style="background: #f8f8f8;">
                        <li class="layui-this" lay-id="0">首页</li>
                    </ul>
                    <div class="layui-tab-content" style="padding: 0px;">
                        <div id="menu-context" class="layui-tab-item layui-show">
                            <iframe src="${context}/index" style="border: 0px;width: 100%;height: 100%;"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="${context}/resource/layui/layui.all.js" charset="utf-8"></script>
<script src="${context}/resource/js/home/home.js" charset="utf-8"></script>
</body>
<script>

</script>
</html>