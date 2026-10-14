import React, { useState } from 'react'
import { Mail, Moon, Sun, Lock, Eye, EyeClosed } from 'lucide-react'
import Terminal, { SCENES } from '../Terminal'
const LoginRegisterPage = () => {
  const [theme, setTheme] = useState(false)
  const [showPassowrd, setShowPassowrd] = useState(false)
  const Icon = theme ? Moon : Sun

  // icons 
  const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z" />
    </svg>
  );
  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );

  // styles
  const styleBtn = 'w-1/2 text-center flex items-center justify-center gap-2 py-2 px-8 box-border shrink-0 border border-gray-800 cursor-pointer hover:border-blue-600 transition-all rounded-lg'

  const inputBox=`flex border border-[#292929] items-center ${theme?'bg-white':' bg-[#212121]'} p-2 box-border shrink-0 rounded-lg`
  return (
    <div className={`w-full h-svh overflow-hidden ${theme ? 'text-black bg-white' : "bg-black text-white"} transition-all`}>
      <div className='w-full h-[50px] p-4 box-border flex items-center justify-between'>
        <img alt='logo' src={theme ? 'Logo.png' : '/Logo_white_text.png'} width={150} />
        <Icon size={20} className='transition-all cursor-pointer' onClick={() => setTheme((prev => !prev))} />
      </div>
      <div className='w-full h-full flex justify-between items-start'>
        <div className='w-[40%] mx-auto  h-full flex flex-col items-center justify-start py-10'>
          <div className='w-full text-start'>
            <h1 className='text-5xl trocchi-regular'>Welcome Back!</h1>
            <p className='text-md my-3 open-sans text-gray-400'>Sign in to review assessments and candidate sessions.</p>
            <div className="wp-in mt-15 flex gap-3">
              <button type="button" className={styleBtn}>
                <GoogleIcon /> Google
              </button>
              <button type="button" className={styleBtn}>
                <GithubIcon /> GitHub
              </button>
            </div>
            <div className="wp-in my-8 flex items-center justify-start gap-4 text-[13px] text-[#6B6580]" >
              <span className="h-px flex-1 bg-gray-800" />
              or continue with email
              <span className="h-px flex-1 bg-gray-800" />
            </div>
            <form className='w-[65%] mx-auto px-4 box-border'>
              <div className='w-full leading-8 my-4'>
                <label className='font-semibold text-[12px]'>Email</label>
                <div className={`${inputBox} justify-start`}>
                  <Mail size={18} className='text-gray-400' />
                  <input className='outline-0 pl-2 shrink-0 box-border' placeholder='user@xyz.com' autoComplete='email' />
                </div>
              </div>
              <div className='w-full leading-8'>
                <label className='font-semibold text-[12px]'>Password</label>
                <div className={`${inputBox} flex border items-center justify-between p-2 box-border shrink-0 rounded-lg`}>
                  <div className='flex items-center'>
                    <Lock size={18} className='text-gray-400' />
                    <input type={showPassowrd ? 'text' : 'password'} className='outline-0 pl-2 shrink-0 box-border' placeholder='*******' />
                  </div>
                  <button className='w-fit text-gray-600 cursor-pointer' type='button' aria-label='password' onClick={() => setShowPassowrd((prev) => !prev)}>
                    {showPassowrd ? <Eye size={18} /> : <EyeClosed size={18} />}
                  </button>
                </div>
              </div>
              <div className='w-full text-end'>
                <p className='text-blue-600 font-semibold cursor-pointer text-sm my-2'>Forgot Password?</p>
              </div>
              <button type='button' className='w-full  mt-10 shrink-0 p-3 cursor-pointer box-border font-semibold rounded-lg text-white bg-blue-600 transition-all'>Sign In</button>
            </form>
            <p className='text-center my-2 text-xs'>New to WorkProof ? <span className='text-blue-600 font-semibold cursor-pointer'>Create an account</span> </p>
          </div>
        </div>
        <div className='w-[55%] border-l border-l-gray-800 h-[calc(100%-50px)] flex items-center justify-end'>
          <div className='w-[95%] px-5 h-full flex flex-col gap-6 items-center justify-center rounded-tl-2xl rounded-bl-2xl'>
            <div className='w-full text-start pl-25'>
              <h2 className='text-[clamp(40px,4.5vw,60px)] font-semibold trocchi-regular'>Show The Work We'll <br /> Verify It</h2>
              <p className='text-gray-400 my-3'>Candidates solve real problems in a sandbox with a full IDE and terminal. WorkProof reads how they got there, not what their resume says.</p>
            </div>
            <Terminal cfg={SCENES.signin} active />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRegisterPage
