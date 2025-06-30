"use client";

import { signin } from '@/app/actions/user';
import { useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
    const { pending } = useFormStatus();
    const router = useRouter();

    const submitAction = async (formData: FormData) => {

        try {
            const response = await signin(formData);

            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success('Signin successful!');
                router.push("/")                
            }
        } catch (error) {
            console.log(error , "error");
            toast.error('An error occurred during signin');
        }
    };

    return (
        <div className="signin-form">
            <h3>Signin</h3>
            <form action={submitAction}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <button 
                    className="btn" 
                    type="submit" 
                    disabled={pending}
                >
                    {pending ? 'Signingin...' : 'Signin'}
                </button>
            </form>
            <p>Don't have an account? <Link href="/signup">Register</Link></p>
        </div>
    );
};

export default SignInForm; 