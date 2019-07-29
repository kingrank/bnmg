package com.all.bnmg.dao;

import com.all.bnmg.entity.SysParam;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SysMapper {

    int sysParam_deleteByPrimaryKey(String key);

    int sysParam_insert(SysParam record);

    SysParam sysParam_selectByPrimaryKey(String key);

    List<SysParam> sysParam_selectAll();

    int sysParam_updateByPrimaryKey(SysParam record);
    Map getWebConfig();
}