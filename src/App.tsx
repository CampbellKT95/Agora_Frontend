import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Login from "./components/login/Login";
import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Tutorials from "./components/tutorials/tutorials";
import Post from "./components/post/post";
import Timeline from "./components/timeline/timeline";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        {/* <Route path="/profile/:username"> */}

        <Route path="/profile" element={<>
          <Navbar />
          <main className="main-container">
            <Header />
            <Sidebar />
            <Post />
            <Timeline />
            <Tutorials />
          </main>
        </>}>
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
