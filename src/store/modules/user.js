import { setToken, removeToken } from '@/util/auth'
import { setStore, getStore } from '@/util/store'
import { isURL, validatenull } from '@/util/validate'
import { deepClone } from '@/util/util'
import webiste from '@/config/website'
import { loginByUsername, getUserInfo, getMenu, logout, refeshToken, getButtons } from '@/api/user'


function addPath(ele, first) {
    const menu = webiste.menu;
    const propsConfig = menu.props;
    const propsDefault = {
        label: propsConfig.label || 'name',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children'
    };
    const icon = ele[propsDefault.icon];
    ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
    if (!isChild) ele[propsDefault.children] = [];
    if (!isChild && first && !isURL(ele[propsDefault.path])) {
        ele[propsDefault.path] = ele[propsDefault.path] + '/index'
    } else {
        if (!ele[propsDefault.path]) {
            let parentPath = ''
            if (propsDefault.path) {
                let pathList = ele[propsDefault.children][0].path.split('/')
                parentPath = '/' + pathList[1]
            }
            ele[propsDefault.path] = parentPath
        }
        ele[propsDefault.children].forEach(child => {
            addPath(child);
        })
    }

}

const user = {
    state: {
        userInfo: getStore({ name: 'userInfo' }) || [],
        permission: getStore({ name: 'permission' }) || {},
        roles: [],
        menu: getStore({ name: 'menu' }) || [],
        menuAll: [],
        menuModule: [],
        token: getStore({ name: 'token' }) || '',
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit }, userInfo) {
            // console.log(userInfo)
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo).then(res => {
                    const data = res.data;
                    console.log(data)
                    commit('SET_TOKEN', data.token);
                    // commit('SET_USERIFNO', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        GetButtons({ commit }) {
            return new Promise((resolve) => {
                getButtons().then(res => {
                    const data = res.data;
                    if (data)
                        commit('SET_PERMISSION', data);
                    resolve();
                })
            })
        },
        //根据手机号登录
        LoginByPhone({ commit }, userInfo) {
            return new Promise((resolve) => {
                loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    resolve();
                })
            })
        },
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data;
                    commit('SET_ROLES', data.roles);
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        //刷新token
        RefeshToken({ state, commit }) {
            return new Promise((resolve, reject) => {
                refeshToken(state.refeshToken).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_MENU', [])
                    commit('SET_ROLES', [])
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_MENU', [])
                commit('SET_ROLES', [])
                commit('DEL_ALL_TAG');
                commit('CLEAR_LOCK');
                removeToken()
                resolve()
            })
        },
        // 获取头部菜单
        GetTopMenu({ commit }) {
            return new Promise(resolve => {
                // getTopMenu().then((res) => {
                //     const data = res.data || []
                //     resolve(data)
                // })
                getMenu().then(res => {
                    const data = res.data
                    commit('SET_MENU_MODULE', res.data.module)
                    resolve(data)
                })
            })
        },
        //获取系统菜单
        GetMenu({ commit }, parentId) {
            return new Promise(resolve => {
                getMenu(parentId).then((res) => {
                    const data = res.data.asider
                        // console.log(data)
                    let menu = deepClone(data);
                    menu.forEach(ele => {
                            addPath(ele, true);
                        })
                        // commit('SET_MENU', menu)
                    console.log(menu)
                    commit('SET_MENU_ALL', menu)
                        // dispatch('GetButtons');
                    resolve(menu)
                })
            })
        },
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            setToken(token)
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
            setStore({ name: 'userInfo', content: state.userInfo })
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
            setStore({ name: 'menu', content: state.menu, type: 'session' })
        },
        SET_MENU_ALL: (state, menuAll) => {
            state.menuAll = menuAll;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            let result = [];

            function getCode(list) {
                list.forEach(ele => {
                    if (typeof(ele) === 'object') {
                        const chiildren = ele.children;
                        const code = ele.code;
                        if (chiildren) {
                            getCode(chiildren)
                        } else {
                            result.push(code);
                        }
                    }

                })
            }

            getCode(permission);
            state.permission = {};
            result.forEach(ele => {
                state.permission[ele] = true;
            });
            setStore({ name: 'permission', content: state.permission, type: 'session' })
        },
        // 设置菜单模块
        SET_MENU_MODULE: (state, val) => {
            state.menuModule = val
        }
    }

}
export default user