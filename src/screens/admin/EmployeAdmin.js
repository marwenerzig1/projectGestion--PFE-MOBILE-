import { useState , useEffect  } from 'react';
import React from 'react' ; 
import { StyleSheet, Text, View ,Image, FlatList, Alert , TextInput } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import EmployeItems from '../../component/Admin/EmployeItems' ; 
import {useSelector} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';



export default function EmployeAdmin() {
  const navigation = useNavigation(); 
  const [isLoading, setLoading] = useState(false);
  const {ip_config} = useSelector(state => state.userReducer);  
  const [employe , setemploye] = useState([]);
  const [filtredemploye , setfiltredemploye] = useState([]);
  const [search , setsearch] = useState('');
  

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getEmploye();
      setsearch(''); 
      //return () => unsubscribe();
    }, [])
  );

  const getEmploye = () => {
    fetch("http://"+ip_config+"/api/getEmploye")
      .then((response) => response.json())
      .then((json) => {setemploye(json) ; 
                      setfiltredemploye(json);
                    })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getEmploye();
    }, []);


    const pressSupprimer = (idd) => {
      var InsertAPIURL="http://"+ip_config+"/api/DeletePersonne";
      
      var headers={
        'Accept':'application/json' , 
        'Content-Type':'application/json' ,
      }

      fetch(InsertAPIURL,
        {
          method:'DELETE' , 
          headers:headers , 
          body: JSON.stringify({"id":idd}) ,
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

    const searchFilter = (text) => {
      if(text) {
        const newData = employe.filter((item) => {
          const itemData = item.nom+" "+item.prenom ? item.nom.toUpperCase()+" "+item.prenom.toUpperCase() : ''.toUpperCase() ; 
          const textData = text.toUpperCase(); 
          return itemData.indexOf(textData) > -1 ; 
        }); 
        setfiltredemploye(newData); 
        setsearch(text);
      } 
      else{
        setfiltredemploye(employe);
        setsearch(text); 
      }
    }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInputStyle}
        value={search}
        placeholder="Employe ..."
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}
      />
       <FlatList 
              data={filtredemploye} 
              renderItem={({item}) => (
                <EmployeItems item={item} pressSupprimer={pressSupprimer} />
              )}
              keyExtractor={({ id }) => id }
        /> 
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
          onPress={() => navigation.navigate('AjouterCompte',{fonction2: "Employe"})}
      />
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
  TextInputStyle: {
    height: 50 , 
    borderWidth: 1 , 
    paddingLeft : 20 , 
    marginTop:10 , 
    margin : 5 , 
    borderColor: '#9DEAEA' , 
    backgroundColor: '#EBEFEF'
  }
});
