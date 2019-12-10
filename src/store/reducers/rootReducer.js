import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; // syncing firestore
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import wireframeListReducer from './wireframeListReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  wireframe: wireframeListReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;