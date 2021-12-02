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

    const {user} = useContext(AuthContext)

    const [profilePageUser, setProfilePageUser] = useState(user)

    const profileUrl = window.location.pathname;
    const paramId = profileUrl.toString().slice(10)

    useEffect(() => {
        const fetchPersonalPage = async () => {
            const {data} = await axios.get("http://localhost:5000/api/users/" + paramId)
            setProfilePageUser(data);
        };
        fetchPersonalPage();

    }, [])

    const [personalPosts, setPersonalPosts] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [editedPostContent, setEditedPostContent] = useState("")
    const [editedPostId, setEditedPostId] = useState("");

    const fetchPosts = async () => {
    try {
        const personalPostsResponse = await axios.get("http://localhost:5000/api/posts/" + profilePageUser._id + "/personal");

        setPersonalPosts(personalPostsResponse.data);
    
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchPosts();

    }, [editModal, profilePageUser]);

    const setUpEdit = (postContent: string, postId: string) => {
        setEditedPostContent(postContent);
        setEditedPostId(postId);
        setEditModal(true);
    }

    const handleEdit = async (e: any) => {
        e.preventDefault();

        const updatedPost = {
            content: editedPostContent,
            userId: user._id
        };

        if (user._id === profilePageUser._id) {
            try {
                await axios.put("http://localhost:5000/api/posts/" + editedPostId + "/update", {data: updatedPost});

                setEditModal(false);

            } catch (err) {
                console.log(err)
            }
        } else {
            console.log("You cannot edit another's post")
        };
    }
    
    const handleDelete = async (deletePostId: string) => {

        const deleteData = {userId: user._id}

        if (user._id === profilePageUser._id) {
            try {
                await axios.delete("http://localhost:5000/api/posts/" + deletePostId + "/delete", {data: deleteData});

                fetchPosts();

            } catch (err) {
                console.log(err)
            }
        } else {
            console.log("You cannot delete another's post")
        };
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
                        onClick={ () => {if (user._id === profilePageUser._id) {
                            setUpEdit(post.content, post._id)
                        }}}>
                            <EditIcon />
                        </button>
                        <button className="delete-btn" 
                        onClick={() => handleDelete(post._id)}>
                            <DeleteIcon />
                        </button>

                        <Backdrop sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}} open={editModal}>
                        <section className="comments-modal-container">
                            <CancelIcon className="close-modal" sx={{fontSize: 30}}
                            onClick={() => setEditModal(false)} />
                            <form className="comments-form" onSubmit={(e: any) => handleEdit(e)} >
                                <textarea className="comment-box"
                                placeholder="Original post content"
                                value={editedPostContent} onChange={(e: any) => setEditedPostContent(e.target.value)} />
                                <button type="submit">
                                    Edit
                                </button>
                            </form>
                        </section>
                        </Backdrop>
                    </div>
                </>
                )
            })}

        </div>
        </section>
    )
};

export default Profile;