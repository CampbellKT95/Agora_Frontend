import "./sidebar.css";
import {useState, useContext, useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface friendInterface {
    username: string
}

const Sidebar = () => {

    const {user} = useContext(AuthContext);

    const [friendsNames, setFriendsNames] = useState<Array<string>>([]);

    const fetchFriends = () => {
        const friendsList: Array<string> = []

        user.following.map( async (friend: string) => {
            const {data} = await axios.get("http://localhost:5000/api/users/" + friend);
            const nextFriend = data.username;
            friendsList.push(nextFriend);
            return friendsList;
        });

        setFriendsNames(friendsList);
    }

    useEffect(() => {
        fetchFriends();

    }, []);

    const [toggleMobileFriends, setToggleMobileFriends] = useState(false);

    return <>
    
        <button className={`${toggleMobileFriends ? "small-friends-arrow-clicked" : "small-friends-arrow"}`}
        onClick={() => setToggleMobileFriends(!toggleMobileFriends)}>
            <KeyboardArrowRightIcon sx={{fontSize: 40}}/>
        </button>

        <aside className="sidebar">
            <h1 className="friends-title">Following</h1>
            <List>
                {friendsNames.map((friend: string) => {
                    return (
                <div>
                    <ListItem disablePadding >
                        <ListItemButton>
                        <ListItemText primary={friend} />
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
                <div>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemText primary={friend} />
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