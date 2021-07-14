import axios from "axios"
import request from '@/utils/request'
import {fetchPriorities} from "@/api/priorityManagement.js"

const baseURL = "/app-zuul/knowledge/app/authcenter/api"
const rootUrl = '/sysRole/sysRoleController/'


export function fetchRoleList(option) {
    return request({
        url: `${rootUrl}getData`,
        method: 'post',
        data: option
    })
}

export function saveRoleList(option) {
    return request({
        url: `${rootUrl}doSave`,
        method: 'post',
        data: option
    })
}

export function removeRole(option) {
    return request({
        url: `${rootUrl}deleteRole`,
        method: 'post',
        data: option
    })
}


export function fetchRoleSelectById(rowOption,priOption) {
    return axios.all([findPermissionsByRoleID(rowOption),findUserByRoleID(rowOption),fetchPriorities(priOption)]);
}

function  findPermissionsByRoleID(option){
    return request({
        url:`${rootUrl}findPermissionsByRoleID`,
        method: 'post',
        data:option
    })
}


function findUserByRoleID(option){
    return request({
        url:`${rootUrl}findUserByRoleID`,
        method: 'post',
        data:option
    })
}




