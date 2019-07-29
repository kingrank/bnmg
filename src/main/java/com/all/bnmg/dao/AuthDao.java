package com.all.bnmg.dao;

import com.all.bnmg.entity.TreeNode;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface AuthDao {
    List<Map> queryPermissionNameByUserName(String userName);
    List<Map> getAuthByScope(Map param);
    /**
     * 权限 根据父节点获取所有子节点
     * */
    List<TreeNode> getAuthByUser(String username);
    List<TreeNode> getAuthByRole(String roleid);
    /**
     * 权限 超级管理员全部节点
     * */
    List<TreeNode> getAuthAll();

    List<Map> getUserByAuth(Map param);

    List<Map> getRoleByAuth(Map param);
    /**
     * 根据权限 批量赋权用户
     * */
    long batchAddUserByAuth(@Param("userNames") List<String> userNames,@Param("authcode") String authcode);
    /**
     * 根据权限 批量赋权角色
     * */
    long batchAddRoleByAuth(@Param("roleIds") List<String> roleIds,@Param("authcode") String authcode);
    /**
     * 根据权限 批量删除用户
     * */
    long batchDeleteUserByAuth(@Param("userNames") List<String> userNames,@Param("authcode") String authcode);
    /**
     * 根据权限 批量删除角色
     * */
    long batchDeleteRoleByAuth(@Param("roleIds") List<String> roleIds,@Param("authcode") String authcode);
    /**
     * 根据用户赋权
     * */
    long batchPutAuthByUser(@Param("authList") List<String> authList,@Param("username") String username);
    /**
     * 根据角色赋权
     * */
    long batchPutAuthByRole(@Param("authList") List<String> authList,@Param("roleid") String roleid);
    /**
     * 根据用户赋权
     * */
    long userAuthDel(@Param("username") String username);
    /**
     * 根据角色赋权
     * */
    long roleAuthDel(@Param("roleid") String roleid);
}