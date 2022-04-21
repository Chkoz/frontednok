import { types } from "../types/types";
import { startLoading, finishLoading } from "./ui";
import Swal from 'sweetalert2';
import axios from 'axios'
import { getData } from "./datos";

axios.defaults.baseURL = "https://desarrollo.api.noktos.com/api";

export const startLoginEmailPassword = (email, password, sistema = 2) => {
    return (dispatch) => {
        dispatch(startLoading());
        axios.post("/login", { email, password, sistema })
            .then(({ data }) => {
                if (data.res) {
                    dispatch(login(data.token));
                    dispatch(getData(data.token));
                    dispatch(finishLoading());
                }
                else {
                    Swal.fire('Error', data.message, 'error');
                    dispatch(finishLoading());
                }
            })
            .catch(error => {
                dispatch(finishLoading());
                Swal.fire('Error', error.message, 'error');
            });


    }
};

export const login = (token) => ({
    type: types.login,
    payload: {
        token
    }
});

export const startLogout = () => {
    return async (dispatch) => {
        dispatch(logout());
    }
}

export const logout = () => ({
    type: types.logout
})