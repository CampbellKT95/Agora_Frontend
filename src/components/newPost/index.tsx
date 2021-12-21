import "./styles.css";
import {useState, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const NewPost = ({setUpdatePosts}: any) => {

    const {user} = useContext(AuthContext);

    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        userId: user._id,
        username: user.username
    });

    const handleChange = (e: any) => {
        let changedInput = e.target.name;
        if (changedInput === "title") {
            setNewPost({...newPost, title: e.target.value})
        } else {
            setNewPost({...newPost, content: e.target.value})
        };
    };

    const handlePostSubmit = async (e: any) => {
        e.preventDefault();
        // await axios.post("/posts", newPost);
        await axios.post("https://agora-backend-ktc.herokuapp.com/posts", newPost);
        setUpdatePosts(true);
        setNewPost({
            title: "",
            content: "",
            userId: user._id,
            username: user.username
        });
    };

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

export default NewPost;