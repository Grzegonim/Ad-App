import axios from 'axios';
import { startRequest, endRequest, addRequest } from './requestReducer';
import { API_URL } from '../../src/config'


// selectors
export const adsList = state => state.ads;
export const getOfferById = (state, offerId) => state.ads.find(offer => offer._id === offerId);

//actions 
const createActionName = actionName => `app/ads/${actionName}`;

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');

// action creators
export const loadAds = payload => ({ type: LOAD_ADS, payload});
export const addAd = payload => ({ type: ADD_AD, payload});
export const editAd = payload => ({ type: EDIT_AD, payload });
export const removeAd = payload => ({ type: REMOVE_AD, payload });

export const fetchAds = () => {
  return async (dispatch) => {
    dispatch(startRequest())
    try {
      console.log(API_URL)
      let res = await axios.get(`${API_URL}/api/ads`)
      dispatch(loadAds(res.data))
      dispatch(endRequest())
    }
    catch (err) {
      
    }
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

      const res = await axios.post(
        `${API_URL}/api/ads`,
        data,
        { withCredentials: true },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      await dispatch(addAd(res.data));
      dispatch(addRequest())
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
      dispatch(startRequest())

      await axios.put(
        `${API_URL}/api/ads/${id}`,
        data,
        { withCredentials: true },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      await dispatch(editAd({ _id: id, title, content: description, date, pic: photo, price, localization }));
      dispatch(endRequest())
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const removeOffer = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startRequest())

      await axios.delete(
        `${API_URL}/api/ads/${id}`,
        { withCredentials: true },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      await dispatch(removeAd({ _id: id }));
      dispatch(endRequest())
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const searchOffer = (searchResoult) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${API_URL}/api/ads/search/${searchResoult}`)
      dispatch(loadAds(res.data));
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
      return statePart.filter((offer) => offer._id !== action.payload._id)
    default:
      return statePart
  };
};

export default reducer;