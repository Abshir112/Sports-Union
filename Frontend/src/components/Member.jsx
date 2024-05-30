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
import { useAuthContext } from '../hooks/useAuthContext';

const Member = (props) => {
    const { user } = useAuthContext();
    const { member, onEdit, onDelete } = props;

    const [editMode, setEditMode] = useState(false);
    const [editedMember, setEditedMember] = useState(member);
    const [error, setError] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
            const response = await fetch(`/api/v1/users/update-user/${editedMember._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${user.token}`
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

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`/api/v1/users/delete-user/${member._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${user.token}`
                },
            });
            if (response.ok) {
                onDelete(member._id);
                setDeleteDialogOpen(false);
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
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
        width: '100%',
        flexWrap: 'wrap'
    };

    return (
        <>
            <Card id={member._id} sx={style}>
                <Stack direction="row" spacing={2} alignItems="center" >
                    <Avatar>{member.name.charAt(0)}</Avatar>
                    <div>
                        <Typography variant="h6" color="red" component="h2" style={{  overflowWrap: 'break-word' }}>
                            {member.name}
                        </Typography>
                        <Typography color="black" style={{  overflowWrap: 'break-word' }}>
                           Email:  {member.email}
                        </Typography>
                        <Typography color="black" style={{  overflowWrap: 'break-word' }}>
                          Phone Number:  {member.phone}
                        </Typography>
                        <Typography color="black" style={{  overflowWrap: 'break-word' }}>
                           Role: {member.role}
                        </Typography>
                    </div>
                    <div></div>
                </Stack>
                <Stack direction="row" spacing={1} mr={2} sx={{mt: 3}}>
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

            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{color: 'black'}}>
                        Are you sure you want to delete this member?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} sx={{color: 'red'}}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} sx={{color: 'green'}} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Member;
