var CONS={
    admin:{
        phone:{title:"联系电话",show:true,disable:false,format:function(text){return text;}},
        name:{title:"用户名称",show:true,disable:false,format:function(text){return text;}},
        username:{title:"账户名称",show:true,disable:true,format:function(text){return text;}},
        type:{title:"账户类型",show:false,disable:true,format:function(text){return text;}},
        depname:{title:"部门名称",show:true,disable:true,format:function(text){return text;}},
        depcode:{title:"部门编号",show:false,disable:false,format:function(text){return text;}},
        status:{title:"状态",show:true,disable:true,format:function(text){return text==0?"正常":"停用";}},
        password:{title:"密码",show:true,disable:false,format:function(text){return "";}}
    },
    role:{
        id:{title:"ID",show:false,disable:false,format:function(text){return text;}},
        name:{title:"角色名称",show:true,disable:false,format:function(text){return text;}},
        status:{title:"状态",show:true,disable:true,format:function(text){return text==0?"正常":"停用";}},
    },
    sysparam:{
        key:{title:"标识",show:true,disable:true,format:function(text){return text;}},
        name:{title:"名称",show:true,disable:false,format:function(text){return text;}},
        val:{title:"值",show:true,disable:false,format:function(text){return text;}},
    }
}