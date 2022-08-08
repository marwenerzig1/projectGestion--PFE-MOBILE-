import { useState , useEffect  } from 'react';
import React from 'react' ; 
import { StyleSheet, Text, View ,Image, ScrollView , FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useSelector , useDispatch} from 'react-redux'; 
import MemberEmployeItems from '../../component/Employe/MemberEmployeItems' ; 
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';



export default function InfoGroupe() {
  const navigation = useNavigation(); 
  const route = useRoute() ;
  const {ip_config} = useSelector(state => state.userReducer); 
  const [isLoading, setLoading] = useState(false);
  const [membre , setmembre] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getMembre();
      //return () => unsubscribe();
    }, [])
  );

    const getMembre = () => {
      var InsertAPIURL="http://"+ip_config+"/api/getMembregroupe";
        
      var headers={
        'Accept':'application/json' , 
        'Content-Type':'application/json' ,
      }
  
      fetch(InsertAPIURL,
        {
          method:'POST' , 
          headers:headers , 
          body: JSON.stringify({"id_groupe":route.params.tab[0]}) ,
        }
        )
        .then((response) => response.json())
        .then((json) => {setmembre(json)})
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      };
      useEffect(() => {
          setLoading(true);
          getMembre();
      }, []);


    const pressSupprimer = (id) => {
      var InsertAPIURL="http://"+ip_config+"/api/DeletePersonne";
      
      var headers={
        'Accept':'application/json' , 
        'Content-Type':'application/json' ,
      }

      fetch(InsertAPIURL,
        {
          method:'DELETE' , 
          headers:headers , 
          body: JSON.stringify({"id":id}) ,
        }
        )
        .then((res)=>res.json())
        .then((resData)=>
          {
            setLoading(true);
            getEmploye();
            return Alert.alert(resData.message); 
          })
        .catch((error)=>{
            return Alert.alert("Error "+error); 
        });
    }


    const verif = () => {
      if(membre.length == 0 ){
        return <Text style={styles.vide}>Il n'y a aucun membres !</Text>
      }
      else{
        return     <ScrollView horizontal={true} style={styles.membre}>
                      <FlatList 
                      data={membre} 
                      renderItem={({item}) => (
                        <MemberEmployeItems item={item} />
                      )}
                      keyExtractor={(item,index) => index.toString() }
                      /> 
                    </ScrollView>
      }

    }



  return (
    
      <View style={styles.container} >
        <ScrollView>
        <View style={styles.textes}>
          <Text style={{color: 'black', fontSize: 18}}>
            <Text style={{color: 'black' , fontSize: 22 , fontWeight:'bold'}}>Projet :</Text> {route.params.tab[1]}
          </Text>
          <Text style={{color: 'black', fontSize: 18}}>
            <Text style={{color: 'black' , fontSize: 22 , fontWeight:'bold'}}>Description :</Text> {route.params.tab[2]}
          </Text>
          <Text style={{color: 'black', fontSize: 22 , marginTop: 8, fontWeight:'bold' , color:'#007acc'}}>
           Liste des	membres : 
          </Text>
        </View>
 
        {verif()}
        
        </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1 , 
    backgroundColor: '#fff'
  },
  text: {
    alignItems:'center' , 
    marginTop:20 ,
    fontSize: 14 , 
  },
  textes: {
    padding: 12 ,  
  },
  membre:{
    position:'relative' , 
    left: 40 , 
  },
  vide:{
    textAlign: 'center',
    marginTop: 50,
    fontSize:20 ,
    color:'red'
  }
});
