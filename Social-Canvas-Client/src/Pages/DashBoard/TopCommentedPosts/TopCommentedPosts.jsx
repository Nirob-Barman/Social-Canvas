import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow'; // Import the coverflow effect

const TopCommentedPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/posts/commented-posts/top/');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching top commented posts:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='my-20'>
            {/* <h1 className='text-5xl text-center mb-10'>Top Commented Posts</h1> */}
            <div className="mx-auto text-center md:w-4/12 my-8">
                <h3 className="text-3xl uppercase border-y-4 py-4">Top Commented Posts</h3>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                navigation
                pagination={{ clickable: true }}
                effect="coverflow" // Use the coverflow effect
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                style={{ height: '300px' }}
            >
                {posts.map(post => (
                    <SwiperSlide key={post.id}>
                        <img
                            // src={post.image}
                            src={`http://127.0.0.1:8000${post.image}`}
                            alt={`Commented Post ${post.id}`}
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopCommentedPosts;
