package com.all.bnmg.dao;

import com.all.bnmg.entity.Role;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface RoleDao {
    int deleteByPrimaryKey(Integer id);

    int insert(Role record);

    Role selectByPrimaryKey(Integer id);

    List<Role> selectByScope(Map param);

    int updateByPrimaryKey(Role record);

    List<Map> queryRoleNameByUsername(String userName);
    /**
     * 根据角色 添加用户
     * */
    long batchAddRoleUser(@Param("userNames") List<String> userNames,@Param("roleid") String authcode);
    /**
     * 根据角色 删除用户
     * */
    long batchDeleteRoleUser(@Param("userNames") List<String> userNames,@Param("roleid") String authcode);

}