//region sidebar参数设置
const sidebar = {
    name:"layout",
    path:"/bms",
    component:()=>import('@/views/bms/Layout'),
    redirect:{name:"KnowledgeList"},
    items: [{
        name: "Setting",
        meta:{title:"设置中心"},
        icon: 'el-icon-setting',
        children: [{
            name: "Basic",
            meta:{title:"基础设置"},
            children: [{
                name: 'Keywords',
                path: "Keywords",
                meta:{title:"检索关键字统计"},
                component:()=>import('@/views/Home')
            }, {
                name: 'Dictionary',
                path: "Dictionary",
                meta:{title:"字典数据"},
                component:()=>import('@/views/bms/DictionaryTag/Dictionary')
            },{
                name: 'Tag',
                path: "Tag",
                meta:{title:"标签管理"},
                component:()=>import('@/views/bms/DictionaryTag/Tag')
            },{
                name: 'SystemParameter',
                path: "SystemParameter",
                meta:{title:"系统参数管理"},
                component:()=>import('@/views/bms/SystemParameter')
            },{
                name: 'TempGroup',
                path: "TempGroup",
                meta:{title:"临时项目组"},
                component:()=>import('@/views/bms/TempGroup')
            }]
        }, {
            name: "Repository",
            meta:{title:"知识库设置"},
            children: [{
                name: 'RationalView',
                path: "RationalView",
                meta:{title:"标准关系视图"},
                component:()=>import('@/views/Home')
            }, {
                name: 'KnowledgeManagement',
                path: "KnowledgeManagement",
                meta:{title:"知识管理"},
                component:()=>import('@/views/bms/KnowledgeManagement')
            }, {
                name: 'KnowledgeList',
                path: "KnowledgeList",
                meta:{title:"知识目录"},
                component:()=>import('@/views/bms/KnowledgeList'),
            }, {
                name: 'KonwledgeModel',
                meta:{title:"知识模型"},
                children:[
                    {
                        name: "ModelForm",
                        path: "ModelForm",
                        meta:{title:"模型表单"},
                        component:()=>import('@/views/bms/ModelForm')
                    },{
                        name: "BrowseButton",
                        path: "BrowseButton",
                        meta:{title:"浏览按钮"},
                        component:()=>import('@/views/bms/BrowseButton')
                    }
                ]
            },{
                name:"KnowledgeStatistics",
                meta:{title:"知识统计"},
                children:[
                    {
                        name: "KnowledgeCount",
                        path: "KnowledgeCount",
                        meta: {title:"知识数量统计"},
                        component:()=>import("@/views/bms/KnowledgeStatistics/KnowledgeCount")
                    },
                    {
                        name: "ClickRate",
                        path: "ClickRate",
                        meta: {title:"知识点击率统计"},
                        component:()=>import("@/views/bms/KnowledgeStatistics/ClickRate")
                    },
                    {
                        name: "ReUseRate",
                        path: "ReUseRate",
                        meta: {title:"知识点重用率统计"},
                        component:()=>import("@/views/bms/KnowledgeStatistics/ReUseRate")
                    },{
                        name: "IndividualContribution",
                        path: "IndividualContribution",
                        meta: {title:"个人贡献情况"},
                        component:()=>import("@/views/bms/KnowledgeStatistics/IndividualContribution")
                    },{
                        name: "OrganizationContribution",
                        path: "OrganizationContribution",
                        meta: {title:"部门贡献统计"},
                        component:()=>import("@/views/bms/KnowledgeStatistics/OrganizationContribution")
                    }
                ]
            }]
        },{
            name: "Administrator",
            meta:{title:"管理员设置"},
            children: [{
                name: "SecretAdministrator",
                path: "SecretAdministrator",
                meta:{title:"定密审核员"},
                component:()=>import('@/views/Home')
            }, {
                name: "KnowledgeAdministrator",
                path: "KnowledgeAdministrator",
                meta:{title:"知识管理员"},
                component:()=>import('@/views/bms/KnowledgeAdministrator')
            }]
        }]
    }, {
        name: 'System',
        meta:{title:"系统管理"},
        icon: 'el-icon-setting',
        children: [{
            name: "RoleManagement",
            path: "RoleManagement",
            meta:{title:"角色管理"},
            component:()=>import('@/views/bms/RoleManagement')
        },{
            name: "PriorityManagement",
            path: "PriorityManagement",
            meta:{title:"权限管理"},
            component:()=>import('@/views/bms/PriorityManagement')
        },{
            name: "MenuManagement",
            path: "MenuManagement",
            meta:{title:"导航菜单管理"},
            component:()=>import('@/views/bms/MenuManagement')
        },{
            name: "FlowManagement",
            path: "FlowManagement",
            meta:{title:"流程管理"},
            component:()=>import('@/views/bms/FlowManagement')
        },{
            name: "PushManagement",
            path: "PushManagement",
            meta:{title:"推送管理"},
            component:()=>import('@/views/bms/PushManagement')
        }]
    }, {
        name: 'SecurityAudit',
        meta:{title:"安全审计"},
        icon: 'el-icon-setting',
        children: [{
            name: "SystemLog",
            meta:{title:"系统日志"},
            children: [
                {
                    name: "OperationLog",
                    path: "OperationLog",
                    meta:{title:"系统操作日志"},
                    component:()=>import('@/views/bms/LogManagement/OperationLog')
                }
            ]


        }]
    }]
}
//endregion

//region 从设置中过滤出路由，只选取有页面的作为二级路由
const sidebarRouter = {};
sidebarRouter.path = sidebar.path;
sidebarRouter.name = sidebar.name;
sidebarRouter.component = sidebar.component;
sidebarRouter.redirect=sidebar.redirect;
sidebarRouter.children = [];
function filterNodes(nodes,parent)
{
    nodes.forEach(n=>{
        let paths = parent?parent.meta.paths.concat(n.meta.title):[n.meta.title];
        n.meta.paths = paths;
        if(n.children)
        {
            filterNodes(n.children,n);
        }
        else{
            sidebarRouter.children.push(n);
        }
    })
}


filterNodes(sidebar.items);

//endregion

export {sidebar,sidebarRouter}
