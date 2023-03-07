import { MyAxios } from '@/utils/axios/MyAxios';
import {baseUrl,axiosTimeout} from "@/config/defaultSetting";

export const requestHttp = new MyAxios({
  baseURL: baseUrl,
  timeout: 1000 * axiosTimeout,
});
