package com.all.bnmg.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * 日志切面类
 */
@Aspect
@Component
public class LogAspect {

    private final static Logger logger = LoggerFactory.getLogger(LogAspect.class);
    private Gson gson = new Gson();
    // ..表示包及子包 该方法代表controller层的所有方法
    @Pointcut("execution(public * com.all.bnmg.control..*.*(..))")
    public void controllerMethod() {
    }


    @Before("controllerMethod()")
    public void LogRequestInfo(JoinPoint joinPoint) throws Exception {

        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        StringBuffer requestLog = new StringBuffer();
        logger.info("=============== 请求内容 begin =============");
        requestLog.append("\n请求信息：\n")
                  .append("请求路径 = {" + request.getRequestURI() + "},\n")
                  .append("请求类型 = {" + request.getMethod() + "},\n")
                  .append("网络地址 = {" + request.getRemoteAddr() + "},\n")
                  .append("方法路径 = {" + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName() + "},\n");

        if(joinPoint.getArgs().length == 0) {
            requestLog.append("请求参数 = {} ");
        } else {
            try{
                Object[] args = joinPoint.getArgs();
                requestLog.append("请求参数 =");
                for (int i = 0; i < args.length; i++) {
                    if(args[i] instanceof ShiroHttpServletRequest){
                        ShiroHttpServletRequest req = (ShiroHttpServletRequest)args[i];
                        requestLog.append("HttpServletRequest中的参数"+getRequestParam(req).toString());
                    }else{
                        requestLog.append(args[i]);
                    }
                }
              /*  requestLog.append("请求参数 = " + new ObjectMapper().setSerializationInclusion(JsonInclude.Include.NON_NULL)
                        .writeValueAsString(joinPoint.getArgs()[0]) + "");*/
            }catch (Exception e){
                logger.info("获取参数异常：\n"+e.getLocalizedMessage());

            }

        }

        logger.info(requestLog.toString());
        logger.info("=============== 请求内容 end ===============");
    }


    @AfterReturning(returning = "res", pointcut = "controllerMethod()")
    public void logResultInfo(Object res) throws Exception {
        logger.info("=============== 返回内容 begin =============");
        logger.info("Response内容:"+gson.toJson(res));
        logger.info("=============== 返回内容 end ===============");
    }
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
}
