import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {signup} from '../services/authAPI'
import SignupIcom from '../signup.svg';

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", password: ""})
    const {firstName, lastName, email, password} = formData;

    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData, [e.target.name]: e.target.value
        }))
    }
    const submitHandler = (e) => {
        e.preventDefault()
        console.log(firstName, lastName, email, password)
        signup(firstName, lastName, email, password, navigate)
    }
    return (
        <div className='z-50 w-screen h-screen flex flex-col items-center justify-center'>
            <form className='glass mb-12 w-[35%] h-max p-2 rounded-2xl flex justify-center items-center flex-col gap-4' onSubmit={submitHandler}>
                <div className='w-[50%] h-max flex items-center justify-center'><img src={SignupIcom} alt='' className='object-fit'/></div>
                <label htmlFor='firstName' className='flex gap-4 items-center justify-center w-full'>
                    <p className='w-[20%] text-purple-200 font-medium text-lg text-left'>First Name</p>
                    <input className='focus-visible:border-green-500 focus-visible:ring-2 bg-zinc-300 rounded-lg p-2 w-[67%] text-black' type='text' name='firstName' id='firstName' 
                        placeholder='Enter your first name' onChange={changeHandler}
                    />
                </label>
                <label htmlFor='lastName' className='flex gap-4 items-center justify-center w-full'>
                    <p className='w-[20%] text-purple-200 font-medium text-lg text-left'>Last Name</p>
                    <input className='focus-visible:border-green-500 focus-visible:ring-2 bg-zinc-300 rounded-lg p-2 w-[67%] text-black' type='text' name='lastName' id='lastName' 
                        placeholder='Enter your last name' onChange={changeHandler}
                    />
                </label>
                <label htmlFor='email' className='flex gap-4 items-center justify-center w-full'>
                    <p className='w-[20%] text-purple-200 font-medium text-lg text-left'>Email</p>
                    <input className='focus-visible:border-green-500 focus-visible:ring-2 bg-zinc-300 rounded-lg p-2 w-[67%] text-black' type='text' name='email' id='email' 
                        placeholder='Enter email'  onChange={changeHandler}
                    />
                </label>
                <label htmlFor='password' className='flex gap-4 items-center justify-center w-full'>
                    <p className='w-[20%] text-purple-200 font-medium text-lg text-left'>Password</p>
                    <input className='focus-visible:border-green-500 focus-visible:ring-2 bg-zinc-300 rounded-lg p-2 w-[67%] text-black' type='password' name='password' id='password' 
                        placeholder='Enter password'  onChange={changeHandler}
                    />
                </label>
                <button type="submit" className='button w-[30%] rounded-xl text-zinc-700 place-self-end text-xl mr-8 p-1 py-2 hover:scale-95  transition-all duration-400 ' onClick={submitHandler}>
                    Sign up 
                </button>
            </form>
        </div>
    )
}

export default Signup
