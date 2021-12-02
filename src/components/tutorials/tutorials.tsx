import "./tutorials.css";
import {useState, useEffect} from "react";
import SingleTutorial from "../singleTutorial/singleTutorial";
import axios from "axios";

const Tutorials = () => {

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
                    return <SingleTutorial title={post.title} 
                    description={post.content} key={post._id}/>
                })}
            </section>
        </div>
    )
}

export default Tutorials