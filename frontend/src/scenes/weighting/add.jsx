import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

const WeightingAdd = () => {
  const [animalId, setAnimalId] = useState('');
  const [weightDate, setWeightDate] = useState('');
  const [weight, setWeight] = useState('');
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/animals/')
      .then((response) => {
        setAnimals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching animals:', error);
        setError('Failed to fetch animals for the dropdown.');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!animalId || !weightDate || !weight) {
      alert('All fields are required.');
      return;
    }

    api.post('/weightings/', {
      animal: animalId,
      weight_date: weightDate,
      weight: parseFloat(weight),
    })
      .then(() => {
        alert('Weighting added successfully!');
        navigate('/weighting');
      })
      .catch((error) => {
        console.error('Error adding weighting:', error);
        setError('Failed to add the weighting.');
      });
  };

  return (
    <div className="container mt-5">
      <h3>Add New Weighting</h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="animal" className="form-label">Animal</label>
          <select
            className="form-select"
            id="animal"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
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
            value={weightDate}
            onChange={(e) => setWeightDate(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">Weight (kg)</label>
          <input
            type="number"
            className="form-control"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            min="0"
            step="0.1"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Add Weighting</button>
        <button type="button" onClick={() => navigate('/weighting')} className="btn btn-secondary ms-2">Cancel</button>
      </form>
    </div>
  );
};

export default WeightingAdd;
