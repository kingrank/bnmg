package com.all.bnmg.util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapToEnity {
    /**
     * 根据属性名获取属性值
     * */
    private static Object getFieldValueByName(String fieldName, Object o) {
        try {
            String firstLetter = fieldName.substring(0, 1).toUpperCase();
            String getter = "get" + firstLetter + fieldName.substring(1);
            Method method = o.getClass().getMethod(getter, new Class[] {});
            Object value = method.invoke(o, new Object[] {});
            return value;
        } catch (Exception e) {
            return null;
        }
    }
    /**
     * 根据属性名获取属性值
     * */
    private static Object setFieldValueByName(String fieldName,String val, Object o) {
        try {
            Field field = o.getClass().getDeclaredField(fieldName);
            Class fieldtype = field.getType();
            String firstLetter = fieldName.substring(0, 1).toUpperCase();
            String setter = "set" + firstLetter + fieldName.substring(1);
            Method method = o.getClass().getDeclaredMethod(setter, new Class[] {field.getType()});
            Object r_val =new Object[] {};
            switch(fieldtype.getName()){
                case "java.lang.Integer":
                    r_val = Integer.parseInt(val);
                    break;
                case "java.lang.String":
                    r_val = val;
                    break;
                case "java.lang.Long":
                    r_val = Long.parseLong(val);
                    break;
                case "java.lang.Double":
                    r_val = Double.parseDouble(val);
                    break;
            }
            Object value = method.invoke(o, r_val);
            return value;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 获取属性名数组
     * */
    private static String[] getFiledName(Object o){
        Field[] fields=o.getClass().getDeclaredFields();
        String[] fieldNames=new String[fields.length];
        for(int i=0;i<fields.length;i++){
            System.out.println("类型"+fields[i].getType());
            System.out.println("名称="+fields[i].getName());
            fieldNames[i]=fields[i].getName();
        }
        return fieldNames;
    }

    /**
     * 获取属性类型(type)，属性名(name)，属性值(value)的map组成的list
     * */
    private static List<Map> getFiledsInfo(Object o){
        Field[] fields=o.getClass().getDeclaredFields();
        String[] fieldNames=new String[fields.length];
        List list = new ArrayList();
        Map infoMap=null;
        for(int i=0;i<fields.length;i++){
            infoMap = new HashMap();
            infoMap.put("type", fields[i].getType().toString());
            infoMap.put("name", fields[i].getName());
            infoMap.put("value", getFieldValueByName(fields[i].getName(), o));
            list.add(infoMap);
        }
        return list;
    }
    /**
     * 获取属性类型(type)，属性名(name) 的map组成的list
     * */
    private static List<Map<String,String>> getFileds(Object o){
        Field[] fields=o.getClass().getDeclaredFields();
        String[] fieldNames=new String[fields.length];
        List list = new ArrayList();
        Map infoMap=null;
        for(int i=0;i<fields.length;i++){
            infoMap = new HashMap();
            infoMap.put("type", fields[i].getType().toString());
            infoMap.put("name", fields[i].getName());
            list.add(infoMap);
        }
        return list;
    }
    /**
     * 获取对象的所有属性值，返回一个对象数组
     * */
    public static Object[] getFiledValues(Object o){
        String[] fieldNames=getFiledName(o);
        Object[] value=new Object[fieldNames.length];
        for(int i=0;i<fieldNames.length;i++){
            value[i]=getFieldValueByName(fieldNames[i], o);
        }
        return value;
    }
    public static Object getEnity(Object enity,Map<String,String> node){
        List<Map<String,String>> list = getFileds(enity);
        for(Map<String,String> file:list){
            String val = node.get(file.get("name"));
            if(val!=null){
                setFieldValueByName(file.get("name"),val,enity);
            }
        }
        return enity;
    }
}

