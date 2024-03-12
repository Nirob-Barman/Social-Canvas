import { useQuery } from '@tanstack/react-query';

const useAllPost = () => {
    const token = localStorage.getItem('access-token');

    const { refetch, data: posts = [] } = useQuery({
        queryKey: ['getAllPost'],
        queryFn: async () => {
            const res = await fetch(`https://social-canvas.onrender.com/posts/list/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return res.json();
        },
    });

    return [posts, refetch];
};

export default useAllPost;