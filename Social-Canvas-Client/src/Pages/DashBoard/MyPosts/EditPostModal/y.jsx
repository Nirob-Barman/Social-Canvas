import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const EditPostModal = ({ selectedPost, closeModal }) => {
    const navigate = useNavigate();
    const { handleSubmit, control, setValue } = useForm();

    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (token && selectedPost) {
            axios.get(`http://127.0.0.1:8000/posts/my-posts/update/${selectedPost.id}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
                .then(response => {
                    setPostData(response.data);
                    // Set initial form values using setValue
                    setValue('content', response.data.content);
                    setValue('image', response.data.image);
                    setValue('video_url', response.data.video_url);
                })
                .catch(error => console.error('Error fetching post data:', error));
        }
    }, [selectedPost, setValue]);

    const handleEdit = async (formData) => {
        const token = localStorage.getItem('access-token');
        if (token && selectedPost) {
            try {
                await axios.put(`http://127.0.0.1:8000/posts/my-posts/update/${selectedPost.id}`, formData, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                console.log('Post updated successfully');
                closeModal();
                // navigate('/posts/myPosts');
                window.location.reload();
            } catch (error) {
                console.error('Error updating post:', error);
            }
        }
    };

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(handleEdit)}>
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                        <h3 className="font-bold text-lg">Edit Post</h3>
                        {postData && (
                            <div>
                                <label htmlFor="content" className="block mt-4">Content:</label>
                                <Controller
                                    name="content"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            className="border rounded px-2 py-1"
                                        />
                                    )}
                                />

                                <label htmlFor="image" className="block mt-4">Image URL:</label>
                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            className="border rounded px-2 py-1"
                                        />
                                    )}
                                />

                                <label htmlFor="video_url" className="block mt-4">Video URL:</label>
                                <Controller
                                    name="video_url"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            className="border rounded px-2 py-1"
                                        />
                                    )}
                                />

                                {/* Add other fields as needed */}
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-1 px-2 rounded mt-4"
                                >
                                    Update
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default EditPostModal;
