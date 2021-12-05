import "./singleTrending.css";
import {useState, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';

const SingleTrending = (props: any) => {

    const {user} = useContext(AuthContext);

    const [trendingModal, setTrendingModal] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(props.likes.length)
    const [numberComments, setNumberComments] = useState<number>(props.comments.length);
    const [commentInMaking, setCommentInMaking] = useState<string>("")

    return (
        <div className="single-tutorial" onClick={() => setTrendingModal(true)}>
            <h4 className="tutorial-title">{props.title}</h4>
            <p className="tutorial-description">{props.description}</p>
        </div>
    )
};

export default SingleTrending;