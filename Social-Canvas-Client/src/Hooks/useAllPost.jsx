import { useQuery } from '@tanstack/react-query';

const useAllPost = () => {
    const token = localStorage.getItem('access-token');

    const { refetch, data: posts = [] } = useQuery({
        queryKey: ['getAllPost'],
        queryFn: async () => {
            const res = await fetch(`http://127.0.0.1:8000/posts/list/`, {
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