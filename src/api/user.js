import request from '@/router/axios';
import { baseUrl } from '@/config/env';
// import website from "@/config/website";
// 用户名密码登录
export const loginByUsername = (params) => request({
    url: baseUrl + '/login',
    method: 'post',
    data: params
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
    url: baseUrl + '/sys/menu/listMenu',
    method: 'get',
    data: {}
});

export const getCaptcha = () => request({
    url: baseUrl + '/captcha.jpg',
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
    url: baseUrl + '/sys/logout',
    method: 'get'
})