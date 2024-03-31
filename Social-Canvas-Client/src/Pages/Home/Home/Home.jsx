import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import TopLikedPosts from "../../DashBoard/TopLikedPosts/TopLikedPosts";
import TopCommentedPosts from "../../DashBoard/TopCommentedPosts/TopCommentedPosts";
import Testimonials from "../Testimonials/Testimonials";
import ContactAndSupport from "../ContactAndSupport/ContactAndSupport";
import Banner from "../Banner/Banner";
import EventCalendar from "./EventCalendar/EventCalendar";

const Home = () => {
    const { user } = useAuth();


    return (
        <div>
            <Helmet>
                <title>Phi Book | Home</title>
            </Helmet>

            {/* Hello {user?.email} */}

            <div className="bg-gray-100 ">
                <Banner />

                <TopLikedPosts />

                <TopCommentedPosts />

                <EventCalendar />

                <Testimonials />

                <ContactAndSupport />
            </div>

        </div>
    );
};

export default Home;