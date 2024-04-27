import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.post('http://localhost:4000/api/admin/logout');
            localStorage.removeItem('token');
            navigate('/loginAdmin');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    return (
        <div className="flex justify-between items-center bg-gray-800 text-white p-4">
            <div>Navbar</div>
            <button onClick={logout} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white focus:outline-none">
                Logout
            </button>
        </div>
    );
};
