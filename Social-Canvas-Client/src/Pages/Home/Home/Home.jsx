import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import TopLikedPosts from "../../DashBoard/TopLikedPosts/TopLikedPosts";
import TopCommentedPosts from "../../DashBoard/TopCommentedPosts/TopCommentedPosts";
import Testimonials from "../Testimonials/Testimonials";
import ContactAndSupport from "../ContactAndSupport/ContactAndSupport";

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

            <Testimonials />

            <ContactAndSupport />

        </div>
    );
};

export default Home;