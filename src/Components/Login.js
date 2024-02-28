import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";

const serverURL = process.env.REACT_APP_SERVER_URL;

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    //Automatically goes to the home page if credentials are present in local storage
    //Temporary workaround for JWT
    useEffect(() => {
        if (sessionStorage.getItem('email'))
            navigate('/');
    }, [navigate]);

    const func = () => {
        setLoading(true);
        if (!password || !email)
            return;
        axios.post(serverURL+'/users/validate', { email: email, password: password })
            .then(res => {
                if (res.status === 201) {
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('password', password);
                    sessionStorage.setItem('_id', res.data._id);
                }
                return navigate('/');
            }, (error) => console.log(error));
        setLoading(false);
    }

    return (
        <div className='h-full text-lg flex flex-col justify-evenly items-center pt-8'>
            <input className='placeholder:text-white w-3/5 bg-transparent border-b focus:outline-none focus:border-blue-400' type='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
            <input className='placeholder:text-white w-3/5 bg-transparent border-b focus:outline-none focus:border-blue-400' type='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
            {loading ? <ImSpinner2 class="animate-spin h-10 w-10 mr-3" /> : ''}
            <button className='hover:bg-blue-400 bg-white text-black px-4 py-1 rounded-lg' onClick={func}>Log In</button>
        </div>
    )
}