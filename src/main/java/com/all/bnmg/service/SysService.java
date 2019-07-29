package com.all.bnmg.service;

import com.all.bnmg.dao.AdminDao;
import com.all.bnmg.dao.SysMapper;
import com.all.bnmg.dao.TSysDepartmentMapper;
import com.all.bnmg.entity.*;
import com.all.bnmg.util.ChinesePinyinUtil;
import com.all.bnmg.util.MapToEnity;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.all.bnmg.util.Constant.EnityEditType;

@Service
public class SysService {
    @Autowired
    private TSysDepartmentMapper departmentMapper;
    @Autowired
    private SysMapper sysMapper;
    @Autowired
    private AdminDao adminDao;
    public Map<String,Object> getChirdMenu(Map<String,Object> menu, List<TSysMenu> list){
        List<Map<String,Object>> ch = new ArrayList<>();
        for(TSysMenu cm:list){
            if(menu.get("id").equals(cm.getPcode())){
                Map<String,Object> li_c = new HashMap<String,Object>();
                li_c.put("name",cm.getName());
                li_c.put("id",cm.getCode());
                li_c.put("isp",cm.getIsp());//是否为父级菜单 0否 1是
                li_c.put("isopen",cm.getIsopen());//为父级菜单时是否默认展开 0否 1是
                li_c.put("authid",cm.getAuthcode());
                li_c.put("url",cm.getUrl());
                if(1==cm.getIsp()){
                    getChirdMenu(li_c,list);
                }else{
                    ch.add(li_c);
                }
                menu.put("chird",ch);
            }
        }
        return menu;
    }
    public Map<String,Object> getChirdDepart(Map<String,Object> menu, List<TSysDepartment> list){
        List<Map<String,Object>> ch = new ArrayList<>();

        return menu;
    }
    /**
     * 两层循环实现建树
     * @param treeNodes 传入的树节点列表
     * @return
     */
    public static List<TSysDepartment> bulidDepartTree(List<TSysDepartment> treeNodes) {
        List<TSysDepartment> trees = new ArrayList<TSysDepartment>();
        for (TSysDepartment treeNode : treeNodes) {
            if ("0".equals(treeNode.getPid())) {
                trees.add(treeNode);
            }
            for (TSysDepartment it : treeNodes) {
                if (it.getPid().equals(treeNode.getId()) ) {
                    if (treeNode.getChildren() == null) {
                        treeNode.setChildren(new ArrayList<TSysDepartment>());
                    }
                    treeNode.getChildren().add(it);
                }
            }
        }
        return trees;
    }

    /**
     * 使用递归方法建树
     * @param treeNodes
     * @return
     */
    public static List<TreeNode> buildByRecursive(List<TreeNode> treeNodes) {
        List<TreeNode> trees = new ArrayList<TreeNode>();
        for (TreeNode treeNode : treeNodes) {
            if ("0".equals(treeNode.getPid())) {
                trees.add(findChildren(treeNode,treeNodes));
            }
        }
        return trees;
    }
    /**
     * 使用递归方法建树
     * @param treeNodes
     * @return
     */
    public static List<TreeNode> buildByRecursive(List<TreeNode> treeNodes,String pid) {
        List<TreeNode> trees = new ArrayList<TreeNode>();
        for (TreeNode treeNode : treeNodes) {
            if (pid.equals(treeNode.getId())) {
                trees.add(findChildren(treeNode,treeNodes));
            }
        }
        return trees;
    }

    /**
     * 递归查找子节点
     * @param treeNodes
     * @return
     */
    public static TreeNode findChildren(TreeNode treeNode,List<TreeNode> treeNodes) {
        for (TreeNode it : treeNodes) {
            if(treeNode.getId().equals(it.getPid())) {
                if (treeNode.getChildren() == null) {
                    treeNode.setChildren(new ArrayList<TreeNode>());
                }
                treeNode.getChildren().add(findChildren(it,treeNodes));
            }
        }
        return treeNode;
    }
    /**
     * 根据父节点获取包含子节点树结构 并放入缓存
     * @param pcode
     * @return
     */
    public List<TreeNode> selectByPcode(String pcode){
        List<TreeNode> list = departmentMapper.selectByPcode(pcode);
        List<TreeNode> listtree = SysService.buildByRecursive(list,pcode);
        return listtree;
    }
    /**
     * 部门编辑
     * @param param
     * @return
     */
    public Map editDept(Map param){
        String type = param.get("type").toString();
        Map res = new HashMap();
        res.put("status",1);
        switch(EnityEditType.get(type)){
            case ADD:
                String id = param.get("pid")+ChinesePinyinUtil.getPinYinHeadChar(param.get("name").toString());
                while(true){
                    TSysDepartment rd = departmentMapper.selectByPrimaryKey(id);
                    //已存在 则增加随机数
                    if(rd==null){
                        break;
                    }
                    int random = (int)(1+Math.random()*(10-1+1));
                    id = id+random;
                }
                param.put("id",id);
                TSysDepartment d = (TSysDepartment)MapToEnity.getEnity(new TSysDepartment(),param);
                departmentMapper.insert(d);
                res.put("status",0);
                break;
            case EDIT:
                TSysDepartment u = (TSysDepartment)MapToEnity.getEnity(new TSysDepartment(),param);
                departmentMapper.updateByPrimaryKey(u);
                res.put("status",0);
                break;
            case DELETE:
                param.put("pcode",param.get("id"));
                param.remove("type");
                List<Admin> list = adminDao.getAdminByDepart(param);
                if(list!=null&&list.size()>0){
                    res.put("msg","该部门下仍存在管理员或商户");
                }else{
                    departmentMapper.deleteByPrimaryKey(param.get("id").toString());
                    res.put("status",0);
                }
                break;
            default:
                res.put("msg","操作类型错误");
                break;
        }
        return res;
    }
    /**
     * 根据id获取部门信息
     * @param id
     * @return
     */
    public TSysDepartment getDepartById(String id){
        return departmentMapper.selectByPrimaryKey(id);
    }
    /**
     * 人员管理 分页查询
     * @param param
     * @return
     */
    public Page<Admin> getAdminByDepart(Map param){
        Page<Admin> page =  PageHelper.startPage(param.containsKey("index")?Integer.parseInt(param.get("index").toString()):1,
                param.containsKey("limit")?Integer.parseInt(param.get("limit").toString()):15);
        List<Admin> list = adminDao.getAdminByDepart(param);
        return page;
    }
    /**
     * 系统参数 分页查询
     * @param param
     * @return
     */
    public Page<SysParam> getSysParam(Map param){
        Page<SysParam> page =  PageHelper.startPage(param.containsKey("index")?Integer.parseInt(param.get("index").toString()):1,
                param.containsKey("limit")?Integer.parseInt(param.get("limit").toString()):15);
        List<SysParam> list = sysMapper.sysParam_selectAll();
        return page;
    }
    public long sysParam_add(SysParam sysParam){
        return sysMapper.sysParam_insert(sysParam);
    }
    public long sysParam_update(SysParam sysParam){
        return sysMapper.sysParam_updateByPrimaryKey(sysParam);
    }
    @Transactional
    public long sysParam_del(String key){
        return sysMapper.sysParam_deleteByPrimaryKey(key);
    }
    /**
     * 根据网站配置信息
     * @return
     */
    public Map getWebConfig(){
        return sysMapper.getWebConfig();
    }

}