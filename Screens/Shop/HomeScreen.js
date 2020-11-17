import React ,{ useState ,useEffect}from 'react'
import { StyleSheet, Text, View , Button, Platform, ScrollView ,Dimensions ,Image} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import SideStackButton from '../../components/UI/SideStackButton';
import {Ionicons} from '@expo/vector-icons'
import Colors from '../../constants/Colors';
import {SampleData} from '../../sample_data/data';

import { MyCarousel } from '../../components/UI/MyCarousel'
import CatagoryMenu from '../../components/HomePage/CatagoryMenu'
import { SafeAreaView } from 'react-native-safe-area-context';


export const HomeScreen = props => {

    const [caresol,setCaresol] = useState(SampleData);
    const[loaded,setLoaded] = useState(false)


    const renderItem = ({item, index}) => {
        return (
            <View style={{marginVertical : 10, height: 200}}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{uri: 'https://rukminim1.flixcart.com/flap/1688/280/image/c512d69d67d1d38c.jpg?q=50'}} />
            </View>
            
        );
    }

    const renderItemBanner = ({item, index}) => {
        return (
            <View style={{marginVertical : 10, height: 200}}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{uri: 'https://rukminim1.flixcart.com/flap/3376/560/image/e66ea2773fc36f8a.jpg?q=50'}} />
            </View>
            
        );
    }


    const func = () => {
        console.log('stated')
        fetch('http://dummy.restapiexample.com/api/v1/employees',{
            method : 'GET',
        }).then(res => res.json()).then(res => console.log(res)).catch(err => console.log(err))
    }

    useEffect(()=>{
        setLoaded(true);
    },[])

    return (
        <View>
            <ScrollView>
                <View style={{backgroundColor: Colors.flipkart, padding: 10 }}>
                    <View style={styles.SearchPlaceHolder}>
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
                            size={30}
                            color='#ccc'
                        />
                        <Text style={{color:'#ccc', flex: 1, marginLeft: 15 , fontSize: 17}}>Search for Your Product ....</Text>
                    </View>
                 </View>
                { loaded ? <View>
                    <MyCarousel
                        renderItem={renderItem}
                        entries={caresol}
                    />
                    
                </View> : null}
                <CatagoryMenu />
                <View style={{height: 100 , width: '100%', flex: 1 , overflow:'hidden' ,borderRadius: 5, marginHorizontal: 5 , alignItems: 'center' , justifyContent :'center', flexDirection: 'row' , marginVertical: 10}}>
                    <Image
                        style={{width: '95%' , height: '100%' }}
                        source={{uri : 'https://rukminim1.flixcart.com/flap/1688/280/image/e66ea2773fc36f8a.jpg?q=50'}}
                    />
                </View>
                <View>
                    <MyCarousel
                            renderItem={renderItemBanner}
                            entries={caresol}
                        />
                </View>

                <View style={{height: 100 , width: '100%', flex: 1 , overflow:'hidden' ,borderRadius: 5, marginHorizontal: 5 , alignItems: 'center' , justifyContent :'center', flexDirection: 'row' , marginVertical: 10}}>
                    <Image
                        style={{width: '95%' , height: '100%' }}
                        source={{uri : 'https://rukminim1.flixcart.com/flap/1688/280/image/e66ea2773fc36f8a.jpg?q=50'}}
                    />
                </View>
            </ScrollView>
            
        </View>
       
        
    )
}


export const HomeScreenNavigationOptions = navData => {
    return {
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={SideStackButton} >
                <Item
                    title="title"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                 />
            </HeaderButtons>

        ),
        headerTitle : 'Home',
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: Colors.flipkart
        },
    }
}



const styles = StyleSheet.create({
    Container: {
        backgroundColor : 'black'
    },
    SearchPlaceHolder : {
        padding: 10, 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: Colors.white,
        color: '#ccc',
        borderRadius: 5
    }
})
