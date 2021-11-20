import "./navbar.css";
import {useState} from "react";
import NavbarDropdown from "../navbar-dropdown/navbar-dropdown";
import SchoolIcon from '@mui/icons-material/School';
import {FaBars} from "react-icons/fa";
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {

    const [search, setSearch] = useState("")

    return (
        <nav className="navbar">
            <div className="logo">
                <SchoolIcon sx={{fontSize: 50}}/>
            </div>

            <div className="search">
                <input type="text" placeholder="Searching for someone?" className="search-bar"
                value={search} onChange={(e:any) => setSearch(e.target.value)}/>
            </div>

            <NavbarDropdown />

            {/* <div className="dropdown">
                <FaBars className="dropdown-bars" />
            </div>
            <div className="dropdown-menu-container">
                <ul className="dropdown-menu">

                </ul>
            </div> */}

            <div className="navbar-icon-container">
                <PersonIcon />
                <MessageIcon />
                <AccountCircleIcon />
            </div>

        </nav>
    )
}

export default Navbar;