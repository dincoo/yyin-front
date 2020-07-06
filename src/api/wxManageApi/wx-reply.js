import { wxManageBaseUrl } from '@/config/env';
import fetch from '@/router/axios';
const baseUrl = wxManageBaseUrl
    // 获取关注时回复配置
export const getFollowReply = function(params) {
    return fetch({
        url: baseUrl + '/eventConfig/getFollowReply',
        method: 'post',
        data: params
    });
};
// 更新关注时回复配置
export const updateFollowReply = function(params) {
    return fetch({
        url: baseUrl + '/eventConfig/updateFollowReply',
        method: 'post',
        data: params
    });
};
// 添加关注时回复配置
export const addFollowReply = function(params) {
    return fetch({
        url: baseUrl + '/eventConfig/addFollowReply',
        method: 'post',
        data: params
    });
};
// 删除回复
export const deleteReply = function(params) {
    return fetch({
        url: baseUrl + '/eventConfig/deleteReply',
        method: 'post',
        data: params
    });
};
// 获取关键词回复配置
export const getKeywordReply = function(params) {
    return fetch({
        url: baseUrl + '/eventConfig/getKeywordReply',
        method: 'post',
        data: params
    });
};
// 添加关键词回复配置
export const addKeywordReply = function(params) {
    return fetch({
        url: baseUrl + '/eventConfig/addKeywordReply',
        method: 'post',
        data: params
    });
};
// 更新关键词回复配置
export const updateKeywordReply = function(params) {
    return fetch({
        url: baseUrl + '/eventConfig/updateKeywordReply',
        method: 'post',
        data: params
    });
};
// 获取其他事件配置
export const getEventConfigList = function(params) {
    return fetch({
        url: baseUrl + '/eventConfig/getEventConfigList',
        method: 'post',
        data: params
    });
};
// 添加其他回复事件配置
export const addEventConfig = function(params) {
    return fetch({
        url: baseUrl + '/eventConfig/addEventConfig',
        method: 'post',
        data: params
    });
};
// 更新其他回复事件配置
export const updateEventConfig = function(params) {
    return fetch({
        url: baseUrl + '/eventConfig/updateEventConfig',
        method: 'post',
        data: params
    });
};
// 更新配置状态
export const updateEnable = function(params) {
    return fetch({
        url: baseUrl + '/eventConfig/updateEnable',
        method: 'post',
        data: params
    });
}