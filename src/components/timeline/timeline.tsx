import "./timeline.css"
import {useState, useEffect} from "react";
import axios from "axios";
import SingleTimeline from "../singleTimeline/singleTimeline";

const Timeline = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/api/posts/timeline/619e3a521306c06c25df2661");

            setPosts(res.data);
        };
        fetchPosts();
    }, [])

    return (
        <section className="timeline">
            {posts.map((item: any) => {
                return <SingleTimeline title={item.title} description={item.description}
                comments={item.comments} likes={item.likes}
                />
            })}
            <button className="load-more-timeline">More</button>
        </section>
    )
}

export default Timeline;