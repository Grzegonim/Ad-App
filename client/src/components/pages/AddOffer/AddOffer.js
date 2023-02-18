import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { activeUser } from '../../../redux/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addOffer } from '../../../redux/adsReducer';
import { useNavigate } from 'react-router-dom';
import { getRequest } from "../../../redux/requestReducer";
import { Alert } from 'react-bootstrap';

const AddOffer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(activeUser);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [localization, setLocalization] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState(false);
  const request = useSelector(getRequest)

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addOffer(title, price, localization, date, description, photo, user));
    setStatus(true);
  };

  useEffect(() => {
    if (user === null) return navigate('/');
  }, [user]);

  if (request.success === 'next') {
    return navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-2 mt-2 col-8 mx-auto">

      {status === true && (
        <Alert variant="success">
          <Alert.Heading>Relax!</Alert.Heading>
          <p>You will return to homepage after add offer!</p>
        </Alert>
      )}

      <Form.Group controlId="formTitle" className="mb-2 mt-2">
        <Form.Label>Title:</Form.Label>
        <Form.Control type="text" placeholder="Enter title" required={true} minLength={10} maxLength={50}  onChange={e => setTitle(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formPrice" className="mb-2 mt-2">
        <Form.Label>Price:</Form.Label>
        <Form.Control type="number" placeholder="Enter price" required={true} onChange={e => setPrice(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formLocalization" className="mb-2 mt-2">
        <Form.Label>Localization:</Form.Label>
        <Form.Control type="text" placeholder="Enter localization" required={true} onChange={e => setLocalization(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formDate" className="mb-2 mt-2">
        <Form.Label>Date:</Form.Label>
        <Form.Control type="date" required={true} onChange={e => setDate(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formDescription" className="mb-2 mt-2">
        <Form.Label>Description:</Form.Label>
        <Form.Control type="text" required={true} minLength={20} maxLength={1000} onChange={e => setDescription(e.target.value)}></Form.Control>
      </Form.Group>


      <Form.Group controlId="formPhoto" className="mb-2 mt-2">
        <Form.Label>Photo:</Form.Label>
        <Form.Control type="file" required={true} onChange={e => setPhoto(e.target.files[0])} />
      </Form.Group>

      <Button type="submit">Submit</Button>

    </Form>
  );
}

export default AddOffer;