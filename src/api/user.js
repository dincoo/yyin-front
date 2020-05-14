import request from '@/router/axios';
import { baseUrl } from '@/config/env';
// import website from "@/config/website";
// 用户名密码登录
export const loginByUsername = (tenantId, account, password, type, key, code) => request({
    url: '/vz-island/sys/login',
    // url: '/api/blade-auth/oauth/token',
    method: 'post',
    data: {
        captcha: code,
        passwd: password,
        userName: account,
        uuid: ''
    }
});

export const getButtons = () => request({
    url: baseUrl + '/blade-system/menu/buttons',
    method: 'get'
});

export const getUserInfo = () => request({
    url: baseUrl + '/user/getUserInfo',
    method: 'get'
});

export const refeshToken = () => request({
    url: baseUrl + '/user/refesh',
    method: 'post'
})

export const getMenu = () => request({
    // url: baseUrl + '/blade-system/menu/routes',
    url: '/vz-island/sys/menu/listMenu',
    method: 'get'
});

export const getCaptcha = () => request({
    url: '/api/blade-auth/oauth/captcha',
    method: 'get'
});

export const getTopMenu = () => request({
    url: baseUrl + '/user/getTopMenu',
    method: 'get'
});

export const sendLogs = (list) => request({
    url: baseUrl + '/user/logout',
    method: 'post',
    data: list
})

export const logout = () => request({
    url: baseUrl + '/user/logout',
    method: 'get'
})