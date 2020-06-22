import request from '@/router/axios';
import { baseUrl } from '@/config/env';
export const departList = function() { // 获取部门列表
    return request({
        url: baseUrl + '/sys/dept/list',
        method: 'get'
    });
};

export const roleSelectList = function() { // 权限选择列表;
    return request({
        url: baseUrl + '/sys/role/select',
        method: 'get'
    });
};

export const menuAllList = function() { // 权限选择列表;
    return request({
        url: baseUrl + '/sys/menu/list',
        method: 'get'
    });
};