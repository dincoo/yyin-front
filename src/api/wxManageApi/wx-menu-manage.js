import { wxManageBaseUrl } from '@/config/env';
import fetch from '@/router/axios';
const baseUrl = wxManageBaseUrl
    // 获取菜单
export const getMenuList = function() {
    return fetch({
        url: baseUrl + '/menuManage/getMenu',
        method: 'get'
    })
};
// 发布菜单
export const addMenu = function(params) {
    return fetch({
        url: baseUrl + '/menuManage/addMenu',
        method: 'post',
        data: params
    })
};