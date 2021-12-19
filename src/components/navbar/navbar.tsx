import "./navbar.css";
import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NavbarDropdown from "../navbar-dropdown/navbar-dropdown";
import axios from "axios";

import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Backdrop from '@mui/material/Backdrop';
import CancelIcon from '@mui/icons-material/Cancel';

const Navbar = () => {

    const navigate = useNavigate();

    const {user} = useContext(AuthContext);

    const [search, setSearch] = useState("");

    const handleSearchSubmit = async (e: any) => {
        e.preventDefault();
        const {data} = await axios.get("http://localhost:5000/api/users/find/" + search);
        const foundUser = data[0];

        navigate("/profile/" + foundUser.soughtId)
    }

    const [editProfileModal, setEditProfileModal] = useState<boolean>(false);

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
            <div className="logo" onClick={() => navigate("/timeline")}>
                <img src="img/logo.png" alt="logo" className="logo-img"/>
            </div>

            <div className="search">
                    <input type="text" placeholder="Search" className="search-bar"
                    value={search} onChange={(e:any) => setSearch(e.target.value)}/>
                    <button onClick={handleSearchSubmit} className="search-bar-btn"><SearchIcon 
                    sx={{fontSize: 30}} className="search-bar-btn" /></button>
            </div>

            <NavbarDropdown setEditProfileModal={setEditProfileModal}/>

            <div className="navbar-icon-container">
                <AccountCircleIcon fontSize="large" className="navbar-icons"
                onClick={() => navigate("/profile/" + user._id)}/>
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