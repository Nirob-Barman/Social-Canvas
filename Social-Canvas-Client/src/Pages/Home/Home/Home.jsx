import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import TopLikedPosts from "../../DashBoard/TopLikedPosts/TopLikedPosts";
import TopCommentedPosts from "../../DashBoard/TopCommentedPosts/TopCommentedPosts";

const Home = () => {
    const { user } = useAuth();


    return (
        <div>
            <Helmet>
                <title>Phi Book | Home</title>
            </Helmet>

            {/* Hello {user?.email} */}

            <TopLikedPosts />

            <TopCommentedPosts />

        </div>
    );
};

export default Home;