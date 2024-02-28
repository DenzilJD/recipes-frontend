import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem('email'))
            navigate('/');
    }, [navigate]);

    const func = () => {
        if (!password || !email)
            return;

        //Need to add toast for password and confirmation password mismatch

        if(password!==cPassword)
            return;
        axios.post('http://localhost:5000/users/create',
            {
                name: name,
                email: email,
                password: password,
                cPassword: cPassword,
            })
            .then(res => {
                if (res.status === 201) {
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('password', password);
                }
                return navigate('/');
            }, (error) => console.log(error));
    }
    
    return (
        <div className='h-full text-lg flex flex-col justify-evenly items-center pt-8'>
            <input className='placeholder:text-white w-3/5 bg-transparent border-b focus:outline-none focus:border-blue-400' type='text' placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
            <input className='placeholder:text-white w-3/5 bg-transparent border-b focus:outline-none focus:border-blue-400' type='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
            <input className='placeholder:text-white w-3/5 bg-transparent border-b focus:outline-none focus:border-blue-400' type='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
            <input className='placeholder:text-white w-3/5 bg-transparent border-b focus:outline-none focus:border-blue-400' type='password' placeholder='Confirm Password' onChange={(e) => { setCPassword(e.target.value) }} />
            <button className='hover:bg-blue-400 bg-white text-black px-4 py-1 rounded-lg' onClick={func}>Sign Up</button>
        </div>
    )
}