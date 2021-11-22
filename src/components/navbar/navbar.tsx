import "./navbar.css";
import {useState} from "react";
import NavbarDropdown from "../navbar-dropdown/navbar-dropdown";
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {

    const [search, setSearch] = useState("")

    return (
        <nav className="navbar">
            <div className="logo">
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
                <AccountCircleIcon fontSize="large" className="navbar-icons"/>
            </div>

        </nav>
    )
}

export default Navbar;