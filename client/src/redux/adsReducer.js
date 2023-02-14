import axios from 'axios';
import { startRequest, endRequest } from './requestReducer';


// selectors
export const adsList = state => state.ads;
export const getOfferById = (state, offerId) => state.ads.find(offer => offer._id === offerId);
//export const getRequest = state => state.request;

//actions 
const createActionName = actionName => `app/ads/${actionName}`;

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');

/*const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');*/

// action creators
export const loadAds = payload => ({ type: LOAD_ADS, payload});
export const addAd = payload => ({ type: ADD_AD, payload});
export const editAd = payload => ({ type: EDIT_AD, payload });
export const removeAd = payload => ({ type: REMOVE_AD, payload });

/*export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = () => ({ type: ERROR_REQUEST });*/

export const fetchAds = () => {
  return (dispatch) => {
    dispatch(startRequest())
    fetch('http://localhost:8001/api/ads/')
      .then(res => res.json())
      .then(ads => dispatch(loadAds(ads)))
      .then(dispatch(endRequest()))
  }
};

export const addOffer = (title, price, localization, date, description, photo) => {
  return async (dispatch) => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('price', price);
      data.append('localization', localization);
      data.append('date', date);
      data.append('content', description);
      data.append('pic', photo);
      dispatch(startRequest())

      await axios.post(
        'http://localhost:8001/api/ads/',
        data,
        { withCredentials: true },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      dispatch(addAd({title: title, price: price, date: date, localization: localization, description: description, pic: photo}));
      dispatch(endRequest())

    }
    catch (err) {
      console.log(err)
    }
  }
}

export const editOffer = (title, price, localization, date, description, photo, id) => {
  return async (dispatch) => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('price', price);
      data.append('localization', localization);
      data.append('date', date);
      data.append('content', description);
      data.append('pic', photo);
  
      await axios.put(
        'http://localhost:8001/api/ads/' + id,
        data,
        { withCredentials: true },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      dispatch(editAd({ _id: id, title, content: description, date, pic: photo, price, localization }));
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const removeOffer = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        'http://localhost:8001/api/ads/' + id,
        { withCredentials: true },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      dispatch(removeAd({ _id: id }));
    }
    catch (err) {
      console.log(err)
    }
  }
}


const reducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_ADS:
      return [...action.payload]
    case ADD_AD:
      return [...statePart, {...action.payload}]
    case EDIT_AD:
      return [...statePart.map((offer) => offer._id === action.payload._id ? {...offer, ...action.payload} : offer)]
    case REMOVE_AD:
      return [statePart.filter((offer) => offer._id !== action.payload._id)]
      /*case START_REQUEST:
        return {
          ...statePart,
          request: { pending: true, error: null, success: false },
        };
      case END_REQUEST:
        return {
          ...statePart,
          request: { pending: false, error: null, success: true },
        };
      case ERROR_REQUEST:
        return {
          ...statePart,
          request: { pending: false, error: action.error, success: false },
        };*/
    default:
      return statePart
  };
};

export default reducer;