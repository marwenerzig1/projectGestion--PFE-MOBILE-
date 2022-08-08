import { useState , useEffect  } from 'react';
import React from 'react' ; 
import { StyleSheet, Text, View ,Image, ScrollView , FlatList, Alert } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MemberItems from '../../component/Responsable/MemberItems' ; 
import {useSelector , useDispatch} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';



export default function MembreGroupe() {
  const navigation = useNavigation(); 
  const route = useRoute() ;
  const [isLoading, setLoading] = useState(false);
  const [membre , setmembre] = useState([]);
  const {ip_config} = useSelector(state => state.userReducer);  
  const [id_groupe , set_id_groupe] = useState(route.params.tab[0]);
  const [id_responsable , set_id_responsable] = useState(route.params.tab[3]);
  const [projet , set_projet] = useState(route.params.tab[1]);
  const [description , set_description] = useState(route.params.tab[2]);

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
          body: JSON.stringify({"id_groupe":id_groupe}) ,
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
      var InsertAPIURL="http://"+ip_config+"/api/DeleteMembre";
      
      var headers={
        'Accept':'application/json' , 
        'Content-Type':'application/json' ,
      }

      fetch(InsertAPIURL,
        {
          method:'DELETE' , 
          headers:headers , 
          body: JSON.stringify({"id_employe":id}) ,
        }
        )
        .then((res)=>res.json())
        .then((resData)=>
          {
            setLoading(true);
            getMembre();
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
                        <MemberItems item={item} pressSupprimer={pressSupprimer} />
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
            <Text style={{color: 'black' , fontSize: 22 , fontWeight:'bold'}}>Projet :</Text> {projet}
          </Text>
          <Text style={{color: 'black', fontSize: 18}}>
            <Text style={{color: 'black' , fontSize: 22 , fontWeight:'bold'}}>Description :</Text> {description}
          </Text>
          <Text style={{color: 'black', fontSize: 22 , marginTop: 8, fontWeight:'bold' , color:'#007acc'}}>
           Liste	des	membres : 
          </Text>
        </View>
        {verif()}
        </ScrollView>
      <IconButton
          icon="plus"
          color={Colors.white}
          size={33}
          style={{
            right: 15,
            position: 'absolute',
            bottom: 15,
            backgroundColor: '#007acc'
          }}
          onPress={() => navigation.navigate('AjouterMembre',{id_groupe: id_groupe , id_responsable : id_responsable })}
      />
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
