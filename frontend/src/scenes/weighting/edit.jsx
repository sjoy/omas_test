import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

const WeightingEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [weighting, setWeighting] = useState({ animal: '', weight_date: '', weight: '' });
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/weightings/${id}/`)
      .then((response) => {
        setWeighting(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch weighting data:', error);
        setError('Failed to fetch weighting data.');
      });

    // Fetch the list of animals for the dropdown
    api.get('/animals/')
      .then((response) => {
        setAnimals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching animals:', error);
        setError('Failed to fetch animals for the dropdown.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWeighting((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated data to the API
    api.put(`/weightings/${id}/`, {
      animal: weighting.animal,
      weight_date: weighting.weight_date,
      weight: parseFloat(weighting.weight),
    })
      .then(() => {
        alert('Weighting updated successfully!');
        navigate('/weighting');
      })
      .catch((error) => {
        console.error('Failed to update weighting:', error);
        setError('Failed to update the weighting.');
      });
  };

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h3>Edit Weighting</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="animal" className="form-label">Animal</label>
          <select
            className="form-select"
            id="animal"
            name="animal"
            value={weighting.animal}
            onChange={handleChange}
            required
          >
            <option value="">Select Animal</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.nickname} (#{animal.inventory_number})
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-3">
          <label htmlFor="weight_date" className="form-label">Weight Date</label>
          <input
            type="date"
            className="form-control"
            id="weight_date"
            name="weight_date"
            value={weighting.weight_date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">Weight (kg)</label>
          <input
            type="number"
            className="form-control"
            id="weight"
            name="weight"
            value={weighting.weight}
            onChange={handleChange}
            required
            min="0"
            step="0.1"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" onClick={() => navigate('/weighting')} className="btn btn-secondary ms-2">Cancel</button>
      </form>
    </div>
  );
};

export default WeightingEdit;
