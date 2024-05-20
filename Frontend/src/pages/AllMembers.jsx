import React, { useState, useEffect } from 'react';
import Loading from "../components/Loading";
import Error from "../components/Error";
import Member from "../components/Member";
import Stack from '@mui/material/Stack';
import { useTheme } from "@mui/material";
import SearchBar from "../components/SearchBar";  
import { useAuthContext } from "../hooks/useAuthContext";

const Members = () => {
    const {user} = useAuthContext();
    const theme = useTheme();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setError(null);
        const fetchMembers = async () => {
            try {
                const response = await fetch('https://sports-union.onrender.com/api/v1/users',
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                        }
                    }
                );
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
            {error && <Error message={error} reload={handleErrorReload} />}
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
