import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./scenes/auth/Login";
import Registration from "./scenes/auth/Registration";
import Dashboard from "./scenes/dashboard";

const isAuthenticated = () => {
  if (localStorage.getItem("token") === null) {
    window.location.replace("/login");
    return false;
  } else {
    fetch("/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    return true;
  }
};

const RedirectIfAuthenticated = () => {
  return isAuthenticated() ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Redirect the user based on authentication status */}
          <Route path="/" element={<RedirectIfAuthenticated />} />
          <Route path="/login" element={<Login />} exact />
          <Route path="/registration" element={<Registration />} exact />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
