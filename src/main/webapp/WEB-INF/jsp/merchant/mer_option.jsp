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
                操作日志
            </div>

            <div class="layui-card-body">
                <div class="layui-tab-content">

                    <table class="layui-hide" id="test" lay-filter="test"></table>
                    <script type="text/html" id="table_toolbar">
                        <form class="layui-form" action="">
                            <div class="layui-row layui-col-space1">
                                <div class="layui-col-sm3">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label">起始时间</label>
                                        <div class="layui-input-block">
                                            <input type="text" class="layui-input" id="start_time" placeholder="选择起始时间">
                                        </div>
                                    </div>
                                </div>
                                <div class="layui-col-sm3">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label">结束时间</label>
                                        <div class="layui-input-block">
                                            <input type="text" class="layui-input" id="end_time" placeholder="选择结束时间">
                                        </div>
                                    </div>
                                </div>
                                <div class="layui-col-sm3">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label xinbai-form-label">类型</label>
                                        <div class="layui-input-block">
                                            <select id="option_type" name="option_type">
                                                <option value="0">全部</option>
                                                <option value="1">A</option>
                                                <option value="2">B</option>
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
                </div>


            </div>
        </div>
    </div>



</body>

<link rel="stylesheet" href="${context}/resource/css/mer_public.css">
<link rel="stylesheet" href="${context}/resource/css/merchant/mer_option.css">
<script src="${context}/resource/js/merchant/mer_option_table.js" type="text/javascript"></script>
<script>

</script>
</html>