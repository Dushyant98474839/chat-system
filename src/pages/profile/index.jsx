import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Upload, Avatar, Alert, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import apiClient from "../../lib/api-client";
import { PROFILE_ROUTE, UPLOAD_ROUTE } from "../../utils/constants";

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get(PROFILE_ROUTE, { withCredentials: true });
                form.setFieldsValue(response.data);
                console.log(response.data);
                console.log("profileimage",response.data.profileImage);
                setImageUrl(response.data.profileImage || "");
            } catch (error) {
                setErrorMessage("Failed to load profile. Please try again.");
                navigate("/login");
            } finally {
                setFetching(false);
            }
        };
        fetchProfile();
    }, [form, navigate]);

    const onFinish = async (values) => {
        setLoading(true);
        setErrorMessage("");
        try {
            await apiClient.post(UPLOAD_ROUTE, values, { withCredentials: true });
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => navigate("/chat"), 2000);
        } catch (error) {
            setErrorMessage("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const response = await apiClient.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            console.log(response.data.imageUrl)
            setImageUrl(response.data.imageUrl);
        } catch (error) {
            setErrorMessage("Image upload failed. Please try again.");
        }
    };

    if (fetching) return <Spin className="flex justify-center items-center h-screen" size="large" />;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md transition-all">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Complete Your Profile</h2>

                {errorMessage && <Alert message={errorMessage} type="error" className="mb-4" showIcon />} 
                {successMessage && <Alert message={successMessage} type="success" className="mb-4" showIcon />} 
                <br/>
                
                <div className="flex flex-col items-center mb-6">
                    <Avatar size={120} src={imageUrl} className="border-4 border-gray-300 shadow-md" />
                    <Upload showUploadList={false} customRequest={({ file }) => handleUpload(file)}>
                        <Button icon={<UploadOutlined />} className="mt-3 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg shadow-md">
                            Upload Profile Picture
                        </Button>
                    </Upload>
                </div>

                <Form form={form} name="profileForm" onFinish={onFinish} layout="vertical">
                    <Form.Item 
                        name="firstName" 
                        label={<span className="text-white">First Name</span>} 
                        rules={[{ required: true, message: "Please enter your first name" }]}
                    > 
                        <Input className="p-2 border-2 border-gray-300 rounded-lg" />
                    </Form.Item>

                    <Form.Item name="lastName" label={<span className="text-white">Last Name</span>}>
                        <Input className="p-2 border-2 border-gray-300 rounded-lg" />
                    </Form.Item>

                    <Form.Item name="phone" label={<span className="text-white">Phone Number</span>}>
                        <Input className="p-2 border-2 border-gray-300 rounded-lg" />
                    </Form.Item>

                    <Form.Item name="bio" label={<span className="text-white">Bio</span>}>
                        <Input.TextArea className="p-2 border-2 border-gray-300 rounded-lg" />
                    </Form.Item>

                    <Form.Item className="text-center">
                        <Button type="primary" htmlType="submit" loading={loading} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg">
                            Save & Continue
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Profile;
