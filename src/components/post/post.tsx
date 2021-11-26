import "./post.css";
import {useState, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


const Post = () => {

    const {user} = useContext(AuthContext)
    console.log(user)

    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        userId: user._id,
        username: user.username
    })

    const handleChange = (e: any) => {
        let changedInput = e.target.name;
        if (changedInput === "title") {
            setNewPost({...newPost, title: e.target.value})
        } else {
            setNewPost({...newPost, content: e.target.value})
        }
    }

    const handlePostSubmit = (e: any) => {
        e.preventDefault();
        axios.post("/posts", newPost);
    }

    return (
        <>
            <form className="create-post" onSubmit={handlePostSubmit}>
                <input placeholder="Title" value={newPost.title} name="title" className="post-title" 
                onChange={handleChange}/>
                <textarea placeholder="What's new?" value={newPost.content} 
                className="post-content" name="content"
                onChange={handleChange}/>
                <button className="post-btn">Post</button>
            </form>
        </>
    )
}

export default Post;