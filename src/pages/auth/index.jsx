import React, { useState } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import { SIGNUP_ROUTE, LOGIN_ROUTE } from '../../utils/constants';
import apiClient from '../../lib/api-client';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const route = isLogin ? LOGIN_ROUTE : SIGNUP_ROUTE;
            const response = await apiClient.post(route, {
                email: values.email,
                password: values.password,
            }, { withCredentials: true });

            console.log(isLogin ? "Login successful:" : "Signup successful:", response);

            if (isLogin) {
                if (!response.data.user.profileSetup) {
                    navigate('/profile');
                    return;
                }
                navigate('/chat');
            } else {
                setSignupSuccess('SignUp Successful!');
                setTimeout(() => navigate('/profile'), 1500);
            }
        } catch (error) {
            setErrorMessage(error.response?.data || "Something went wrong!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md transition-all">
                <h2 className="text-3xl font-bold text-white text-center mb-2">
                    {isLogin ? 'Login' : 'Sign Up'}
                </h2>
                <p className="text-gray-200 text-center mb-6">
                    {isLogin ? 'Welcome back! Please log in.' : 'Create an account to get started.'}
                </p>

                {errorMessage && <Alert message={errorMessage} type="error" className="mb-4" showIcon />}
                {signupSuccess && <Alert message={signupSuccess} type="success" className="mb-4" showIcon />}

                <Form
                    form={form}
                    name="authForm"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label={<span className="text-white">Email</span>}
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input className="p-2 rounded-md bg-white/30 text-white" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-white">Password</span>}
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password className="p-2 rounded-md bg-white/30 text-white" />
                    </Form.Item>

                    {!isLogin && (
                        <Form.Item
                            label={<span className="text-white">Confirm Password</span>}
                            name="confirm_password"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        return !value || getFieldValue('password') === value
                                            ? Promise.resolve()
                                            : Promise.reject(new Error('Passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className="p-2 rounded-md bg-white/30 text-white" />
                        </Form.Item>
                    )}

                    <Form.Item className="text-center">
                        <Button type="primary" htmlType="submit" className="w-full p-2 rounded-md bg-white text-blue-500 font-semibold shadow-md hover:bg-gray-200 transition-all">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>
                    </Form.Item>
                </Form>

                <p className="text-center text-white text-sm mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        className="text-yellow-300 hover:underline ml-1"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setErrorMessage('');
                            setSignupSuccess('');
                            form.resetFields();
                        }}
                    >
                        {isLogin ? 'Sign up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
