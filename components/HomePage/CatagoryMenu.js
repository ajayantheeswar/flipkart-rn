import React from 'react'
import { View, Text ,Image, SafeAreaView} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const CATAGORIES_DATA = [
    {   key : 1 , 
        image : "https://rukminim1.flixcart.com/www/200/200/promos/27/10/2020/9bdbc154-5c1c-4820-9d7e-1b23ceb11115.png?q=90",
        name : 'Mobiles'
    },
    {   key : 2 , 
        image : "https://rukminim1.flixcart.com/www/200/200/promos/27/10/2020/14ff1651-3ca0-4dae-a6d2-3f98967132e6.png?q=90",
        name : 'Electronics'
    },
    {   key : 3 , 
        image : "https://rukminim1.flixcart.com/www/200/200/promos/07/11/2020/08a6d89e-bb84-44ec-9111-b925ab261efa.png?q=90",
        name : 'Fashion'
    },
    {   key : 4 , 
        image : "https://rukminim1.flixcart.com/www/200/200/promos/27/10/2020/bb36a281-abe5-4267-af01-d848f99ffcaf.png?q=90",
        name : 'TVs & Appliances'
    },
    {   key : 5 , 
        image : "https://rukminim1.flixcart.com/www/200/200/promos/27/10/2020/7c79fe94-b4b1-4c0d-bb13-51a91b13094c.png?q=90",
        name : 'Beauty, Toys & More'
    },
    {   key : 6 , 
        image : "https://rukminim1.flixcart.com/www/200/200/promos/27/10/2020/bb36a281-abe5-4267-af01-d848f99ffcaf.png?q=90",
        name : 'Home      Essentials'
    }
]

const CatagoryMenu = props => {
    return (
        <SafeAreaView style={{flex: 1,flexDirection: 'row', alignItems: 'center' , justifyContent:'center'}}>
            <FlatList
                keyExtractor={item => item.key.toString()}
                data={CATAGORIES_DATA}
                numColumns={"3"} 
                renderItem={(item)=> {
                    console.log(item.item.image)
                    return(
                    <View style={{flex: 1 , justifyContent: 'space-between' , alignItems: 'center', margin: 10}}>
                        <View style={{overflow: "hidden" ,height: 50, width:50}}>
                            <Image 
                                style={{width: '100%' , height: '100%'}}
                                source={{uri: item.item.image}}/>
                         </View>
                        <Text style={{textAlign : 'center'}}>{item.item.name}</Text>   
                    </View>
                )}}
            />
        </SafeAreaView>
    )
}

export default CatagoryMenu
