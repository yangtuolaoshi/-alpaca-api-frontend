import axios from "axios";

export async function selectInterfaceInfoByPage(page, size) {
    const resp = await axios.get(
        "/api/interfaceInfo/page",
        {
            params: {
                page,
                size
            }
        }
    );
    return resp.data;
}

export async function addInterfaceInfo(interfaceInfo) {
    let url = "/api/interfaceInfo";
    const resp = await axios.post(
        url,
        interfaceInfo
    );
    return resp.data;
}

export async function deleteInterfaceInfoById(id) {
    let url = "/api/interfaceInfo" + "/" + id;
    const resp = await axios.delete(
        url
    );
    return resp.data;
}

export async function updateInterfaceInfo(data) {
    let url = "/api/interfaceInfo";
    const resp = await axios.put(
        url,
        data
    );
    return resp.data;
}

export async function publishInterfaceInfo(id) {
    const resp = await axios.put(
        "/api/interfaceInfo/publish/" + id
    );
    return resp.data;
}

export async function offlineInterfaceInfo(id) {
    const resp = await axios.put(
        "/api/interfaceInfo/offline/" + id
    );
    return resp.data;
}

export async function getInterfaceInfoById(id) {
    const resp = await axios.get(
        "/api/interfaceInfo/" + id
    );
    return resp.data;
}

export async function onlineInvoke(body, params) {
    let url = "/api/interfaceInfo/invoke";
    if (params !== null && params !== "") {
        url += params;
    }
    const resp = await axios.post(
        url,
        body
    );
    console.log(resp);
    return resp.data;
}
