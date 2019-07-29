package com.all.bnmg.control;

import com.all.bnmg.config.BaseController;
import com.all.bnmg.entity.Admin;
import com.all.bnmg.service.MenuService;
import com.all.bnmg.service.UserService;
import com.all.bnmg.util.EHCacheUtils;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author asus
 */
@Controller
@RequestMapping(value={"/admin"})
public class AdminController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private UserService userService;
    @Autowired
    private MenuService menuService;
    /**
     * 根据用户名获取用户信息
     * */
    @RequestMapping(value={"/getUser"}, method= RequestMethod.POST)
    @ResponseBody
    public Admin getUser(HttpServletRequest req){
        Admin admin = userService.getUserInfo(req.getParameter("username"));
        return admin;
    }
    /**
     * 添加管理员或商户
     * */
    @RequestMapping(value={"/addUser"}, method= RequestMethod.POST)
    @ResponseBody
    public Map addUser(HttpServletRequest req,Admin admin){
        long res = userService.addUser(admin);
        return resMap((res>0?0:1),"操作完成");
    }
    /**
     * 修改管理员或商户
     * */
    @RequestMapping(value={"/updateUser"}, method= RequestMethod.POST)
    @ResponseBody
    public Map updateUser(HttpServletRequest req){
        Map param = this.getRequestParam(req);
        long res = userService.updateUser(param);
        return resMap((int)res,"");
    }
    /**
     * 删除管理员或商户
     * */
    @RequestMapping(value={"/delUser"}, method= RequestMethod.POST)
    @ResponseBody
    public Map delUser(HttpServletRequest req){
        long res = userService.batchDelete(req.getParameter("userNames"));
        return resMap((res>0?0:1),"操作完成");
    }
    /**
     * 根据用户名获取用户信息
     * */
    @RequestMapping(value={"/getUserByName"}, method= RequestMethod.POST)
    @ResponseBody
    public Map getUserByName(HttpServletRequest req,Admin admin){
        Admin res = userService.queryUserByUserName(admin.getUsername());
        return resMap(res);
    }
    @RequiresRoles(value = "admin")
    @RequestMapping(value = "/test")
    @ResponseBody
    public String test(){
        return  "123";
    }
    /**
     * 更改管理员或商户所属组织机构
     * */
    @RequestMapping(value={"/changeDepart"}, method=  {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public Map changeDepart(HttpServletRequest req){
        Map<String,String> param = this.getRequestParam(req);
        Map res = resMap();
        try {
            Map data =  userService.changeDepart(param);
            res.put("status",data.get("o_status"));
            res.put("msg",data.get("o_msg"));
        } catch (Exception e) {
            e.printStackTrace();
            return resMap(e.getLocalizedMessage());
        }
        return res;
    }
}
