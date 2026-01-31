import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { useState } from "react";
import authService from "../services/authservice";

function LandingPage(){
    const navigate = useNavigate();
    const handleNavigateClick = () =>{
        navigate('/register')
    }
    const[formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        //form validation
        if(!formData.username || !formData.password){
            setError("Please fill the fields");
            return
        }

        try{
            setLoading(true);
            const response = await authService.login(formData);
            console.log('Login successful: ', response);

            navigate('/dashboard');

        }catch(err){
            console.error('Login error:', err);
            setError(err.message || 'Login failed. Please check your credentials.');
        }finally{
            setLoading(false);
        }
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value}));
    }

    return(
        <div className="min-h-screen bg-gray-50">
            {/** Header section */}
            <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 align-top">
            <h1 className="text-4xl font-bold">Welcome to Dani's TaskManager</h1>
            </div>
            {/** Card and center area */}
            <div className="flex justify-center items-center min-h-[500px]">
            <Card className="max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login to manage your tasks</h2>
            {/* Error message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
            <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                {/**Username Field */}
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
                 {/* Buttons */}
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Button onClick = {handleNavigateClick} type="button" variant="secondary" className="w-full">
              Register
            </Button>

            </div>
            </form>
            </Card>
            </div>
        </div>
    );
}
export default LandingPage