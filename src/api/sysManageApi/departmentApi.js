import request from '@/router/axios';
export const departAdd = function(params) { // 添加
    return request({
        url: '/sys/dept/save',
        method: 'post',
        data: params
    });
};

export const departUpdate = function(params) { // 修改
    return request({
        url: '/sys/dept/update',
        method: 'post',
        data: params
    });
};

export const departDelete = function(params) { // 删除
    return request({
        url: '/sys/dept/delete/' + params,
        method: 'delete'
    });
};