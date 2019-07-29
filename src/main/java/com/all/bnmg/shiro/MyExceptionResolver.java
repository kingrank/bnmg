package com.all.bnmg.shiro;
 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
 
public class MyExceptionResolver implements HandlerExceptionResolver{
 
    @Override
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response, Object handler, Exception ex) {
        System.out.println("==============异常开始=============");
        //如果是shiro无权操作，因为shiro 在操作auno等一部分不进行转发至无权限url
        if(ex instanceof UnauthorizedException){
            // 跳转到 templates 文件下面找 err.html 页面
            ModelAndView mv = new ModelAndView("err");
            mv.addObject("err", ex.toString().replaceAll("\n", "<br/>"));
            return mv;
        }
        ex.printStackTrace();
        ModelAndView mv = new ModelAndView("err");
        mv.addObject("err", ex.toString().replaceAll("\n", "<br/>"));
        return mv;
    }
}