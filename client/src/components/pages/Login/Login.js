import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { logIn } from '../../../redux/userReducer';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = {
        login: login,
        password: password
      }
      const res = await axios.post(`${API_URL}/auth/login`, data, {
        withCredentials: true,
      })
  
      if (res.status === 200) {
        setStatus('success');
        dispatch(logIn(login));
        setTimeout(() => {
          return navigate('/');
        }, 1500);  
      } else if (res.status === 400) {
        setStatus('clientError');
      } else {
        setStatus('serverError');
      }
    }
    catch (err) {
      setStatus('serverError');
    }
  };

  return (
    <Form className='mb-3 mx-auto col-4' onSubmit={handleSubmit}>

      <h1>Sign In</h1>

      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully login!</p>
        </Alert>
      )}

      {status === "serverError" && (
        <Alert variant="danger">
        <Alert.Heading>Something went wrong</Alert.Heading>
        <p>Unexpected error... Please try again</p>
      </Alert>
      )}

      {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Wrong data</Alert.Heading>
          <p>Login or password are incorrect!</p>
        </Alert>
      )}

      {status === "loading" && (
        <Spinner animation="border" role="status" className="block mx-auto">
          <span className="visually-hidden">Loading</span>
        </Spinner>
      )}  

      <Form.Group className="mt-3 mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control type="text" required={true} placeholder="Enter login" onChange={e => setLogin(e.target.value)}></Form.Control>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required={true} onChange={e => setPassword(e.target.value)}></Form.Control>
      </Form.Group>

      <Button type="submit">Sign in</Button>

    </Form>
  );
}

export default Login;