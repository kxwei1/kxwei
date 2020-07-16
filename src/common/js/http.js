import axios from 'axios'
import store from '../../store'
function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            params,
            headers: {
                'Authorization': store.state.adminUser.token
            }
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}
function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            data,
            method:'POST',
            headers: {
                'Authorization': store.state.adminUser.token
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
