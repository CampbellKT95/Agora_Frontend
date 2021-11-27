import "./profile.css";
import {useState, useEffect, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import SingleTimeline from "../singleTimeline/singleTimeline";

const Profile = () => {

    const [personalPosts, setPersonalPosts] = useState([]);

    const {user} = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const personalPostsResponse = await axios.get("http://localhost:5000/api/posts/" + user._id + "/personal");

                setPersonalPosts(personalPostsResponse.data);

                console.log(personalPosts)
            } catch (err) {
                console.log(err)
            }

        };
        fetchPosts();

    }, [])

    return (
        <section className="personal-profile-container">
            <h1>View, Edit or Delete Your Posts</h1>
            
            {personalPosts.map((post: any) => {
                return <SingleTimeline title={post.title} content={post.content}
                comments={post.comments} likes={post.likes} id={post._id} userId={post.userId}/>
            })}

        </section>
    )
};

export default Profile;