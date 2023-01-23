import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
 
} from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  // update isAuth directly from the localStorage
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  function LogOut() {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  }

  return (
    <Router>
      <nav>
        <Link to={"/"}>Home</Link>
        {!isAuth ? (
          <Link to={"/login"}>login</Link>
        ) : (
          <>
            <Link to={"/createpost"}>createpost</Link>
            <button onClick={LogOut}> Log Out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
