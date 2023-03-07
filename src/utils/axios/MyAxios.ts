import type  {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse
} from 'axios';
import type {MyAxiosOptions} from '@/utils/axios/MyAxiosOptions';
import {getToken} from "@/utils/cookieCache";
import {addMinutes, compareDate} from '@/utils';
import {message} from 'ant-design-vue';
import qs from 'qs';
import {tokenTimeout} from '@/config/defaultSetting';

import {userStore} from "@/stores/modules/user";
import axios from "axios";

export class MyAxios {
    private axiosInstance: AxiosInstance;
    private readonly options: MyAxiosOptions;

    constructor(options: MyAxiosOptions) {
        this.options = options;
        this.axiosInstance = axios.create(options);
        this.setupInterceptors()
    }

    getAxios(): AxiosInstance {
        return this.axiosInstance;
    }

    private createAxios(config: MyAxiosOptions) {
        this.axiosInstance = axios.create(config);
    }

    configAxios(config: MyAxiosOptions) {
        if (!this.axiosInstance) {
            return;
        }
        this.createAxios(config);
    }

    setHeaders(headers: any): void {
        if (!this.axiosInstance) {
            return;
        }
        Object.assign(this.axiosInstance.defaults.headers, headers);
    }

    get<T = any>(url: string, config: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.get(url, config);
    }

    getAction<T = any>(url: string, data?: any): Promise<T> {
        return this.axiosInstance.request({
            method: 'get',
            params: qs.stringify(data),
            url: url,
        });
    }

    put<T = any>(
        config: AxiosRequestConfig|undefined,
        url: string,
        data?: any
    ): Promise<T> {
        return this.axiosInstance.put(url, data, config);
    }


    post<T = any>(url: string, data?: any): Promise<T> {
        return this.axiosInstance.post(url, data);
    }

    private setupInterceptors() {
        this.axiosInstance.interceptors.request.use(
            // @ts-ignore
            (config) => {
                return MyAxios.requestInterceptors(config);
            },

            (error) => {
                MyAxios.messageErr(error.message);
                return error;
            }
        );
        this.axiosInstance.interceptors.response.use(
            (res) => {
                return MyAxios.responseInterceptors(res);
            },
            (error) => {
                MyAxios.messageErr(error.message);
                return error;
            }
        );
    }

    /**
     * 响应处理
     * @private
     */
    private static responseInterceptors(res: AxiosResponse) {
        const data = res.data;
        switch (data.code) {
            case 500:
            case 404:
            case 403:
            case 401:
                MyAxios.messageErr(data.message);
                return Promise.reject(data.message);
        }
        return data.data;
    }

    /**
     * @description: 请求拦截器处理
     */
    private static requestInterceptors(config: AxiosRequestConfig) {
        // @ts-ignore
        if (!import.meta.env.SSR) {
            // useStore.dispatch('refreshToken');
            const tokenInfo = getToken();
            if (tokenInfo) {
                // @ts-ignore
                config.headers.Authorization = tokenInfo.token;
                if (compareDate(addMinutes(tokenInfo.createTime as Date, tokenTimeout), new Date()) < 0) {

                }
            }
        }
        return config;
    }

    private static messageErr(msg: any) {
        // @ts-ignore
        if (!import.meta.env.SSR) {
            message.error(msg, 3);
        }
    }
}
