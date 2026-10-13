import { Eye, EyeClosed, Lock, Moon, Sun, User2 } from 'lucide-react'
import React, { useState } from 'react'

const LoginRegisterPage = () => {
    const [themeToggle, setThemeToggle] = useState(false)
    const [formBtn, setFormBtn] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const Icon = themeToggle ? Sun : Moon
    return (
        <div className={`w-full h-svh ${themeToggle ? 'bg-white text-black' : 'bg-black text-white'} mx-auto box-border justify-between`}>
            <div className='w-full h-15 p-4 box-border flex justify-between items-center'>
                <img src={themeToggle ? '/Logo.png' : '/Logo_white_text.png'} width={150} />
                <Icon className='p-1 border box-content border-gray-400 rounded-full cursor-pointer' size={23} color={themeToggle ? 'black' : 'white'} onClick={() => setThemeToggle((prev => !prev))} />
            </div>
            <div className='w-full h-[calc(100%-60px)] overflow-hidden items-start flex justify-between'>
                <div className='w-[50%] pl-25 box-border mt-15 h-auto flex flex-col justify-center items-start gap-3'>
                    <div className='w-[90%] h-auto mx-auto -red-300'>
                        <div className='w-1/2 h-fit mb-8 -green-900'>
                            <div className='w-fit flex justify-start items-center bg-gray-100 text-black p-1 rounded-full'>
                                <button className={`p-2 rounded-full font-semibold cursor-pointer bg-black text-white`}>
                                    Sign In
                                </button>
                                <button className='p-2 rounded-full font-semibold cursor-pointer'>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                        <div className='my-5'>
                            <h1 className='trocchi-regular text-6xl font-bold'>Welcome Back!</h1>
                            <p className='valley-sans text-left my-3 leading-8 text-[18px] text-gray-400'>Welcome to WorkProof, where your skills meet opportunity. <br />
                                Sign in to track your progress and showcase your achievements.</p>
                        </div>
                        <form className='w-[60%] h-fit flex flex-col gap-8 mt-15'>
                            <div className='flex items-center justify-start gap-2 p-2 box-border border border-gray-400 rounded-md'>
                                <User2 className='box-content' />
                                <input type='text' placeholder='Enter Email/Phone Number' className='border-0 outline-0 w-full' />
                            </div>
                            <div className='flex items-center justify-start gap-2 p-2 box-border border border-gray-400 rounded-md'>
                                <Lock className='box-content' />
                                <input type={showPassword?'text':'password'} placeholder='Enter Password' className='border-0 outline-0 w-full' />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="shrink-0 text-gray-500 hover:text-gray-800"
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                                </button>
                            </div>
                            <button className='w-full p-3 box-border rounded-md shrink-0 bg-gray-300 cursor-pointer text-black font-semibold text-lg hover:bg-gray-400 transition-all'>Sign In</button>
                        </form>
                    </div>
                </div>
                <div className='w-[50%] flex items-end ju h-full '>
                    <img src='developerIllu.png' className='w-full object-center' />
                </div>
            </div>
        </div>
    )
}

export default LoginRegisterPage
