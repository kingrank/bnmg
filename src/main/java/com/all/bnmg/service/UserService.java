package com.all.bnmg.service;

import com.all.bnmg.annotation.CacheUtil;
import com.all.bnmg.dao.AdminDao;
import com.all.bnmg.entity.Admin;
import com.all.bnmg.service.UserService;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private AdminDao adminDao;
    @Cacheable(value = "user", key = "'user_'+ #loginName")
    public Admin getUserInfo(String loginName){
        return adminDao.get(loginName);
    }
    @Cacheable(value = "user", key = "'usertype_'+ #loginName")
    public Map getAdminType(String loginName) throws Exception {
        List<Map> list = adminDao.getAdminType(loginName);
        if(list==null||list.size()==0){
            throw new Exception("用户类型异常，请联系管理员");
        }
        return (Map)list.get(0);
    }
    /**
     * 添加
     * */
    public long addUser(Admin Admin){
        if(Admin.getPassword()!=null){
            ByteSource salt = ByteSource.Util.bytes(Admin.getUsername());
            String newPassword = new SimpleHash("sha-1", //加密方式
                    Admin.getPassword(),//密码原值
                    salt,//盐值
                    916//加密次数
            ).toString();
            Admin.setSolt(salt.toString());
            Admin.setPassword(newPassword);
        }
        adminDao.insert(Admin);
        return Admin.getId();
    }
    /**
     * 修改
     * */
    public long updateUser(Map param){

        if(param.containsKey("password")){
            ByteSource salt = ByteSource.Util.bytes(param.get("username"));
            String newPassword = new SimpleHash("sha-1", //加密方式
                    param.get("password"),//密码原值
                    salt,//盐值
                    916//加密次数
            ).toString();
            param.put("solt",salt.toString());
            param.put("password",newPassword);
        }
        long res = adminDao.updateByUserName(param);
        //如果是修改商户管理员 则还有商户信息
        if(param.containsKey("type")&&Integer.parseInt(param.get("type").toString())==1){

        }
        return res>0?0:1;
    }
    /**
     * 删除
     * */
    //开启事务
    @Transactional
    @Caching(evict={
            @CacheEvict(value = "user", key = "'user_'+#userName"),
            @CacheEvict(value = "auth", key = "'user_'+#userName"),
            @CacheEvict(value = "role", key = "'user_'+#userName")
    })
    public long delUser(String userName){
      return adminDao.delete(userName);
    }
    public long batchDelete(String userName){
        String[] userNames = userName.split(",");
        List<String> resultList= new ArrayList<>(Arrays.asList(userNames));
        return adminDao.batchDelete(resultList);
    }
    @Cacheable(value = "user", key = "'user_'+ #userName")
    public Admin queryUserByUserName(String userName){
        return adminDao.get(userName);
    }
    /**
     * 更改人员部门
     * */
    public Map changeDepart(Map param){
        adminDao.p_changeDepart(param);
        return param;
    }
}