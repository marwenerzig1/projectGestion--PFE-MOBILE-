import React , {useState , useEffect} from 'react';
import { StyleSheet, View , Text , ScrollView , FlatList } from 'react-native';
import {useSelector , useDispatch} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Table, Row, Rows } from 'react-native-table-component';
import HoraireItems from '../../component/Employe/HoraireItems';

export default function Horaire() {
    useFocusEffect(
        React.useCallback(() => {
          setLoading(true);
          getHoraire();
        }, [])
      );
      const {ip_config} = useSelector(state => state.userReducer); 
      const [horaire, sethoraire] = React.useState([]);
      const [loading, setLoading] = React.useState(false);
  
      const getHoraire = () => {
          fetch("http://"+ip_config+"/api/gethoraire")
            .then((response) => response.json())
            .then((json) => sethoraire(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));      
      };
      useEffect(() => {
              setLoading(true);
              getHoraire();
      }, []);  


    return (
    <View style={styles.container}>
        <View style={styles.bloc}>
        <Text><Ionicons name="ios-time-outline" size={26} color={'#007acc'}/></Text>
        <Text style={styles.texthr}>Horaires de travail : </Text>
        </View>
        <FlatList 
              data={horaire} 
              renderItem={({item}) => (
                <HoraireItems item={item} />
              )}
              keyExtractor={({ id }) => id }
        /> 
    </View>
    )

}

const styles = StyleSheet.create({
    container2: {
       flex: 1, 
       padding: 7, 
       paddingTop: 5 , 
       backgroundColor: '#fff'
    },
    texthr: {
        marginLeft: 10 ,
        fontSize: 20
    },
    bloc : {
        flexDirection:'row', 
        margin: 20 
    },
    icon: {
        marginTop: 50 
    },
    container: {
       flex: 1, 
       backgroundColor: '#fff'
    },
    head: {
       height: 80,
       backgroundColor: '#85C1E9',
    },
    text: { 
      margin: 6
    },
    text2:{
        height: 40 ,
        backgroundColor: '#f1f8ff' , 
    }
});