import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const roleList = function(params) { // 获取角色列表
    return request({
        url: baseUrl + '/sys/role/list',
        method: 'get',
        params: params
    });
};


export const menuList = function() { // 获取用户菜单
    return request({
        url: baseUrl + '/sys/menu/nav',
        method: 'get'
    });
};

export const menuDetails = function(params) { // 获取菜单详情
    return request({
        url: baseUrl + '/sys/menu/info/' + params,
        method: 'get'
    })
};

export const menuSelectList = function() { // 获取无功能按钮菜单列表
    return request({
        url: baseUrl + '/sys/menu/select',
        method: 'get'
    })
};

export const addMenu = function(params) { // 新增菜单
    return request({
        url: baseUrl + '/sys/menu/save',
        method: 'post',
        data: params
    });
};

export const ModifyMenu = function(params) { // 修改菜单
    return request({
        url: baseUrl + '/sys/menu/update',
        method: 'put',
        data: params
    });
};

export const deleteMenu = function(params) { // 删除菜单;
    return request({
        url: baseUrl + '/sys/menu/delete',
        method: 'delete',
        data: params
    });
};