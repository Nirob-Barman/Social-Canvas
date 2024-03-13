import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDetail = () => {
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('access-token');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // const response = await axios.get('https://social-canvas.onrender.com/accounts/user_detail/');
                const response = await axios.get('https://social-canvas.onrender.com/accounts/user_detail/', {
                    headers: {
                        // Authorization: `Bearer ${token}`,
                        Authorization: `Token ${token}`,
                    },
                });
                // console.log('User details:', response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4">User Details</h2>
                <Link to={'/updateProfile'}><h3 className="text-2xl font-bold mb-4">Update Profile</h3></Link>
            </div>

            {userData ? (
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <p className="mb-2">Email: {userData.email}</p>
                        <p className="mb-2">First Name: {userData.first_name}</p>
                        <p className="mb-2">Last Name: {userData.last_name}</p>
                        <p className="mb-2">Birth Date: {userData.birth_date}</p>
                        <p className="mb-2">Gender: {userData.gender}</p>
                    </div>

                    {userData.profile_pic && (
                        <div>
                            {/* <p>{ userData.profile_pic}</p> */}
                            {/* <img src={userData.profile_pic} alt="Profile" /> */}
                            {/* <img src={`https://social-canvas.onrender.com/${userData.profile_pic}`} alt="Profile" /> */}
                        </div>
                    )}


                    <div>
                        <p className="mb-2">Division: {userData.division}</p>
                        <p className="mb-2">District: {userData.district}</p>
                        <p className="mb-2">Phone: {userData.phone}</p>
                        {/* <p className="mb-2">Profile Picture: {userData.profile_pic}</p> */}
                    </div>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default UserDetail;
