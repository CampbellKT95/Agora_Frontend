import "./login.css";
import Backdrop from '@mui/material/Backdrop';
import {CircularProgress} from "@material-ui/core";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {loginCall} from "../../api/apiCalls";
import {AuthContext} from "../../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  interface loginInterface {
    email: string;
    password: string;
  }

  const [login, setLogin] = useState<loginInterface>({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    let changedField = e.target.id;

    if (changedField === "email") {
      setLogin({ ...login, email: e.target.value });
    } else {
      setLogin({ ...login, password: e.target.value });
    }
  };

  const {user, isFetching, error, dispatch} = useContext(AuthContext);

  const [loginError, setLoginError] = useState(false)

  const handleLoginSubmit = async (e:any) => {
    e.preventDefault();
    await loginCall(login, dispatch);

    if (error) {
      setLoginError(true);
    } else {
      navigate("/profile")
    }
  }

  const [modal, setModal] = useState(false);

  const toggleModal = (e: any) => {
    e.preventDefault();
    setModal(!modal);
  }

  const [createAccount, setCreateAccount] = useState({
    createUsername: "",
    createEmail: "",
    createPassword: "",
    createPassword2: ""
  });

  const handleCreateChange = (e: any) => {
    if (e.target.id === "createUsername") {
      setCreateAccount({...createAccount, createUsername: e.target.value})
    } else if (e.target.id === "createEmail") {
      setCreateAccount({...createAccount, createEmail: e.target.value})
    } else if (e.target.id === "createPassword") {
      setCreateAccount({...createAccount, createPassword: e.target.value})
    } else {
      setCreateAccount({...createAccount, createPassword2: e.target.value})
    }
  }

  const [createError, setCreateError] = useState(false)

  const handleCreateSubmit = async (e: any) => {
    e.preventDefault();
    try {

      if (createAccount.createPassword === createAccount.createPassword2) {
        await axios.post("http://localhost:5000/api/auth/register", createAccount);
        
      } else {
        setCreateError(true);
      }

    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className="login">
      <div className="title-container">
        <h1>Agora</h1>
        <p>Learn, grow, and</p>
        <p>share your stories</p>
        <img src="/img/login-img.png" alt="login-img" className="login-img" />
      </div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <input
            placeholder="email"
            className="email-input"
            name="email"
            id="email"
            required
            onChange={handleChange}
          />
          <input
            placeholder="password"
            type="password"
            className="password-input"
            name="password"
            id="password"
            required
            onChange={handleChange}
          />

          <p className={`${loginError ? "login-error" : "no-login-error"}`}>
            Incorrect Credentials
          </p>

          <button className="login-btn" type="submit">{isFetching ? <CircularProgress color="secondary" size="25px" /> : "Login"}</button>
          <button className="google-btn">
            <span className="g">G</span>
            <span className="o-red">o</span>
            <span className="o-yellow">o</span>
            <span className="g">g</span>
            <span className="l">l</span>
            <span className="o-red">e</span>
          </button>
          <p className="create-account" onClick={toggleModal}>
            New? Create account
          </p>
        </form>
        <Backdrop sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}} open={modal}>
          <section className="modal">
            <h1>Let's get you signed up!</h1>

            <form className="modal-form" onSubmit={handleCreateSubmit}>
              <input
                placeholder="username"
                className="username-input"
                name="username"
                id="createUsername"
                value={createAccount.createUsername}
                onChange={handleCreateChange}
              />

              <input
                placeholder="email"
                className="email-input"
                name="email"
                id="createEmail"
                value={createAccount.createEmail}
                onChange={handleCreateChange}
              />
              <input
                placeholder="password"
                className="password-input"
                name="password"
                id="createPassword"
                value={createAccount.createPassword}
                onChange={handleCreateChange}
              />
              <input
                placeholder="re-enter password"
                className="password-input"
                id="createPassword2"
                value={createAccount.createPassword2}
                onChange={handleCreateChange}
              />
            
              <p className={`${createError ? "create-error" : "no-create-error"}`}>
                Passwords do not match
              </p>

              <button className="create-btn" type="submit">
                Create
              </button>
              
              <button className="back-btn" onClick={toggleModal}>Back</button>
            </form>
          </section>
        </Backdrop>
      </div>
    </div>
  );
}

export default Login;
