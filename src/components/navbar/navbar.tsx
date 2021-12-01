import "./navbar.css";
import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NavbarDropdown from "../navbar-dropdown/navbar-dropdown";
import axios from "axios";

import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Backdrop from '@mui/material/Backdrop';
import CancelIcon from '@mui/icons-material/Cancel';

const Navbar = () => {

    const navigate = useNavigate();

        const {user} = useContext(AuthContext);

    const [search, setSearch] = useState("");

    const handleSearchSubmit = (e: any) => {
        e.preventDefault()
    }

    const [editProfileModal, setEditProfileModal]:any = useState(false);

    interface editInterface {
        userId: string,
        username: string,
        languages: string,
        description: string
    }

    const [editedInfo, setEditedInfo] = useState<editInterface>({
        userId: user._id,
        username: user.username,
        languages: user.languages,
        description: user.description
    });


    const handleProfileEdit = (e: any) => {
        
        if (e.target.name === "username") {
            setEditedInfo({...editedInfo, username: e.target.value});
        } else if (e.target.name === "languages") {
            setEditedInfo({...editedInfo, languages: e.target.value});
        } else {
            setEditedInfo({...editedInfo, description: e.target.value});
        }
    };

    const handleEditSubmit = async (e: any) => {
        e.preventDefault();

        await axios.put("http://localhost:5000/api/users/" + user._id, editedInfo);

        setEditProfileModal(false);
    };

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate("/profile")}>
                <SchoolIcon sx={{fontSize: 50}} className="logo-icon" />
                <h1 className="logo-text">Agora</h1>
            </div>

            <div className="search">
                <form onSubmit={handleSearchSubmit}>
                    <input type="text" placeholder="Searching for someone?" className="search-bar"
                    value={search} onChange={(e:any) => setSearch(e.target.value)}/>
                </form>
            </div>

            <NavbarDropdown setEditProfileModal={setEditProfileModal}/>

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
                <section className="edit-profile-modal">
                    <CancelIcon sx={{fontSize: 30}}
                    onClick={() => setEditProfileModal(false)} className="cancel-icon"/>
                    <form className="edit-profile-form" onSubmit={(e) => handleEditSubmit(e)} >
                        <input type="text" name="username" placeholder="username" value={editedInfo.username} 
                        onChange={(e) => handleProfileEdit(e)}/>
                        <input type="text" name="languages" placeholder="languages" value={editedInfo.languages}
                        onChange={(e) => handleProfileEdit(e)}/>
                        <textarea name="description" placeholder="description" 
                        value={editedInfo.description} 
                        onChange={(e) => handleProfileEdit(e)}/>
                        <button type="submit">
                            Make Changes
                        </button>
                    </form>
                </section>
            </Backdrop>

        </nav>
    )
}

export default Navbar;