import React, { useState, useEffect } from 'react';
import Loading from "../components/Loading";
import ErrorComp from "../components/Error";
import Member from "../components/Member";
import AdminDashboard from '../components/AdminDashboard';
import Stack from '@mui/material/Stack';
import { useTheme } from "@mui/material";
import SearchBar from "../components/SearchBar";  
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';

const Members = () => {
    const navigate = useNavigate();
    const {user, dispatch} = useAuthContext();
    const theme = useTheme();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setError(null);
        const fetchMembers = async () => {
            try {
                const response = await fetch('/api/v1/users',
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                        }
                    }
                );
                if (response.status === 401) {
                    dispatch({ type: 'LOGOUT' });
                    localStorage.removeItem('userActivities');
                    localStorage.removeItem('activities');
                    localStorage.removeItem('userEvents');
                    localStorage.removeItem('events');
                    localStorage.removeItem('user');
                    navigate('/');
                    return;
                }

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setMembers(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchMembers();
    }, [user]); 

    const handleEditMember = (updatedMember) => {
        setMembers(members.map(member => 
            member._id === updatedMember._id ? updatedMember : member
        ));
    };

    const handleDeleteMember = (memberId) => {
        setMembers(members.filter(member => member._id !== memberId));
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleErrorReload = () => {
        setLoading(true);
        setError(null);
    };


    return (
        <>
            {loading && <Loading />}
            {error && <ErrorComp message={error} reload={handleErrorReload} />}
            <AdminDashboard />
            <div style={{ padding: '2rem', backgroundColor: theme.palette.background.paper }}>
                <Stack direction="row" spacing={2} alignItems="center" marginBottom="2rem">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </Stack>
                {filteredMembers.map(member => (
                    <Member 
                        key={member._id} 
                        member={member} 
                        onEdit={handleEditMember} 
                        onDelete={handleDeleteMember} 
                    />
                ))}
            </div>
        </>
    );
}

export default Members;
