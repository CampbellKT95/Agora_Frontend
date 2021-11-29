import "./navbar.css";
import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NavbarDropdown from "../navbar-dropdown/navbar-dropdown";

import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Backdrop from '@mui/material/Backdrop';
import CancelIcon from '@mui/icons-material/Cancel';

const Navbar = () => {

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [editProfileModal, setEditProfileModal]:any = useState(false);

    const [profileImages, setProfileImages] = useState({
        coverPicture: "",
        profilePicture: ""
    })

    const handleProfileEdit = () => {

    }

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate("/profile")}>
                <SchoolIcon sx={{fontSize: 50}} className="logo-icon" />
                <h1 className="logo-text">Agora</h1>
            </div>

            <div className="search">
                <input type="text" placeholder="Searching for someone?" className="search-bar"
                value={search} onChange={(e:any) => setSearch(e.target.value)}/>
            </div>

            <NavbarDropdown />

            <div className="navbar-icon-container">
                <PersonIcon fontSize="large" className="navbar-icons" />
                <span className="friend-requests">1</span>
                <MessageIcon fontSize="large" className="navbar-icons"/>
                <span className="messages">2</span>
                <AccountCircleIcon fontSize="large" className="navbar-icons"
                onClick={() => navigate("/personal/" + user._id)}/>
                <SettingsIcon fontSize="large" className="navbar-icons"
                onClick={() => setEditProfileModal(true)}/>
                <LogoutIcon fontSize="large" className="navbar-icons" 
                onClick={() => navigate("/")} />
            </div>

            <Backdrop sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}} open={editProfileModal}>
                <section className="">
                    <CancelIcon className="close-modal" sx={{fontSize: 30}}
                    onClick={() => setEditProfileModal(false)} />
                    <form className="edit-profile-form" onSubmit={handleProfileEdit} >
                        <button type="button">
                            Upload cover
                        </button>
                        <button type="button">
                            upload profile pic
                        </button>
                        <input placeholder="languages" />
                        <input placeholder="description" />
                        <button type="submit">
                            Edit
                        </button>
                    </form>
                </section>
            </Backdrop>

        </nav>
    )
}

export default Navbar;