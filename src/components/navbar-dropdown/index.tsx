import "./styles.css";
import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {FaBars} from "react-icons/fa";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const NavbarDropdown = ({setEditProfileModal}: any) => {

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();

    // dropdown menu state
    const [displayMenu, setDisplayMenu] = useState<boolean>(false);

    return (
        <>
            <div className="dropdown" 
            onClick={() => setDisplayMenu(!displayMenu)}>
                <FaBars 
                className={`${displayMenu ? "dropdown-bars-active" : "dropdown-bars"}`} />

                <div className={`${displayMenu ? "dropdown-menu-container" : "dropdown-menu-hide"}`}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon className="dropdown-icon-color"/>
                        </ListItemIcon>
                        <ListItemText primary="Account" onClick={() => navigate("/profile")}/>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon className="dropdown-icon-color"/>
                        </ListItemIcon>
                        <ListItemText primary="Settings" onClick={() => {
                            setEditProfileModal(true)
                        }}/>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon className="dropdown-icon-color"/>
                        </ListItemIcon>
                        <ListItemText primary="Logout" onClick={() => navigate("/")}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
            </div>
        </>
    )
}

export default NavbarDropdown;