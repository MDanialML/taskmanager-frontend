import api from './api';
import authservice from './authservice';


//add JWt token to all requests
api.interceptors.request.use((config) => 
{
    const token = authservice.getToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const taskService = {
    //Get all tasks for logged-in user
    getTasks: async () => {
        try{
            const response = await api.get('/tasks');
            return response.data;
        }catch (error){
            throw error.response?.data || error.message;
        }
    },

    //Get single task by ID
    getTaskById: async(id) => {
        try{
            const response = await api.get(`/tasks/${id}`);
            return response.data;
        }catch (error){
            throw error.response?.data || error.message;
        }
    },

    //Create new task
    CreatedTask: async (taskData) => {
        try{
            const response = await api.post(`/tasks`, taskData);
            return response.data;
        }catch(error) {
            throw error.response?.data || error.message;
        }
    },
    //Update existing task
    updateTask: async (id, taskData) =>{
        try{
            const response = await api.put(`/tasks/${id}`, taskData);
            return response.data;
        }catch (error){
            throw error.response?.data || error.message;
        }
    },
    // Toggel task completion status (uses update endpoint)
    toggleTaskStatus: async (id, currentTask) => {
        try{
            const updatedTask = {
                ...currentTask,
                completed: !currentTask.completed
            };
            const response = await api.put(`/tasks/${id}`, updatedTask);
            return response.data;
        }catch (error){
            throw error.response?.data || error.message;
        }
    },
    deleteTask: async (taskId) => {
        try{
            const response = await api.delete(`/tasks/${taskId}`, taskId);
        }catch(err){
            console.error(err.message);
        }
    }
};

export default taskService;
