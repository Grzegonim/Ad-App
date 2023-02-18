import { Form , Button, Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [passowrd, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', passowrd);
    fd.append('phone', phone);
    fd.append('avatar', avatar);

    const options = {
      method: 'POST',
      body: fd
    };

    setStatus('loading')
    fetch(`${API_URL}/auth/register`, options)
      .then(res => {
        if (res.status === 201) {
          setStatus('success')
          setTimeout(() => {
            return navigate('/login');
          }, 1500);  
  
        } else if (res.status === 400) {
          setStatus('clientError')
        } else if (res.status === 409) {
          setStatus('loginError')
        } else {
          setStatus('serverError')
        }
      })

  };
  
  return (
    <Form className='mb-3 mx-auto col-4' onSubmit={handleSubmit}>

      <h1>Sign Up</h1>

      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully registered!</p>
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
          <Alert.Heading>No enough data</Alert.Heading>
          <p>You must fill all the fields!</p>
        </Alert>
      )}

      {status === "loginError" && (
        <Alert variant="warning">
          <Alert.Heading>Login already exist</Alert.Heading>
          <p>Please change login and try again</p>
        </Alert>
      )}

      {status === "loading" && (
        <Spinner animation="border" role="status" className="block mx-auto">
          <span className="visually-hidden">Loading</span>
        </Spinner>
      )}  

      <Form.Group className="mt-3 mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control type="text" placeholder="Enter login" required={true} onChange={e => setLogin(e.target.value)}></Form.Control>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required={true} onChange={e => setPassword(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="tel" placeholder="Phone number" required={true} onChange={e => setPhone(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" required={true} onChange={e => setAvatar(e.target.files[0])} />
      </Form.Group>

      <Button type="submit">Submit</Button>

    </Form>
  );
}

export default Register;