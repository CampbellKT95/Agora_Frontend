import "./login.css";
import {useState} from "react";

function Login() {

    interface loginInterface {
        email: string,
        password: string
    }

    const [login, setLogin] = useState<loginInterface>({
        email: "",
        password: "",
    })

    const handleChange = (e: any) => {
        let changedField = e.target.id;

        if (changedField === "email") {
            setLogin({...login, email: e.target.value})
        } else {
            setLogin({...login, password: e.target.value})
        };
    }

    return (
        <div className="login">
            <div className="title-container">
                <h1>Agora</h1>
                <p>Where others know your pain</p>
            </div>
            <div className="login-container">
                <form className="login-form">
                    <input placeholder="email" className="email-input" id="email" onChange={handleChange}/>
                    <input placeholder="password" className="password-input" 
                    id="password" onChange={handleChange}/>
                    <button className="login-btn">Login</button>
                    <button className="google-btn">
                        <span className="g">G</span>
                        <span className="o-red">o</span>
                        <span className="o-yellow">o</span>
                        <span className="g">g</span>
                        <span className="l">l</span>
                        <span className="o-red">e</span>
                    </button>
                    <p className="create-account">New? Create account</p>
                </form>
            </div>
        </div>
    )
}

export default Login
