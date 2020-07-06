import { wxManageBaseUrl } from '@/config/env';
import fetch from '@/router/axios';
const baseUrl = wxManageBaseUrl

// 获取用户列表
export const getUserList = function(params) {
    return fetch({
        url: baseUrl + '/userManage/getUserList',
        method: 'post',
        data: params
    });
};
// 同步数据
export const synchronousData = function() {
    return fetch({
        url: baseUrl + '/userManage/syncUserList',
        method: 'get'
    });
};
// 为用户添加标签
export const usersAddTags = function(params) {
    return fetch({
        url: baseUrl + '/tagManage/usersAddTags',
        method: 'post',
        data: params
    });
};
// 为用户去标签
export const usersDeleteTags = function(params) {
    return fetch({
        url: baseUrl + '/tagManage/usersDeleteTags',
        method: 'post',
        data: params
    });
};
// 设置用户备注
export const setUserRemark = function(params) {
    return fetch({
        url: baseUrl + '/userManage/setUserRemark',
        method: 'post',
        data: params
    });
};
// 获取标签列表
export const getTags = function() {
    return fetch({
        url: baseUrl + '/tagManage/getTags',
        method: 'get'
    });
};
// 创建标签
export const createTag = function(params) {
    return fetch({
        url: baseUrl + '/tagManage/createTag',
        method: 'post',
        data: params
    });
};
// 删除标签
export const deleteTags = function(params) {
    return fetch({
        url: baseUrl + '/tagManage/deleteTags',
        method: 'post',
        data: params
    });
};
// 更新标签
export const updateTags = function(params) {
    return fetch({
        url: baseUrl + '/tagManage/updateTag',
        method: 'post',
        data: params
    });
};
// 获取消息记录
export const getUserMessage = function(params) {
    return fetch({
        url: baseUrl + '/userMessageManage/getUserMessage',
        method: 'post',
        data: params
    });
};
// 发送消息
export const sendMessage = function(params) {
    return fetch({
        url: baseUrl + '/kefu/sendMessage',
        method: 'post',
        data: params
    });
}