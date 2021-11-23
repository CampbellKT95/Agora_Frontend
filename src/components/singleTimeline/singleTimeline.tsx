import "./singleTimeline.css";
import {useState} from "react";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import RecommendIcon from '@mui/icons-material/Recommend';
import ForumIcon from '@mui/icons-material/Forum';

const SingleTimeline = (props: any) => {

    const [displayContent, setDisplayContent] = useState(false);

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
                    <RecommendIcon className="likes-icon"/>
                    <p className="number-of-likes">{props.likes}</p>
                </div>
                <div className="comments-container">
                    <ForumIcon className="comments-icon"/>
                    <p className="number-of-comments">{props.comments}</p>
                </div>
                <button className={`${displayContent ? "display-more-btn-clicked" : "display-more-btn"}`}
                onClick={() => setDisplayContent(!displayContent)}>
                    <ArrowCircleDownIcon sx={{fontSize: 30}}/>
                </button>
            </div>
        </div>
    )
};

export default SingleTimeline;