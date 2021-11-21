import './App.css';
import Login from "./components/login/Login";
import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";

function App() {
  return (
    <div className="App-container">
      {/* <Login /> */}
      <Navbar />
      <Header />
    </div>
  );
}

export default App;
