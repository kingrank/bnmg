/**
 * 获取本页面url中的参数值
 * */
var getUrlParam = function(name) {
    var url = location.search;
    url = url.substring(url.indexOf("?"));
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for ( var i = 0; i < strs.length; i++) {
            if (name == strs[i].split("=")[0]) {
                return unescape(strs[i].split("=")[1]);
            }
        }
    }
    return "";
}
/**
 * 获取form中的所有数据
 * */
var getFormData = function(formid, filler) {
    form = document.getElementById(formid);
    var data = {};
    for (var i = 0; i < form.length; ++i) {
        var name = form[i].name;
        var value = form[i].value;
        if (name.length == 0)
            continue;
        if (value.length == 0) {
            if ((typeof filler != 'string') || (filler.length == 0))
                continue;
            else
                value = filler;
        }
        var sz = "data."+name+" = '" + value + "'";
        try {
            eval(sz);
        } catch (e) {
            alert(e);
        }
    }
    //alert(JSON.stringify(data));
    return data;
}
//获取当前iframe
function getFrameInParent(){
    var len =  parent.document.getElementsByTagName("iframe").length;
    for(var i = 0; i < len; i++){
        if(parent.document.getElementsByTagName("iframe")[i].contentWindow.document === document){
            return parent.document.getElementsByTagName("iframe")[i];
        }
    }
}
function thisIframeReload(){
    var thisI = getFrameInParent();
    thisI.src = thisI.src;
}
function createFormDom(formid,data,obj_type){
    var content = "<form class=\"layui-form layui-form-pane\" action=\"\" id=\""+formid+"\" method=\"post\">\n" ;
    var pro = CONS[obj_type];
    for(i in data){
        if(pro[i]==undefined){
            continue;
        }
        content = content +"<div style='display:"+(pro[i].show==true?"block":"none")+"' class=\"layui-form-item\">\n" +
            "                <label class=\"layui-form-label\">"+pro[i].title+"</label>\n" +
            "                <div class=\"layui-input-inline\">\n" ;
        if(i=="status"){
            content = content +"<select name=\""+i+"\" lay-verify=\"\">\n" +
                "  <option value=\"0\" "+(data[i]==0?"selected":"")+" >正常</option>\n" +
                "  <option value=\"1\" "+(data[i]==1?"selected":"")+">停用</option>\n" +
                "</select>" ;
        }else{
            content = content +"<input type=\"text\" value=\""+pro[i].format(data[i])+"\"name=\""+i+"\" "+(pro[i].disable==true?"readonly":"")+" lay-verify=\"required\" placeholder=\"请输入\" autocomplete=\"off\" class=\"layui-input\">\n";
        }
        content = content +"</div>\n" +
            "            </div>" ;

    }
    content = content+"</form>";
    return content;
}