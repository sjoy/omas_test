import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

function BreedAdd() {
  const [newBreedName, setNewBreedName] = useState('');
  const [animalTypes, setAnimalTypes] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/ref_animal_types/')
      .then((response) => {
        setAnimalTypes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching animal types:', error);
        setError('Error fetching animal types');
      });
  }, []);

  const handleAdd = () => {
    if (!newBreedName.trim()) {
      alert('Breed Name cannot be empty');
      return;
    }

    api.post('/ref_breeds/', {
      breed_name: newBreedName,
      animal_type: selectedAnimalType
    })
      .then(() => {
        setNewBreedName(''); // Clear the input field
        setSelectedAnimalType('');
        navigate('/breeds'); // Redirect back to the main list page
      })
      .catch((error) => {
        console.error('Error adding breed:', error);
        setError('Error adding breed');
      });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button onClick={() => navigate('/breed')} className="btn btn-secondary mt-2">
          Back to List
        </button>
      </div>
      <h3>Add New Breed</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Breed Name"
          value={newBreedName}
          onChange={(e) => setNewBreedName(e.target.value)}
        />
      </div>
      <div className="input-group mb-3">
        <select
          className="form-select"
          value={selectedAnimalType}
          onChange={(e) => setSelectedAnimalType(e.target.value)}
        >
          <option value="">Select Animal Type</option>
          {animalTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type_name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAdd} className="btn btn-primary">
        Add
      </button>
    </div>
  );
}

export default BreedAdd;