import "./timeline.css"
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import SingleTimeline from "../singleTimeline/singleTimeline";
import {AuthContext} from "../../context/AuthContext";

const Timeline = ({updatePosts, setUpdatePosts}: any) => {

    const [posts, setPosts] = useState([]);

    const {user} = useContext(AuthContext)

    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:5000/api/posts/timeline/" + user._id);

        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();

    }, [user._id, updatePosts])

    useEffect(() => {
        setUpdatePosts(false)
    }, [posts])


    return (
        <section className="timeline">
            {posts.map((item: any) => {
                return <SingleTimeline title={item.title} content={item.content}
                comments={item.comments} likes={item.likes} id={item._id} userId={item.userId} key={item.userId}
                />
            })}
        </section>
    )
}

export default Timeline;