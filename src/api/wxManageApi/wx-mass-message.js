import { wxManageBaseUrl } from '@/config/env';
import fetch from '@/router/axios';
const baseUrl = wxManageBaseUrl
    // 获取群发记录
export const getMassRecord = function(params) {
    return fetch({
        url: baseUrl + '/messMessageManage/getMassRecord',
        method: 'post',
        data: params
    });
};
// 发送消息
export const sendMassMessage = function(params) {
    return fetch({
        url: baseUrl + '/messMessageManage/sendMessage',
        method: 'post',
        data: params
    });
};
// 删除消息记录
export const deleteRecord = function(params) {
    return fetch({
        url: baseUrl + '/messMessageManage/deleteRecord',
        method: 'post',
        data: params
    });
};