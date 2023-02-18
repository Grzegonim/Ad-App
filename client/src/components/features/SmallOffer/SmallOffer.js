import { Col, Button } from "react-bootstrap";
import styles from './SmallOffer.module.scss';
import { Link } from 'react-router-dom';
import { activeUser } from "../../../redux/userReducer";
import { useSelector } from "react-redux";

const SmallOffer = ({title, pic, localization, _id, seller }) => {
  const user = useSelector(activeUser);
  return (
    <Col className={styles.offer + " col-4 mb-1 mt-1"}>
        <img src={`http://localhost:8001/uploads/${pic}`} alt="offer"></img>
        <span className={styles.title}><b>{title}</b></span>
        <span className="mb-1"><b>Localization: </b>{localization}</span>
        <div className="d-flex justify-content-between">
          <Link to={"/offer/" + _id}><Button>View more</Button></Link>
          {user === seller.login && (
            <Link to={"/offer/edit/" + _id}><Button variant="success">Edit Offer</Button></Link>
          )}
        </div>
    </Col>
  );
}

export default SmallOffer;