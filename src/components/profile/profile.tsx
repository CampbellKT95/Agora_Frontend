import "./profile.css";
import {useState, useEffect, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import SingleTimeline from "../singleTimeline/singleTimeline";
import Backdrop from '@mui/material/Backdrop';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

const Profile = () => {

    const [personalPosts, setPersonalPosts] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [editedPostContent, setEditedPostContent] = useState("")

    const {user} = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const personalPostsResponse = await axios.get("http://localhost:5000/api/posts/" + user._id + "/personal");

                setPersonalPosts(personalPostsResponse.data);

                console.log(personalPosts)
            } catch (err) {
                console.log(err)
            }

        };
        fetchPosts();

    }, []);

    const handleEdit = async (post: string) => {
        const updatedPost = {};

        try {
            await axios.put("http://localhost:5000/api/posts/" + post, {updatedPost})

        } catch (err) {
            console.log(err)
        }
    };

    const handleDelete = async (post: string) => {

        const deleteData = {userId: user._id}

        try {
            axios.delete("http://localhost:5000/api/posts/" + post, {data: deleteData})

        } catch (err) {
            console.log(err)
        }
    };

    return ( <section className="personal-profile-container">
        <h1 className="personal-profile-header">View, Edit or Delete Your Posts</h1>
        <div className="personal-posts">
            
            {personalPosts.map((post: any) => {
                return (<>
                    <SingleTimeline title={post.title} content={post.content}
                    comments={post.comments} likes={post.likes} id={post._id} userId={post.userId}/>
                    <div className="edit-delete-btns-container">
                        <button className="edit-btn" 
                        onClick={() => setEditModal(true)}>
                            <EditIcon />
                        </button>
                        <button className="delete-btn" 
                        onClick={() => handleDelete(post._id)}>
                            <DeleteIcon />
                        </button>
                    </div>

                    <Backdrop sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}} open={editModal}>
                    <section className="comments-modal-container">
                        <CancelIcon className="close-modal" sx={{fontSize: 30}}
                        onClick={() => setEditModal(false)} />
                        <form onSubmit={() => handleEdit(post._id)} className="comments-form">
                            <textarea className="comment-box"
                            placeholder="Original post content"
                            value={editedPostContent} onChange={(e: any) => setEditedPostContent(e.target.value)} />
                            <button type="submit">Edit</button>
                        </form>
                    </section>
                </Backdrop>

                </>
                )
            })}

        </div>
        </section>
    )
};

export default Profile;