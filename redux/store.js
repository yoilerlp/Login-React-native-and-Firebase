import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import firebase from "../firebase";
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native';

const INICIAR_SESSION = "INICIAR_SESSION";
const CERRAR_SESSION = "CERRAR_SESSION";
const LOGUIN_ERROR = "LOGUIN_ERROR";

const INITIAL_STATE = {
  logueado: false,
  token: "",
  error: null,
  user: ""
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INICIAR_SESSION:
      return {
        user: action.playload.user,
        token: action.playload.token,
        logueado: true
      };
    case CERRAR_SESSION:
      return {
        logueado: false,
        token: "",
        error: null,
        user: ""
      }
    case LOGUIN_ERROR:
      return {
        ...state,
        error: action.playload.error
      };
    default:
     return state
  }
};

export const CerrarSeccion = ()=> dispatch => {
  firebase
    .auth().
    signOut()
    .then(()=>{
      dispatch({type:CERRAR_SESSION})
    })
}

export const LoguearUsuario = (correo, contraseña) => dispatch => {
  let mail = correo.trim();
  let passWord = contraseña.trim();
  firebase
    .auth()
    .signInWithEmailAndPassword(mail, passWord)
    .then( async respuesta => {
      let token = (await respuesta.user.getIdTokenResult()).token
      console.log("token down")
      console.log(token)
      dispatch({
        type: INICIAR_SESSION,
        playload: {
          user: respuesta.user.email,
          logueado: true,
          token
        }
      });
    })

    .catch(error => {
      dispatch({
        type: LOGUIN_ERROR,
        playload: {
          error: error
        }
      });
    });
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducer)
export const store = createStore(persistedReducer,applyMiddleware(reduxThunk))
export const  persistor = persistStore(store)



