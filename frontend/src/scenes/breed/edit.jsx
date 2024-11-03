import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

const BreedEdit = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // For navigating back to the list
  const [breed, setBreed] = useState({ breed_name: '', animal_type: '' });
  const [animalTypes, setAnimalTypes] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the breed data by ID
    api
      .get(`/ref_breeds/${id}/`)
      .then((response) => {
        setBreed({
          ...response.data,
          animal_type: response.data.animal_type_details.id, // Ensure animal_type is set
        });
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch breed data.');
        setLoading(false);
      });

    api
      .get('/ref_animal_types/')
      .then((response) => {
        setAnimalTypes(response.data);
      })
      .catch((error) => console.error('Error fetching animal types:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBreed({ ...breed, [name]: value });
  };

  const handleAnimalTypeChange = (e) => {
    const animalTypeId = e.target.value;
    setBreed({ ...breed, animal_type: animalTypeId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated data to the API
    api
      .put(`/ref_breeds/${id}/`, breed)
      .then(() => {
        alert('Breed updated successfully!');
        navigate('/breed'); // Redirect back to the list
      })
      .catch((error) => {
        setError('Failed to update breed.');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button onClick={() => navigate('/breed')} className="btn btn-secondary mt-2">
          Cancel
        </button>
      </div>
      <h2>Edit Breed</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type_name" className="form-label">Type Name</label>
          <input
            type="text"
            className="form-control"
            id="type_name"
            name="type_name"
            value={breed.breed_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group mb-3">
          <select
            className="form-select"
            id="animal_type"
            name="animal_type"
            value={breed.animal_type || ''}
            onChange={handleAnimalTypeChange}
            required
          >
            <option value="">Select Animal Type</option>
            {animalTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default BreedEdit;