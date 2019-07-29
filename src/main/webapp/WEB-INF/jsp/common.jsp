<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page autoFlush="true" buffer="1094kb"%>
<%@ page isELIgnored ="false" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags"  prefix="spring" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<%
    String context=request.getContextPath();
    request.setAttribute("context", context);
%>
<script type="text/javascript">
    var context = "<%=context%>";
</script>
<head>
    <link rel="stylesheet" type="text/css" href="${context}/resource/layui/css/layui.css">
    <script src="${context}/resource/jquery/jquery.min.js" type="text/javascript"></script>
    <script src="${context}/resource/util/constant.js" type="text/javascript"></script>
    <script src="${context}/resource/util/jQuery.resizeEnd.js" type="text/javascript"></script>
    <script src="${context}/resource/util/util.js" type="text/javascript"></script>
</head>