import { useNavigate } from "react-router-dom"
import authService from '../services/authservice';
import Button from './Button'

function Navbar(){
    const navigate = useNavigate();

    //get current user from localStorage
    const user = authService.getUser();

    const handleLogout = () =>{
        authService.logout();
        navigate('/');
        }

    return(
        <nav className="bg-white shadow-sm border-b px-8 py-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-900">Welcome, {user.name}</h1>
                <Button onClick={handleLogout} type="button" variant="danger">Logout</Button>
            </div>

        </nav>
    );
}
export default Navbar