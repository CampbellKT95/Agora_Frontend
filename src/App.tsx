import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useState, useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
import Following from "./components/following/following";
import Trending from "./components/trending/trending";
import NewPost from "./components/newPost/newPost";
import Timeline from "./components/timeline/timeline";
import Profile from "./components/profile/profile";
import ProfileHeader from './components/profileHeader/profileHeader';


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
