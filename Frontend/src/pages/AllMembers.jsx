// creeate members page here

import { useState, useEffect } from 'react';
import Loading from "../components/Loading";
import Error from "../components/Error";
import Member from "../components/Member";

const Members = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, [members]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={error} />;
    }

    return (
        <div>
            {/* <h1 style={{color: "black", backgroundColor: "#eedbc4"}} >Members</h1>
            {members.map(member => <Member key={member._id} member={member} />)} */}
            <Member member={members} />
        </div>
    );
}

export default Members;

    
