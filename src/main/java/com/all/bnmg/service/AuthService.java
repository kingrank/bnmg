package com.all.bnmg.service;

import com.all.bnmg.dao.AuthDao;
import com.all.bnmg.entity.TreeNode;
import com.all.bnmg.util.Constant;
import com.all.bnmg.util.EHCacheUtils;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class AuthService {
    @Autowired
    private AuthDao authDao;
    @Cacheable(value = "auth", key = "'user_'+ #userName")
    public List<TreeNode> queryPermissionNameByUserName(String userName){
        return authDao.getAuthByUser(userName);
    }
    @Cacheable(value = "auth", key = "'getAuthByScope_'+ #param")
    public List<Map> getAuthByScope(Map param){
        List<Map> res = authDao.getAuthByScope(param);
        return res;
    }
    //@Cacheable(value = "sys", key = "'auth_'+ #username")
    public List<TreeNode> getAuthByUser(boolean issuper, String username){
        List<TreeNode> list;
        //如果是超级管理员所有权限
        if(issuper){
            list = authDao.getAuthAll();
        }else{
            list = authDao.getAuthByUser(username);
        }


        return list;
    }
    public List<TreeNode> getAuthByRole(String roleid){
        List<TreeNode> list;
        //如果是超级管理员所有权限
        list = authDao.getAuthByRole(roleid);
        return list;
    }
    /**
     * 根据权限编号获取 拥有该权限的用户(且在管理员部门下)
     * @param param
     * @return
     */
    public Page<Map> getUserByAuth(Map param){
        Page<Map> page =  PageHelper.startPage(param.containsKey("index")?Integer.parseInt(param.get("index").toString()):1,
                param.containsKey("limit")?Integer.parseInt(param.get("limit").toString()):15);
        List<Map> list = authDao.getUserByAuth(param);
        return page;
    }
    /**
     * 根据权限编号获取 添加或删除用户
     * @param param
     * @return
     */
    public Map editUserByAuth(Map param){
        Map res = new HashMap();
        long count = 0;
        res.put("status",0);
        String editType = param.get("edittype").toString();
        String userName = param.get("ids").toString();
        String[] userNames = userName.split(",");
        List<String> userlist= new ArrayList<>(Arrays.asList(userNames));
        switch (Constant.EnityEditType.get(editType)){
            case ADD:
                count =authDao.batchAddUserByAuth(userlist,param.get("authcode").toString());
                break;
            case DELETE:
                count = authDao.batchDeleteUserByAuth(userlist,param.get("authcode").toString());
                break;
            default:
                break;
        }
        res.put("status",count);
        return res;
    }
    /**
     * 根据权限编号获取 拥有该权限的角色
     * @param param
     * @return
     */
    public Page<Map> getRoleByAuth(Map param){
        Page<Map> page =  PageHelper.startPage(param.containsKey("index")?Integer.parseInt(param.get("index").toString()):1,
                param.containsKey("limit")?Integer.parseInt(param.get("limit").toString()):15);
        List<Map> list = authDao.getRoleByAuth(param);
        return page;
    }
    /**
     * 根据权限编号获取 添加或删除角色
     * @param param
     * @return
     */
    public Map editRoleByAuth(Map param){
        Map res = new HashMap();
        long count = 0;
        res.put("status",0);
        String editType = param.get("edittype").toString();
        String roleid = param.get("ids").toString();
        String[] roleids = roleid.split(",");
        List<String> rolelist= new ArrayList<>(Arrays.asList(roleids));
        switch (Constant.EnityEditType.get(editType)){
            case ADD:
                count =authDao.batchAddRoleByAuth(rolelist,param.get("authcode").toString());
                break;
            case DELETE:
                count = authDao.batchDeleteRoleByAuth(rolelist,param.get("authcode").toString());
                break;
            default:
                break;
        }
        res.put("status",count);
        return res;
    }
    /**
     * 更新角色权限 开启事务
     * @param param
     * @return
     */
    @Transactional
    public Map rolePutAuth(Map param){
        Map res = new HashMap();
        long count = 0;
        res.put("status",0);
        count = authDao.roleAuthDel(param.get("roleid").toString());
        String auth = param.containsKey("ids")?param.get("ids").toString():null;
        if(auth!=null) {
            String[] auths = auth.split(",");
            List<String> authlist= new ArrayList<>(Arrays.asList(auths));
            count = authDao.batchPutAuthByRole(authlist, param.get("roleid").toString());
        }
        res.put("status",count);
        return res;
    }
    /**
     * 更新人员权限 开启事务
     * @param param
     * @return
     */
    @Transactional
    public Map userPutAuth(Map param){
        Map res = new HashMap();
        long count = 0;
        res.put("status",0);
        String username = param.get("username").toString();
        count = authDao.userAuthDel(username);
        String auth = param.containsKey("ids")?param.get("ids").toString():null;
        if(auth!=null){
            String[] auths = auth.split(",");
            List<String> authlist= new ArrayList<>(Arrays.asList(auths));
            count = authDao.batchPutAuthByUser(authlist,username);
        }
        res.put("status",count);
        return res;
    }
}