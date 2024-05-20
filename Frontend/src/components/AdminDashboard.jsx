import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, useTheme } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import Loading from '../components/Loading';
import Error from '../components/Error';

const AdminDashboard = () => {
    const { user } = useAuthContext();
    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('https://sports-union.onrender.com/api/v1/admin', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch statistics');
                }
                const data = await response.json();
                setStatistics(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [user.token]);

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    const statisticsData = [
        { title: 'Total Users', value: statistics.totalUsers, color: theme.palette.primary.main },
        { title: 'Total Activities', value: statistics.totalActivities, color: theme.palette.secondary.main },
        { title: 'Total Events', value: statistics.totalEvents, color: theme.palette.info.main },
        { title: 'Total Announcement', value: statistics.totalAnnouncement, color: theme.palette.success.main },
        { title: 'Reserved Activities', value: statistics.totalReservedActivities, color: theme.palette.warning.main },        
        { title: 'Reserved Events', value: statistics.totalReservedEvents, color: theme.palette.error.main },
     
    ];

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" component="div" sx={{ mb: 3 }}>
                Administration Dashboard
            </Typography>
            <Grid container spacing={3}>
                {statisticsData.map((stat, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" sx={{ color: stat.color, fontWeight: 'bold' }}>
                                    {stat.title}
                                </Typography>
                                <Typography variant="h2" sx={{ color: stat.color, fontWeight: 'bold' }}>
                                    {stat.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
