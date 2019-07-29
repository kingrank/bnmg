package com.all.bnmg.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
class MainsiteErrorController implements ErrorController {
    @Autowired
    private ErrorAttributes errorAttributes;
    @RequestMapping("/error")
    public String handleError(HttpServletRequest request,Model model){
        //获取statusCode:401,404,500
        errorAttributes.toString();
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        Exception msg = (Exception) request.getAttribute("javax.servlet.error.exception");
        if(msg!=null){
            String err_msg = statusCode+"==》"+
                    msg==null?"":(msg.getCause().getMessage().replaceAll(">","》").replaceAll("<","《"))+
                    "</br>"+
                    msg==null?"":(msg.getLocalizedMessage().replaceAll(">","》").replaceAll("<","《"));
            model.addAttribute("err",err_msg);
        }else{
            model.addAttribute("err",statusCode);
        }

        System.out.println(msg==null?"":msg.getCause().getMessage());
        System.out.println(msg==null?"":msg.getMessage());
        System.out.println(msg==null?"":msg.getLocalizedMessage());
        if(statusCode == 401){
            return "/err";
        }else if(statusCode == 404){
            return "/err";
        }else if(statusCode == 403){
            return "/err";
        }else{
            return "/err";
        }

    }
    @Override
    public String getErrorPath() {
        return "/err";
    }
}