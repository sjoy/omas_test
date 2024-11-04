import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

const AnimalTypeEdit = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // For navigating back to the list
  const [animalType, setAnimalType] = useState({ type_name: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the animal type data by ID
    api
      .get(`/ref_animal_types/${id}/`)
      .then((response) => {
        setAnimalType(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch animal type data.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimalType({ ...animalType, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated data to the API
    api
      .put(`/ref_animal_types/${id}/`, animalType)
      .then(() => {
        alert('Animal type updated successfully!');
        navigate('/animal-types'); // Redirect back to the list
      })
      .catch((error) => {
        setError('Failed to update animal type.');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Edit Animal Type</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type_name" className="form-label">Type Name</label>
          <input
            type="text"
            className="form-control"
            id="type_name"
            name="type_name"
            value={animalType.type_name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/animal-types')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AnimalTypeEdit;