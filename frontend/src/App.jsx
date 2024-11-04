import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './scenes/Dashboard';
import Login from './scenes/auth/Login';
import Registration from './scenes/auth/Registration';
import PrivateRoute from './components/common/PrivateRoute';
import NavigationBar from './components/common/NavigationBar';
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
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

        <Route path="/animal-types" element={<PrivateRoute element={<AnimalTypesList />} />} />
        <Route path="/animal-type/add" element={<PrivateRoute element={<AnimalTypeAdd />} />} />
        <Route path="/animal-type/edit/:id" element={<PrivateRoute element={<AnimalTypeEdit />} />} />

        <Route path="/breeds" element={<PrivateRoute element={<BreedsList />} />} />
        <Route path="/breed/add" element={<PrivateRoute element={<BreedAdd />} />} />
        <Route path="/breed/edit/:id" element={<PrivateRoute element={<BreedEdit />} />} />

        <Route path="/animals" element={<PrivateRoute element={<AnimalsList />} />} />
        <Route path="/animal/add" element={<PrivateRoute element={<AnimalAdd />} />} />
        <Route path="/animal/edit/:id" element={<PrivateRoute element={<AnimalEdit />} />} />
        
        <Route path="/weightings" element={<PrivateRoute element={<WeightingsList />} />} />
        <Route path="/weighting/add" element={<PrivateRoute element={<WeightingAdd />} />} />
        <Route path="/weighting/edit/:id" element={<PrivateRoute element={<WeightingEdit />} />} />
      </Routes>
    </Router>
  );
};

export default App;