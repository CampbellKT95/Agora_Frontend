import "./timeline.css"
import {useState, useEffect} from "react";
import axios from "axios";
import SingleTimeline from "../singleTimeline/singleTimeline";

//
import {fakeList} from "./fakeList";
//

const Timeline = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/posts/timeline/619da3b8f0ebe1cd9f0ea757");
            console.log(res)
        };
        fetchPosts();
    }, [])

    return (
        <section className="timeline">
            {fakeList.map((item) => {
                return <SingleTimeline title={item.title} content={item.content}
                comments={item.comments} likes={item.likes}
                />
            })}
            <button className="load-more-timeline">More</button>
        </section>
    )
}

export default Timeline;