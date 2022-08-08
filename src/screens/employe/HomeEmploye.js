import React, { useState, useEffect } from 'react';
import { Platform, FlatList ,  Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import {useSelector , useDispatch} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import GraphiqueEmploye from '../../component/Employe/GraphiqueEmploye';

export default function HomeEmploye() {

  const [isLoading, setLoading] = useState(false);
  const [compteur , setcompteur] = useState([]);
  const {id,ip_config} = useSelector(state => state.userReducer);  

/*  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      } 
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  */

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getCompteur();
    }, [])
  ); 

  const getCompteur = () => {
    var InsertAPIURL="http://"+ip_config+"/api/getcountEmploye";
      
    var headers={
      'Accept':'application/json' , 
      'Content-Type':'application/json' ,
    }

    fetch(InsertAPIURL,
      {
        method:'POST' , 
        headers:headers , 
        body: JSON.stringify({"id_employe":id}) ,
      }
      )
      .then((response) => response.json())
      .then((json) => {setcompteur(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getCompteur();
    }, []);

  return (
    <View style={styles.list3}>
    <Text style={styles.title1} >Courbe Graphique :</Text>  
    <View>
    <FlatList 
             data={compteur} 
             renderItem={({item}) => (
               <GraphiqueEmploye item={item}/>
             )}
             keyExtractor={(item, index) => 'key'+index}
       />
     </View>
   </View>
  );
}

const styles = StyleSheet.create({
  list3: {
    flex: 1,
    marginTop: 18 
  }, 
  title1: {
    color:'black',
    marginLeft: 12 , 
    fontSize: 20 ,
    fontWeight: 'bold' , 
  }
});