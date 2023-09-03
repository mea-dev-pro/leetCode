import { authModalState } from '@/atoms/authModalAtom';
import AuthModal from '@/components/Modals/AuthModal';
import NavBar from '@/components/NavBar/NavBar';
import { auth } from '@/firebase/firebase';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';

type AuthPageProps = {
};

const AuthPage: React.FC<AuthPageProps> = () => {
    const authModal = useRecoilValue(authModalState);
    const [user, loading, error] = useAuthState(auth);
    const [pageLoadig, setPageLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (user) router.push("/");
        if(!loading && !user) setPageLoading(false);
    }, [user, router, loading])

    if (pageLoadig) return ;

    return (
        <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
            <div className='max-w-7xl mx-auto'>
                <NavBar />
                <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
                    <Image src="/hero.png" alt="hero img"  width={700} height={700}/>
                </div>
                {
                    authModal.isOpen && <AuthModal />
                }
            </div>
        </div>
    )
}
export default AuthPage;