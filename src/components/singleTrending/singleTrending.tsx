import "./singleTrending.css";
import {useState, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import Backdrop from '@mui/material/Backdrop';
import RecommendIcon from '@mui/icons-material/Recommend';
import ForumIcon from '@mui/icons-material/Forum';
import CancelIcon from '@mui/icons-material/Cancel';

const SingleTrending = (props: any) => {

    const {user} = useContext(AuthContext);

    const [trendingCommentModal, setTrendingCommentModal] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(props.likes.length)
    const [numberComments, setNumberComments] = useState<number>(props.comments.length);
    const [commentInMaking, setCommentInMaking] = useState<string>("")

    const handleCommentsSubmit = async (e: any) => {
    e.preventDefault();

    try {
        await axios.put("/posts/" + props.id + "/comment", 
        { author: user.username, comment: commentInMaking})
        setTrendingCommentModal(false)
        props.setUpdatedComments(true);
        setNumberComments(numberComments + 1)
        props.setUpdatedComments(false);
    } catch (err) {
        console.log(err)
    }
};

    return (
        <>
            <div className="single-tutorial" onClick={() => setTrendingCommentModal(true)}>
                <h4 className="tutorial-title">{props.title}</h4>
                <p className="tutorial-description">{props.description}</p>
                <div className="trending-icon-container">
                    <div className="trending-like-container">
                        <RecommendIcon />
                        <p className="trending-likes-position">{likes}</p>
                    </div>
                    <div className="trending-comment-container">
                        <ForumIcon />
                        <p className="trending-comments-position">{numberComments}</p>
                    </div>
                </div>
            </div>

            <Backdrop sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}} open={trendingCommentModal}>
                <section className="comments-modal-container">
                    <CancelIcon className="close-modal" sx={{fontSize: 30}}
                    onClick={() => setTrendingCommentModal(false)} />
                    <form onSubmit={(e) => handleCommentsSubmit(e)} className="comments-form">
                        <textarea className="comment-box"
                        placeholder="What do you have to say?"
                        value={commentInMaking} onChange={(e) => setCommentInMaking(e.target.value)} 
                        rows={5}/>
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
        </>
    )
};

export default SingleTrending;