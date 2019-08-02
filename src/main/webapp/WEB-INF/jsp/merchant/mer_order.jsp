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
<body>
<input type="hidden" id="depcode" value="<shiro:principal property="depcode"/>">

    <div class="layui-fluid" style="padding: 10px;padding-bottom: 5px; background-color: #F2F2F2;">
        <div class="layui-row layui-col-space5">
            <div class="layui-col-sm3">
                <div class="layui-card">
                    <div class="layui-card-body">
                        <table class="layui-table" lay-skin="nob">
                            <colgroup>
                                <col width="200">
                            </colgroup>
                            <tbody style="font-size:18px;">
                            <tr style="color: #757575;">
                                <td>本期账单（总计）</td>
                            </tr>
                            <tr aria-rowspan="2">
                                <td style="color: #247CFF;">
                                    <span style="font-size: 36px;font-weight: bold;" id="order_total">50000.00</span>
                                    元
                                </td>
                            </tr>
                            <tr>
                                <td style="height: 15px;line-height: 15px;">
                                    <button type="button" class="layui-btn layui-btn-danger layui-btn-xs xinbai-btn-small" id="order_state">未交齐</button>
                                    <span style="font-size: 12px;" id="order_state_date">截止日期：2019-07-31</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="layui-col-sm9">
                <div class="layui-card">
                    <div class="layui-card-body">
                        <div class="layui-row layui-col-space30">
                            <div class="layui-col-sm3">
                                <table class="layui-table" lay-skin="nob">
                                    <colgroup>
                                        <col width="200">
                                    </colgroup>
                                    <tbody style="font-size:18px;">
                                    <tr style="color: #757575;">
                                        <td>固定费用</td>
                                    </tr>
                                    <tr aria-rowspan="2">
                                        <td>
                                            <span style="font-size: 36px;font-weight: bold;" id="order_total_1">20000.00</span>
                                            元
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height: 15px;line-height: 15px;">
                                            <button type="button" class="layui-btn layui-btn-danger xinbai_bg_color_success layui-btn-xs xinbai-btn-small" id="order_state_1">已缴费</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="layui-col-sm3">
                                <table class="layui-table" lay-skin="nob">
                                    <colgroup>
                                        <col width="200">
                                    </colgroup>
                                    <tbody style="font-size:18px;">
                                    <tr style="color: #757575;">
                                        <td>管理费</td>
                                    </tr>
                                    <tr aria-rowspan="2">
                                        <td>
                                            <span style="font-size: 36px;font-weight: bold;" id="order_total_2">25000.00</span>
                                            元
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height: 15px;line-height: 15px;">
                                            <button type="button" class="layui-btn layui-btn-danger layui-btn-xs xinbai-btn-small" id="order_state_2">未交齐</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="layui-col-sm3">
                                <table class="layui-table" lay-skin="nob">
                                    <colgroup>
                                        <col width="200">
                                    </colgroup>
                                    <tbody style="font-size:18px;">
                                    <tr style="color: #757575;">
                                        <td>费用</td>
                                    </tr>
                                    <tr aria-rowspan="2">
                                        <td>
                                            <span style="font-size: 36px;font-weight: bold;" id="order_total_3">5000.00</span>
                                            元
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height: 15px;line-height: 15px;">
                                            <button type="button" class="layui-btn layui-btn-danger layui-btn-xs xinbai_bg_color_danger xinbai-btn-small" id="order_state_3">未缴费</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="layui-col-sm3">
                                <div class="layui-row">
                                    <div class="layui-col-sm2"></div>
                                    <div class="layui-col-sm10 layui-col-md-offset4" style="margin-top: 45px;">
                                        <button type="button" class="layui-btn layui-btn-normal layui-btn-radius" id="option_to_pay3">去缴费(未拆分) &gt; </button>
                                        <%--
                                        <button type="button" class="layui-btn layui-btn-normal layui-btn-radius">去缴费(已拆分) &gt; </button>
                                        <button type="button" class="layui-btn layui-btn-normal layui-btn-radius">去缴费(二次拆分) &gt; </button>
                                        --%>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="layui-tab">

        <div class="layui-card">
            <div class="layui-card-header" style="color: #182A63;font-size: 16px;font-weight: bold;">历史账单</div>
        </div>

        <div class="layui-tab-content">

            <table class="layui-hide" id="test" lay-filter="test"></table>
            <script type="text/html" id="table_toolbar">
                <form class="layui-form" action="">
                    <div class="layui-row layui-col-space5">
                        <%--
                        <div class="layui-col-sm3">
                            <div class="layui-form-item">
                                <label class="layui-form-label">输入框</label>
                                <div class="layui-input-block">
                                    <input type="text" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                        </div>
                        --%>
                        <div class="layui-col-sm3">
                            <div class="layui-form-item">
                                <label class="layui-form-label xinbai-form-label">选择账期</label>
                                <div class="layui-input-block">
                                    <select id="order_date" name="order_date">
                                        <option value="">全部</option>
                                        <option value="0">2019-01</option>
                                        <option value="1">2019-03</option>
                                        <option value="2">2019-04</option>
                                        <option value="3">2019-05</option>
                                        <option value="4">2019-06</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="layui-col-sm3">
                            <div class="layui-form-item">
                                <label class="layui-form-label xinbai-form-label">缴费状态</label>
                                <div class="layui-input-block">
                                    <select id="order_pay_state" name="order_pay_state">
                                        <option value="0">全部</option>
                                        <option value="1">已缴费</option>
                                        <option value="2">未交齐</option>
                                        <option value="3">未缴费</option>
                                    </select>
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

</body>

<link rel="stylesheet" href="${context}/resource/css/mer_public.css">
<link rel="stylesheet" href="${context}/resource/css/merchant/mer_order.css">
<script src="${context}/resource/js/merchant/mer_order.js" type="text/javascript"></script>
<script src="${context}/resource/js/merchant/mer_order_table.js" type="text/javascript"></script>
<script>

</script>
</html>