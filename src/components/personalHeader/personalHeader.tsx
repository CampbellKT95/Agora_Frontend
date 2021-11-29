import "./personalHeader.css";
import {useState, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const PersonalHeader = () => {

    const {user} = useContext(AuthContext);

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
            </div>
        </section>
    )
}

export default PersonalHeader;