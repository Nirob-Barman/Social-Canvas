import React, { useState } from 'react';
import axios from 'axios';

const AddCommentComponent = ({ postId, fetchComments }) => {
    const [newComment, setNewComment] = useState("");
    const token = localStorage.getItem('access-token');

    const handleAddComment = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        try {
            const payload = {
                content: newComment,
            };

            console.log(payload)

            const response = await axios.post(
                `http://127.0.0.1:8000/posts/comments/${postId}/`,
                payload,
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
        <form onSubmit={handleAddComment}>
            <input
                type="text"
                placeholder="Enter your comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">
                Add Comment
            </button>
        </form>
    );
};

export default AddCommentComponent;
