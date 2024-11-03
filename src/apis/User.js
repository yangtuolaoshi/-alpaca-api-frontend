import axios from "axios";

export interface User {
    id: number,
    username: string,
    password: string,
    nickname: string,
    createTime: string,
    updateTime: string,
    isDeleted: number,
}

export interface LoginRequest {
    username: string,
    password: string,
}

export async function userLogin(loginRequest: LoginRequest) {
    const resp = await axios.post(
        "/api/user/login",
        loginRequest,
    );
    return resp.data;
}
