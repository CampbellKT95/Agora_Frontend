import "./styles.css";
import {useState, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import RecommendIcon from '@mui/icons-material/Recommend';
import ForumIcon from '@mui/icons-material/Forum';
import CancelIcon from '@mui/icons-material/Cancel';

const SingleTimeline = (props: any) => {

    // displaying full post content (true) or just a short substring (false)
    const [displayContent, setDisplayContent] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(props.likes.length)
    const [numberComments, setNumberComments] = useState<number>(props.comments.length);

    // displaing comment modal & tracking the onChange within
    const [commentsModal, setCommentsModal] = useState<boolean>(false);
    const [commentInMaking, setCommentInMaking] = useState<string>("")

    const {user} = useContext(AuthContext);

    const handleLikes = async () => {
        try {
            await axios.put("/posts/" + props.id + "/like", {userId: user._id})

            let {data} = await axios.get("/posts/" + props.id)

            console.log(data);

            if (data.likes.includes(user._id)) {
                setLikes(likes + 1);
            } else {
                setLikes(likes - 1)
            };

        } catch (err) {
            console.log(err)
        }
    };

    const handleCommentsSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await axios.put("/posts/" + props.id + "/comment", 
            { author: user.username, comment: commentInMaking})
            setCommentsModal(false)
            props.setUpdateComments(true)
            setNumberComments(numberComments + 1)
            props.setUpdateComments(false)

        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="timeline-post">
            <div className="post-header">
                <h4 className="timeline-title">
                    {props.title}
                </h4>
            </div>
            <div className="timeline-content-container">
                <p className="timeline-content">
                    {`${displayContent ? props.content : props.content.substring(0, 100) + "..."}`}
                </p>
            </div>
            <div className="post-footer-container">
                <div className="likes-container">
                    <RecommendIcon className="likes-icon" 
                    onClick={handleLikes}/>
                    <p className="number-of-likes">{likes}</p>
                </div>
                <div className="comments-container">
                    <ForumIcon className="comments-icon" onClick={() => setCommentsModal(true)}/>
                    <p className="number-of-comments">{numberComments}</p>
                </div>
                <p className="timeline-username">
                    {props.username}
                </p>
                
                <Backdrop sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}} open={commentsModal}>
                    <section className="comments-modal-container">
                        <CancelIcon className="close-modal" sx={{fontSize: 30}}
                        onClick={() => setCommentsModal(false)} />
                        <form onSubmit={(e) => handleCommentsSubmit(e)} className="comments-form">
                            <textarea className="comment-box"
                            placeholder="What do you have to say?"
                            value={commentInMaking} onChange={(e) => setCommentInMaking(e.target.value)} 
                            rows={5} />
                            <button type="submit">Send</button>
                        </form>
                        <section className="comments-section">
                            
                            {props.comments.map((comment: any) => {
                                return <>
                                    <h4 className="single-comment-username">{comment.author}</h4> 
                                    <p className="single-comment">{comment
                                    .comment}</p>
                                </>
                            })}

                        </section>
                    </section>
                </Backdrop>
                
                <button className={`${displayContent ? "display-more-btn-clicked" : "display-more-btn"}`}
                onClick={() => setDisplayContent(!displayContent)}>
                    <ArrowCircleDownIcon sx={{fontSize: 30}}/>
                </button>
            </div>
        </div>
    )
};

export default SingleTimeline;