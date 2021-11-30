import "./sidebar.css";
import {fakeList} from "./fakeList.js";
import {useState} from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface friend {
    name: string,
    id: string
}

const Sidebar = () => {

    const [toggleMobileFriends, setToggleMobileFriends] = useState(false);

    return <>
    
        <button className={`${toggleMobileFriends ? "small-friends-arrow-clicked" : "small-friends-arrow"}`}
        onClick={() => setToggleMobileFriends(!toggleMobileFriends)}>
            <KeyboardArrowRightIcon sx={{fontSize: 40}}/>
        </button>

        <aside className="sidebar">
            <h1 className="friends-title">Friends</h1>
            <List>
                {fakeList.map((friend) => {
                    return (
                <div key={friend.id}>
                    <ListItem disablePadding >
                        <ListItemButton>
                        <ListItemText primary={friend.name} />
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
                {fakeList.map((friend) => {
                    return (
                <div key={friend.id}>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemText primary={friend.name} />
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