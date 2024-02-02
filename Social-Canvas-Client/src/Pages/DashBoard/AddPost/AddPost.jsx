import React, { useState } from 'react';
import axios from 'axios';

const AddPost = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('access-token');
            const headers = { Authorization: `Token ${token}` };

            const formData = new FormData();
            formData.append('content', content);
            formData.append('image', image);
            formData.append('video_url', videoUrl);

            const response = await axios.post('http://127.0.0.1:8000/posts/add-post/', formData, {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                console.log('Post added successfully');
                // Handle success (e.g., redirect, show a success message)
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
            <form onSubmit={onSubmit}>
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <label htmlFor="videoUrl">Video URL:</label>
                <input
                    type="text"
                    id="videoUrl"
                    name="videoUrl"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />

                <button type="submit">Add Post</button>
            </form>
        </div>
    );
};

export default AddPost;
