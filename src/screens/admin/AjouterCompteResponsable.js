import { useState , useEffect  } from 'react';
import React from 'react' ; 
import { StyleSheet, Text, View ,Image, FlatList, Alert } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import {useSelector , useDispatch} from 'react-redux'; 
import AddResponsable from '../../component/Admin/AddResponsable';



export default function AjouterCompteResponsable() {
  const navigation = useNavigation(); 
  const [isLoading, setLoading] = useState(false);
  const {ip_config} = useSelector(state => state.userReducer); 
  const [employe , setemploye] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getEmploye();
      //return () => unsubscribe();
    }, [])
  );

  const getEmploye = () => {
    fetch("http://"+ip_config+"/api/getEmploye2")
      .then((response) => response.json())
      .then((json) => setemploye(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getEmploye();
    }, []);


  return (
    <View style={styles.container}>
      <View style={styles.list}>
       <View>
       <FlatList 
              data={employe} 
              renderItem={({item}) => (
                <AddResponsable item={item} />
              )}
              keyExtractor={({ id }) => id }
        /> 
        </View>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    alignItems:'center' , 
    marginTop:20 ,
    fontSize: 14 , 
  },
});