import "./post.css";
import {useState} from "react";

const Post = () => {

    const [newPost, setNewPost] = useState("")

    return (
        <>
            <form>
                <input placeholder="What's new?" value={newPost} 
                className="make-post" />
            </form>
        </>
    )
}

export default Post;