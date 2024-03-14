import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateDeleteComponent from './UpdateDeleteComponent/UpdateDeleteComponent';
import AddCommentComponent from './AddCommentComponent/AddCommentComponent';

const Comments = ({ postId }) => {
    const token = localStorage.getItem('access-token');
    const [comments, setComments] = useState([]);
    // console.log(comments)

    const fetchComments = async () => {
        try {
            const response = await axios.get(`https://social-canvas.onrender.com/posts/comments/post/${postId}/`, {
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

    useEffect(() => {
        fetchComments();
    }, [postId, token])

    return (
        <div>
            <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-center">{comments.length} Comments Here</h2>
                <AddCommentComponent postId={postId} fetchComments={fetchComments} />

                <ul className="list-disc pl-4">
                    {comments.map(comment => (
                        <li key={comment.id} className="mb-4">
                            <div className="flex items-center justify-between">
                                <p className="text-gray-800">{comment.content}</p>
                                <div className="flex items-center space-x-2">
                                    <UpdateDeleteComponent commentId={comment.id} fetchComments={fetchComments} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Comments;
