import React ,{useReducer , useState , useCallback} from 'react'
import { StyleSheet, Text, View , ScrollView, Button ,KeyboardAvoidingView, Alert, TouchableWithoutFeedback , Image} from 'react-native'
import { Pressable ,ActivityIndicator} from 'react-native';
import { useDispatch } from 'react-redux';

import TextInput from '../../components/UI/Input';
import Colors from '../../constants/Colors'

import * as types from '../../store/actions/actionTypes';
import { signUpHandler , signInHandler,continueWithGoogle } from '../../store/actions/auth'


import * as Google from 'expo-google-app-auth';
import { SvgUri } from 'react-native-svg';
import {CLIENT_ID} from '../../keys/keys'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';


let config = {
  issuer: 'https://accounts.google.com',
  scopes: ['openid', 'profile'],
  clientId: CLIENT_ID,
};

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};



const AuthScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    
    const dispatch = useDispatch();
  
    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        name : '',
        email: '',
        password: ''
      },
      inputValidities: {
        email: false,
        password: false
      },
      formIsValid: false
    });


    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );
      const authHandler = async () =>  {
        const { inputValues } = formState
        try{
          if(isSignup) {
            await dispatch(signUpHandler(inputValues.name,inputValues.email,inputValues.password))
            setIsLoading(false)
          }else {
            await dispatch(signInHandler(inputValues.email,inputValues.password))
            setIsLoading(false)
          }
        }catch(err) {
          console.log(err.responseError.code)
          setIsLoading(false)
          Alert.alert(
            err.responseError.error,
            "Please Enter Correct Credientials",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          ); 
        }
        
      }

    return (
        <KeyboardAvoidingView 
          behavior="padding"
          keyboardVerticalOffset={50}
          style={{flex : 1, alignItems: 'center' , backgroundColor:'#FFF' , paddingTop : 50}}>
            <View style={{overflow:'hidden',borderRadius : 10, backgroundColor : '#FFF', borderColor: '#000' , borderWidth : 1}}>
                <TouchableWithoutFeedback                   
                  onPress={
                    async () => {
                      setIsLoading(true)
                      const { type, idToken, user } = await Google.logInAsync(config);
                      if(type === 'success'){
                        await dispatch(continueWithGoogle(idToken,user))
                      }
                      setIsLoading(false)
                    }
                  }
                >
                  <View style={{flexDirection: 'row', padding: 10 }}>
                      <Text>Sign In With Google</Text>
                      <View
                        style={{height: 20 , width : 20}}
                      >
                        <Image
                          source={require('../../assets/google-cta.svg')}
                          style={{height: '100%' , width : '100%'}}
                        />
                      </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
          <View style={{width: '80%'}}>
              
              <View style={{flexDirection : 'row' , justifyContent : 'center' , width: '100%' , paddingTop: '10%'}} >
                  <View style={{width: '50%'}}>
                      <Pressable activeOpacity={1} onPress={() => setIsSignup(false)}>
                          <View style={{...styles.tabHeader, borderBottomColor: isSignup ? 'black' : '#FFF' ,}}>
                              <Text style={{fontWeight:'bold', color:Colors.flipkart}}>Login</Text>
                          </View>
                      </Pressable>
                  </View>
                  
                  
                  <View style={{width: '50%'}}>
                      <Pressable activeOpacity={1}  onPress={() => setIsSignup(true)}>
                          <View style={{...styles.tabHeader, borderBottomColor: !isSignup ? 'black' : '#FFF',}}>
                              <Text style={{fontWeight:'bold' , color:Colors.flipkart}}>Sign Up</Text>
                          </View>
                      </Pressable>
                  </View>
              </View>
              <View style={{paddingTop: 30 , width: '100%' , borderWidth: 1 , borderTopWidth : 0 , padding : 10 , borderBottomRightRadius: 10 , borderBottomLeftRadius: 10 , borderColor: '#ccc'}}>
                  <ScrollView>
                      {isSignup ? <TextInput
                          id="name"
                          label="Name"
                          required
                          name
                          autoCapitalize="none"
                          errorText="Please enter a valid name"
                          onInputChange={inputChangeHandler}
                          initialValue=""
                      /> : null}
                      <TextInput
                          id="email"
                          label="E-Mail"
                          keyboardType="email-address"
                          required
                          email
                          autoCapitalize="none"
                          errorText="Please enter a valid email address."
                          onInputChange={inputChangeHandler}
                          initialValue=""
                      />
                      <TextInput
                          id="password"
                          label="Password"
                          keyboardType="default"
                          secureTextEntry
                          required
                          minLength={5}
                          autoCapitalize="none"
                          errorText="Please enter a valid password."
                          onInputChange={inputChangeHandler}
                          initialValue=""
                      />
                      <View style={styles.buttonContainer}>
                      {isLoading ? (
                          <ActivityIndicator size="small" color={Colors.flipkart} />
                      ) : (
                          <Button
                          title={isSignup ? 'Sign Up' : 'Login'}
                          color={Colors.flipkart}
                          onPress={authHandler}
                          />
                      )}
                      </View>
                  </ScrollView>
              </View>
            </View>
        </KeyboardAvoidingView> 
       
    )
}

export default AuthScreen



const styles = StyleSheet.create({
   tabHeader : {
       borderWidth : 1,
       borderColor: '#ccc',
       borderBottomColor: 'black' ,
       padding: 20 ,
       borderBottomWidth: 3,
       borderTopLeftRadius : 10,
       borderTopRightRadius : 10 
    },
    buttonContainer: {
        marginTop: 45
    }
})

