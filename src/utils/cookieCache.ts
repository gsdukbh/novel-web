/**
 *  cookie 缓冲
 */
import Cookies from 'js-cookie';
import type {UserState} from "@/types/userInfo";

const TokenKey = 'loginToken';

/**
 * 获取token
 */
export function getToken() : UserState {
    return Cookies.get(TokenKey) as UserState;
}

export function setToken(token: any) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function getCache(key: string) {
    return Cookies.get(key);
}

export function setCache(Key: string, value: string) {
    return Cookies.set(Key, value);
}

export function removeCache(key: string) {
    return Cookies.remove(key);
}
