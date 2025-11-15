import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../Hooks/AuthProvider.jsx';
import { useEffect } from 'react';

function useProfile() {

    const [profileData, setProfileData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        if (!token) return;
        const fetchProfileData = async () => {
            try {
                console.log("Fetching profile & validating user")
                const resp = await axios.get('http://localhost:5001/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(resp)
                setProfileData(resp.data);
                setErrorMessage(null);
            } catch (err) {
                setErrorMessage(err.message || 'Failed to load profile');
            };
        };
        fetchProfileData();

    }, [token])


    return { profileData, errorMessage };

};

export default useProfile;