import { wxManageBaseUrl } from '@/config/env';
import fetch from '@/router/axios';
const baseUrl = wxManageBaseUrl;
// 获取素材
export const getMaterialList = function(params) {
    return fetch({
        url: baseUrl + '/marterialManage/getMaterialList',
        method: 'post',
        data: params
    })
};
// 删除素材
export const deleteMarterial = function(params) {
    return fetch({
        url: baseUrl + '/marterialManage/deleteMarterial',
        method: 'post',
        data: params
    })
};
// 获取图文素材
export const getNews = function(params) {
    return fetch({
        url: baseUrl + '/marterialManage/getNews',
        method: 'post',
        data: params
    })
};
// 添加图文素材
export const createMutilNews = function(params) {
    return fetch({
        url: baseUrl + '/marterialManage/createMutilNews',
        method: 'post',
        data: params
    })
};
// 更新图文素材
export const updateMutilNews = function(params) {
    return fetch({
        url: baseUrl + '/marterialManage/updateMutilNews',
        method: 'post',
        data: params
    })
}
export const uploadMaterialUrl = baseUrl + '/marterialManage/addMaterial';
export const downloadMaterialUrl = baseUrl + '/marterialManage/downloadMarterial';