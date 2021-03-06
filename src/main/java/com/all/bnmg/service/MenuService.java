package com.all.bnmg.service;

import com.all.bnmg.annotation.CacheUtil;
import com.all.bnmg.dao.TSysMenuMapper;
import com.all.bnmg.entity.TSysMenu;
import com.all.bnmg.util.EHCacheUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    @Autowired
    private TSysMenuMapper tSysMenuMapper;
    @Cacheable(value = "menu", key = "'user_'+ #userName")
    @CacheUtil
    public List<TSysMenu> queryUserByUserName(String userName){
        List<TSysMenu> menulist = (List<TSysMenu>)EHCacheUtils.getCache("auth","menu_"+userName);
        if(menulist!=null){
            return menulist;
        }
        return tSysMenuMapper.selectByUser(userName);
    }
}