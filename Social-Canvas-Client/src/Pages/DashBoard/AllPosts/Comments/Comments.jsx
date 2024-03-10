import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateDeleteComponent from './DeleteComment/UpdateDeleteComponent';
import CommentAdd from './AddCommentComponent/CommentAdd/CommentAdd';
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

            <CommentAdd postId={postId} fetchComments={fetchComments}></CommentAdd>

            {/* <AddCommentComponent postId={postId} fetchComments={fetchComments} /> */}

            <div>
                Add Comment
            </div>

            <ul className="list-disc ml-6">
                {comments.map(comment => (
                    <div key={comment.id}>
                        <div className='flex gap-2'>
                            <p>
                                {comment.content}
                            </p>
                            <div>
                                {/* <button
                                    onClick={() => handleDelete(comment.id)}>
                                    Delete
                                </button> */}

                                {/* <DeleteComment commentId={comment.id} fetchComments={fetchComments} /> */}
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
