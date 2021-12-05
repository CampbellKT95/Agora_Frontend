import "./profileHeader.css";
import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const ProfileHeader = () => {

    const {user} = useContext(AuthContext);
    const [profilePageUser, setProfilePageUser] = useState(user)

    const profileUrl = window.location.pathname;
    const paramId = profileUrl.toString().slice(9)

    const [ownPage, setOwnPage] = useState(false);

    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchPersonalPage = async () => {
            console.log(paramId)
            const {data} = await axios.get("http://localhost:5000/api/users/" + paramId)

            setProfilePageUser(data);

            if (paramId === user._id) {
                setOwnPage(true)
            }

            if (data.followers.includes(user._id)) {
            setIsFollowing(true);

        } else {
            setIsFollowing(false);
        }

        };
        fetchPersonalPage();

    }, [])

    const followUser = async () => {
        const {data} = await axios.put("http://localhost:5000/api/users/" + profilePageUser._id + "/follow", {userId: user._id});

        if (data.followers.includes(user._id)) {
            setIsFollowing(true);

        } else {
            setIsFollowing(false);
        }
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
                <div className={`${ownPage ? "hide-follow-btn-container" : "follow-btn-container"}`}>
                    <button className={`${isFollowing ? "unfollow-btn" : "follow-btn"}`} onClick={followUser}>
                        {`${isFollowing ? "Unfollow" : "Follow"}`}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProfileHeader;