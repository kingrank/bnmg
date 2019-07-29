package com.all.bnmg.service;

import com.all.bnmg.dao.AdminDao;
import com.all.bnmg.dao.AuthDao;
import com.all.bnmg.dao.RoleDao;
import com.all.bnmg.entity.Role;
import com.all.bnmg.util.Constant;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class RoleService {
    @Autowired
    private RoleDao roleDao;
    @Autowired
    private AuthDao authDao;
    @Autowired
    private AdminDao adminDao;
    @Cacheable(value = "role", key = "'user_'+ #userName")
    public List<Map> queryRoleNameByUsername(String userName){
        return roleDao.queryRoleNameByUsername(userName);
    }
    /**
     * 角色管理 分页查询
     * @param param
     * @return
     */
    public Page<Role> selectByScope(Map param){
        Page<Role> page =  PageHelper.startPage(param.containsKey("index")?Integer.parseInt(param.get("index").toString()):1,
                param.containsKey("limit")?Integer.parseInt(param.get("limit").toString()):15);
        List<Role> list = roleDao.selectByScope(param);
        return page;
    }
    public long add(Role role){
        return roleDao.insert(role);
    }
    public long update(Role role){
        return roleDao.updateByPrimaryKey(role);
    }
    @Transactional
    public long del(String roleid){
        Map param = new HashMap();
        param.put("roleid",roleid);
        List users = adminDao.getAdminByRole(param);
        //如果角色下拥有管理员禁止删除
        if(users!=null&&users.size()>0){
            return -1;
        }
        //角色权限外键关联自动删除
        return roleDao.deleteByPrimaryKey(Integer.parseInt(roleid));
    }
    /**
     * 角色人员管理
     * @param param
     * @return
     */
    public Map batchEditRoleUser(Map param){
        Map res = new HashMap();
        long count = 0;
        res.put("status",1);
        String editType = param.get("type").toString();
        String userid = param.get("ids").toString();
        String[] userids = userid.split(",");
        List<String> userlist= new ArrayList<>(Arrays.asList(userids));
        switch (Constant.EnityEditType.get(editType)){
            case ADD:
                count =roleDao.batchAddRoleUser(userlist,param.get("roleid").toString());
                break;
            case DELETE:
                count = roleDao.batchDeleteRoleUser(userlist,param.get("roleid").toString());
                break;
            default:
                break;
        }
        res.put("status",count>0?0:1);
        return res;
    }
}