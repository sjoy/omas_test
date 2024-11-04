import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

function AnimalTypeAdd() {
  const [newTypeName, setNewTypeName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!newTypeName.trim()) {
      alert('Type Name cannot be empty');
      return;
    }

    api.post('/ref_animal_types/', { type_name: newTypeName })
      .then(() => {
        setNewTypeName(''); // Clear the input field
        navigate('/animal-types'); // Redirect back to the main list page
      })
      .catch((error) => {
        console.error('Error adding animal type:', error);
        setError('Error adding animal type');
      });
  };

  return (
    <div className="container mt-5">
      <h3>Add New Animal Type</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type Name"
          value={newTypeName}
          onChange={(e) => setNewTypeName(e.target.value)}
        />
        <button onClick={handleAdd} className="btn btn-primary">
          Add
        </button>
      </div>
      <button onClick={() => navigate('/animal-types')} className="btn btn-secondary mt-2">
        Back to List
      </button>
    </div>
  );
}

export default AnimalTypeAdd;