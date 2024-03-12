import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import TopLikedPosts from "../../DashBoard/TopLikedPosts/TopLikedPosts";

const Home = () => {
    const { user } = useAuth();


    return (
        <div>
            <Helmet>
                <title>Phi Book | Home</title>
            </Helmet>
            
            {/* Hello {user?.email} */}

            <TopLikedPosts />

        </div>
    );
};

export default Home;