import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useTopLikedPosts from '../../../Hooks/useTopLikedPosts';

const TopLikedPosts = () => {
    // const [topLikedPosts, setTopLikedPosts] = useState([]);
    // const token = localStorage.getItem('access-token');

    const [topLikedPosts, refetch] = useTopLikedPosts();

    // useEffect(() => {
    //     const fetchTopLikedPosts = async () => {
    //         try {
    //             const response = await axios.get('https://social-canvas.onrender.com/posts/liked-posts/top/', {
    //                 // headers: {
    //                 //     Authorization: `Token ${token}`,
    //                 // },
    //             });

    //             if (response.status === 200) {
    //                 setTopLikedPosts(response.data);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching top liked posts:', error.message);
    //         }
    //     };

    //     fetchTopLikedPosts();
    // }, []);

    return (
        <div>
            <div>

                <div className='my-10'>
                    {/* <div>
                        <h1 className='text-5xl text-center mb-10'>Top Liked Posts</h1>
                    </div> */}

                    <div className="mx-auto text-center md:w-4/12 my-8">
                        <h3 className="text-3xl text-center uppercase border-y-4 font-bold py-4">Top Liked Posts</h3>
                    </div>

                    <Swiper
                        slidesPerView={3}
                        spaceBetween={10}
                        navigation
                        pagination={{ clickable: true }}
                        style={{ height: '300px' }}
                    >
                        {topLikedPosts.map(post => (
                            <SwiperSlide key={post.id}>
                                <img
                                    src={post.image}
                                    alt={`Liked Post ${post.id}`}
                                    style={{
                                        objectFit: 'cover',
                                        // maxWidth: '100%'
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default TopLikedPosts;
