package com.all.bnmg.util;

public class Constant {
    /**
     * 实体类操作类型
     * */
    public enum EnityEditType{
        ADD,EDIT,DELETE;
        public static EnityEditType get(String type){
            switch(type){
                case "0":
                    return EnityEditType.ADD;
                case "1":
                    return EnityEditType.EDIT;
                case "2":
                    return EnityEditType.DELETE;
                default:
                    return null;
            }
        }
    }
}
