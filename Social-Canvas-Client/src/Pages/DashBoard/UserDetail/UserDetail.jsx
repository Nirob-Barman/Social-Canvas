import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';

const UserDetail = () => {
    const [userData, setUserData] = useState(null);
    const { token } = useAuth();
    console.log("Token from user detail: ", token);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // const response = await axios.get('http://127.0.0.1:8000/accounts/user_detail/');
                const response = await axios.get('http://127.0.0.1:8000/accounts/user_detail/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">User Details {token}</h2>

            {userData ? (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p>Email: {userData.email}</p>
                        <p>First Name: {userData.first_name}</p>
                        <p>Last Name: {userData.last_name}</p>
                        <p>Birth Date: {userData.birth_date}</p>
                        <p>Gender: {userData.gender}</p>
                    </div>

                    <div>
                        <p>Division: {userData.division}</p>
                        <p>District: {userData.district}</p>
                        <p>Phone: {userData.phone}</p>
                        <p>Profile Picture: {userData.profile_pic}</p>
                    </div>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default UserDetail;
