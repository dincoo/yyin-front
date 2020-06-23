import request from '@/router/axios';
import { baseUrl } from '@/config/env';
// 获取数据权限列表
export const dataPermissionList = function(params) {
    return request({
        url: baseUrl + '/sys/data/list',
        method: 'get',
        data: params
    });
};
// 删除数据权限
export const deleteDataPermission = function(params) {
    return request({
        url: baseUrl + '/sys/data/delete',
        method: 'delete',
        data: params
    });
};
// 新增数据权限
export const addDataPermission = function(params) {
    return request({
        url: baseUrl + '/sys/data/save',
        method: 'post',
        data: params
    });
};
// 修改数据权限
export const updateDataPermission = function(params) {
    return request({
        url: baseUrl + '/sys/data/update',
        method: 'put',
        data: params
    });
};
// 获取数据权限详情
export const detailDataPermission = function(params) {
    return request({
        url: baseUrl + '/sys/data/info/' + params.menuId,
        method: 'get'
    });
};