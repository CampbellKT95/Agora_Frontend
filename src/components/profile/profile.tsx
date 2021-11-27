import "./profile.css";
import {useState, useEffect, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import SingleTimeline from "../singleTimeline/singleTimeline";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Profile = () => {

    const [personalPosts, setPersonalPosts] = useState([]);

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

    const handleEdit = () => {

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
                    <div className="edit-delete-btns-container" onClick={handleEdit}>
                        <button className="edit-btn">
                            <EditIcon />
                        </button>
                        <button className="delete-btn" 
                        onClick={() => handleDelete(post._id)}>
                            <DeleteIcon />
                        </button>
                    </div>

                </>
                )
            })}

        </div>
        </section>
    )
};

export default Profile;