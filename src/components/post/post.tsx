import "./post.css";
import {useState} from "react";


const Post = () => {

    const [newPost, setNewPost] = useState({
        title: "",
        post: ""
    })

    return (
        <>
            <form className="create-post">
                <input placeholder="Title" value={newPost.title} className="post-title"/>
                <textarea placeholder="What's new?" value={newPost.post} 
                className="post-content" />
                <button className="post-btn">Post</button>

            </form>
        </>
    )
}

export default Post;