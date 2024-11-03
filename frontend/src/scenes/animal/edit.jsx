import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

const AnimalEdit = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // For navigation
  const [animalData, setAnimalData] = useState({
    breed: '',
    parent: '',
    inventory_number: '',
    nickname: '',
    gender: '',
    arrival_date: '',
    arrival_age: '',
  });
  const [breeds, setBreeds] = useState([]);
  const [parents, setParents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the animal data to edit
    api.get(`/animals/${id}/`)
      .then((response) => {
        setAnimalData({
            ...response.data,
            breed: response.data.breed.id,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching animal data:', error);
        setError('Failed to fetch animal data.');
        setLoading(false);
      });

    // Fetch options for breeds and parent animals
    api.get('/ref_breeds/')
      .then((response) => setBreeds(response.data))
      .catch((error) => console.error('Error fetching breeds:', error));

    api.get('/animals/')
      .then((response) => setParents(response.data))
      .catch((error) => console.error('Error fetching parent animals:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimalData({ ...animalData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/animals/${id}/`, animalData)
      .then(() => {
        alert('Animal updated successfully!');
        navigate('/animal'); // Redirect to the animals list
      })
      .catch((error) => {
        console.error('Error updating animal:', error);
        setError('Failed to update animal.');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  console.log(animalData);

  return (
    <div className="container mt-5">
      <h2>Edit Animal</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Breed Dropdown */}
        <div className="mb-3">
          <label htmlFor="breed" className="form-label">Breed</label>
          <select
            className="form-select"
            id="breed"
            name="breed"
            value={animalData.breed} // Set selected breed
            onChange={handleChange}
            required
          >
            <option value="">Select Breed</option>
            {breeds.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.breed_name}
              </option>
            ))}
          </select>
        </div>

        {/* Parent Dropdown */}
        <div className="mb-3">
          <label htmlFor="parent" className="form-label">Parent</label>
          <select
            className="form-select"
            id="parent"
            name="parent"
            value={animalData.parent}
            onChange={handleChange}
          >
            <option value="">Select Parent</option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.nickname} (#{parent.inventory_number})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="inventory_number" className="form-label">Inventory Number</label>
          <input
            type="text"
            className="form-control"
            id="inventory_number"
            name="inventory_number"
            value={animalData.inventory_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nickname" className="form-label">Nickname</label>
          <input
            type="text"
            className="form-control"
            id="nickname"
            name="nickname"
            value={animalData.nickname}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={animalData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="arrival_date" className="form-label">Arrival Date</label>
          <input
            type="date"
            className="form-control"
            id="arrival_date"
            name="arrival_date"
            value={animalData.arrival_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="arrival_age" className="form-label">Arrival Age</label>
          <input
            type="number"
            className="form-control"
            id="arrival_age"
            name="arrival_age"
            value={animalData.arrival_age}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" onClick={() => navigate('/animal')} className="btn btn-secondary ms-2">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AnimalEdit;