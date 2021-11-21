import './App.css';
import Login from "./components/login/Login";
import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
import Post from "./components/post/post";

function App() {
  return (
    <div className="App-container">
      {/* <Login /> */}
      <Navbar />
      <Header />
      <Post />
    </div>
  );
}

export default App;
