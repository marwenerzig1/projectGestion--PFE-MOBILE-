import React , {useState , useEffect} from 'react' ; 
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View ,Alert, FlatList, TextInput } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import {useSelector} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import GroupeItems from '../../component/Responsable/GroupeItems';


export default function ListeGroupe() {
  const {id,ip_config} = useSelector(state => state.userReducer);  
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation(); 
  const [groupe , setgroupe] = useState();
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
    var InsertAPIURL="http://"+ip_config+"/api/getgroupeResponsable";
      
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


    const pressSupprimer = (id) => {
      var InsertAPIURL="http://"+ip_config+"/api/DeleteGroupe";
      
      var headers={
        'Accept':'application/json' , 
        'Content-Type':'application/json' ,
      }

      fetch(InsertAPIURL,
        {
          method:'DELETE' , 
          headers:headers , 
          body: JSON.stringify({"id_groupe":id}) ,
        }
        )
        .then((res)=>res.json())
        .then((resData)=>
          {
            //return Alert.alert(id.toString()) ; 
            setLoading(true);
            getGroupe();
            return Alert.alert(resData.message); 
          })
        .catch((error)=>{
            return Alert.alert("Error "+error); 
        });
    } 

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
                <GroupeItems item={item} pressSupprimer={pressSupprimer} />
              )}
              keyExtractor={(item,index) => index.toString() }
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
          onPress={() => navigation.navigate('AjouterGroupe')}
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
