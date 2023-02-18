import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAds, adsList } from '../../../redux/adsReducer';
import SmallOffer from "../../features/SmallOffer/SmallOffer";
import { Container, Row } from "react-bootstrap";
import shortid from "shortid";
import { getRequest } from "../../../redux/requestReducer";
import { Spinner } from "react-bootstrap";

const Homepage = () => {
  const dispatch = useDispatch();
  const ads = useSelector(adsList).sort((a,b) => a.title.localeCompare(b.title));
  const request = useSelector(getRequest)
  
  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  if (request.pending) return (
    <Spinner animation="border" role="status" className="block mx-auto">
      <span className="visually-hidden">Loading</span>
    </Spinner>
  )
  if (request.error) return <h1>Error...</h1>
  if (request.success === true) return (
    <Container>
      <Row>
        {ads.map(offer => <SmallOffer key={shortid()} {...offer} />)}
      </Row>
    </Container>
  )
}

export default Homepage;