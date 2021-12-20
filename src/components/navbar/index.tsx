import "./styles.css";
import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NavbarDropdown from "../navbar-dropdown/index";
import axios from "axios";

import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Backdrop from '@mui/material/Backdrop';
import CancelIcon from '@mui/icons-material/Cancel';
import { ModalUnstyled } from "@mui/material";
import { modalUnstyledClasses } from "@mui/core";

const Navbar = () => {

    const navigate = useNavigate();

    const {user} = useContext(AuthContext);

    // input in searchbar for other users
    const [search, setSearch] = useState("");

    const handleSearchSubmit = async (e: any) => {
        e.preventDefault();
        const {data} = await axios.get("http://localhost:5000/api/users/find/" + search);
        const foundUser = data[0];

        navigate("/profile/" + foundUser.soughtId);
    };

    // onHover state for icon descriptions in navbar
    const [iconDescription, setIconDescription] = useState({
        profile: false,
        edit: false,
        logout: false
    });

    // onClick state for modal to edit profile information
    const [editProfileModal, setEditProfileModal] = useState<boolean>(false);

    interface editInterface {
        userId: string,
        username: string,
        languages: string,
        description: string
    };

    const [editedInfo, setEditedInfo] = useState<editInterface>({
        userId: user._id,
        username: user.username,
        languages: user.languages,
        description: user.description
    });

    // onChange for edit modal
    const handleProfileEdit = (e: any) => {
        
        if (e.target.name === "username") {
            setEditedInfo({...editedInfo, username: e.target.value});
        } else if (e.target.name === "languages") {
            setEditedInfo({...editedInfo, languages: e.target.value});
        } else {
            setEditedInfo({...editedInfo, description: e.target.value});
        };
    };

    // onSubmit for edit modal, sends to backend
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
                onClick={() => navigate("/profile/" + user._id)}
                onMouseEnter={() => {
                    return setIconDescription({...iconDescription, profile: true})
                }} onMouseLeave={() => {
                    return setIconDescription({...iconDescription, profile: false})
                }}/>
                <span className={`${iconDescription.profile ? "icon-description-profile" : "icon-description-profile-hide"}`} id="profile-icon-description">profile</span>

                <SettingsIcon fontSize="large" className="navbar-icons"
                onClick={() => setEditProfileModal(true)} onMouseEnter={() => {
                    return setIconDescription({...iconDescription, edit: true})
                }} onMouseLeave={() => {
                    return setIconDescription({...iconDescription, edit: false})
                }}/>
                <span className={`${iconDescription.edit ? "icon-description-edit" : "icon-description-edit-hide"}`} id="edit-icon-description">edit</span>

                <LogoutIcon fontSize="large" className="navbar-icons" 
                onClick={() => navigate("/")} 
                onMouseEnter={() => {
                    return setIconDescription({...iconDescription, logout: true})
                }} onMouseLeave={(e:any) => {
                    e.stopPropagation();
                    return setIconDescription({...iconDescription, logout: false})
                }}/>
                <span className={`${iconDescription.logout ? "icon-description-logout" : "icon-description-logout-hide"}`} id="logout-icon-description">logout</span>
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