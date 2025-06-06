import axios from 'axios';

export class Http {

    static sendRequest(config) {
        return axios(config);
    };

    // Get method
    static get(url, headers) {
        const config = {
            url: url,
            method: 'GET',
            headers: headers,
            responseType: 'json',
        };
        return this.sendRequest(config);
    };

    // Post method
    static post(url, data, headers) {
        const config = {
            url: url,
            method: 'POST',
            data: data,
            headers: headers,
            responseType: 'json',
        };
        return this.sendRequest(config);
    };

    // Put method
    static put(url, data, headers) {
        const config = {
            url: url,
            method: 'PUT',
            data: data,
            headers: headers,
            responseType: 'json',
        };
        return this.sendRequest(config);
    };

    // Delete method
    static delete(url, headers) {
        const config = {
            url: url,
            method: 'DELETE',
            headers: headers,
            responseType: 'json',
        };
        return this.sendRequest(config);
    };
};