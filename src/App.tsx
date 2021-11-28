import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Tutorials from "./components/tutorials/tutorials";
import Post from "./components/post/post";
import Timeline from "./components/timeline/timeline";
import Profile from "./components/profile/profile";
import PersonalHeader from './components/personalHeader/personalHeader';


function App() {

  const {user} = useContext(AuthContext);

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        {/* <Route path="/profile/:username"> */}

        <Route path="/profile" element={
        user ? 
          <>
          <Navbar />
          <main className="main-container">
            <Header />
            <Sidebar />
            <Post />
            <Timeline />
            <Tutorials />
          </main>
        </> 
        : <Login />
      } />
      <Route path="/personal" element={
        <>
          <Navbar />
          <main className="personal-container">
            <PersonalHeader />
            <Sidebar />
            <Profile />
            <Tutorials />
          </main>
        </>
      } />
      </Routes>
    </Router>
  );
}

export default App;
