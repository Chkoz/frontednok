import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import Swal from 'sweetalert2';


export const LoginScreen = () => {

    const dispatch = useDispatch();
    const {loading, msgError } = useSelector(state => state.ui);
    const [formValues, handleInputChange] = useForm({
        email: 'demosistemas@yopmail.com',
        password: 'Prueba@1'
    });
    const { email, password } = formValues;
    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            Swal.fire('','Escrive un correo correcto','warning');
            return false;
        }
        else if (password.trim().length === 0) {
            Swal.fire('','Escribe password','warning');
            return false;
        }
        return true;
    }
    const handleLogin = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startLoginEmailPassword(email, password));
        }

    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}>
                {
                    msgError&&
                    <div className="auth__alert-error">{msgError}</div>}
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>

            </form>
        </>
    )
}
