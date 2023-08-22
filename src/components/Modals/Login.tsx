import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { toast } from "react-toastify";


type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {

    const setAuthModalState = useSetRecoilState(authModalState);
    const [inputs, setInput] = useState({ email: '', password: '' })
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const handleClick = (type: 'login' | 'register' | 'forgotPassword') => {
        setAuthModalState((prev) => ({ ...prev, type: type }))
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) return alert("Please fill all fields");
        try {
            const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
            console.log(newUser);
            if (!newUser) return;
            router.push('/');
        } catch (error:any) {
            alert(error);
        }
    }
    
    useEffect(() => {
      if(error)   toast.warn(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
    }, [error])
    
    return <form className='space-y-6 px-6 pb-4' onSubmit={handleLogin}>
        <h3 className='test-xl font-medium text-white'>Sign in to LeetClone</h3>
        <div>
            <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300'> Your email</label>
            <input
                onChange={handleChangeInput}
                type="email" name="email" id="email" className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                placeholder='name@gmail.com'
            />
        </div>
        <div>
            <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'> Your Password</label>
            <input
                onChange={handleChangeInput}
                type="password" name="password" id="password" className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                placeholder='*********'
            />
        </div>
        <button
            type='submit'
            className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'
        >
            
            {loading ? "Login..." : "Login"}

        </button>
        <button
            className='flex w-full justify-end'
            onClick={() => handleClick("forgotPassword")}
        >
            <a href="#" className='text-sm block text-brand-orange hover:underline w-full text-right'>
                Forget Password
            </a>
        </button>
        <div className='text-sm font-medium text-gray-300'>
            Not Register?{" "}
            <a href="#" className='text-blue-700 hover:underline' onClick={() => handleClick("register")}>Create account</a>
        </div>
    </form>
}
export default Login;