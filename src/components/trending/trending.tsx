import "./trending.css";
import {useState, useEffect} from "react";
import SingleTrending from "../singleTrending/singleTrending";
import axios from "axios";

interface postInterface {
    _id: string,
    comments: [string],
    content: string,
    createdAt: string,
    likes: [string],
    title: string,
    userId: string,
    username: string
};

const Trending = () => {

    const [trendingPosts, setTrendingPosts] = useState<postInterface[]>([]);

    const [updatedComments, setUpdatedComments] = useState<boolean>(false)

    const fetchTrending = async () => {
        const {data} = await axios.get("http://localhost:5000/api/posts/all/trending");

        return setTrendingPosts(data);
    };

    useEffect(() => {
        fetchTrending();

    }, [updatedComments]);

    return (
        <div className="tutorials">
            <h2 className="tutorials-title">Trending</h2>
            <section className="tutorials-container">
                {trendingPosts.map((post: any) => {
                    return <SingleTrending title={post.title} likes={post.likes}
                    description={post.content} key={post._id} id={post._id} comments={post.comments} setUpdatedComments={setUpdatedComments}/>
                })}
            </section>
        </div>
    )
}

export default Trending;