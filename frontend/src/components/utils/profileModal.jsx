
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import MainContext from '../../context/MainContext';

export default function ProfileModal() {

    const { showNotice } = useContext(MainContext);
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const confirm = window.confirm("Are you sure to logout?");
        if (!confirm) return;

        await logout();

        showNotice({ msg: "Logged out successfully !", type: "success" });
        navigate("/login");
    }


    return (
        <div className='absolute right-[2rem] top-[2.75rem] p-2 rounded-lg bg-[#171717] border-t-1 border-white/20 shadow-2xl shadow-2xl '>
            <div className="text-gray-400 text-sm mb-3 hover:bg-gray-800 p-2 rounded">
                <div><i className="fa-solid fa-at"></i> {user?.name}</div>
                <div><i className="fa-solid fa-envelope"></i> {user?.email}</div>
            </div>

            <div>
                <button onClick={handleLogout} className="text-red-500 mr-8 hover:text-red-600">
                    <span className='text-sm w-full pl-2'><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</span>
                </button>
            </div>
        </div>
    )
}
