package com.all.bnmg.config;

import com.all.bnmg.annotation.CacheUtil;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import java.lang.reflect.Method;
@Aspect
@Component
public class CacheAspect {
    @Pointcut("@annotation(com.all.bnmg.annotation.CacheUtil)" )
    public void addAdvice(){}
    @Before("addAdvice()")
    public void before(JoinPoint joinPoint){
        MethodSignature sign =  (MethodSignature)joinPoint.getSignature();
        Method method = sign.getMethod();
        CacheUtil annotation = method.getAnnotation(CacheUtil.class);
        System.out.println("打印：" + annotation.value() + " 开始前");
        //System.out.println("===开始前===");
     }

    @After("addAdvice()")
    public void after() {
        System.out.println("after方法执行后");
    }
}