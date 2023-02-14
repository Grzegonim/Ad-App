import { getOfferById } from "../../../redux/adsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from './Offer.module.scss';

const Offer = () => {
  const { id } = useParams();
  const offer = useSelector(state => getOfferById(state, id));
  return (
    <div>
      <div className={styles.photoContainer}>
        <img src={`http://localhost:8001/uploads/${offer.pic}`} alt="offer"></img>
        <div className={styles.info}>
          <span className={styles.title}>{offer.title}</span>
          <span className={styles.price}><b>Price:</b> {offer.price}$</span>
          <span className={styles.price}><b>Seller: </b>{offer.seller.login}</span>
          <span>{offer.localization}{offer.date}</span>
          <span className={styles.content}>Description:</span>
          <span>{offer.content}</span>
        </div>
      </div>
    </div>
  );
}

export default Offer;