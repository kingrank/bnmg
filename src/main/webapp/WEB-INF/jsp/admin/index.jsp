<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <title>组织架构</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="description" content="主页">
    <link rel="stylesheet" type="text/css" href="${context}/resource/layui/css/layui.css">
    <link rel="stylesheet" href="${context}/resource/layui/layui_ext/dtree/dtree.css">
    <link rel="stylesheet" href="${context}/resource/layui/layui_ext/dtree/font/dtreefont.css">
    <link rel="stylesheet" href="${context}/resource/css/main.css">
    <script src="${context}/resource/jquery/jquery.min.js" type="text/javascript"></script>
    <script src="${context}/resource/layui/layui.all.js" type="text/javascript"></script>
    <script src="${context}/resource/util/treeUtil.js" type="text/javascript"></script>
</head>
<style>

</style>
<body>
<div id="web" style="float: left; width: 100%;/*background: #f2f2f2;*/">
    <div style="float: left;width: 98%;margin: 1%;background: white;/*height: 96%;*/">
        <div style="width: 20%;overflow: auto;float: left;" id="toolbartree">
            <ul id="tree" class="dtree" data-id="0"></ul>
        </div>
        <div style="width: 80%;overflow: auto;float: left;text-align: center;">
            <label class="index-title-lable" style="padding-left: 1%;width: 99%;">香港店<span style="float: right;">更多</span> </label>
            <div style="width: 98%; text-align: center;float: left;margin-left: 1%;">
                <label class="index-title-lable">系统商户数据</label>
                <div class="index-div ">
                    <div class="info-tr wd40">
                        <div class="info-td" style="width: 33%">
                            <tableView number="300" title="系统商户数"></tableView>
                        </div>
                        <div class="info-td" style="width: 33%">
                            <tableView number="280" title="本月已缴费"></tableView>
                        </div>
                        <div class="info-td" style="width: 33%">
                            <tableView number="20" title="本月未缴费" numberstyle="color:#EA5040"></tableView>
                        </div>
                    </div>
                    <div class="info-tr wd60">
                        <div class="info-td" style="width: 25%">
                            <tableView number="8" title="逾期7天商户" isline="border-left:1px #e3e3e3 solid" numberstyle="color:#247CFF"></tableView>
                        </div>
                        <div class="info-td" style="width: 25%">
                            <tableView number="5" title="逾期14天商户" numberstyle="color:#F39800"></tableView>
                        </div>
                        <div class="info-td" style="width: 25%">
                            <tableView number="3" title="逾期21天商户" numberstyle="color:#EA5040"></tableView>
                        </div>
                        <div class="info-td" style="width: 25%">
                            <tableView number="1" title="特殊原因逾期"></tableView>
                        </div>
                    </div>
                </div>
                <label class="index-title-lable">本月缴费数据</label>
                <div class="index-div ">
                    <temptwo title="本月应收金额" number="20000" numberstyle="color:#247CFF"></temptwo>
                    <temptwo title="本月实收金额" number="15800" numberstyle="color:#FD661C" tablestyle="border-left: 1px #DDDFE2 solid;"></temptwo>
                </div>

                <label class="index-title-lable">历史缴费数据</label>
                <div class="index-div">
                    <temptwo title="累计应收金额" number="1975557"></temptwo>
                    <temptwo title="累计实收金额" number="1897522" tablestyle="border-left: 1px #DDDFE2 solid;"></temptwo>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="${context}/resource/util/vue.js" type="text/javascript"></script>
<script>
    var Table ={
        template:'<table :style="isline"><tr><td :style="numberstyle">{{number==null?"无数量":number}}</td></tr><tr><td>{{title==null?"无标题":title}}</td></tr><tr><td><button type="button" onclick="forward(1)">查看详情</button></td></tr></table>',
        props: ['number','numberstyle','title','type','isline']
    }
    var TempTwo = {
        template:'<div class="info-tr wd50 style1"><div class="info-td"><table :style="tablestyle"><tr><td><span :style="numberstyle">{{number==null?"无数量":number}}</span>元</td></tr><tr><td>{{title==null?"":title}}</td></tr></table></div><div class="rightdiv"><table><tr><td> 固定：</td> <td>{{guding==null?"无":guding}}</td></tr><tr><td>管理费：</td> <td>{{guanlifei==null?"无":guanlifei}}</td></tr><tr><td>费用：</td> <td>{{feiyong==null?"无":feiyong}}</td></tr></table></div></div>',
        props: ['title','number','numberstyle','guding','guanlifei','feiyong','tablestyle']
    }
    var web = new Vue({
        el: '#web',
        components: {
            tableview: Table,
            temptwo:TempTwo
        },
        data: {

        }
    });
</script>
</body>
<script>
    function forward(type){
        window.location.href = context+"/jump?page=admin/bill_list&type"+type;
    }
    $(function(){
        createDepTree("tree",function(data){
            alert();
        });

    });
</script>
</html>