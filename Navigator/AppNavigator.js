import React from 'react'
import { StyleSheet, Text, View , Platform} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerItemList } from '@react-navigation/drawer';

import {HomeScreen,HomeScreenNavigationOptions} from '../Screens/Shop/HomeScreen'
import {ProductCatagories, ProductCatagoriesNavigationOptions} from '../Screens/Shop/ProductCatagories'
import {ProductDetails, ProductDetailsNavigationOptions} from '../Screens/Shop/ProductDetails'
import {ProductList,ProductListNavigationOptions} from '../Screens/Shop/ProductList';

import {NavigationSideDrawerContent} from './SideNavigator'

import Colors from '../constants/Colors';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from '../Screens/Auth/AuthScreen';
import { useNavigation } from '@react-navigation/native';

import {useSelector} from 'react-redux'


const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.flipkart : '#000'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  };


const HomeNavigator = createStackNavigator();

const HomePageStachNavigator = props => (
    <HomeNavigator.Navigator screenOptions={defaultNavOptions}>
        <HomeNavigator.Screen 
            component={HomeScreen} 
            name="HOME"
            options={HomeScreenNavigationOptions} />
        <HomeNavigator.Screen 
            component={ProductCatagories}
            options={ProductCatagoriesNavigationOptions}
            name="PROD_CAT" />
        <HomeNavigator.Screen 
            component={ProductDetails} 
            name="PROD_DET" 
            options={ProductDetailsNavigationOptions} />
        <HomeNavigator.Screen 
            component={ProductList} 
            name="PROD_LIST" 
            options={ProductListNavigationOptions} />
    </HomeNavigator.Navigator>
)

const TabNavigator = createBottomTabNavigator();

const BottomTabsHomeNavigator = props => (
    <TabNavigator.Navigator>
        <TabNavigator.Screen
            component={HomePageStachNavigator}
            name="Shop"
            options={() => ({
                    tabBarIcon: props => (
                      <Ionicons
                        name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
                        size={23}
                        color={props.color}
                      />
                    )
                  })
            }
        />
    </TabNavigator.Navigator>
)


const AuthNavigator = createStackNavigator()

export const AuthStackNavigator = props => (

    <AuthNavigator.Navigator screenOptions={{
        headerTintColor : Colors.white,
        headerStyle : {
            backgroundColor : Colors.flipkart
        }
    }}>
        <AuthNavigator.Screen
            component={AuthScreen}
            name="Login"
        />
    </AuthNavigator.Navigator>

)



const SideNavigator = createDrawerNavigator()

const SideNavigatorHome = props => (
    <SideNavigator.Navigator 
        drawerContent={props => <NavigationSideDrawerContent {...props} /> }>
        <SideNavigator.Screen
            component={BottomTabsHomeNavigator}
            name="Home"
        />
    </SideNavigator.Navigator>
)


const AppNav = createStackNavigator()

const AppNavigator = props => {
    
  const auth = useSelector(state => state.auth)
    console.log('---',auth)
    return (
    <AppNav.Navigator screenOptions={{headerShown : false}}>
        <AppNav.Screen 
            component={SideNavigatorHome}
            name="Main"
        />
        {!auth.token?
            <AppNav.Screen 
                component={AuthStackNavigator}
                name="AUTH"
            />: null}
    </AppNav.Navigator>)
}


export default AppNavigator

const styles = StyleSheet.create({})
