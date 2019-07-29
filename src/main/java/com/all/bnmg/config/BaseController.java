package com.all.bnmg.config;

import com.github.pagehelper.Page;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * @author asus
 */
@Controller
public class BaseController {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");// 可以方便地修改日期格式
    SimpleDateFormat dateYMD = new SimpleDateFormat("yyyy-MM-dd");// 可以方便地修改日期格式
    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 设置日期格式
    public Map getRequestParam(HttpServletRequest req){
        Map map = new HashMap();
        Enumeration paramNames = req.getParameterNames();
        while (paramNames.hasMoreElements()) {
            String paramName = (String) paramNames.nextElement();

            String[] paramValues = req.getParameterValues(paramName);
            if (paramValues.length == 1) {
                String paramValue = paramValues[0];
                if (paramValue.length() != 0) {
                    map.put(paramName, paramValue);
                }
            }
        }
        return map;
    }
    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
    }

    public Map<String,Object> resMap(int status,Object data){
        Map<String,Object> res = new HashMap<String,Object>();
        res.put("status",status);
        res.put("data",data);
        return res;
    }
    public Map<String,Object> resMap(){
        Map<String,Object> res = new HashMap<String,Object>();
        return res;
    }
    public Map<String,Object> resMap(Object data){
        Map<String,Object> res = new HashMap<String,Object>();
        res.put("status",0);
        res.put("data",data);
        return res;
    }
    public Map<String,Object> resMap(int status,Page page){
        Map<String,Object> res = new HashMap<String,Object>();
        res.put("status",status);
        res.put("total",page.getTotal());
        res.put("data",page.getResult());
        return res;
    }
    public Map<String,Object> resMap(Page page){
        Map<String,Object> res = new HashMap<String,Object>();
        res.put("status",0);
        res.put("total",page.getTotal());
        res.put("data",page.getResult());
        return res;
    }
    public Map<String,Object> resMap(int status,String msg){
        Map<String,Object> res = new HashMap<String,Object>();
        res.put("status",status);
        res.put("msg",msg);
        return res;
    }
    public Map<String,Object> resMap(String msg){
        Map<String,Object> res = new HashMap<String,Object>();
        res.put("status",1);
        res.put("msg",msg);
        return res;
    }
}
