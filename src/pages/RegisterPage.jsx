import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { useState } from "react";

function RegisterPage(){
    const navigate = useNavigate();
    const handleNavigateClick = () => {
        navigate('/');
    }

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
    });

     // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('FormData', formData);
    }
    
    return(
        <div className="min-h-screen bg-gray-50">
            {/**Header section */}
            <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
                <h1 className="text-4xl font-bold">Welcome to Dani's TaskManager</h1>
            </div>
            
            {/**Card and center area */}
            <div className="flex justify-center items-center min-h-[500px] mt-4">
                <Card className="max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Register Form</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/**Username field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter your name"
                            />
                        </div>
                        
                        {/**Email field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter your email"
                            />
                        </div>
                        
                        {/**Password field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter your password"
                            />
                        </div>
                        
                        {/**Confirm Password field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input 
                                name="confirmpassword"
                                value={formData.confirmpassword}
                                onChange={handleChange}
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Confirm your password"
                            />
                        </div>
                        
                        {/**Buttons */}
                        <Button  type="submit" variant="primary" className="w-full">
                            Register
                        </Button>
                        <Button onClick={handleNavigateClick} type="button" variant="secondary" className="w-full">
                            Back to Login
                        </Button>
                    </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default RegisterPage;