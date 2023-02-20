import { getOfferById } from "../../../redux/adsReducer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from './Offer.module.scss';
import { IMGS_URL } from "../../../config";

const Offer = () => {
  const { id } = useParams();
  const offer = useSelector(state => getOfferById(state, id));

  return (
    <div>
      <div className={styles.photoContainer}>
        <img src={IMGS_URL + offer.pic} alt="offer"></img>
        <div className={styles.info}>
          <span className={styles.title}>{offer.title}</span>
          <span className={styles.price}><b>Price:</b> {offer.price}$</span>
          <span className={styles.price}><b>Seller: </b>{offer.seller.login}</span>
          <span>{offer.localization + ' '}{offer.date.slice(0, 10)}</span>
          <span className={styles.content}>Description:</span>
          <span>{offer.content}</span>
        </div>
      </div>
    </div>
  );
}

export default Offer;