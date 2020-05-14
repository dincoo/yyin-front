import request from '@/router/axios';
export const sysLogList = function(params) { // 获取日志列表
    return request({
        url: '/sys/log/list',
        method: 'post',
        data: params
    });
};