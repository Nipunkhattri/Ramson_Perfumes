import React, { useState } from 'react'
import './Register.css'
import { Navbar } from '../Home /Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { loginDispatcher, registerDispatcher } from '../../redux/features/AuthSlice'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setlogin] = useState(true);
    const [login_credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [register_credentials, setregistercredentials] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    })

    const handleSubmitlogin =  async (event) => {
        event.preventDefault();
        const res = await dispatch(loginDispatcher(login_credentials))
        if(res.status == 200){
            navigate('/');
        }
    };

    const handleSubmitregister = async (event) => {
        event.preventDefault();
        console.log(register_credentials);
        const res = await dispatch(registerDispatcher(register_credentials))
        console.log(res);
        if(res.status == 200){
            setlogin(!login)
        }
    };

    const handleChange = (event) => {
        setCredentials({
            ...login_credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeregister = (event) => {
        setregistercredentials({
            ...register_credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handletoggle = () => {
        setlogin(!login)
    }
    return (
        <div className='register-container'>
            <Navbar />
            <hr />
            <div>
                <div className={`${login?'login-form':'register-form'}`}>
                    <div className='login_or_register'>
                        <button className={`lg ${login?'color':''}`} onClick={handletoggle}>Login</button>
                        <button className={`lg ${login?'':'color'}`} onClick={handletoggle}>Register</button>
                    </div>
                    {
                        login ?
                            <form onSubmit={handleSubmitlogin}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder='email'
                                    value={login_credentials.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder='password'
                                    value={login_credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="submit">Log In</button>
                            </form>
                            :
                            <form onSubmit={handleSubmitregister}>
                                <div className='input_name'>
                                    <input
                                        type="text"
                                        className='input_name_text'
                                        name='firstname'
                                        placeholder='Firstname'
                                        value={register_credentials.firstname}
                                        onChange={handleChangeregister}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name='lastname'
                                        className='input_name_text'
                                        placeholder='LastName'
                                        value={register_credentials.lastname}
                                        onChange={handleChangeregister}
                                        required
                                    />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder='email'
                                    value={register_credentials.email}
                                    onChange={handleChangeregister}
                                    required
                                />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder='password'
                                    value={register_credentials.password}
                                    onChange={handleChangeregister}
                                    required
                                />
                                {
                                    login?
                                    <button type="submit">Log In</button>
                                    :
                                    <button type="submit">Register</button>
                                }
                            </form>
                    }
                    <a href="#">Create Account</a>
                </div>
            </div>

        </div>
    )
}
