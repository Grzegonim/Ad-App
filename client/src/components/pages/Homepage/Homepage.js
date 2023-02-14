import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAds, adsList } from '../../../redux/adsReducer';
import SmallOffer from "../../features/SmallOffer/SmallOffer";
import { Container, Row } from "react-bootstrap";
import shortid from "shortid";
import { getRequest } from "../../../redux/requestReducer";

const Homepage = () => {
  const dispatch = useDispatch();
  const ads = useSelector(adsList).sort((a,b) => a.title.localeCompare(b.title));
  useEffect(() => dispatch(fetchAds()), [dispatch]);
  const request = useSelector(getRequest)
  console.log(request)
  if (request.pending) return <h1>Loading...</h1>
  if (request.error) return <h1>Error...</h1>
  if (request.success) return (
  
  
    <Container>
      <Row>
        {ads.map(offer => <SmallOffer key={shortid()} {...offer} />)}
      </Row>
    </Container>
  )
}

export default Homepage;