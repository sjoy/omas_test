import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../axiosConfig';

const WeightingsList = () => {
  const [weightings, setWeightings] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch weightings data
    api.get('/weightings/')
      .then((response) => {
        setWeightings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching weightings:', error);
        setError('Failed to fetch weightings data.');
        setLoading(false);
      });

    // Fetch animal list for dropdown
    api.get('/animals/')
      .then((response) => {
        setAnimals(response.data);
      })
      .catch((error) => console.error('Error fetching animals:', error));
  }, []);

  const handleAnimalChange = (e) => {
    setSelectedAnimal(e.target.value);
  };

  // Filter weightings based on selected animal
  const filteredWeightings = selectedAnimal
    ? weightings.filter((w) => w.animal === Number(selectedAnimal))
    : weightings;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleDelete = (id) => {
    api.delete(`/weightings/${id}/`)
      .then(() => {
        setWeightings(weightings.filter((type) => type.id !== id));
      })
      .catch((error) => console.error('Error deleting:', error));
  };

  const handleEdit = (id) => {
    navigate(`/weighting/edit/${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
      <h2>Weightings List</h2>
        <Link to="/weighting/add" className="btn btn-primary">
          Add New Weighting
        </Link>
      </div>

      {/* Animal Dropdown */}
      <div className="mb-3">
        <label htmlFor="animal" className="form-label">Filter by Animal</label>
        <select
          className="form-select"
          id="animal"
          value={selectedAnimal}
          onChange={handleAnimalChange}
        >
          <option value="">All Animals</option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.nickname} (#{animal.inventory_number})
            </option>
          ))}
        </select>
      </div>

      {/* Weightings Table */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Animal</th>
            <th>Weight Date</th>
            <th>Weight (kg)</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredWeightings.map((weighting) => (
            <tr key={weighting.id}>
              <td>{weighting.id}</td>
              <td>{weighting.animal_name}</td>
              <td>{weighting.weight_date}</td>
              <td>{weighting.weight}</td>
              <td>
                <button
                    onClick={() => handleEdit(weighting.id)}
                    className="btn btn-warning btn-sm me-2"
                    >
                    Edit
                    </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(weighting.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeightingsList;