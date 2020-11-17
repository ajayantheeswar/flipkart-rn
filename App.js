import React ,{useEffect, useRef, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReduxThunk from 'redux-thunk';

import {reducer as ProductReducer} from './store/reducer/Products';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector , useDispatch} from 'react-redux';

import AppNavigator, { AuthStackNavigator } from './Navigator/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AuthReducer from './store/reducer/auth';

const rootReducer = combineReducers({
  products: ProductReducer,
  auth : AuthReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk))

export default function App() {

  return (
    <Provider store={store}>
       <AppContainer />
    </Provider>
  );
  
}


const AppContainer = props => {
  const [loading, setLoading] = useState(true)
  let navRef = useRef();

  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()


  useEffect(() => {
    console.log('-----------------');
    console.log('App loaded');
    console.log('-----------------');
    

    setLoading(false)


  }, [])

  useEffect(() => {
    if(token !== null){
      navRef.current.navigate('Main') 
    }
  },[token])
 

  const isFirstTime = true;


  return (
    <NavigationContainer ref={navRef}>
      <AppNavigator  /> 
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
