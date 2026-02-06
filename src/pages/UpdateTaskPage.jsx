import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import taskservice from '../services/taskservice';

function UpdateTaskPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get task ID from URL
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        completed: false
    });
    
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch task data when component mounts
    useEffect(() => {
        fetchTask();
    }, [id]);

    const fetchTask = async () => {
        try {
            setFetchLoading(true);
            const task = await taskservice.getTaskById(id);
            
            // Pre-populate form with task data
            setFormData({
                title: task.title,
                description: task.description || '',
                completed: task.completed
            });
            
            setError('');
        } catch (err) {
            console.error('Error fetching task:', err);
            setError('Failed to load task');
        } finally {
            setFetchLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Validation
        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }
        
        try {
            setLoading(true);
            
            // Update task via API
            await taskservice.updateTask(id, {
                title: formData.title,
                description: formData.description,
                completed: formData.completed
            });
            
            // Navigate back to dashboard
            navigate('/dashboard');
            
        } catch (err) {
            console.error('Error updating task:', err);
            setError(err.message || 'Failed to update task');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    // Show loading while fetching task
    if (fetchLoading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <p className="text-gray-500">Loading task...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-2xl mx-auto px-4">
                    {/* Back button */}
                    <button 
                        onClick={handleCancel}
                        className="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
                    >
                        ← Back to Dashboard
                    </button>
                    
                    <Card>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Task</h2>
                        
                        {/* Error message */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Enter task title"
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
                                        {loading ? 'Updating...' : 'Update Task'}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="secondary" 
                                        className="flex-1"
                                        onClick={handleCancel}
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

export default UpdateTaskPage;