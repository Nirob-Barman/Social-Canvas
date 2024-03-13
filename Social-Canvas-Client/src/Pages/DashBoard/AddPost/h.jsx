import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddPost = () => {
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('access-token');
            const headers = { Authorization: `Token ${token}` };

            const formData = new FormData();
            formData.append('content', data.content);
            formData.append('image', data.image[0]);
            formData.append('video_url', data.videoUrl);

            const response = await axios.post('https://social-canvas.onrender.com/posts/add-post/', formData, {
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    {...register('content')}
                    onChange={(e) => setValue('content', e.target.value)}
                />

                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    {...register('image')}
                    onChange={(e) => setValue('image', e.target.files)}
                />

                <label htmlFor="videoUrl">Video URL:</label>
                <input
                    type="text"
                    id="videoUrl"
                    name="videoUrl"
                    {...register('videoUrl')}
                    onChange={(e) => setValue('videoUrl', e.target.value)}
                />

                <button type="submit">Add Post</button>
            </form>
        </div>
    );
};

export default AddPost;
