import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useAddActivity = () => {
    const [addingActivityError, setError] = useState(null);
    const [addingActivityIsLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();

    const addActivity = async (activityData) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const requestData = { ...activityData, currentParticipants: 0 };
            const response = await fetch('https://sports-union.onrender.com/api/v1/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Failed to add activity');
            }

            const result = await response.json();
            // Handle successful addition of activity (if needed)
            return result;
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { addActivity, addingActivityError, addingActivityIsLoading };
};

export default useAddActivity;
