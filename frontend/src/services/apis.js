const BASE_URL = process.env.REACT_APP_BASE_URL;

export const authEndpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login"
}

export const torrentEndpoints = {
    DOWNLOAD_API : BASE_URL + "/torrents/download",
}