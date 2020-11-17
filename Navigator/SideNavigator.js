import React from 'react'
import {View,Text,Button, SafeAreaView,StyleSheet,Image, VirtualizedList,Platform} from 'react-native';
import {
    DrawerItemList
  } from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSelector,useDispatch } from 'react-redux';


export const NavigationSideDrawerContent = props => {

     const token = useSelector(state => state.auth.token)
    const authDispatch = useDispatch() 

    return (
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} >
            <View style={{backgroundColor: Colors.flipkart , paddingTop: 45}} >
                <View style={{flexDirection: 'row' , alignItems: 'center' , justifyContent: 'flex-start' , padding: 5}}>
                    <View style={{marginLeft: 5}}>
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
                            size={30}
                            color={Colors.white}
                        />
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{color: Colors.white, fontSize: 20, fontWeight:'bold'}}>Menu</Text>
                    </View>
                    
                </View>
            </View>
            <DrawerItemList {...props} />
            { !token ?
                <Button
                    title="LoginScreen"
                    onPress={
                        () => props.navigation.navigate('AUTH')
                    }
                /> :
                <Button
                    title="Log out"
                    onPress={
                        () => {
                            authDispatch({
                                type: 'AUTH_LOGOUT'
                            }) 
                        }
                    }
                />
            }
        </SafeAreaView>
    );
  }


  const styles = StyleSheet.create({
    image :{
        height: '100%',
        width : '100%'
    },
    header: {
        backgroundColor: Colors.flipkart ,
        flex : 1
    }
  })