import { useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useState, useEffect } from 'react';
import './LogoutButton.css'; // Импортируем стили

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
    navigate(LOGIN_URL, { replace: true });
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

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <IconButton onClick={handleClick} title="Выход" className="logout-button">
        <ExitToAppOutlinedIcon />
      </IconButton>
    </>
  );
};

export default LogoutButton;