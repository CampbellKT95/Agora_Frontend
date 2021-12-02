import "./personalHeader.css";
import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const PersonalHeader = () => {

    const {user} = useContext(AuthContext);
    const [profilePageUser, setProfilePageUser] = useState(user)

    const profileUrl = window.location.pathname;
    const paramId = profileUrl.toString().slice(10)

    useEffect(() => {
        const fetchPersonalPage = async () => {
            const {data} = await axios.get("http://localhost:5000/api/users/" + paramId)
            setProfilePageUser(data);
        };
        fetchPersonalPage();

    }, [])

    const followUser = async () => {
        await axios.put("http://localhost:5000/api/users/" + profilePageUser._id + "/follow", {userId: user._id});

    }

    return(
        <section className="personal-header-section">
            <div className="header-personal">
                <div className="profile-personal-detail">
                    <h1>
                        {profilePageUser.username}
                    </h1>
                    <p>
                        {profilePageUser.languages}
                    </p>
                </div>
                <div>
                    <p className="profile-description">{profilePageUser.description}</p>
                </div>
                <button className="follow-btn" onClick={followUser}>
                    Follow
                </button>
            </div>
        </section>
    )
}

export default PersonalHeader;