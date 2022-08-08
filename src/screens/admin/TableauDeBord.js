import { useState , useEffect } from 'react';
import React from 'react' ; 
import { StyleSheet, Text, View , FlatList , ScrollView} from 'react-native';
import ActeurItems from '../../component/Admin/ActeurItems' ; 
import {useSelector , useDispatch} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import FonctionnaliteItems from '../../component/Admin/FonctionnaliteItems';
import Graphique from '../../component/Admin/Graphique';


export default function TableauDeBord() {

  const [isLoading, setLoading] = useState(false);
  const [compteur , setcompteur] = useState([]);
  const {ip_config} = useSelector(state => state.userReducer);  

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getCompteur();
    }, [])
  );


  const getCompteur = () => {
    fetch("http://"+ip_config+"/api/getcount")
      .then((response) => response.json())
      .then((json) => setcompteur(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getCompteur();
    }, []);


  return (
    <View style={styles.container}>
      <View style={styles.list}>
       <View>
        <Text style={styles.title1} >Ressources Humaines :</Text>  
        <FlatList 
                data={compteur} 
                renderItem={({item}) => (
                  <ActeurItems item={item}/>
                )}
                keyExtractor={(item, index) => 'key'+index}
          /> 
        </View>
      </View>
      <View style={styles.list2}>
       <View>
       <Text style={styles.title1} >Autres Fonctionnalités :</Text>  
       <FlatList 
              data={compteur} 
              renderItem={({item}) => (
                <FonctionnaliteItems item={item}/>
              )}
              keyExtractor={(item, index) => 'key'+index}
        /> 
        </View>
      </View>
      <View style={styles.list3}>
       <Text style={styles.title1} >Courbe Graphique :</Text>  
       <View>
       <FlatList 
                data={compteur} 
                renderItem={({item}) => (
                  <Graphique item={item}/>
                )}
                keyExtractor={(item, index) => 'key'+index}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {
    flex: 1,
    marginTop: 20 , 
  }, 
  list2: {
    flex: 1,
    marginTop: -100 , 
  }, 
  list3: {
    flex: 1,
    marginTop: -100 , 
    marginBottom : 30 
  }, 
  title1: {
    color:'black',
    marginLeft: 12 , 
    fontSize: 20 ,
    fontWeight: 'bold' , 
  }
});
