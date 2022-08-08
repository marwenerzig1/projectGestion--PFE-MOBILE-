import React , {useState , useEffect} from 'react' ; 
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View , FlatList , TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GroupesMembre from '../../component/Employe/GroupesMembre';

import {useSelector} from 'react-redux'; 

export default function GroupeMembre() { 
  const [isLoading, setLoading] = useState(false);
  const {id,ip_config} = useSelector(state => state.userReducer);
  const navigation = useNavigation(); 
  const [groupe , setgroupe] = useState([]);
  const [filtredgroupe , setfiltredgroupe] = useState([]);
  const [search , setsearch] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getGroupe();
      setsearch('');
    }, [])
  );

  const getGroupe = () => {
    var InsertAPIURL="http://"+ip_config+"/api/getgroupeMembre";
      
    var headers={
      'Accept':'application/json' , 
      'Content-Type':'application/json' ,
    }

    fetch(InsertAPIURL,
      {
        method:'POST' , 
        headers:headers , 
        body: JSON.stringify({"id":id}) ,
      }
      )
      .then((response) => response.json())
      .then((json) => {setgroupe(json);
                       setfiltredgroupe(json); 
                      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getGroupe();
    }, []);

    const searchFilter = (text) => {
      if(text) {
        const newData = groupe.filter((item) => {
          const itemData = item.nom_projet ? item.nom_projet.toUpperCase() : ''.toUpperCase() ; 
          const textData = text.toUpperCase(); 
          return itemData.indexOf(textData) > -1 ; 
        }); 
        setfiltredgroupe(newData); 
        setsearch(text);
      } 
      else{
        setfiltredgroupe(groupe);
        setsearch(text); 
      }
    }


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInputStyle}
        value={search}
        placeholder="Groupe ..."
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}
      />
       <FlatList 
              data={filtredgroupe} 
              renderItem={({item}) => (
                <GroupesMembre item={item} />
              )}
              keyExtractor={(item, index) => 'key'+index}
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