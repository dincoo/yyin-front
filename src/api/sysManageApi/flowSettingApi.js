import request from '@/router/axios';
export const flowSettingList = function() { // 获取配置列表
    return request({
        url: '/sys/flow/list',
        method: 'get',
    });
};

export const updateFlowSetting = function(params) {
    return request({
        url: 'sys/flow/update',
        method: 'put',
        data: params
    })
};