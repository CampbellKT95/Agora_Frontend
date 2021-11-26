import "./singleTimeline.css";
import {useState, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import RecommendIcon from '@mui/icons-material/Recommend';
import ForumIcon from '@mui/icons-material/Forum';

const SingleTimeline = (props: any) => {

    const [displayContent, setDisplayContent] = useState(false);
    const [likes, setLikes] = useState(props.likes.length)
    const [numberComments, setNumberComments] = useState(props.comments.length);
    const [commentsModal, setCommentsModal] = useState(false);
    const [commentInMaking, setCommentInMaking] = useState("")

    const {user} = useContext(AuthContext);

    const handleLikes = async () => {
        try {
            axios.put("/posts/" + props.id + "/like", {userId: user._id})

            let {data} = await axios.get("/posts/" + props.id)
            
            setLikes(data.likes.length);

        } catch (err) {
            console.log(err)
        }
    };

    //
    const handleCommentsSubmit = async (e: any) => {
        e.preventDefault();

        try {


        } catch (err) {
            console.log(err)
        }
    };
    //

    return (
        <div className="timeline-post">
            <div className="post-header">
                <h4 className="timeline-title">
                    {props.title}
                </h4>
            </div>
            <div className="timeline-content-container">
                <p className="timeline-content">
                    {`${displayContent ? props.description : props.description.substring(0, 100) + "..."}`}
                </p>
            </div>
            <div className="post-footer-container">
                <div className="likes-container">
                    <RecommendIcon className="likes-icon" 
                    onClick={handleLikes}/>
                    <p className="number-of-likes">{likes}</p>
                </div>
                <div className="comments-container">
                    <ForumIcon className="comments-icon" onClick={() => setCommentsModal(!commentsModal)}/>
                    <p className="number-of-comments">{numberComments}</p>
                </div>

                
                <Backdrop sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}} open={commentsModal}>
                    <section className="comments-modal-container">
                        <form onSubmit={() => handleCommentsSubmit} className="comments-form">
                            <textarea placeholder="What do you have to say?"
                            value={commentInMaking} onChange={(e) => setCommentInMaking(e.target.value)} />
                            <button type="submit">Send</button>
                        </form>
                        <section className="comments-section">
                                {props.comments.map((item: string) => {
                                return <h4>{item}</h4>
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