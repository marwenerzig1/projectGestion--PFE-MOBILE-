import React , {useState} from 'react' ; 
import { View , Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import {DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer' ; 
import { useNavigation } from '@react-navigation/native';
import {useSelector , useDispatch} from 'react-redux'; 
import { useRoute } from '@react-navigation/native';


import Ionicons from 'react-native-vector-icons/Ionicons';


const CustomDrawer = (props) => {
  const route = useRoute() ;
  const [id,setId] = useState(route.params.id_responsable) ; 
  const [status,setStatus] = useState(route.params.status) ; 
  const {name,prenom,ip_config} = useSelector(state => state.userReducer); 
  const navigation = useNavigation(); 

  const navig = () => {
    if(status == "ADMINISTRATEUR"){
      return navigation.navigate('ModifierInformationAdmin') ;
    }
    else{
      return navigation.navigate('ModifierInformation') ;
    }
  }

    return(
        <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8c8c8c'}}>
        <ImageBackground
          source={require('../../assets/font-gris.jpg')}
          style={{padding: 20}}>
          <Image
            source={require('../../assets/icon2.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {name} {prenom}
          </Text> 
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                marginRight: 5,
              }}>
              {status} 
            </Text>
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
      <TouchableOpacity onPress={() => {navig()}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="build-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Gérer Compte
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('FirstPage')}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
    );
}


export default CustomDrawer 


