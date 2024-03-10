import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateDeleteComponent from './UpdateDeleteComponent/UpdateDeleteComponent';
// import AddCommentComponent from './AddCommentComponent/AddCommentComponent';

const Comments = ({ postId }) => {
    const token = localStorage.getItem('access-token');
    const [comments, setComments] = useState([]);

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

    useEffect(() => {
        fetchComments();
    }, [postId, token])


    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Comments Section</h2>
            <h2>{postId}</h2>
            <h3>Length: {comments.length}</h3>

            {/* <AddCommentComponent postId={postId} fetchComments={fetchComments} /> */}

            <ul className="list-disc ml-6">
                {comments.map(comment => (
                    <div key={comment.id}>
                        <div className='flex gap-2'>
                            <p>
                                {comment.content}
                            </p>
                            <div>
                                <UpdateDeleteComponent commentId={comment.id} fetchComments={fetchComments} />
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
