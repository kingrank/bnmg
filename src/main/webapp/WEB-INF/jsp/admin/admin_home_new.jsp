<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common.jsp"%>
<html>
<head>
    <title>新百系统管理员后台</title>
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
            border-bottom: 1px #247CFF solid;
        }
        .home-refresh{
            font-size:13px;
        }
        .home-refresh:hover{
            font-size: 13px;
            color: #FF5722;
        }
        /**左侧被选择导航颜色*/
        .layui-nav {
            background-color: #162133;
        }
        .layui-nav-tree .layui-nav-child dd.layui-this, .layui-nav-tree .layui-nav-child dd.layui-this a, .layui-nav-tree .layui-this, .layui-nav-tree .layui-this > a, .layui-nav-tree .layui-this > a:hover {
            background-color: #247CFF;
            color: #fff;
        }
        .layui-nav-tree .layui-nav-bar {
            width: 5px;
            height: 0;
            background-color: #247CFF;
        }
        .layui-nav-tree .layui-nav-item a:hover {
            background-color: #247CFF;
        }
        .layui-nav-itemed {
            border-bottom: 1px #247CFF solid;
        }
        .layui-nav .layui-this::after, .layui-nav-bar, .layui-nav-tree .layui-nav-itemed::after {
            position: absolute;
            height: 5px;
            background-color: #FF5722;
            -webkit-transition: all .2s;
        }
        .layui-nav .layui-nav-child dd.layui-this a, .layui-nav-child dd.layui-this {
            background-color: #247CFF;
            color: #fff;
        }
    </style>
</head>
<body>
<div style="overflow-y: hidden;">
    <div style="text-align: right;" id="top">
        <ul class="layui-nav" style="border-radius: 0px;background: #247CFF;padding: 0 20px 0 0;">
            <div id="homeword" class="layui-nav-item navshowhide" style="cursor: pointer;float: left;width: 80px;text-align: center;font-size: 18px;font-weight: 600;height: 60px;" onmouseover="null">
                <img src="${context}/resource/img/logo@2x.png" style="width: 40px;margin-top:13px">
            </div>
            <li class="layui-nav-item " style="float: left;height: 60px;font-size: 18px;font-weight: 600;">
                新世界百货线上缴费系统
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
            <div style="text-align: center; background: rgb(22, 33, 51) none repeat scroll 0% 0%;" id="cinfo">
               <%-- <img src="${context}/resource/img/L_profile@2x.png" style="width: 40%;margin-top: 17%;">
                <label id="name" style="float: left;width: 100%;text-align: center;color: white;margin-top: 12%;font-size: 11px;">北京总部管理员</label>--%>
            </div>
            <ul class="layui-nav layui-nav-tree" lay-filter="menulist" style="height: 100%;width: 100%;border-radius: 0px;overflow-y: auto;">
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
            <div id="menu-context" class="layui-tab-item layui-show">
                <iframe id="contentiframe" src="${context}/index" style="border: 0px;width: 100%;height: 100%;"></iframe>
            </div>
        </div>
    </div>
</div>
<script src="${context}/resource/layui/layui.all.js" charset="utf-8"></script>
<script src="${context}/resource/js/home/home_new.js" charset="utf-8"></script>
</body>
<script>

</script>
</html>