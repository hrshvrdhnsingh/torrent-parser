import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {login} from '../services/authAPI'
import loginIcon from '../download.svg';

const Login = () => {
    const [formData, setFormData] = useState({email: "", password: ""})
    const navigate = useNavigate()
    const {email, password} = formData;

    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value
        }))
    }
    const submitHandler = (e) => {
        e.preventDefault();
        login(email, password, navigate)
    }

    return (
        <div className='z-50 w-screen h-screen flex items-center justify-center'>
            <form onSubmit={submitHandler} className='glass w-[40%] h-max p-4 rounded-2xl flex justify-center items-center flex-col gap-4'>
                <div className='w-full h-max flex items-center justify-center'><img src={loginIcon} alt='' className='w-[50%]'/></div>
                <label htmlFor='email' className='flex gap-4 items-center justify-center w-full'>
                    <p className='w-[20%] text-purple-200 font-medium text-lg text-left'>First Name</p>
                    <input className='focus-visible:border-green-500 focus-visible:ring-2 bg-zinc-300 rounded-lg p-2 w-[60%] text-black' type='text' name='email' id='email' 
                        placeholder='Enter email' onChange={changeHandler}
                    />
                </label>
                <label htmlFor='lastName' className='flex gap-4 items-center justify-center w-full'>
                    <p className='w-[20%] text-purple-200 font-medium text-lg text-left'>Last Name</p>
                    <input className='focus-visible:border-green-500 focus-visible:ring-2 bg-zinc-300 rounded-lg p-2 w-[60%] text-black' type='password' name='password' id='password' 
                        placeholder='Enter password' onChange={changeHandler}
                    />
                </label>
                <button type="submit" className='button w-[30%] rounded-xl text-zinc-700 place-self-end text-xl mr-8 p-1 py-2 hover:scale-95  transition-all duration-400 ' onClick={submitHandler}>
                    Login 
                </button>
            </form>
        </div>
    )
}

export default Login