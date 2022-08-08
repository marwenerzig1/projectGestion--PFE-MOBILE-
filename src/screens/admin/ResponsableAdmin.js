import { useState , useEffect } from 'react';
import React from 'react' ; 
import { StyleSheet, Text, View ,Image, FlatList, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton, Colors } from 'react-native-paper';
import {useSelector , useDispatch} from 'react-redux'; 
import ResponsableItems from '../../component/Admin/ResponsableItems' ; 
import { useFocusEffect } from '@react-navigation/native';



export default function ResponsableAdmin() {

  const navigation = useNavigation();  
  const {ip_config} = useSelector(state => state.userReducer);  
  const [isLoading, setLoading] = useState(false);
  const [responsable , setresponsable] = useState([]);
  const [filtredresponsable , setfiltredresponsable] = useState([]);
  const [search , setsearch] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getResponsable();
      setsearch(''); 
      //return () => unsubscribe();
    }, [])
  );

  const getResponsable = () => {
    fetch("http://"+ip_config+"/api/getResponsable")
      .then((response) => response.json())
      .then((json) => {setresponsable(json) ; 
                       setfiltredresponsable(json);
                      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getResponsable();
    }, []);

    const pressSupprimer = (id) => {
      var InsertAPIURL="http://"+ip_config+"/api/DeleteResponsable";
      
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
            getResponsable();
            return Alert.alert(resData.message); 
          })
        .catch((error)=>{
            return Alert.alert("Error "+error); 
        });
    }

    const searchFilter = (text) => {
      if(text) {
        const newData = responsable.filter((item) => {
          const itemData = item.nom+" "+item.prenom ? item.nom.toUpperCase()+" "+item.prenom.toUpperCase() : ''.toUpperCase() ; 
          const textData = text.toUpperCase(); 
          return itemData.indexOf(textData) > -1 ; 
        }); 
        setfiltredresponsable(newData); 
        setsearch(text);
      } 
      else{
        setfiltredresponsable(responsable);
        setsearch(text); 
      }
    }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInputStyle}
        value={search}
        placeholder="Responsable ..."
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}
      />
       <FlatList 
              data={filtredresponsable} 
              renderItem={({item}) => (
                <ResponsableItems item={item} pressSupprimer={pressSupprimer} />
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
            backgroundColor: '#8c8c8c'
          }}
          onPress={() => navigation.navigate('AjouterCompteResponsable',{fonction2: "Responsable RH"})}
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