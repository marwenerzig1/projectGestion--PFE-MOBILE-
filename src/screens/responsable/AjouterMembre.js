import { useState , useEffect  } from 'react';
import React from 'react' ; 
import { StyleSheet, Text, View ,Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import {useSelector , useDispatch} from 'react-redux'; 
import { useRoute } from '@react-navigation/native';
import AddMembre from '../../component/Responsable/AddMembre';



export default function AjouterMembre() {
  const navigation = useNavigation(); 
  const route = useRoute() ;
  const {ip_config} = useSelector(state => state.userReducer);  
  const [isLoading, setLoading] = useState(false);
  const [employe , setemploye] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getEmploye();
      //return () => unsubscribe();
    }, [])
  );

    const getEmploye = () => {
        var InsertAPIURL="http://"+ip_config+"/api/getMembre";

        var headers={
          'Accept':'application/json' , 
          'Content-Type':'application/json' ,
        }
    
        fetch(InsertAPIURL,
          {
            method:'POST' , 
            headers:headers , 
            body: JSON.stringify({"id_responsable":route.params.id_responsable , "id_groupe":route.params.id_groupe}) ,
          }
          )
          .then((response) => response.json())
          .then((json) => setemploye(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
        };
        useEffect(() => {
            setLoading(true);
            getEmploye();
        }, []);

        const pressAjouter = (id) => {
            var InsertAPIURL="http://"+ip_config+"/api/AjouterMembre";
            
            var headers={
              'Accept':'application/json' , 
              'Content-Type':'application/json' ,
            }
        
            fetch(InsertAPIURL,
              {
                method:'POST' , 
                headers:headers , 
                body: JSON.stringify({"id_employe":id , "id_groupe":route.params.id_groupe}) ,
              }
              )
              .then((response)=>response.json())
              .then((resData) =>{
                if (JSON.stringify(resData[0]['code']).toString() === '"201"' ) {
                    setLoading(true);
                    setLoading(false);
                    navigation.goBack() ; 
                    Alert.alert(JSON.stringify(resData[0]['message']).toString()) ;
               }
               else {
                  return Alert.alert(JSON.stringify(resData[0]['message']).toString()) ; 
               }
              });
          }


  return (
    <View style={styles.container}>
      <View style={styles.list}>
       <View>
       <FlatList 
              data={employe} 
              renderItem={({item}) => (
                <AddMembre item={item} pressAjouter={pressAjouter} />
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
    backgroundColor: '#fff',
  },
  text: {
    alignItems:'center' , 
    marginTop:20 ,
    fontSize: 14 , 
  },
});