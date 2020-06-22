import request from '@/router/axios';
import { baseUrl } from '@/config/env';
// 获取接口权限列表
export const apiPermissionList = function(params) {
    return request({
        url: baseUrl + '/sys/api/list',
        method: 'get',
        data: params
    });
};
// 删除接口权限
export const deleteApiPermission = function(params) {
    return request({
        url: baseUrl + '/sys/api/delete',
        method: 'delete',
        data: params
    });
};
// 新增接口权限
export const addApiPermission = function(params) {
    return request({
        url: baseUrl + '/sys/api/save',
        method: 'post',
        data: params
    });
};
// 修改接口权限
export const updateApiPermission = function(params) {
    return request({
        url: baseUrl + '/sys/api/update',
        method: 'post',
        data: params
    });
};
// 获取接口权限详情
export const detailApiPermission = function(params) {
    return request({
        url: baseUrl + '/sys/api/info/' + params.menuId,
        method: 'get'
    });
};