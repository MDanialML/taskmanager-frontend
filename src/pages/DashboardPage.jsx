import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import taskservice from '../services/taskservice'
import { useNavigate } from "react-router-dom";

function DashboardPage(){
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //handle add task click
    const handleAddTask = () => {
            navigate('/add-task');
    }

    //Fetch tasks when component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try{
            setLoading(true);
            const data = await taskservice.getTasks();
            setTasks(data);
            setError('');
        }catch(err){
            console.error('Error fetching tasks: ', err);
            setError('Failed to load tasks');
        }finally{
            setLoading(false);
        }
    };

    //Filter tasks by completion status
    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return(
    <>
    <Navbar/>
    <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-2 bg-white rounded-lg shadow-md p-4">
             <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                    <div className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded cursor-pointer">All</div>
                    <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Work</div>
                    <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Personal</div>
                    <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Shopping</div>
            </div>
        </div>

        <div className="col-span-5 bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Incomplete Tasks({incompleteTasks.length})</h3>
            {
                loading? (
                    <p className="text-gray-500">Loading tasks...</p>
                ): error ?(
                    <p className="text-red-500">{error}</p>
                ): incompleteTasks.length === 0?(
                    <p className="text-gray-500">No incomplete tasks. Great job!</p>
                ):(
                    <div className="space-y-3">
                        {incompleteTasks.map(task => (
                            <div key={task.id} className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                                <h4 className="font-semibold">{task.title}</h4>
                                <p className="text-sm text-gray-600">{task.description}</p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Created: {new Date(task.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
        
        <div className="col-span-5 bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Completed Tasks({completedTasks.length})</h3>
            {loading?(
                <p className="text-red-500"> Loading tasks...</p>
            ):error? (
                <p className="text-red-500">{error}</p>
            ): completedTasks.length === 0 ?(
                <p className="text-gray-500"> No completed tasks yet.</p>
            ):(
                 <div className="space-y-3">
                    {completedTasks.map(task => (
                        <div key={task.id} className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                            <h4 className="font-semibold">{task.title}</h4>
                            <p className="text-sm text-gray-600">{task.description}</p>
                            <p className="text-xs text-gray-400 mt-2">
                                Completed: {new Date(task.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    
    <button 
    onClick={handleAddTask}
    className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors text-2xl flex items-center justify-center">
        +
    </button>
    </>
);
}
export default DashboardPage;