import React , {useState , useEffect} from 'react' ; 
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View ,Alert, FlatList,TextInput, TouchableOpacity, ScrollView , SafeAreaView  } from 'react-native';
import {useSelector} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import CongesMembre from '../../component/Responsable/CongesMembre';


export default function MembresConges() {
  const {id,ip_config} = useSelector(state => state.userReducer);  
  const [isLoading, setLoading] = useState(false);
  const [conges , setconges] = useState();
  const [filtredconges , setfiltredconges] = useState([]);
  const [search , setsearch] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getConges();
      setsearch(''); 
    }, [])
  );

  const getConges = () => {
    var InsertAPIURL="http://"+ip_config+"/api/getConges" ;
      
    var headers={
      'Accept':'application/json' , 
      'Content-Type':'application/json' ,
    }

    fetch(InsertAPIURL,
      {
        method:'POST' , 
        headers:headers , 
        body: JSON.stringify({"id_employe":id}) ,
      }
      )
      .then((response) => response.json())
      .then((json) => {setconges(json) , 
                       setfiltredconges(json)
                      })
      .catch((error) => console.error( error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getConges();
    }, []);

    const searchFilter = (text) => {
      if(text) {
        const newData = conges.filter((item) => {
          const itemData = item.nom+" "+item.prenom ? item.nom.toUpperCase()+" "+item.prenom.toUpperCase() : ''.toUpperCase() ; 
          const textData = text.toUpperCase(); 
          return itemData.indexOf(textData) > -1 ; 
        }); 
        setfiltredconges(newData); 
        setsearch(text);
      } 
      else{
        setfiltredconges(conges);
        setsearch(text); 
      }
    }



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInputStyle}
        value={search}
        placeholder="Nom Prenom ..."
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}
      />
        <FlatList 
              data={filtredconges} 
              renderItem={({item}) => (
                <CongesMembre item={item} />
              )}
              keyExtractor={(item, index) => 'key'+index}
        /> 
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
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