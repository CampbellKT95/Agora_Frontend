import "./header.css";
import {useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

//
import {fakeList} from "./fakeList";
//

const Header = () => {

    //for showing friends list modal @ < 800px
    const [toggleMobileFriends, setToggleMobileFriends] = useState(false);

    return(
        <section className="header-section">
            <div className="header-img-container">
                <img src="https://www.ox.ac.uk/sites/files/oxford/styles/ow_large_feature/s3/field/field_image_main/b_AllSoulsquad.jpg?itok=tTcH-5ix" alt="profile-background" className="profile-background" />
            </div>
            <div className="header-personal">
                <div className="profile-img">
                    <img src="https://media.istockphoto.com/photos/silhouette-of-man-in-dark-place-anonymous-backlit-contour-a-picture-id1139459625?b=1&k=20&m=1139459625&s=170667a&w=0&h=zVpBlAmdwUDWIVf0Zxtb3idMCitol4nzII2qde8Ybag=" alt="profile-img" />
                </div>
                <div className="header-personal-detail">
                    <h1>Kadin Campbell</h1>
                    <p>Social Studies</p>
                </div>
            </div>

            <button className={`${toggleMobileFriends ? "small-friends-arrow-clicked" : "small-friends-arrow"}`}
            onClick={() => setToggleMobileFriends(!toggleMobileFriends)}>
                <KeyboardArrowRightIcon sx={{fontSize: 40}}/>
            </button>

            <aside className="sidebar">
                <h1 className="friends-title">Friends</h1>
                <List>
                    {fakeList.map((friend) => {
                        return (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton>
                            <ListItemText primary={friend} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </>
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
                    <>
                        <ListItem disablePadding>
                            <ListItemButton>
                            <ListItemText primary={friend} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </>
                        )
                    })}
                    <h4 className="more-friends">...</h4>
                </List>
            </aside>

        </section>
    )
}

export default Header;