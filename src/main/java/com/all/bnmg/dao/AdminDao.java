package com.all.bnmg.dao;

import com.all.bnmg.entity.Admin;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface AdminDao {

    Admin get(String loginName);

    List<Map> getAdminType(String loginName);

    @Select("SELECT * FROM t_sys_admin")
    @Results({
            @Result(property = "id",  column = "id"),
            @Result(property = "username", column = "username",javaType = java.lang.String.class)
    })
    List<Admin> getAll();

    @Insert("INSERT INTO t_sys_admin(username,password,phone,pic,solt,type,depcode,status,name) VALUES( #{username}, #{password}, #{phone}, #{pic}, #{solt}, #{type}, #{depcode}, #{status}, #{name})")
    @Options(useGeneratedKeys = true,keyProperty = "id",keyColumn = "id")//加入该注解可以保持对象后，查看对象插入id
    long insert(Admin admin);

    long updateByUserName(Map param);

    @Delete("DELETE FROM t_sys_admin WHERE username =#{username}")
    long delete(String userName);

    long batchDelete(@Param("userNames") List<String> userNames);

    List<Admin> getAdminByDepart(Map param);

    List<Admin> getAdminByRole(Map param);

    Map<String,Object> p_changeDepart(Map param);

}