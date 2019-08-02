package com.all.bnmg.control;

import com.all.bnmg.config.BaseController;
import com.all.bnmg.entity.*;
import com.all.bnmg.service.*;
import com.all.bnmg.util.Constant;
import com.all.bnmg.util.MapToEnity;
import com.github.pagehelper.Page;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName MerOrderController
 * @Description: TODO 商户端控制器
 * @Author 宋鹏
 * @Date 2019-8-2 11:47:04
 * @Version V1.0
 **/
@Controller
public class MerOrderController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 跳转商户账单明细管理界面
     * */
    @RequestMapping(value = "/mer/order/order_datail")
    public String editAuthOther(HttpServletRequest req,Model model){
        model.addAllAttributes(this.getRequestParam(req));
        return  "merchant/mer_order_datail";
    }

}
