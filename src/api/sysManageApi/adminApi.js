import request from '@/router/axios';
export const userList = function(params) { // 获取用户列表
    return request({
        url: '/vz-island/sys/user/list',
        method: 'post',
        data: params
    });
};

export const userDetails = function(params) { // 查询用户详情
    return request({
        url: '/vz-island/sys/user/info/' + params,
        method: 'get'
    });
};

export const validateUserName = function(params) {
    return request({
        url: '/vz-island/sys/user/validateUserName',
        method: 'post',
        data: params
    });
}

export const addUser = function(params) { // 新增用户
    return request({
        url: '/vz-island/sys/user/save',
        method: 'post',
        data: params
    });
};

export const ModifyUser = function(params) { // 修改用户
    return request({
        url: '/vz-island/sys/user/update',
        method: 'put',
        data: params
    });
};

export const deleteUser = function(params) { //删除用户
    return request({
        url: '/vz-island/sys/user/delete',
        method: 'delete',
        data: params
    });
};

export const roleSelectList = function() { // 权限选择列表;
    return request({
        url: '/vz-island/sys/role/select',
        method: 'post'
    });
};

export const resetPwd = function(params) { //重置密码
    return request({
        url: '/vz-island/sys/user/resetPwd',
        method: 'put',
        data: params
    });
};