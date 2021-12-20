import "./styles.css";
import {useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Following = () => {

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();

    // list of friends to be mapped through on render; fetched/set via api
    const [friendsNames, setFriendsNames] = useState<any>([]);

    // fetches following list from backend api 
    const fetchFriends = async () => {

        const friendsList = await Promise.all(
        user.following.map(async(friend: string) => {
            const {data} = await axios.get("http://localhost:5000/api/users/" + friend);
            return data;
        })
    );
        setFriendsNames(friendsList);
    };

    useEffect(() => {
        fetchFriends();

    }, []);

    const handleFriendClick = (e: any) => {
        navigate("/profile/" + e.target.id);
    };

    // state for displaying friends list on mobile via arrow click
    const [toggleMobileFriends, setToggleMobileFriends] = useState(false);


    return <>
        <button className={`${toggleMobileFriends ? "small-friends-arrow-clicked" : "small-friends-arrow"}`}
        onClick={() => setToggleMobileFriends(!toggleMobileFriends)}>
            <KeyboardArrowRightIcon sx={{fontSize: 40}}/>
        </button>

        {/* 800px < sidebar */}
        <aside className="sidebar">
            <h1 className="friends-title">Following</h1>
                {friendsNames.map((friend: any) => {
                    return (
                <div className="following-name">
                    <p id={friend._id} onClick={(e: any) => handleFriendClick(e)}>{friend.username}</p>
                </div>
                    )
                })}
        </aside>

        {/* mobile-sidebar */}
        <aside className={`${toggleMobileFriends ? "mobile-sidebar-shown" : "mobile-sidebar-hidden"}`}>
            <div>
                {friendsNames.map((friend: any) => {
                    return (
                <div className="friends-list">
                    <h4 className="friend-name">{friend.username}</h4>
                    
                </div>
                    )
                })}
            </div>
        </aside>
    </>
}

export default Following;