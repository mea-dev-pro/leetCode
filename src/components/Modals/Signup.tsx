import { authModalState } from '@/atoms/authModalAtom';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { auth, firestore } from '@/firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";


type SignupProps = {

};


const Signup: React.FC<SignupProps> = () => {

    const setAuthModalState = useSetRecoilState(authModalState);
    const [inputs, setInput] = useState({ email: '', displayName: '', password: '' })
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleClick = (type: 'login' | 'register' | 'forgotPassword') => {
        setAuthModalState((prev) => ({ ...prev, type: type }))
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password || !inputs.displayName) return alert("Please fill all fields");
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            const userData = {
                uid: newUser.user.uid,
                email: newUser.user.email,
                displayName: inputs.displayName,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems: [],
                dislikedProblems: [],
                solvedProblems: [],
                starredProblems: [],
            };
            console.log("userData => ", userData);
            // await setDoc(doc(firestore, "users", newUser.user.uid), userData);
            router.push('/');

        } catch (error: any) {
            if (error) {
                toast.warn(error.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
        }
    }

    return <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
        <h3 className='test-xl font-medium text-white'>Register to LeetClone</h3>
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
            <label htmlFor="displayName" className='text-sm font-medium block mb-2 text-gray-300'>Display Name</label>
            <input
                onChange={handleChangeInput}
                type="displayName" name="displayName" id="displayName" className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                placeholder='name exemple'
            />
        </div>
        <div>
            <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'>Password</label>
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
            {loading ? "Register..." : "Register"}
        </button>
        <div className='text-sm font-medium text-gray-300'>
            Alredy have account?{" "}
            <a href="#" className='text-blue-700 hover:underline' onClick={() => handleClick("login")}>Log Int</a>
        </div>
    </form>
}
export default Signup;