import "./styles.css";
import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

interface userInterface {
    _id: string,
    description: string,
    email: string,
    followers: [string],
    following: [string],
    isAdmin: boolean,
    languages: string,
    username: string 
};

const ProfileHeader = () => {

    const {user} = useContext(AuthContext);
    const location = useLocation();

    // page of the given user
    const [profilePageUser, setProfilePageUser] = useState<userInterface>(user);

    // grabs the given user id from url params
    const profileUrl = window.location.pathname;
    const paramId = profileUrl.toString().slice(9);

    // tracks if the profile page is of the current user's or not
    const [ownPage, setOwnPage] = useState<boolean>(false);

    // tracks if current user is already following the searched user
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        const fetchPersonalPage = async () => {
            // const {data} = await axios.get("http://localhost:5000/api/users/" + paramId);
            const {data} = await axios.get("https://agora-backend-ktc.herokuapp.com/api/users/" + paramId);

            setProfilePageUser(data);

            if (paramId === user._id) {
                setOwnPage(true);
            };

            if (data.followers.includes(user._id)) {
            setIsFollowing(true);

        } else {
            setIsFollowing(false);
        };

        };
        fetchPersonalPage();

    }, [location]);

    // adds current user id to searched user's following array
    const followUser = async () => {
        // const {data} = await axios.put("http://localhost:5000/api/users/" + profilePageUser._id + "/follow", {userId: user._id});
        const {data} = await axios.put("https://agora-backend-ktc.herokuapp.com/api/users/" + profilePageUser._id + "/follow", {userId: user._id});

        if (data.followers.includes(user._id)) {
            setIsFollowing(true);

        } else {
            setIsFollowing(false);
        };
    };

    return(
        <header className="personal-header-section">
            <section className="header-personal">
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
            </section>
        </header>
    )
}

export default ProfileHeader;