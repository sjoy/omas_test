// src/global/LogoutButton.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LOGOUT_URL = '/backend/auth/logout/';
const LOGIN_URL = '/login';
const ERROR_MESSAGE = 'Logout failed';

const handleLogout = async (navigate, setError) => {
  try {
    const response = await fetch(LOGOUT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE);
    }

    localStorage.clear();
    navigate(LOGIN_URL);
  } catch (error) {
    setError(error.message);
  }
};

const LogoutButton = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    await handleLogout(navigate, setError);
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default LogoutButton;