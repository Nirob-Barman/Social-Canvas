import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = ({ postId }) => {
    const [isLiked, setIsLiked] = useState(null);
    const token = localStorage.getItem('access-token');

    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const response = await axios.get(`https://social-canvas.onrender.com/posts/like/check/${postId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                // setIsLiked(response.data.isLiked);
                setIsLiked(response.data.user_has_liked);
            } catch (error) {
                console.error('Error checking like status:', error.message);
            }
        };

        checkLikeStatus();
    }, [postId]);


    const handleLike = async () => {
        try {
            const response = await axios.post(`https://social-canvas.onrender.com/posts/like/create/${postId}/`, {}, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (response.status === 200) {
                setIsLiked(true);
            }
        } catch (error) {
            console.error('Error liking post:', error.message);
        }
    };

    const handleUnlike = async () => {
        try {
            const response = await axios.delete(`https://social-canvas.onrender.com/posts/like/unlike/${postId}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (response.status === 200) {
                setIsLiked(false);
            }
        } catch (error) {
            console.error('Error unliking post:', error.message);
        }
    };

    return (
        <div>
            <div>
                {isLiked ? "Already Liked" : "No Liked"}
            </div>

            <button
                onClick={isLiked ? handleUnlike : handleLike}
                className={`bg-blue-500 text-white py-1 px-2 rounded mt-2`}
            >
                {isLiked ? "Unlike" : "Like"}
            </button>
        </div>
    );
};

export default LikeButton;
