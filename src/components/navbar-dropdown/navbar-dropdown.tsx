import "./navbar-dropdown.css";
import {useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {FaBars} from "react-icons/fa";
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';

const NavbarDropdown = () => {

    const [displayMenu, setDisplayMenu] = useState(false);

    return (
        <>
            <div className="dropdown" 
            onClick={() => setDisplayMenu(!displayMenu)}>
                <FaBars 
                className={`${displayMenu ? "dropdown-bars-active" : "dropdown-bars"}`} />
            </div>

            <div className={`${displayMenu ? "dropdown-menu-container" : "dropdown-menu-hide"}`}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Friends" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <MessageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Messages" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>

        </>
    )
}

export default NavbarDropdown;