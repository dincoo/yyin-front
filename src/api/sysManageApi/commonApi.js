import request from '@/router/axios';
export const departList = function() { // 获取部门列表
    return request({
        url: '/vz-island/sys/dept/list',
        method: 'get'
    });
};

export const roleSelectList = function() { // 权限选择列表;
    return request({
        url: '/vz-island/sys/role/select',
        method: 'get'
    });
};

export const menuAllList = function() { // 权限选择列表;
    return request({
        url: '/vz-island/sys/menu/list',
        method: 'get'
    });
};