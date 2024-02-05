import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditPostModal = ({ selectedPost, closeModal }) => {
    const navigate = useNavigate();
    const [postData, setPostData] = useState(null);
    const [editedData, setEditedData] = useState({
        content: '',
        image: null, // Change to null to represent the file
        video_url: '',
        // Add other fields as needed
    });

    console.log(postData);
    console.log(editedData);

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

    const handleEdit = () => {
        const token = localStorage.getItem('access-token');
        if (token && selectedPost) {
            const formData = new FormData();
            formData.append('content', editedData.content);
            formData.append('image', editedData.image); // Append the file to the form data
            formData.append('video_url', editedData.video_url);

            // Assuming you have an API endpoint to handle post updates
            axios.put(`http://127.0.0.1:8000/posts/my-posts/update/${selectedPost.id}`, formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    // Handle successful update, e.g., close modal
                    console.log('Post updated successfully:', response.data);
                    closeModal();

                    // Redirect to the desired page
                    // navigate('/posts/myPosts');

                    // Reload the page after successful update
                    window.location.reload();
                })
                .catch(error => console.error('Error updating post:', error));
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        // Check if the input is a file input
        const inputValue = name === 'image' ? files[0] : value;

        setEditedData(prevState => ({
            ...prevState,
            [name]: inputValue,
        }));
    };

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
                            <label htmlFor="content" className="block mt-4">Content:</label>
                            <input
                                type="text"
                                id="content"
                                name="content"
                                value={editedData.content || postData.content}
                                onChange={handleInputChange}
                                className="border rounded px-2 py-1"
                            />

                            <label htmlFor="image" className="block mt-4">Image:</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleInputChange}
                                className="border rounded px-2 py-1"
                            />

                            <label htmlFor="video_url" className="block mt-4">Video URL:</label>
                            <input
                                type="text"
                                id="video_url"
                                name="video_url"
                                value={editedData.video_url || postData.video_url || ''}
                                onChange={handleInputChange}
                                className="border rounded px-2 py-1"
                            />

                            {/* Add other fields as needed */}
                            <button
                                onClick={handleEdit}
                                className="bg-blue-500 text-white py-1 px-2 rounded mt-4"
                            >
                                Update
                            </button>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default EditPostModal;
