import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    // const [videoUrl, setVideoUrl] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('access-token');
            const headers = { Authorization: `Token ${token}` };

            const formData = new FormData();
            formData.append('content', content);
            // formData.append('image', image);
            if (image) {
                formData.append('image', image);
            }
            // formData.append('video_url', videoUrl);

            const response = await axios.post('http://127.0.0.1:8000/posts/add-post/', formData, {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                console.log('Post added successfully');
                // Handle success (e.g., redirect, show a success message)
                navigate('/posts/myPosts');
            } else {
                console.error('Failed to add post');
                // Handle error (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <div>
            <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add a New Post</h2>
                <form onSubmit={onSubmit}>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        placeholder='Short description of your post'
                        onChange={(e) => setContent(e.target.value)}
                        style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px' }}
                    />

                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ marginBottom: '10px' }}
                    />

                    <br />

                    {/* <label htmlFor="videoUrl">Video URL:</label>
                    <input
                        type="text"
                        id="videoUrl"
                        name="videoUrl"
                        value={videoUrl}
                        placeholder='Optional'
                        onChange={(e) => setVideoUrl(e.target.value)}
                        style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px' }}
                    /> */}

                    <button
                        type="submit"
                        style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Add Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;
