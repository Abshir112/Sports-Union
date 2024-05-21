import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserTable.css';

const UserTable = () => {
    const [type, setType] = useState('');
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [users, setUsers] = useState([]);

    const fetchItems = async (type) => {
        try {
            const url = type === 'event' 
                ? 'https://sports-union.onrender.com/api/v1/events' 
                : 'https://sports-union.onrender.com/api/v1/activities';
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Assuming token is stored in localStorage
                }
            });
            console.log(`Fetched ${type}s:`, response.data);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const fetchUsers = async (id) => {
        try {
            const url = type === 'event' 
                ? `https://sports-union.onrender.com/api/v1/users-events/get-users/${id}`
                : `https://sports-union.onrender.com/api/v1/users-activities/same/${id}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Assuming token is stored in localStorage
                }
            });
            console.log(`Fetched users for ${type} ${id}:`, response.data);

            // Normalize user data
            const normalizedUsers = response.data.map((user) => ({
                name: user.User_Name || user.name,
                email: user.User_Email || user.email,
                phone: user.User_Phone || user.phone,
                id: user.User_ID || user.id,
            }));

            setUsers(Array.isArray(response.data) ? normalizedUsers : []);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Ensure users is set to an empty array on error
        }
    };

    useEffect(() => {
        if (type) {
            fetchItems(type);
            setSelectedItem('');
            setUsers([]);
        }
    }, [type]);

    useEffect(() => {
        if (selectedItem) {
            fetchUsers(selectedItem);
        }
    }, [selectedItem]);

    return (
        <div className="container">
            <div className="form-group">
                <label className="form-control-label">
                    <input 
                        type="radio" 
                        name="type" 
                        value="event" 
                        checked={type === 'event'} 
                        onChange={() => setType('event')} 
                    />
                    Event
                </label>
                <label className="form-control-label">
                    <input 
                        type="radio" 
                        name="type" 
                        value="activity" 
                        checked={type === 'activity'} 
                        onChange={() => setType('activity')} 
                    />
                    Activity
                </label>
            </div>

            {type && (
                <div className="select-container">
                    <label htmlFor="item-select">Select {type === 'event' ? 'Event' : 'Activity'}</label>
                    <select
                        id="item-select"
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                    >
                        <option value="">Choose</option>
                        {items.map((item) => (
                            <option 
                                key={item._id} 
                                value={item._id} 
                                className={type}
                            >
                                {type === 'event' ? item.title : item.activityName}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
