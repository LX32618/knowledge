//region sidebar参数设置
const sidebar = {
    name:"layout",
    path:"/bms",
    component:()=>import('@/views/bms/Layout'),
    redirect:{name:"Keywords"},
    items: [{
        name: "Setting",
        meta:{title:"设置中心",paths:[]},
        icon: 'el-icon-setting',
        children: [{
            name: "Basic",
            meta:{title:"基础设置",paths:[]},
            children: [{
                name: 'Keywords',
                path: "keywords",
                meta:{title:"检索关键字统计",paths:[]},
                component:()=>import('@/views/Home')
            }, {
                name: 'Interface',
                path: "interface",
                meta:{title:"接口测试"},
                component:()=>import('@/views/About')
            },{
                name: 'Dictionary',
                path: "dictionary",
                meta:{title:"字典数据"},
                component:()=>import('@/views/bms/DictionaryData')
            }]
        }, {
            name: "Repository",
            meta:{title:"知识库设置"},
            children: [{
                name: 'RationalView',
                path: "rationalview",
                meta:{title:"标准关系视图"},
                component:()=>import('@/views/Home')
            }, {
                name: 'KnowledgeManagement',
                path: "knowledgemanagement",
                meta:{title:"知识管理"},
                component:()=>import('@/views/bms/KnowledgeManagement')
            }, {
                name: 'KnowledgeList',
                path: "knowledgelist",
                meta:{title:"知识目录"},
                component:()=>import('@/views/bms/KnowledgeList'),

            }, {
                name: 'KonwledgeModel',
                path: "konwledgemodel",
                meta:{title:"知识模型"},
                children:[
                    {
                        name: "ModelForm",
                        path: "modelform",
                        meta:{title:"模型表单"},
                        component:()=>import('@/views/bms/ModelForm')
                    },{
                        name: "BrowseButton",
                        path: "browsebutton",
                        meta:{title:"浏览按钮"},
                        component:()=>import('@/views/About')
                    }
                ]

            }]
        }, {
            name: "Administrator",
            meta:{title:"管理员设置"},
            children: [{
                name: "SecretAdministrator",
                path: "secretadministrator",
                meta:{title:"定密审核员"},
                component:()=>import('@/views/About')
            }, {
                name: "KnowledgeAdministrator",
                path: "knowledgeadministrator",
                meta:{title:"知识管理员"},
                component:()=>import('@/views/Home')
            }]
        }]
    }, {
        name: 'System',
        meta:{title:"系统管理"},
        icon: 'el-icon-setting',
        children: []
    }, {
        name: 'Audit',
        meta:{title:"安全审计"},
        icon: 'el-icon-setting',
        children: []
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