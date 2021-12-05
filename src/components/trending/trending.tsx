import "./trending.css";
import {useState, useEffect} from "react";
import SingleTrending from "../singleTrending/singleTrending";
import axios from "axios";

const Trending = () => {

    const [trendingPosts, setTrendingPosts] = useState([])

    const fetchTrending = async () => {
        const {data} = await axios.get("http://localhost:5000/api/posts/all/trending");

        return setTrendingPosts(data);
    }

    useEffect(() => {
        fetchTrending();

    }, [])

    return (
        <div className="tutorials">
            <h1 className="tutorials-title">Trending</h1>
            <section className="tutorials-container">
                {trendingPosts.map((post: any) => {
                    return <SingleTrending title={post.title} likes={post.likes}
                    description={post.content} key={post._id} comments={post.comments}/>
                })}
            </section>
        </div>
    )
}

export default Trending;