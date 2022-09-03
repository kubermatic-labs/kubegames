import got from 'got'
import token from './token.js';


const header = {
    'authorization': 'Bearer ' + token,
    'accept': 'application/json',
    'Content-Type': 'application/json'
}


const post = function (uri, payload) {
    (async () => {
        try {
            const res = await got.post(uri, {
                responseType: 'json',
                headers: header,
                json: payload
            }).json();
            return res;
        } catch (error) {
            console.log(error);
            //=> 'Internal server error ...'
        }
    })();
}

const put = function (uri, payload) {
    (async () => {
        try {
            const res = await got.put(uri, {
                responseType: 'json',
                headers: header,
                json: payload
            }).json();
            return res;
        } catch (error) {
            console.log(error);
            //=> 'Internal server error ...'
        }
    })();
}

const get = async (uri) => {
    try {

        const res = await got.get(uri, {
            responseType: 'json',
            headers: header,
        }).json();

        return res;
    } catch (error) {
        console.log(error);
        //=> 'Internal server error ...'
    }
}

const remove = async function (uri) {
    try {

        return await got.get(uri, {
            responseType: 'json',
            headers: header,
        }).json();

    } catch (error) {
        console.log(error);
        //=> 'Internal server error ...'
    }
}

export default {post, put, get, remove}