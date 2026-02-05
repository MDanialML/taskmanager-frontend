import { useNavigate } from 'react-router-dom';
import Card from '../components/Card'
import { useState } from 'react';
import taskService from '../services/taskservice';
import Navbar from '../components/Navbar';
import Button from '../components/Button';



function AddTaskPage(){
    const navigate = useNavigate();
    //handle navigate 
    const handleNavigate = () => {
        navigate('/dashboard');
    }

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        completed:false
    });

    const[loading, setLoading] = useState(false);
    const[error, setError] = useState('');


    //handle submit
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox'? checked : value
        }));
    };

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        //validation
        if(!formData.title.trim()){
            setError('Title is required');
            return;
        }
        try{
            setLoading(true);
            // Create task via API
            await taskService.CreatedTask({
                title: formData.title,
                description: formData.description,
                completed: formData.completed
            });

            //navigate back to dashboard
            navigate('/dashboard');
        }catch (err){
            console.error('Error creating task: ', err);
            setError(err.message || 'Failed to create task');
        }finally{
            setLoading(false)
        }
    }

    return(
        <>
        <Navbar/>
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className="max-w-2xl max-auto px-4">
            {/* Back button */}
            <button
            onClick={handleNavigate}
            className="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-2">
                ← Back to Dashboard
            </button>

            <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Task</h2>
                {/* Error message */}
                {error && (
                    <div className = "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Title Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            type="text"
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                            placeholder="Enter Title"
                            required
                            />                            
                        </div>

                        {/* Description Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                            placeholder="Enter task description (optional)"
                            />
                        </div>

                        {/* Status Checkbox */}
                        <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="completed"
                                        checked={formData.completed}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        Mark as completed
                                    </label>
                        </div>

                        {/* Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        className="flex-1"
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating...' : 'Create Task'}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="secondary" 
                                        className="flex-1"
                                        onClick={handleNavigate}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                    </div>
                </form>
            </Card>

            </div>


        </div>
        </>
    );
}
export default AddTaskPage