import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../axiosConfig';

const BreedsList = () => {
  const [breeds, setBreeds] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/ref_breeds/')
      .then((response) => {
        setBreeds(response.data);
      })
      .catch((error) => {
        console.error('Error fetching breeds:', error);
        setError('Error fetching breeds');
      });
  }, []);

  const handleDelete = (id) => {
    api.delete(`/ref_breeds/${id}/`)
      .then(() => {
        setBreeds(breeds.filter((type) => type.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting:', error);
        setError('Error deleting breed');
      });
  };

  const handleEdit = (id) => {
    navigate(`/breed/edit/${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Breeds</h1>
        <Link to="/breed/add" className="btn btn-primary">
          Add New Breed
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Breed Name</th>
            <th scope="col">Animal Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {breeds.map((breed) => (
            <tr key={breed.id}>
              <td>{breed.id}</td>
              <td>{breed.breed_name}</td>
              <td>{breed.animal_type_details.type_name}</td>
              <td>
                <button
                  onClick={() => handleEdit(breed.id)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(breed.id)}
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

export default BreedsList;