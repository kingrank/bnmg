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

    <div class="layui-fluid" style="padding: 10px 10px; background-color: #EFF3F6;">

        <div class="layui-card" style="height:30px;font-size:12px;font-weight:400;color:#333333;line-height:30px;padding: 5px 10px;">
            <div class="layui-card-title">
                <span >
                  <a>当前位置：</a>
                  <a href="JavaScript:history.go(-1);">我的账单/</a>
                  <a><cite>2019-8</cite></a>
                </span>
            </div>
        </div>

        <div class="layui-card" style="height:30px;font-size:12px;font-weight:400;color:#333333;line-height:30px;">
            <div class="layui-card-body" style="background-color: #fff;min-height: 1200px;">

                <div class="layui-row" style="background-color: #fff;">

                    <div class="layui-col-sm3">
                        <div class="grid-demo grid-demo-bg1" style="font-size: 14px;color: #666666;">北崇文二期</div>
                        <div class="grid-demo grid-demo-bg1" style="font-size: 31px;color: #182A63;margin-top: 10px;">07-2019</div>
                    </div>
                    <div class="layui-col-sm3" style="float: right;">

                        <div class="layui-row" style="background-color: #fff;">

                            <div class="layui-col-sm3 layui-col-md-offset4">
                                <button type="button" class="layui-btn layui-btn-radius layui-btn-normal xinbai-btn" id="option_to_pay">去缴费  &gt; </button>
                            </div>
                            <div class="layui-col-sm3" style="float: right;">
                                <button type="button" class="layui-btn layui-btn-radius xinbai-btn-back xinbai-btn" onclick="JavaScript:history.go(-1);">返回</button>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color: #fff;width: 100%;margin-top: 15px;">
                    <ul class="layui-tab-title">
                        <li class="layui-this">账单信息</li>
                        <li>缴费记录</li>
                    </ul>
                    <div class="layui-tab-content" style="height: 100px;">
                        <%--账单信息--%>
                        <div class="layui-tab-item layui-show" id="order_detail">
                            账单信息
                        </div>
                        <%--缴费记录--%>
                        <div class="layui-tab-item">
                            <div class="layui-tab-content">

                                <table class="layui-hide" id="test" lay-filter="test"></table>
                                <script type="text/html" id="table_toolbar">
                                    <form class="layui-form" action="">
                                        <div class="layui-row layui-col-space1">
                                            <div class="layui-col-sm4">
                                                <div class="layui-form-item">
                                                    <label class="layui-form-label">缴费时间</label>
                                                    <div class="layui-input-block">
                                                        <input type="text" class="layui-input" id="order_time" placeholder=" ~ ">
                                                        <%--<input type="text" id="order_time_start" name="order_time_start" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">--%>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="layui-col-sm3">
                                                <div class="layui-form-item">
                                                    <label class="layui-form-label xinbai-form-label">开具发票</label>
                                                    <div class="layui-input-block">
                                                        <select id="order_invoice_state" name="order_invoice_state">
                                                            <option value="0">全部</option>
                                                            <option value="1">已开具</option>
                                                            <option value="2">未开具</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="layui-col-sm2">
                                                <div class="layui-form-item">
                                                    <div class="layui-input-block" style="margin-left: 30px;">
                                                        <input type="text" id="order_text" name="order_text" required  lay-verify="required" placeholder="请输入发票号、缴费金额" autocomplete="off" class="layui-input">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="layui-col-sm3">
                                                <div class="layui-form-item">
                                                    <div class="layui-input-block">
                                                        <button class="layui-btn layui-btn-normal layui-btn-sm" lay-event="table_query">查询</button>
                                                        <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm" lay-event="table_reset">重置</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </script>
                                <script type="text/html" id="table_bar">
                                    <a class="layui-btn-xs xinbai_color_normal" lay-event="table_detail">详情</a>
                                </script>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



</body>

<link rel="stylesheet" href="${context}/resource/css/mer_public.css">
<link rel="stylesheet" href="${context}/resource/css/merchant/mer_order_detail.css">
<script src="${context}/resource/js/merchant/mer_order_detail.js" type="text/javascript"></script>
<script src="${context}/resource/js/merchant/mer_order_detail_table.js" type="text/javascript"></script>
<script>

</script>
</html>