<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <title>账单列表</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="description" content="账单 列表">
    <link rel="stylesheet" type="text/css" href="${context}/resource/layui/css/layui.css">
    <link rel="stylesheet" href="${context}/resource/layui/layui_ext/dtree/dtree.css">
    <link rel="stylesheet" href="${context}/resource/layui/layui_ext/dtree/font/dtreefont.css">
    <link rel="stylesheet" href="${context}/resource/css/main.css">
    <script src="${context}/resource/jquery/jquery.min.js" type="text/javascript"></script>

    <script src="${context}/resource/util/treeUtil.js" type="text/javascript"></script>
</head>
<style>

</style>
<body style="background: #EEE;">
<div id="web" style="width: 98%;margin: auto;">
    <title-div :items="list"></title-div>
    <div style="margin-top: 20px;line-height: 35px;padding-left: 1%;background: white;padding-bottom: 20px;">
        <label style="font-size: 18px;font-weight: 600;">本月未缴费账单</label>
        <hr>
        <form class="layui-form" action="">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">选择状态</label>
                    <div class="layui-input-inline">
                        <select name="interest" lay-filter="aihao">
                            <option value=""></option>
                            <option value="0">写作</option>
                            <option value="1" selected="">阅读</option>
                            <option value="2">游戏</option>
                            <option value="3">音乐</option>
                            <option value="4">旅行</option>
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                    </div>
                    <button type="button" class="layui-btn layui-btn-normal">查询</button>
                </div>
            </div>
        </form>
        <table class="layui-hide" id="test" style="margin-bottom: 20px;"></table>
    </div>
</div>
<script src="${context}/resource/util/vue.js" type="text/javascript"></script>
<script src="${context}/resource/js/component/title-div.js" type="text/javascript"></script>
<script>
    var web = new Vue({
        el: '#web',
        components: {
            "title-div": Title
        },
        data: {
            list: [
                { key: '首页' },
                { key: '本页未缴费账单',last:true }
            ]
        }
    });
</script>
</body>
<script src="${context}/resource/layui/layui.all.js" type="text/javascript"></script>
<script>
    layui.use(['element','table'], function(){
        var element = layui.element;
        var table = layui.table;

        table.render({
            elem: '#test'
            ,data: [{
            "id": "10001"
            ,"username": "杜甫"
            ,"email": "xianxin@layui.com"
            ,"sex": "男"
            ,"city": "浙江杭州"
            ,"sign": "人生恰似一场修行"
            ,"experience": "116"
            ,"score": "192.168.0.8"
            ,"classify": "108"
            ,"wealth": "2016-10-14"
            ,"user": "2016-10-14"
            ,"usertel": "2016-10-14"
            ,"status": "2016-10-14"
        }]
            ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
                //,curr: 5 //设定初始在第 5 页
                ,groups: 1 //只显示 1 个连续页码
                ,first: false //不显示首页
                ,last: false //不显示尾页

            }
            ,cols: [[
                {field:'id', title: '序号', sort: true}
                ,{field:'username', title: '商户号'}
                ,{field:'sex', title: '商户名称', sort: true}
                ,{field:'city', title: '商户品牌'}
                ,{field:'sign', title: '账期', minWidth: 150}
                ,{field:'experience', title: '固定', sort: true}
                ,{field:'score', title: '管理费', sort: true}
                ,{field:'classify', title: '费用'}
                ,{field:'wealth', title: '总额', sort: true}
                ,{field:'user', title: '负责人', sort: true}
                ,{field:'usertel', title: '联系方式', sort: true}
                ,{field:'status', title: '状态', sort: true}
            ]]

        });
    });
    $(function(){

    });
</script>
</html>