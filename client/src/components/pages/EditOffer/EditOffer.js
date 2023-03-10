import { getOfferById } from "../../../redux/adsReducer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Button, Modal } from 'react-bootstrap';
import { useState } from "react";
import { editOffer, removeOffer } from "../../../redux/adsReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditOffer = () => {
  const { id } = useParams();
  const offer = useSelector(state => getOfferById(state, id));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(offer.title);
  const [price, setPrice] = useState(offer.price);
  const [localization, setLocalization] = useState(offer.localization);
  const [date, setDate] = useState(offer.date);
  const [description, setDescription] = useState(offer.content);
  const [photo, setPhoto] = useState(offer.pic);
  const [show, setShow] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editOffer(title, price, localization, date, description, photo, offer._id));
    setTimeout(() => {
      return navigate('/');
    }, 1500);  
  };

  const handleDelete = async e => {
    e.preventDefault();
    setShow(false);
    dispatch(removeOffer(id))
    return navigate('/')
};

  return (
    <Form className="mt-2 mb-2" onSubmit={handleSubmit}>

      <div className="d-flex justify-content-between">
        <h1>Edit offer</h1>
        <Button onClick={() => setShow(true)} variant="danger">Delete offer</Button>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Removing offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to remove this offer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete offer
          </Button>
        </Modal.Footer>
      </Modal>
        
      <Form.Group controlId="formTitle" className="mt-2 mb-2">
        <Form.Label>Title:</Form.Label>
        <Form.Control type="text" onChange={e => setTitle(e.target.value)} defaultValue={title}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formPrice" className="mt-2 mb-2">
        <Form.Label>Price:</Form.Label>
        <Form.Control type="number" onChange={e => setPrice(e.target.value)} defaultValue={price}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formLocalization" className="mt-2 mb-2">
        <Form.Label>Localization:</Form.Label>
        <Form.Control type="text" onChange={e => setLocalization(e.target.value)} defaultValue={localization}></Form.Control>
      </Form.Group>
      
      <Form.Group controlId="formDate" className="mt-2 mb-2">
        <Form.Label>Date:</Form.Label>
        <Form.Control type="date" onChange={e => setDate(e.target.value)} defaultValue={date}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formDescription" className="mt-2 mb-2">
        <Form.Label>Description:</Form.Label>
        <Form.Control type="text" onChange={e => setDescription(e.target.value)} defaultValue={description}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formPhoto" className="mb-2 mt-2">
        <Form.Label>Photo:</Form.Label>
        <Form.Control type="file" onChange={e => setPhoto(e.target.files[0])} />
      </Form.Group>

      <Button type="submit">Submit</Button>

    </Form>
  );
}

export default EditOffer;