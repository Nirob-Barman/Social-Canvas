import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TopLikedPosts = () => {
    const [topLikedPosts, setTopLikedPosts] = useState([]);
    const token = localStorage.getItem('access-token');

    useEffect(() => {
        const fetchTopLikedPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/posts/liked-posts/top/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                if (response.status === 200) {
                    setTopLikedPosts(response.data);
                }
            } catch (error) {
                console.error('Error fetching top liked posts:', error.message);
            }
        };

        fetchTopLikedPosts();
    }, []);

    return (
        <div>
            <div className='my-20'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {topLikedPosts.map(post => (
                        <SwiperSlide key={post.id}>
                            <img
                                src={post.image} // Assuming your post object has an 'image' property
                                alt={`Liked Post ${post.id}`}
                                style={{
                                    maxWidth: '100%'
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopLikedPosts;
