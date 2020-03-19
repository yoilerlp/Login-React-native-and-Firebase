import React, {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Dasboard from "./Dasboard";
import {store,persistor} from "./redux/store"
import {Provider, useSelector} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

import firebase from "./firebase";

const App = () => {
  useEffect(()=>{
    console.log(store.getState())
    store.subscribe(()=> console.log(store.getState()))
  },[])

  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
       <Main></Main>
      </PersistGate>
    </Provider>
  )
}


const Stack = createStackNavigator();
const Main = () => {
 // console.log("Esta logueado ? " + ( firebase.auth().currentUser.email ) )

    useEffect(()=>{
      console.log(store.getState())
    },[])



    const logueado = useSelector(state => state.logueado)
    return (
      <NavigationContainer>
        { logueado ? (
          <Stack.Navigator>
            <Stack.Screen
              name="dasboar"
              component={Dasboard}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="login"
              component={Login}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
}


export default App ;