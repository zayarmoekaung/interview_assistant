import axios from 'axios';

const axiosInstance = axios.create({
     headers: {
        'Content-Type': 'application/json',
    },
});

export const makePostRequest = async (url: string, data: any, headers = {}) => {
    try {
        const response = await axiosInstance.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const makeGetRequest = async (url: string, headers = {},params = {}) => {
    try {
        const response = await axiosInstance.get(url, { headers, params });
        return response.data;
    } catch (error) {
        throw error;
    }
};