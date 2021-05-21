import _ from "lodash";
import {fetchMenuByUser} from "@/api/menuManagement.js";

const state = {
    sidebar:{},
    sidebarRouter:{}
}

const mutations = {
    SET_SIDEBAR:(state, sidebar) => {
        state.sidebar = sidebar;
    },
    SET_SIDEBARROUTER:(state, sidebarRouter) => {
        state.sidebarRouter = sidebarRouter;
    },
}

let sidebar = {
    name:"layout",
    path:"/bms",
    component:()=>import('@/views/bms/Layout'),
    redirect:{name:"Keywords"},
    children:[]
}

let sidebarRouter = _.cloneDeep(sidebar);

function sidebarMapper(child,parent){
    child.forEach(c=>{
        let paths = parent?parent.meta.paths.concat(c.name):[c.name];
        c.meta = {};
        c.meta.title = c.name;
        c.meta.paths = paths;
        if(null != c.url && "" != c.url)
        {
            let key = _.last(c.url.split("/"));
            c.name = key;
            c.path = key;
            c.component = ()=>import(c.url);
        }
        delete c.url;
        delete c.id;
        delete c.pid;
        delete c.sort;
        if(c.children)
        {
            sidebarMapper(c.children,c);
        }
        else{
            sidebarRouter.children.push(c);
        }
    })
}

const actions = {
    getRouterMenu ({commit}, userId) {
        return new Promise((resolve, reject) => {
            fetchMenuByUser({userId: userId}).then(response => {
                sidebar.children = response.content;
                sidebarMapper(sidebar.children);
                commit('SET_SIDEBAR', sidebar);
                commit('SET_SIDEBARROUTER', sidebarRouter);
                resolve();
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
