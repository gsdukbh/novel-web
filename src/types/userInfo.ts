import type {RootState} from "@/types/store";

export  interface UserInfo {
    username?: string;
    password?: string;
    uid?: number;
    email?: string;
    phone?:string;
    enabled?: boolean;
    accountNonExpired?:boolean;
    credentialsNonExpired?: boolean;
    accountNonLocked?: boolean;
    authorities?: RoleInfo[];
}
export interface RoleInfo {
    id?: number;
    name?: string;
    code?: string;
}
export interface UserState extends  RootState{
    user?: UserInfo;
    token?: string;
}
