import request from '@/router/axios';
export const roleList = function(params) { // 获取角色列表
    return request({
        url: '/vz-island/sys/role/list',
        method: 'post',
        data: params
    });
};

export const roleSelectList = function() { // 权限选择列表;
    return request({
        url: '/vz-island/sys/role/select',
        method: 'get'
    });
};

export const roleDetails = function(params) { // 获取角色详情
    return request({
        url: '/vz-island/sys/role/info/' + params,
        method: 'get'
    });
};

export const addRole = function(params) { // 添加角色
    return request({
        url: '/vz-island/sys/role/save',
        method: 'post',
        data: params
    });
};

export const roleModify = function(params) { // 修改角色
    return request({
        url: '/vz-island/sys/role/update',
        method: 'PUT',
        data: params
    });
};

export const deleteRole = function(params) { // 删除角色
    return request({
        url: '/vz-island/sys/role/delete',
        method: 'delete',
        data: params
    });
};