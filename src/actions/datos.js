import axios from 'axios'
import { types } from '../types/types';

axios.defaults.baseURL = "https://desarrollo.api.noktos.com/api";

export const getData = (token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    return (dispatch) => {
        axios.get("/admin/hosts/10")
            .then(({ data }) => {
                dispatch(datos(data.host));
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const datos = (host) => ({
    type: types.getData,
    payload: {
        host
    }
});