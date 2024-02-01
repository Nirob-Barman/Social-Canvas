// EditPostModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditPostModal = ({ selectedPost, closeModal }) => {
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (token && selectedPost) {
            axios.get(`http://127.0.0.1:8000/posts/my-posts/update/${selectedPost.id}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
                .then(response => setPostData(response.data))
                .catch(error => console.error('Error fetching post data:', error));
        }
    }, [selectedPost]);

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Edit Post</h3>
                    {postData && (
                        <div>
                            <p>{postData.content}</p>
                            {/* Add other fields as needed */}
                            <p>Created At: {new Date(postData.created_at).toLocaleString()}</p>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default EditPostModal;
