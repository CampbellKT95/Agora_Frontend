import "./singleTutorial.css";
import {useState, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';

const SingleTutorial = (props: any) => {

    const {user} = useContext(AuthContext);

    const [trendingModal, setTrendingModal] = useState(false);
    const [likes, setLikes] = useState(props.likes.length)
    const [numberComments, setNumberComments] = useState(props.comments.length);
    const [commentInMaking, setCommentInMaking] = useState("")

    return (
        <div className="single-tutorial" onClick={() => setTrendingModal(true)}>
            <h4 className="tutorial-title">{props.title}</h4>
            <p className="tutorial-description">{props.description}</p>
        </div>
    )
};

export default SingleTutorial;