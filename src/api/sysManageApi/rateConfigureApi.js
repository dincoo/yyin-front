import request from '@/router/axios';
export const rateConfigureList = function(params) { // 获取利率配置列表
    return request({
        url: '/sys/rateConfigure/list',
        method: 'post',
        data: params
    });
};
export const addRateConfigure = function(params) { // 新增利率配置行
    return request({
        url: '/sys/rateConfigure/save',
        method: 'post',
        data: params
    });
};

export const updateRateConfigure = function(params) { //修改利率配置行
    return request({
        url: '/sys/rateConfigure/update',
        method: 'put',
        data: params
    });
};

export const deleteRateConfigure = function(params) { //删除利率配置行
    return request({
        url: '/sys/rateConfigure/delete',
        method: 'delete',
        data: params
    });
}