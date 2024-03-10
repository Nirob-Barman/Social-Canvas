// DeleteComment.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteComment = ({ commentId, fetchComments }) => {
    const [belongsToUser, setBelongsToUser] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [newContent, setNewContent] = useState("");
    const token = localStorage.getItem('access-token');
    // console.log(belongsToUser)

    useEffect(() => {
        const checkBelongsToUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/posts/comment/belongs-to-user/${commentId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                if (response.status === 200) {
                    setBelongsToUser(response.data.belongs_to_user);
                }
            } catch (error) {
                console.error('Error checking if comment belongs to user:', error.message);
            }
        };

        checkBelongsToUser();
    }, [commentId, token]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/posts/comments/delete/${commentId}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (response.status === 204) {
                // Comment deleted successfully, refresh comments
                fetchComments();
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting comment:', error.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(
                `http://127.0.0.1:8000/posts/comments/update/${commentId}/`,
                {
                    content: newContent,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Comment updated successfully, refresh comments
                fetchComments();
                // Exit update mode after successful update
                setUpdateMode(false);
                setNewContent(""); // Reset the new content input
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error updating comment:', error.message);
        }
    };

    // const handleUpdate = async () => {
    //     // Implement the logic for updating the comment
    //     console.log('Update button clicked');
    //     const response = await axios.delete(`http://127.0.0.1:8000/posts/comments/update/${commentId}/`,
    //         {
    //             content: "new content", // Update with the new content
    //         },
    //         {
    //             headers: {
    //                 Authorization: `Token ${token}`,
    //             },
    //         });
    // };


    return (
        <div>
            <button onClick={handleDelete}>
                {belongsToUser ? "Delete" : ''}
            </button>
            {belongsToUser && (
                <>
                    <button
                        onClick={() => setUpdateMode(true)}
                    >
                        Update
                    </button>
                    {updateMode && (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter new content"
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                            />
                            <button onClick={handleUpdate}>
                                Confirm Update
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DeleteComment;
