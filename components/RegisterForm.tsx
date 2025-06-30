"use client";

import { createUser } from '@/app/actions/user';
import { useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';

const RegisterForm = () => {
    const { pending } = useFormStatus();

    const submitAction = async (formData: FormData) => {

        try {
            const response = await createUser(formData);

            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success('Registration successful!');
                // Store the token in localStorage or handle authentication
                //  sessionStorage.setItem('token', response.token as string);
                // Redirect or update UI state
            }
        } catch (error) {
            toast.error('An error occurred during registration');
        } finally {
            //setIsLoading(false);
        }
    };

    return (
        <div className="form">
            <h3>Register</h3>
            <form action={submitAction}>
                <div className="form-control">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                    />
                </div>
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
                    {pending ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm; 