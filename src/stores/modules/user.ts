import {defineStore} from "pinia";
import {ref} from "vue";
import type {UserInfo, UserState} from "@/types/userInfo";
import {getToken, setToken} from "@/utils/cookieCache";
import {login} from "@/api/userApi";

export const userStore = defineStore('userStore',
    () => {

        const tokenStore = ref<UserState>({
            user: <UserInfo>{},
            token: '',
            information: '',
            createTime: new Date
        })

        function getTokenInfo(): UserState {
            if (tokenStore.value == undefined) {
                tokenStore.value = getToken();
            }
            return tokenStore.value as UserState;
        }

        async function Login(info: UserInfo) {
            return new Promise((resolve, reject) => {
                login(info).then((response) => {
                    tokenStore.value.user =  response.user;
                    tokenStore.value.token = response.token;
                    setToken(tokenStore)
                    resolve(response)
                }).catch((err) => {
                    reject(err)
                })
            })
        }

        return {getTokenInfo, Login,tokenStore}
    })
