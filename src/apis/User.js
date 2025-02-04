import axios from "axios";

export async function userLogin(loginRequest) {
    const resp = await axios.post(
        "/api/user/login",
        loginRequest,
    );
    return resp.data;
}

export async function userRegister(registerRequest) {
    const resp = await axios.post(
        "/api/user/reg",
        registerRequest,
    );
    return resp.data;
}
