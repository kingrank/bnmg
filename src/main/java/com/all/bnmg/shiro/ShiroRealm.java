package com.all.bnmg.shiro;

import com.all.bnmg.entity.Admin;
import com.all.bnmg.entity.TreeNode;
import com.all.bnmg.service.AuthService;
import com.all.bnmg.service.RoleService;
import com.all.bnmg.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author asus
 */
public class ShiroRealm extends AuthorizingRealm {
    @Lazy
    @Autowired
    private RoleService roleService;
    @Lazy
    @Autowired
    private AuthService permissionService;
    @Lazy
    @Autowired
    private UserService userService;
    /**
     * 设定Password校验.
     */
    @PostConstruct
    public void initCredentialsMatcher() {
    //该句作用是重写shiro的密码验证，让shiro用我自己的验证
        setCredentialsMatcher(new CredentialsMatcher());

    }
    // 认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        // 1.从主体传过来的信息中获取用户名
        String userName = (String)authenticationToken.getPrincipal();
        // 2.通过用户名到数据库获取凭证
        Admin admin = getUserByUserName(userName);
        if( admin == null ){
            return  null;
        }
        SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(admin,admin.getPassword(),getName());
        return simpleAuthenticationInfo;
    }
    // 角色权限和对应权限添加
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        // 获取登录用户名
        Admin admin = (Admin)principalCollection.getPrimaryPrincipal();
        // 查询用户的角色信息
        Set<String> roles = getRolesByUsername(admin.getUsername());
        // 查询角色的权限信息
        Set<String> permissions = getPermissionsByUserName(admin.getUsername());
        // 设置用户的角色和权限
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.setRoles(roles);
        simpleAuthorizationInfo.setStringPermissions(permissions);

        return simpleAuthorizationInfo;
    }

    // 根据用户名字从数据库中获取当前用户的权限数据
    private Set<String> getPermissionsByUserName(String userName) {
        List<TreeNode> list = permissionService.queryPermissionNameByUserName(userName);
        if( list != null ){
            Set<String> sets = new HashSet<>();
            for(TreeNode m:list){
                sets.add(m.getId());
            }
            return sets;
        }else{
            return null;
        }
    }

    // 根据用户名字从数据库中获取当前用户的角色数据
    private Set<String> getRolesByUsername(String userName) {
        List<Map> list = roleService.queryRoleNameByUsername(userName);
        if( list != null ){
            Set<String> sets = new HashSet<>();
            for(Map m:list){
                sets.add(m.get("roleid").toString());
            }
            return sets;
        }else{
            return null;
        }
    }



    // 通过用户名从数据库中获取当前用户的密码
    private Admin getUserByUserName(String userName) {
        Admin admin = userService.queryUserByUserName(userName);
        return admin;
    }
    /**
     * 将一些数据放到ShiroSession中,以便于其它地方使用
     *   比如Controller,使用时直接用HttpSession.getAttribute(key)就可以取到
     */
    private void setSession(Object key,Object value){
        Subject subject = SecurityUtils.getSubject();
        if (null != subject) {
            Session session = subject.getSession();
            if (null != session) {
                session.setAttribute(key,value);
            }
        }
    }
}