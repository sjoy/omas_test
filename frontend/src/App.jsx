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
import AnimalTypesList from "./scenes/animal_type/list"
import AnimalTypeAdd from "./scenes/animal_type/add"
import AnimalTypeEdit from "./scenes/animal_type/edit"
import BreedsList from "./scenes/breed/list";
import BreedAdd from "./scenes/breed/add";
import BreedEdit from "./scenes/breed/edit";
import AnimalsList from "./scenes/animal/list";
import AnimalAdd from "./scenes/animal/add";
import AnimalEdit from "./scenes/animal/edit";
import WeightingsList from "./scenes/weighting/list";
import WeightingAdd from "./scenes/weighting/add";
import WeightingEdit from "./scenes/weighting/edit";

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

          <Route path="/animal-type" element={<AnimalTypesList />} />
          <Route path="/animal-type/add" element={<AnimalTypeAdd />} />
          <Route path="/animal-type/edit/:id" element={<AnimalTypeEdit />} />

          <Route path="/breed" element={<BreedsList />} />
          <Route path="/breed/add" element={<BreedAdd />} />
          <Route path="/breed/edit/:id" element={<BreedEdit />} />

          <Route path="/animal" element={<AnimalsList />} />
          <Route path="/animal/add" element={<AnimalAdd />} />
          <Route path="/animal/edit/:id" element={<AnimalEdit />} />

          <Route path="/weighting" element={<WeightingsList />} />
          <Route path="/weighting/add" element={<WeightingAdd />} />
          <Route path="/weighting/edit/:id" element={<WeightingEdit />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
