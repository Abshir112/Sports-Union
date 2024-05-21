import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('userActivities');
        localStorage.removeItem('activities');
        localStorage.removeItem('userEvents');
        localStorage.removeItem('events');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    }
    return { logout };
}