import React from 'react'
import { StyleSheet, Text, View , Platform} from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';



import Colors from '../../constants/Colors';


const SideStackButton = props => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color={Platform.OS === 'android' ? 'white' : Colors.flipkart}
        />
    )
}

export default SideStackButton

const styles = StyleSheet.create({})
