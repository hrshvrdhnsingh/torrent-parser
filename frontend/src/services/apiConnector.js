import axios from 'axios';

export const axiosInstance = axios.create({
    timeout: 100000,
});

export const apiConnector = async (method, url, bodyData = null, header = {}, params = null) => {
    try {
        const response = await axiosInstance({
            method: method, url: url, data: bodyData,
            header: header, params: params,
        });
        return response;
    }
    catch(err) {
        console.log('API error -> ', err)
    }
};