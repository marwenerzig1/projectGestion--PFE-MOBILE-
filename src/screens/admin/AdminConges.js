import React , {useState , useEffect} from 'react' ; 
import { StyleSheet, Text, View , FlatList,TextInput , TouchableOpacity , Dimensions } from 'react-native';
import {useSelector} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import CongesAdmin from '../../component/Admin/CongesAdmin';
import RNPickerSelect from "react-native-picker-select";


export default function AdminConges() {
  const {id,ip_config} = useSelector(state => state.userReducer);  
  const [isLoading, setLoading] = useState(false);
  const [conges , setconges] = useState();
  const [filtredconges , setfiltredconges] = useState([]);
  const [filtredconges2 , setfiltredconges2] = useState([]);
  const [search , setsearch] = useState('');
  const [status,setStatus] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getConges();
      setsearch(''); 
      setStatus(''); 
    }, [])
  );

  const getConges = () => {
    fetch("http://"+ip_config+"/api/getAllConges")
    .then((response) => response.json())
    .then((json) => {setconges(json); setfiltredconges(json);setfiltredconges2(json)})
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getConges();
    }, []);

    const searchFilter = (text) => {
      if(text) {
        const newData = conges.filter((item) => {
          const val = item.etat.toString() ; 
          const itemData = val ? val.toUpperCase() : ''.toUpperCase() ; 
          const textData = text.toUpperCase(); 
          return itemData.indexOf(textData) > -1 ; 
        }); 
        setsearch(''); 
        setfiltredconges(newData); 
        setfiltredconges2(newData);
      } 
      else{
        setfiltredconges(conges);
        setfiltredconges2(conges);
      }
    }

    const searchFilterr = (text) => {
      if(text) {
          const newData = filtredconges.filter((item) => {
            const itemData = item.nom+" "+item.prenom ? item.nom.toUpperCase()+" "+item.prenom.toUpperCase() : ''.toUpperCase() ; 
            const textData = text.toUpperCase(); 
            return itemData.indexOf(textData) > -1 ; 
          }); 
          setfiltredconges2(newData); 
          setsearch(text); 
      }
      else{
        setfiltredconges2(filtredconges);
        setsearch('');
      }
    }

    const listTab = [
      {
        status: 'Tous' , 
        statusChiffre : ''
      },
      {
        status: 'En Cours' , 
        statusChiffre : '0'
      },
      {
        status: 'Accepter' , 
        statusChiffre : '1' 
      },
      {
        status: 'Refuser' , 
        statusChiffre : '2'
      }
    ]


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInputStyle}
        value={search}
        placeholder="Nom Prenom ..."
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilterr(text)}
      />
       <View style={styles.listTab}>
          {
            listTab.map( e => (
                <TouchableOpacity
                 style={[styles.btnTab , status === e.statusChiffre && styles.btnTabActive]}
                 onPress={() => {setStatus(e.statusChiffre) ; searchFilter(e.statusChiffre);} }
                >
                  <Text style={[styles.textTab , status === e.statusChiffre && styles.textTabActive]}>
                    {e.status}
                  </Text>
                </TouchableOpacity>
              )
            )
          }
      </View>
        <FlatList 
              data={filtredconges2} 
              renderItem={({item}) => (
                <CongesAdmin item={item} />
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
  },
  listTab:{
    flexDirection: 'row',
    alignSelf:'center' , 
    marginBottom : 20 ,  
    marginTop : 4 
  },
  btnTab:{
    width : Dimensions.get('window').width / 4.1,
    flexDirection: 'row' , 
    borderWidth: 0.5 , 
    borderColor: '#EBEBEB' ,
    padding : 10 , 
    justifyContent: 'center'
  },
  textTab:{
    fontSize: 16 , 
    color:'black'
  },
  btnTabActive: {
    backgroundColor : '#007acc'
  },
  textTabActive:{
    color:'#fff'
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  }
});