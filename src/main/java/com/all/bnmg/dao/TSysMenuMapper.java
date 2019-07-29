package com.all.bnmg.dao;

import com.all.bnmg.entity.TSysMenu;
import java.util.List;

public interface TSysMenuMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_sys_menu
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_sys_menu
     *
     * @mbg.generated
     */
    int insert(TSysMenu record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_sys_menu
     *
     * @mbg.generated
     */
    TSysMenu selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_sys_menu
     *
     * @mbg.generated
     */
    List<TSysMenu> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_sys_menu
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(TSysMenu record);

    List<TSysMenu> selectByUser(String userName);
}