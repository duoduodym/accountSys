import {get,post,put,Delete} from '../http'
export function createCmp (data){
    return post('/platform-admin/tenants',data)
}
export function updateCmp (id,data){
    return put('/platform-admin/tenants/'+id,data)
}
export function switcheCmp (id,data){
    return post(`/platform-admin/tenants/${id}/switch-status`,data)
}
export function delCmp (id){
    return Delete(`/platform-admin/tenants/${id}`)
}