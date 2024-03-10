import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserLikedPosts = () => {
    const [likedPosts, setLikedPosts] = useState([]);
    const token = localStorage.getItem('access-token');

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/posts/user/liked-posts/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                if (response.status === 200) {
                    setLikedPosts(response.data);
                }
            } catch (error) {
                console.error('Error fetching liked posts:', error.message);
            }
        };

        fetchLikedPosts();
    }, []);

    return (
        <div>
            <h1>User Liked Posts</h1>
            <ul>
                {likedPosts.map(post => (
                    <li key={post.id}>
                        <p>User: {post.user.first_name} {post.user.last_name}</p>
                        <p>Content: {post.content}</p>
                        {post.image && (
                            <img src={post.image} alt="Post Image" style={{ maxWidth: '100%' }} />
                        )}
                        {post.video_url && (
                            <iframe
                                title={`Video for Post ${post.id}`}
                                width="100%"
                                height="315"
                                src={post.video_url}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                        <p>Like Count: {post.like_count}</p>
                        <p>Comment Count: {post.comment_count}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserLikedPosts;
