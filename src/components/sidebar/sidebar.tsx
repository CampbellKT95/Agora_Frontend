import "./sidebar.css";
import {useState, useContext, useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface friendInterface {
    username: string,
    _id: string
}

const Sidebar = () => {

    const {user} = useContext(AuthContext);

    useEffect(() => {
        const friendsList = user.following;
        console.log(friendsList)

    }, [])

    const [toggleMobileFriends, setToggleMobileFriends] = useState(false);

    return <>
    
        <button className={`${toggleMobileFriends ? "small-friends-arrow-clicked" : "small-friends-arrow"}`}
        onClick={() => setToggleMobileFriends(!toggleMobileFriends)}>
            <KeyboardArrowRightIcon sx={{fontSize: 40}}/>
        </button>

        <aside className="sidebar">
            <h1 className="friends-title">Friends</h1>
            <List>
                {user.following.map((friend: friendInterface) => {
                    return (
                <div key={friend._id}>
                    <ListItem disablePadding >
                        <ListItemButton>
                        <ListItemText primary={friend.username} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </div>
                    )
                })}
                <h4 className="more-friends">...</h4>
            </List>
        </aside>

        {/* mobile-sidebar */}
        <aside className={`${toggleMobileFriends ? "mobile-sidebar-shown" : "mobile-sidebar-hidden"}`}>
            <List>
                {user.following.map((friend: friendInterface) => {
                    return (
                <div key={friend._id}>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemText primary={friend.username} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </div>
                    )
                })}
                <h4 className="more-friends">...</h4>
            </List>
        </aside>
    </>
}

export default Sidebar;