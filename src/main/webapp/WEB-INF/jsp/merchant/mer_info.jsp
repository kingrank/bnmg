<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common.jsp"%>
<html>
<head>
    <title>商户管理</title>
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
<body style="background-color: #EFF3F6">
<input type="hidden" id="depcode" value="<shiro:principal property="depcode"/>">

    <div class="layui-fluid" style="padding: 0px 10px; background-color: #EFF3F6;">

        <div class="layui-card" style="background-color: #fff;height:90%;font-size:12px;font-weight:400;color:#333333;line-height:30px;">

            <div class="layui-card-header"  style="font-size: 24px;color: #182A63;margin-top: 10px;">
                商户信息
            </div>

            <div class="layui-card-body" style="font-size: 20px;">

                <div class="layui-row">
                    <div class="layui-col-sm2" style="color: #8894B2;text-align: right;"> 商铺号： </div>
                    <div class="layui-col-sm8"> L01F002，L02F001，L02F002，L02F003，L02F004 </div>
                </div>

                <div class="layui-row">
                    <div class="layui-col-sm2" style="color: #8894B2;text-align: right;"> 商户名称：</div>
                    <div class="layui-col-sm8"> 汉堡王(北京)餐饮管理有限公司 </div>
                </div>

                <div class="layui-row">
                    <div class="layui-col-sm2" style="color: #8894B2;text-align: right;"> 商户品牌：</div>
                    <div class="layui-col-sm8"> 汉堡王 </div>
                </div>

                <div class="layui-row">
                    <div class="layui-col-sm2" style="color: #8894B2;text-align: right;"> 商户负责人：</div>
                    <div class="layui-col-sm8"> 张斌 </div>
                </div>

                <div class="layui-row">
                    <div class="layui-col-sm2" style="color: #8894B2;text-align: right;"> 联系方式：</div>
                    <div class="layui-col-sm8"> 186123456789 </div>
                </div>

            </div>
        </div>
    </div>



</body>

<link rel="stylesheet" href="${context}/resource/css/mer_public.css">
<link rel="stylesheet" href="${context}/resource/css/merchant/mer_info.css">
<script src="${context}/resource/js/merchant/mer_info.js" type="text/javascript"></script>
<script>

</script>
</html>