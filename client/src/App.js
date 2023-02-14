import { Route, Routes } from 'react-router-dom';
import Homepage from './components/pages/Homepage/Homepage';
import Offer from './components/pages/Offer/Offer';
import AddOffer from './components/pages/AddOffer/AddOffer';
import EditOffer from './components/pages/EditOffer/EditOffer';
import SearchResoult from './components/pages/SearchResoult/SearchResoult';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import Register from './components/pages/Register/Register';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/offer/edit/:id" element={ <EditOffer /> } />
          <Route path="/offer/add" element={ <AddOffer /> } />
          <Route path="/offer/:id" element={ <Offer /> } />
          <Route path="/search/:searchResoult" element={ <SearchResoult /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/logout" element={ <Logout /> } />
          <Route path="/register" element={ <Register /> } />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
