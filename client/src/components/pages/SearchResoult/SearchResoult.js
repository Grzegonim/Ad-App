import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { adsList } from '../../../redux/adsReducer';
import SmallOffer from "../../features/SmallOffer/SmallOffer";
import { Container, Row, Alert } from "react-bootstrap";
import { searchOffer } from "../../../redux/adsReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const SearchResoult = () => {
  const dispatch = useDispatch();
  const { searchResoult } = useParams();
  const ads = useSelector(adsList);

  useEffect(() => {
    dispatch(searchOffer(searchResoult))
  }, [ads]);

  return (
    <Container>
      {ads.length === 0 && (
        <Alert variant="warning" className="mt-3">
          <Alert.Heading>Sorry!</Alert.Heading>
          <p>There is no offer match your search phrase!</p>
      </Alert>
      )}

      <Row>
        {ads.map(offer => <SmallOffer key={offer._id} {...offer} />)}
      </Row>
    </Container>
  );
}

export default SearchResoult;