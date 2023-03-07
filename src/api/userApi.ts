import type {UserInfo} from "@/types/userInfo";
import {requestHttp} from "@/utils/axios/request";
import type {UserState} from "@/types/userInfo";

export enum apiUrl {
    login = '/login',
    getCaptcha = '/captcha',
    refreshToken = '/refreshToken',
}

export function login(userInfo: UserInfo): Promise<UserState> {
    return requestHttp.post<UserState>(apiUrl.login, userInfo)
}