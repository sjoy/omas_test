import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const location = useLocation();
  const submitSuccess = location.state?.submitSuccess;

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    fetch('/backend/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.key) {
          localStorage.setItem('token', data.key);
          navigate('/dashboard', { replace: true });
        } else {
          setUsername('');
          setPassword('');
          setErrors(true);
          setErrMsg('Неверное имя пользователя или пароль');
        }
      })
      .catch((error) => {
        console.error('Ошибка при входе:', error);
        setErrors(true);
        setErrMsg('Произошла ошибка при входе. Попробуйте еще раз.');
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Вход в систему</h2>
            {errors && <p className="text-danger text-center">{errMsg}</p>}
            {submitSuccess && <p className="text-success text-center">Письмо с подтверждением отправлено на вашу почту</p>}
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Имя пользователя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Войти
              </Button>
            </Form>
            <div className="d-grid gap-2 mt-3">
              <Button as={Link} to="/registration" variant="secondary" className="w-100">
                Регистрация
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;