import api from './api';

const authService = {
    // Register new user
    register: async (userData) => {
        try {
            const response = await api.post('/register', userData);
            
            // Store user data and token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.id,
                    name: response.data.name,
                    password: response.data.password
                }));
            }
            
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Login user
    login: async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            
            // Store user data and token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.id,
                    name: response.data.name,
                    password: response.data.password
                }));
            }
            
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current token
    getToken: () => {
        return localStorage.getItem('token');
    },

    // Get current user
    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Check if user is logged in
    isAuthenticated: () => {
        return !localStorage.getItem('token');
    }
};

export default authService;