import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useState, useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Login from "./components/login/index";
import Navbar from "./components/navbar/index";
import Header from "./components/header/index";
import Following from "./components/following/index";
import Trending from "./components/trending/index";
import NewPost from "./components/newPost/index";
import Timeline from "./components/timeline/index";
import Profile from "./components/profile/index";
import ProfileHeader from './components/profileHeader/index';

function App() {

  const {user} = useContext(AuthContext);

  const [updatePosts, setUpdatePosts] = useState(false)

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/timeline" element={
        user ? 
          <>
          <Navbar />
          <main className="main-container">
            <Header />
            <Following />
            <NewPost setUpdatePosts={setUpdatePosts}/>
            <Timeline updatePosts={updatePosts} setUpdatePosts={setUpdatePosts}/>
            <Trending />
          </main>
        </> 
        : <Login />
      } />
      <Route path="/profile/:userId" element={
        <>
          <Navbar />
          <main className="personal-container">
            <ProfileHeader />
            <Following />
            <Profile />
          </main>
        </>
      } />
      </Routes>
    </Router>
  );
}

export default App;
