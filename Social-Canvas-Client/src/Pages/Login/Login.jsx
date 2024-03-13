import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        try {
            // console.log(data);
            const result = await signIn(data.email, data.password);
            // console.log(result);
            // console.log("Login successful", result.user);
            // console.log("token from onSubmit: ", token);
            // Make a POST request to your Django backend for login
            const response = await axios.post('https://social-canvas.onrender.com/accounts/login/', data);

            // Handle the response as needed
            // console.log('Login successful:', response.data);
            // console.log('Token: ', response.data.token);

            localStorage.setItem("access-token", response.data.token);

            // setToken(response.data.token);
            // console.log('Token after setToken: ', token);

            // localStorage.setItem('sessionid', response.data.token);
            // document.cookie = 'csrftoken=' + response.data.csrf_token
            // document.cookie = "sessionid=" + response.data.session_id

            // console.log('csrftoken', response.data.csrf_token)
            // console.log('sessionid', response.data.session_id)


            // You may want to redirect or perform other actions after successful login
            navigate(from, { replace: true });
        } catch (error) {
            // Handle login errors, log them, etc.
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            className={`mt-1 p-2 w-full border rounded ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`mt-1 p-2 w-full border rounded ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        disabled={!Object.keys(errors).length === 0}
                    >
                        Login
                    </button>


                    <p className="mt-4 text-sm">
                        Don't have an account? <Link className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800" to="/signUp">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;