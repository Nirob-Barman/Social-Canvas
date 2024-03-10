import React, { useState } from 'react';
import axios from 'axios';


const CommentAdd = () => {

    const [newComment, setNewComment] = useState("");
    const token = localStorage.getItem('access-token');

    const handleAddComment = async ({ postId, fetchComments }) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/posts/comments/${postId}/`,
                {
                    content: newComment,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                // Comment added successfully, refresh comments
                fetchComments();
                // Clear the input after successful addition
                setNewComment("");
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    };

    return (
        <div>
            <div className='flex gap-5'>
                <input
                    type="text"
                    placeholder="Enter your comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>
                    Add Comment
                </button>
            </div>
        </div>
    );
};

export default CommentAdd;