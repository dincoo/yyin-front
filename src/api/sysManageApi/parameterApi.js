import request from '@/router/axios';
export const parameterList = function(params) { // 获取参数列表
    return request({
        url: 'sys/parameter/list',
        method: 'post',
        data: params
    });
};

export const addParameter = function(params) { // 新增参数行
    return request({
        url: '/sys/parameter/save',
        method: 'post',
        data: params
    });
};

export const updateParameter = function(params) {
    return request({
        url: '/sys/parameter/update',
        method: 'put',
        data: params
    });
};

export const deleteParameter = function(params) { //删除参数行
    return request({
        url: '/sys/parameter/delete',
        method: 'delete',
        data: params
    });
};