import { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Регулярные выражения для проверки ввода
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const Registration = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password1: '',
    password2: '',
    phone: '',
    user_code: '',
    city: '',
    email: '',
  });

  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(userData.username));
  }, [userData.username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(userData.password1));
    setValidMatch(userData.password1 === userData.password2);
  }, [userData.password1, userData.password2]);

  useEffect(() => {
    setErrMsg('');
  }, [userData.username, userData.password1, userData.password2]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(userData.email));
  }, [userData.email]);

  useEffect(() => {
    if (submitSuccess) {
      navigate('/login', { state: { submitSuccess: true } });
    }
  }, [navigate, submitSuccess]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const v1 = USER_REGEX.test(userData.username);
    const v2 = PWD_REGEX.test(userData.password1);
    const check_email = EMAIL_REGEX.test(userData.email);
    if (!v1 || !v2 || !check_email) {
      setErrMsg('Проверьте заполнение имени пользователя, пароля или почты');
      return;
    }

    const data_reg = {
      username: userData.username,
      password1: userData.password1,
      password2: userData.password2,
      email: userData.email,
    };

    try {
      setErrorUsername(false);
      setErrorEmail(false);

      const regResponse = await fetch('/backend/auth/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_reg),
      });

      if (!regResponse.ok) {
        const errorData = await regResponse.json();
        let errorMessage = 'Ошибка регистрации';
        if (errorData.username) {
          errorMessage = errorData.username[0];
          setErrorUsername(errorMessage);
        } else if (errorData.email) {
          errorMessage = errorData.email[0];
          setErrorEmail(errorMessage);
        }
        setErrMsg(errorMessage);
        throw new Error(errorMessage);
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setErrMsg(error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 mb-5">
        <Col xs={12} md={6}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Регистрация</h2>
            <p
              ref={errRef}
              className={errMsg ? 'errmsg text-danger' : 'offscreen'}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="form-group mt-3" controlId="formBasicFirstName">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  name="first_name"
                  type="text"
                  autoComplete="on"
                  placeholder="Имя"
                  value={userData.first_name}
                  onChange={handleChange}
                  ref={userRef}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group mt-3" controlId="formBasicLastName">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                  name="last_name"
                  type="text"
                  autoComplete="on"
                  placeholder="Фамилия"
                  value={userData.last_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group mt-3" controlId="formBasicUsername">
                <Form.Label>Логин для входа</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  autoComplete="off"
                  placeholder="Логин для входа"
                  value={userData.username}
                  onChange={handleChange}
                  aria-invalid={validName ? 'false' : 'true'}
                  aria-describedby="uidnote"
                  required
                />
                <p
                  id="uidnote"
                  className={
                    errorUsername || (userData.username && !validName)
                      ? 'instructions text-danger'
                      : 'instructions text-muted'
                  }
                >
                  Логин должен содержать от 4 до 24 символов. Должен начинаться с буквы. Допускаются буквы, цифры, символы подчеркивания, дефисы.
                </p>
              </Form.Group>

              <Form.Group className="form-group mt-3" controlId="formBasicPassword1">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  name="password1"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Пароль"
                  value={userData.password1}
                  onChange={handleChange}
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  required
                />
                <p
                  id="pwdnote"
                  className={pwdFocus && !validPwd ? 'instructions text-danger' : 'instructions text-muted'}
                >
                  Пароль должен содержать от 8 до 24 символов. Обязательно содержать заглавные и строчные буквы, цифру.
                </p>
              </Form.Group>

              <Form.Group className="form-group mt-3" controlId="formBasicPassword2">
                <Form.Label>Пароль (повторно)</Form.Label>
                <Form.Control
                  name="password2"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Пароль (повторно)"
                  value={userData.password2}
                  onChange={handleChange}
                  aria-invalid={validMatch ? 'false' : 'true'}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  required
                />
                <p
                  id="confirmnote"
                  className={matchFocus && !validMatch ? 'instructions text-danger' : 'instructions text-muted'}
                >
                  Необходимо ввести пароль еще раз.
                </p>
              </Form.Group>

              <Form.Group className="form-group mt-3" controlId="formBasicPhone">
                <Form.Label>Номер телефона</Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  autoComplete="on"
                  placeholder="Номер телефона"
                  value={userData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group mt-3" controlId="formBasicCity">
                <Form.Label>Город</Form.Label>
                <Form.Control
                  name="city"
                  type="text"
                  autoComplete="on"
                  placeholder="Город"
                  value={userData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group mt-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  autoComplete="on"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleChange}
                  aria-invalid={validEmail ? 'false' : 'true'}
                  aria-describedby="emailnote"
                  required
                />
                <p
                  id="emailnote"
                  className={
                    errorEmail || (userData.email && !validEmail)
                      ? 'instructions text-danger'
                      : 'instructions text-muted'
                  }
                >
                  Проверьте заполнение email. Email должен содержать знак @.
                </p>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3" disabled={!validName || !validPwd || !validMatch || !validEmail}>
                Зарегистрироваться
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;