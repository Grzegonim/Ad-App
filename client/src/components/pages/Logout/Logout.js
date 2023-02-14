import { API_URL } from "../../../config";
import { logOut } from "../../../redux/userReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      axios.delete(`${API_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then(() => {
        dispatch(logOut());
      }); 
      
      navigate('/');

    /*const options = {
      method: 'DELETE'
    };
  
    fetch(`${API_URL}/auth/logout`, options)
      .then(() => {
        dispatch(logOut());
      });  */
  }, [dispatch]);

  return null;
}

export default Logout;