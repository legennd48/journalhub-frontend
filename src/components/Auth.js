import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from './FormInput';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.email) {
            tempErrors.email = "Email is required";
        }
        if (!formData.password) {
            tempErrors.password = "Password is required";
        }
        if (!isLogin) {
            if (!formData.firstName) {
                tempErrors.firstName = "First Name is required";
            }
            if (!formData.lastName) {
                tempErrors.lastName = "Last Name is required";
            }
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const { email, password, firstName, lastName } = formData;
        const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
        const data = isLogin ? { email, password } : { name: `${firstName} ${lastName}`, email, password };

        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            setLoading(false);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const result = await response.json();

            if (isLogin) {
                // Handle successful login
                console.log('Login successful:', result);
                localStorage.setItem('token', result.token);
                localStorage.setItem('userId', result.userId);

                // Fetch profile data after login
                const profileResponse = await fetch(`http://localhost:5000/profile/${result.userId}`, {
                    headers: {
                        Authorization: `Bearer ${result.token}`,
                        'userId': result.userId
                    }
                });
                if (!profileResponse.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const profileResult = await profileResponse.json();
                localStorage.setItem('userName', profileResult.user.name);

                toast.success('Login successful');
                navigate('/landing');
            } else {
                // Handle successful registration
                console.log('Registration successful:', result);
                toast.success('Registration successful');
                setIsLogin(true);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error.message);
            setErrors({ apiError: error.message });
            toast.error(error.message);
        }
    };

    return (
        <div className="auth-page">
            <ToastContainer />
            <div className="auth-container">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                {loading && <ClipLoader />}
                {errors.apiError && <p className="error">{errors.apiError}</p>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <FormInput
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                error={errors.firstName}
                            />
                            <FormInput
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                error={errors.lastName}
                            />
                        </>
                    )}
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>
                <button onClick={toggleForm}>
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default Auth;
