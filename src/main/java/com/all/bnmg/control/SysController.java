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
import org.apache.shiro.authz.annotation.RequiresRoles;
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
 * @author asus
 */
@Controller
public class SysController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private AuthService authService;
    @Autowired
    private MenuService menuService;
    @Autowired
    private SysService sysService;

    @RequiresPermissions(value = "100")
    @RequestMapping(value = "/home")
    public String home(Model model) throws Exception {
        Subject subject = SecurityUtils.getSubject();
        Admin user = (Admin) subject.getPrincipal();
        Map userType = userService.getAdminType(user.getUsername());
        List<TSysMenu> menulist = menuService.queryUserByUserName(user.getUsername());
        List<Map<String,Object>> mlist = new ArrayList<>();
        for(TSysMenu m:menulist){
            if("0".equals(m.getPcode())){
                Map<String,Object> li = new HashMap<String,Object>();
                li.put("name",m.getName());
                li.put("id",m.getCode());
                li.put("isp",m.getIsp());//是否为父级菜单 0否 1是
                li.put("isopen",m.getIsopen());//为父级菜单时是否默认展开 0否 1是
                li.put("authid",m.getAuthcode());
                li.put("url",m.getUrl());
                if(1==m.getIsp()){
                    sysService.getChirdMenu(li,menulist);
                }
                mlist.add(li);
            }
        }
        model.addAttribute("mlist",mlist);
        return  userType.get("home").toString();
    }
    /**
     * 页面统一跳转方法
     * page参数为需要跳转的页面路径
     * 其他参数原样返回
     * */
    @RequestMapping(value = "/jump")
    public String Jump(HttpServletRequest req,Model m){
        Map param = this.getRequestParam(req);
        m.addAllAttributes(param);
        return param.get("page").toString();
    }
    /**
     * 登录页跳转
     * */
    @RequestMapping(value = "/")
    public String welcome(){
        return "/login";
    }
    /**
     * 登录页跳转
     * */
    @RequestMapping(value = "/login")
    public String login(){
        return "/login";
    }
    /**
     * 错误页跳转
     * */
    @RequestMapping(value = "/err")
    public String err(){
        return "/err";
    }
    /**
     * 登录动作
     * */
    @RequestMapping(value = "/subLogin")
    @ResponseBody
    public String subLogin(Admin admin){
        Subject subject = SecurityUtils.getSubject();

        UsernamePasswordToken token = new UsernamePasswordToken(admin.getUsername(), admin.getPassword());
        try{
            subject.login(token);
        }catch (AuthenticationException e){
            e.printStackTrace();
            if(e instanceof IncorrectCredentialsException){
                return "用户名密码不匹配";
            }else if(e instanceof UnknownAccountException){
                return "用户不存在";
            }
            return e.getMessage();
        }
        return "success";
    }
    /**
     * 登出动作
     * */
    @RequestMapping(value = "/logout")
    public String logout(Admin admin){
        Subject subject = SecurityUtils.getSubject();
        try{
            subject.logout();
        }catch (AuthenticationException e){
            e.printStackTrace();
            return e.getMessage();
        }
        return "login";
    }
    @RequestMapping(value = "/index")
    public String index(){
        return  "admin/index";
    }
    /**
     * 权限管理
     * */
    @RequiresPermissions(value = "100002001")
    @RequestMapping(value = "/auth")
    public String auth(Model model){
        return  "sys/auth";
    }
    /**
     * 权限树获取
     * */
    @RequiresPermissions(value = "100002001")
    @RequestMapping(value = "/getAuthTree")
    @ResponseBody
    public Map getAuthTree(HttpServletRequest req){
        Subject subject = SecurityUtils.getSubject();
        Admin user = (Admin) subject.getPrincipal();
        String by = req.getParameter("by");
        //如果是查看 则不置为disabled
        String isshow = req.getParameter("isshow");
        List<TreeNode> list = authService.getAuthByUser(subject.hasRole("1"),user.getUsername());
        if("true".equals(isshow)){
            for(TreeNode node:list){
                node.setDisabled(false);
            }
        }
        //如果存在此参数 表示进行某个人或者角色赋权操作 需要获取已有权限进行勾选
        if(by!=null){
            String[] byinfo = by.split(":");
            if("user".equals(byinfo[0])){
                List<TreeNode> has = authService.getAuthByUser(false,byinfo[1]);
                for(TreeNode node:list){
                    for(TreeNode auth:has){
                        if(node.getId().equals(auth.getId())){
                            node.pubCheckArr("0","1");
                            if(!"true".equals(isshow)){
                                node.setDisabled(auth.getDisabled());
                            }
                        }
                    }
                }
            }else{
                List<TreeNode> has = authService.getAuthByRole(byinfo[1]);
                for(TreeNode node:list){
                    for(TreeNode auth:has){
                        if(node.getId().equals(auth.getId())){
                            node.pubCheckArr("0","1");
                        }
                    }
                }
            }
        }
        List<TreeNode> listtree = SysService.buildByRecursive(list);
        return  resMap(listtree);
    }
    /**
     * 跳转权限人员及角色管理界面
     * */
    @RequestMapping(value = "/editAuthOther")
    public String editAuthOther(HttpServletRequest req,Model model){
        model.addAllAttributes(this.getRequestParam(req));
        return  "sys/auth_other";
    }
    /**
     * 根据权限获取人员或角色
     * */
    @RequestMapping(value = "/getUserOrRoleByAuth")
    @ResponseBody
    public Map<String,Object> getUserOrRoleByAuth(HttpServletRequest req){
        Map<String,String> param = this.getRequestParam(req);
        Page<Map> page = null;
        if("0".equals(param.get("type"))){
            Subject subject = SecurityUtils.getSubject();
            Admin user = (Admin) subject.getPrincipal();
            String pcode = user.getDepcode();
            param.put("pcode",pcode);
            page = authService.getUserByAuth(param);
        }else{
            page = authService.getRoleByAuth(param);
        }
        return  resMap(page);
    }
    /**
     * 添加或删除权限人员或校色
     * */
    @RequestMapping(value = "/editUserOrRoleAuth")
    @ResponseBody
    public Map<String,Object> editUserOrRoleAuth(HttpServletRequest req){
        Map<String,String> param = this.getRequestParam(req);
        Map res = null;
        if("0".equals(param.get("type"))){
            res = authService.editUserByAuth(param);
        }else{
            res = authService.editRoleByAuth(param);
        }
        if((long)res.get("status")>0){
            res.put("status",0);
        }
        return  res;
    }
    /**
     * 角色编辑
     * */
    @RequiresPermissions(value = "100002002")
    @RequestMapping(value = "/roleEdit")
    @ResponseBody
    public Map<String,Object> roleEdit(HttpServletRequest req){
        Map<String,String> param = this.getRequestParam(req);
        String type = param.get("type").toString();
        Map res = new HashMap();
        res.put("status",1);
        long ct = 0;
        switch(Constant.EnityEditType.get(type)) {
            case ADD:
                ct  = roleService.add((Role) MapToEnity.getEnity(new Role(),param));
                break;
            case EDIT:
                ct  = roleService.update((Role) MapToEnity.getEnity(new Role(),param));
                break;
            case DELETE:
                ct  = roleService.del(param.get("roleid"));
                break;
        }
        if (ct >= 0) {
            res.put("status", 0);
        }
        return  res;
    }
    /**
     * 角色人员编辑
     * */
    @RequiresPermissions(value = "100002002")
    @RequestMapping(value = "/editRoleUser")
    @ResponseBody
    public Map<String,Object> editRoleUser(HttpServletRequest req){
        Map<String,String> param = this.getRequestParam(req);
        Map res = new HashMap();
        res = roleService.batchEditRoleUser(param);
        return  res;
    }
    /**
     * 角色权限编辑
     * */
    @RequiresPermissions(value = "100002002")
    @RequestMapping(value = "/rolePutAuth")
    @ResponseBody
    public Map<String,Object> rolePutAuth(HttpServletRequest req){
        Map<String,String> param = this.getRequestParam(req);
        Map res = null;
        res = authService.rolePutAuth(param);
        if((long)res.get("status")>0){
            res.put("status",0);
        }
        return  res;
    }
    /**
     * 人员权限编辑
     * */
    @RequiresPermissions(value = "100002003")
    @RequestMapping(value = "/userPutAuth")
    @ResponseBody
    public Map<String,Object> userPutAuth(HttpServletRequest req){
        Map<String,String> param = this.getRequestParam(req);
        Map res = null;
        res = authService.userPutAuth(param);
        if((long)res.get("status")>0){
            res.put("status",0);
        }
        return  res;
    }
    /**
     * 组织架构管理
     * */
    @RequiresPermissions(value = "100002005")
    @RequestMapping(value = "/depart")
    public String depart(Model model){
        return  "admin/depart";
    }
    /**
     * 组织架构管理
     * */
    @RequiresPermissions(value = "100002005")
    @RequestMapping(value = "/getDeparts")
    @ResponseBody
    public Map getDeparts(Model model){
        Subject subject = SecurityUtils.getSubject();
        Admin user = (Admin) subject.getPrincipal();
        String pcode = user.getDepcode();
        List<TreeNode> list = sysService.selectByPcode(pcode);
        return  resMap(list);
    }
    /**
     * 组织架构编辑
     * */
    @RequiresPermissions(value = "100002005")
    @RequestMapping(value = "/departEdit")
    @ResponseBody
    public Map departEdit(HttpServletRequest req){
        Map param = this.getRequestParam(req);
        Map res = sysService.editDept(param);
        return  res;
    }
    /**
     * 组织架构编辑
     * */
    @RequiresPermissions(value = "100002005")
    @RequestMapping(value = "/getDepartById")
    @ResponseBody
    public Map getDepartById(HttpServletRequest req){
        Map param = this.getRequestParam(req);
        TSysDepartment dep = sysService.getDepartById(param.get("id").toString());
        return  resMap(dep);
    }
    /**
     * 组织架构人员及店铺管理
     * */
    @RequiresPermissions(value = "100002005")
    @RequestMapping(value = "/editDepartOther")
    public String editDepartOther(HttpServletRequest req,Model model){
        model.addAllAttributes(this.getRequestParam(req));
        return  "admin/departOther";
    }
    /**
     * 组织架构人员及店铺获取
     * */
    @RequiresPermissions(value = "100002005")
    @RequestMapping(value = "/getAdminByDepart")
    @ResponseBody
    public Map<String,Object> getAdminByDepart(HttpServletRequest req){
        Map<String,String> param = this.getRequestParam(req);
        Page<Admin> page = sysService.getAdminByDepart(param);
        return  resMap(page);
    }
    /**
     * 根据权限获取角色
     * */
    @RequestMapping(value = "/getRole")
    @ResponseBody
    public Map<String,Object> getRole(HttpServletRequest req){
        Map<String,String> param = this.getRequestParam(req);
        Page<Role> page = roleService.selectByScope(param);
        return  resMap(page);
    }
    /**
     * 系统参数获取
     * */
    @RequiresPermissions(value = "100002005")
    @RequestMapping(value = "/getSysParam")
    @ResponseBody
    public Map<String,Object> getSysParam(HttpServletRequest req){
        Map<String,String> param = this.getRequestParam(req);
        Page<SysParam> page = sysService.getSysParam(param);
        return  resMap(page);
    }
    /**
     * 系统参数编辑
     * */
    @RequiresPermissions(value = "100002002")
    @RequestMapping(value = "/sysParamEdit")
    @ResponseBody
    public Map<String,Object> sysParamEdit(HttpServletRequest req){
        Map<String,String> param = this.getRequestParam(req);
        String type = param.get("type").toString();
        Map res = new HashMap();
        res.put("status",1);
        long ct = 0;
        switch(Constant.EnityEditType.get(type)) {
            case ADD:
                ct  = sysService.sysParam_add((SysParam) MapToEnity.getEnity(new SysParam(),param));
                break;
            case EDIT:
                ct  = sysService.sysParam_update((SysParam) MapToEnity.getEnity(new SysParam(),param));
                break;
            case DELETE:
                ct  = sysService.sysParam_del(param.get("key"));
                break;
        }
        if (ct >= 0) {
            res.put("status", 0);
        }
        return  res;
    }
}
