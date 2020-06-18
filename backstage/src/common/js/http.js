import axios from 'axios'
function get(url, params = {}) {
    const token = JSON.parse(localStorage.getItem('htuser')).token;
    return new Promise((resolve, reject) => {
        axios({
            url,
            params,
            headers: {
                'Authorization': token
            }
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}
function post(url, data = {}) {
    const token = JSON.parse(localStorage.getItem('htuser')).token;
    return new Promise((resolve, reject) => {
        axios({
            url,
            data,
            method:'POST',
            headers: {
                'Authorization': token
            }
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export default{
    get,post
}
