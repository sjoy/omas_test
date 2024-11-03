import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../axiosConfig';

const AnimalTypesList = () => {
  const [animalTypes, setAnimalTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the data from the API
    api
      .get('/ref_animal_types/')
      .then((response) => {
        setAnimalTypes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching animal types:', error);
      });
  }, []);

  const handleDelete = (id) => {
    api.delete(`/ref_animal_types/${id}/`)
      .then(() => {
        setAnimalTypes(animalTypes.filter((type) => type.id !== id));
      })
      .catch((error) => console.error('Error deleting:', error));
  };

  // Navigate to the edit page for the selected animal type
  const handleEdit = (id) => {
    navigate(`/animal-type/edit/${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Animal Types</h1>
        <Link to="/animal-type/add" className="btn btn-primary">
          Add New Animal Type
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Type Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {animalTypes.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.id}</td>
              <td>{animal.type_name}</td>
              <td>
                <button
                    onClick={() => handleEdit(animal.id)}
                    className="btn btn-warning btn-sm me-2"
                    >
                    Edit
                    </button>
              </td>
              <td>
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

export default AnimalTypesList;
