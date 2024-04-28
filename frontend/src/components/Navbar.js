import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Navbar = ({api, nav, token}) => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const Token = localStorage.getItem(token);
            const response = await axios.post(api);
            localStorage.removeItem(token);
            if (api.includes('student')) {
                localStorage.removeItem('studentId');
            }
            
            navigate(nav);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        const Token = localStorage.getItem(token);
        if (!Token) {
          navigate(nav);
        }
      }, [navigate]);


    return (
        <div className="flex justify-between items-center bg-gray-800 text-white p-4">
            <div>Navbar</div>
            <button onClick={logout} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white focus:outline-none">
                Logout
            </button>
        </div>
    );
};
