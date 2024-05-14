import React, { useState, useEffect } from 'react';
import Loading from "../components/Loading";
import Error from "../components/Error";
import Member from "../components/Member";
import Stack from '@mui/material/Stack';
import { useTheme } from "@mui/material";
import SearchBar from "../components/SearchBar";  // Ensure the correct import path

const Members = () => {
    const theme = useTheme();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users');
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
    }, []);

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={error} />;
    }

    return (
        <div style={{ padding: '2rem', backgroundColor: theme.palette.background.paper }}>
            <Stack direction="row" spacing={2} alignItems="center" marginBottom="2rem">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </Stack>
            {filteredMembers.map(member => (
                <Member key={member._id} member={member} />
            ))}
        </div>
    );
}

export default Members;
