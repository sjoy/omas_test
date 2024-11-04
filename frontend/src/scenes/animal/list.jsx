import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../axiosConfig';

const AnimalsList = () => {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the data from the API
    api
      .get('/animals/')
      .then((response) => {
        setAnimals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching animals:', error);
        setError('Error fetching animals');
      });
  }, []);

  const handleDelete = (id) => {
    api.delete(`/animals/${id}/`)
      .then(() => {
        setAnimals(animals.filter((type) => type.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting:', error);
        setError('Error deleting animal');
      });
  };

  // Navigate to the edit page for the selected animal
  const handleEdit = (id) => {
    navigate(`/animal/edit/${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Animals</h1>
        <Link to="/animal/add" className="btn btn-primary">
          Add New Animal
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Inventory number</th>
            <th scope="col">Gender</th>
            <th scope="col">Arrival date</th>
            <th scope="col">Arrival age (in month)</th>
            <th scope="col">Nickname</th>
            <th scope="col">Breed Name</th>
            <th scope="col">Animal Type</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.id}</td>
              <td>{animal.inventory_number}</td>
              <td>{animal.gender}</td>
              <td>{animal.arrival_date}</td>
              <td>{animal.arrival_age}</td>
              <td>{animal.nickname}</td>
              <td>{animal.breed.breed_name}</td>
              <td>{animal.breed.animal_type_details.type_name}</td>
              <td>{animal.created}</td>
              <td>{animal.updated}</td>
              <td>
                <button
                  onClick={() => handleEdit(animal.id)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(animal.id)}
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

export default AnimalsList;