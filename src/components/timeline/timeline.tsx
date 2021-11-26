import "./timeline.css"
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import SingleTimeline from "../singleTimeline/singleTimeline";
import {AuthContext} from "../../context/AuthContext";

const Timeline = () => {

    const [posts, setPosts] = useState([]);

    const {user} = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/api/posts/timeline/" + user._id);

            setPosts(res.data);
        };
        fetchPosts();
    }, [user._id])

    return (
        <section className="timeline">
            {posts.map((item: any) => {
                return <SingleTimeline title={item.title} description={item.description}
                comments={item.comments} likes={item.likes} id={item._id} userId={item.userId}
                />
            })}
            <button className="load-more-timeline">More</button>
        </section>
    )
}

export default Timeline;