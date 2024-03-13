import React, { useState } from 'react';
import axios from 'axios';

const AddCommentComponent = ({ postId, fetchComments }) => {
    // console.log(postId)
    const [newComment, setNewComment] = useState("");
    const token = localStorage.getItem('access-token');

    // const handleAddComment = async () => {
    //     try {
    //         const response = await axios.post(
    //             `http://127.0.0.1:8000/posts/comments/${postId}/`,
    //             {
    //                 content: newComment,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Token ${token}`,
    //                 },
    //             }
    //         );

    //         if (response.status === 201) {
    //             // Comment added successfully, refresh comments
    //             fetchComments();
    //             // Clear the input after successful addition
    //             setNewComment("");
    //         } else {
    //             console.error('Unexpected response status:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Error adding comment:', error.message);
    //     }
    // };

    const handleAddComment = async () => {
        console.log("Add into ", postId)
        try {
            const payload = {
                content: newComment,
            };

            console.log('Request Payload:', payload);

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
        <div>
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
    );
};

export default AddCommentComponent;
