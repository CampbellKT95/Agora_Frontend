import "./personalHeader.css";
import {useContext, useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const PersonalHeader = () => {

    const {user} = useContext(AuthContext);


    let params = new window.URLSearchParams(window.location.search)

    console.log(window.location.pathname)


    const followUser = async () => {


    }

    return(
        <section className="personal-header-section">
            <div className="header-personal">
                <div className="profile-personal-detail">
                    <h1>{user.username}</h1>
                    <p>{user.languages}</p>
                </div>
                <div>
                    <p className="profile-description">{user.description}</p>
                </div>
                <button className="follow-btn" onClick={followUser}>
                    Follow
                </button>
            </div>
        </section>
    )
}

export default PersonalHeader;