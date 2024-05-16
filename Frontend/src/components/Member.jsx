import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const Member = (props) => {
    const { member, onEdit, onDelete } = props;

    const [editMode, setEditMode] = useState(false);
    const [editedMember, setEditedMember] = useState(member);
    const [error, setError] = useState(null);

    const handleEditClick = () => {
        setEditedMember(member); // Populate with current member details
        setError(null);
        setEditMode(true);
    };

    const handleEditSave = async () => {
        // Validation: Check if all fields are provided
        const { name, email, phone, personalNumber, password, role } = editedMember;
        if (!name || !email || !phone || !personalNumber || !password || !role) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/users/update-user/${editedMember._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedMember)
            });
            const data = await response.json();
            onEdit(data);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/delete-user/${member._id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                onDelete(member._id);
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedMember({
            ...editedMember,
            [name]: value,
        });
    };

    const handleRoleChange = (event) => {
        setEditedMember({
            ...editedMember,
            role: event.target.value,
        });
    };

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        width: '100%'
    };

    return (
        <>
            <Card id={member._id} sx={style}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar>{member.name.charAt(0)}</Avatar>
                    <div>
                        <Typography variant="h6" component="h2" style={{ color: 'red' }}>
                            {member.name}
                        </Typography>
                        <Typography color="black">
                           Email:  {member.email}
                        </Typography>
                        <Typography color="black">
                          Phone Number:  {member.phone}
                        </Typography>
                        <Typography color="black">
                           Personal Number: {member.personalNumber}
                        </Typography>
                        <Typography color="black">
                           Role: {member.role}
                        </Typography>
                    </div>
                    <div></div>
                </Stack>
                <Stack direction="row" spacing={1} mr={2}>
                    <Button variant="contained" color="warning" onClick={handleEditClick}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={handleDeleteClick}>Delete</Button>
                </Stack>
            </Card>

            <Dialog open={editMode} onClose={() => setEditMode(false)}>
                <DialogTitle>Edit Member</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the member details below:
                    </DialogContentText>
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={editedMember.name}
                        onChange={handleInputChange}
                    
                        InputProps={{
                            style: { color: 'black' },
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={editedMember.email}
                        onChange={handleInputChange}
                        
                        InputProps={{
                            style: { color: 'black' },
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Phone"
                        type="text"
                        fullWidth
                        value={editedMember.phone}
                        onChange={handleInputChange}
                       
                        InputProps={{
                            style: { color: 'black' },
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="personalNumber"
                        label="Personal Number"
                        type="text"
                        fullWidth
                        value={editedMember.personalNumber}
                        onChange={handleInputChange}
                       
                        InputProps={{
                            style: { color: 'black' },
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        value={editedMember.password}
                        onChange={handleInputChange}
                        
                        InputProps={{
                            style: { color: 'black' },
                        }}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel style={{ color: '#da7250'}}>Role</InputLabel>
                        <Select
                            value={editedMember.role}
                            onChange={handleRoleChange}
                            style={{ color: 'black', marginTop: '8px' }}
                            
                        >
                            <MenuItem value="user" sx={{color: 'black'}}>User</MenuItem>
                            <MenuItem value="admin" sx={{color: 'black'}}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditMode(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Member;
