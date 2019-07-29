package com.all.bnmg.entity;

import net.sf.json.JSONObject;

import java.io.Serializable;
import java.util.List;

public class TreeNode implements Serializable {
    private String title;
    private String id;
    private String pid;
    private String parentId;
    private JSONObject checkArr;
    private List<TreeNode> children;
    private String href;
    private String spread;
    private String checked;
    private boolean disabled;
    private String label;
    private String basicData;
    private String recordData;

    public TreeNode(){
        JSONObject obj = new JSONObject();
        obj.put("type",0);
        obj.put("checked",0);
        this.checkArr = obj;
    }
    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public JSONObject getCheckArr() {
        return checkArr;
    }

    public void setCheckArr(JSONObject checkArr) {
        this.checkArr = checkArr;
    }
    public void pubCheckArr(String type,String checked) {
        JSONObject obj = new JSONObject();
        obj.put("type",type);
        obj.put("checked",checked);
        this.checkArr = obj;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public String getSpread() {
        return spread;
    }

    public void setSpread(String spread) {
        this.spread = spread;
    }

    public String getChecked() {
        return checked;
    }

    public void setChecked(String checked) {
        this.checked = checked;
    }

    public boolean getDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    public String getBasicData() {
        return basicData;
    }

    public void setBasicData(String basicData) {
        this.basicData = basicData;
    }

    public String getRecordData() {
        return recordData;
    }

    public void setRecordData(String recordData) {
        this.recordData = recordData;
    }

    @Override
    public String toString() {
        return "TreeNode{" +
                "title='" + title + '\'' +
                ", id='" + id + '\'' +
                ", children=" + children +
                ", href='" + href + '\'' +
                ", spread='" + spread + '\'' +
                ", checked='" + checked + '\'' +
                ", disabled='" + disabled + '\'' +
                ", pid='" + pid + '\'' +
                '}';
    }
}