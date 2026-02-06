import { useNavigate } from 'react-router-dom';
import Button from './Button';

function TaskCard({ task, onDelete, onToggle }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/update-task/${task.id}`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            onDelete(task.id);
        }
    };

    const handleToggle = () => {
        onToggle(task.id, task);
    };

    return (
        <div className={`p-4 rounded-lg shadow-md border-l-4 ${
            task.completed 
                ? 'bg-green-50 border-green-500' 
                : 'bg-yellow-50 border-yellow-500'
        }`}>
            {/* Task header */}
            <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                    task.completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {task.completed ? 'Completed' : 'Pending'}
                </span>
            </div>

            {/* Task description */}
            {task.description && (
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            )}

            {/* Task metadata */}
            <p className="text-xs text-gray-400 mb-3">
                Created: {new Date(task.createdAt).toLocaleDateString()}
            </p>

            {/* Action buttons */}
            <div className="flex gap-2">
                <button
                    onClick={handleEdit}
                    className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                >
                    Delete
                </button>
                <button
                    onClick={handleToggle}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                        task.completed
                            ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                >
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
            </div>
        </div>
    );
}

export default TaskCard;