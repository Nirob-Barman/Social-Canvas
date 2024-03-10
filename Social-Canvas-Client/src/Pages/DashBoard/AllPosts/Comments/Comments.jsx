import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ postId }) => {
    const token = localStorage.getItem('access-token');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/posts/comments/post/${postId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                if (response.status === 200) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error('Error fetching comments:', error.message);
            }
        };

        fetchComments();
    }, [postId]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Comments Section</h2>
            <ul className="list-disc ml-6">
                {comments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
