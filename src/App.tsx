import './App.css';
import Login from "./components/login/Login";
import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Tutorials from "./components/tutorials/tutorials";
import Post from "./components/post/post";
import Timeline from "./components/timeline/timeline";


function App() {
  return (
    <>
      {/* <Login /> */}
      <Navbar />
      <main className="main-container">
        <Header />
        <Sidebar />
        <Post />
        <Timeline />
        <Tutorials />
      </main>
    </>
  );
}

export default App;
