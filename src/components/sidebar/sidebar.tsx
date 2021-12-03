import "./sidebar.css";
import {useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import List from '@mui/material/List';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Sidebar = () => {

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();

    const [friendsNames, setFriendsNames] = useState<Array<string>>([]);

    const fetchFriends = () => {
        const friendsList: Array<string> = []

        user.following.map( async (friend: string) => {
            const {data} = await axios.get("http://localhost:5000/api/users/" + friend);
            friendsList.push(data);
            return friendsList;
        });

        setFriendsNames(friendsList);
    }

    useEffect(() => {
        fetchFriends();

    }, []);

    const handleFriendClick = (e: any) => {
        navigate("/personal/" + e.target.id)
    };

    const [toggleMobileFriends, setToggleMobileFriends] = useState(false);

    return <>
    
        <button className={`${toggleMobileFriends ? "small-friends-arrow-clicked" : "small-friends-arrow"}`}
        onClick={() => setToggleMobileFriends(!toggleMobileFriends)}>
            <KeyboardArrowRightIcon sx={{fontSize: 40}}/>
        </button>

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
            <List>
                {friendsNames.map((friend: any) => {
                    return (
                <div className="friends-list">
                    <h4 className="friend-name">{friend.username}</h4>
                    
                </div>
                    )
                })}
            </List>
        </aside>
    </>
}

export default Sidebar;