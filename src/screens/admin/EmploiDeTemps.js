import React , {useState , useEffect} from 'react' ; 
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View ,Alert,Button, FlatList,TouchableOpacity,SafeAreaView,ScrollView  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector , useDispatch} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import EmploiDeTempsItems from '../../component/Admin/EmploiDeTempsItems';
import RNPickerSelect from "react-native-picker-select";



export default function EmploiDeTemps() {
  const {id,ip_config} = useSelector(state => state.userReducer);  
  const [isLoading, setLoading] = useState(false);
  const [pointage , setpointage] = useState();
  const [filtredpointage , setfiltredpointage] = useState();
  const [employe , setemploye] = useState([]);
  const navigation = useNavigation(); 


  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getPointage();
      getEmploye(); 
    }, [])
  );

  const getEmploye = () => {
    fetch("http://"+ip_config+"/api/getEmploye")
    .then((response) => response.json())
    .then((json) => {setemploye(json)})
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }

  let tableData = [];

  employe.map((item) => {
        tableData.push( { label: item.nom+" "+item.prenom , value: item.nom+" "+item.prenom })
  });

  const searchFilter = (text) => {
    if(text) {
        const newData = pointage.filter((item) => {
          const itemData = item.nom+" "+item.prenom ? item.nom.toUpperCase()+" "+item.prenom.toUpperCase() : ''.toUpperCase() ; 
          const textData = text.toUpperCase(); 
          return itemData.indexOf(textData) > -1 ; 
        }); 
        setfiltredpointage(newData); 
    }
    else{
      setfiltredpointage(pointage);
    }
  }

  const getPointage = () => {
    fetch("http://"+ip_config+"/api/getALLPointage")
    .then((response) => response.json())
    .then((json) => {setpointage(json) ; setfiltredpointage(json); })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }
  
    useEffect(() => {
        setLoading(true);
        getPointage();
        getEmploye(); 
    }, []);

  return (
    <View style={styles.container}>
      <View style={styles.boxs} underlineColorAndroid="transparent"> 
        <TouchableOpacity style={styles.box}>
          <Text style={styles.text}><Ionicons name="md-tablet-landscape-outline" size={20} color={'#fff'} />  Tableau</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box1} onPress={()=>navigation.navigate('CalendrierAdmin')} >
          <Text style={styles.text1}><Ionicons name="ios-calendar-sharp" size={20} color={'#007acc'} /> Calendrier</Text>
        </TouchableOpacity>
      </View>
      <View>
            <RNPickerSelect
              onValueChange={(language) => { searchFilter(language) }}
              items={tableData}
              style={pickerSelectStyles}
            />  
      </View> 
       <FlatList 
              data={filtredpointage} 
              renderItem={({item}) => (
                <EmploiDeTempsItems item={item} />
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
  itemss:{
    flexDirection: 'row' , 
    justifyContent:'space-around' , 
    marginTop : 15 
  },
  text: {
    color: '#fff' , 
    fontSize: 17 , 
    textAlign:'center' , 
    marginTop: 6
  },
  text1: {
    color: '#007acc' , 
    fontSize: 17 , 
    textAlign:'center' , 
    marginTop: 6
  },
  box: {
    borderWidth: 1,
    borderColor: '#007acc' ,
    backgroundColor : '#007acc' , 
    width: 140 ,
    height: 40 
  },
  box1: {
    borderWidth: 1,
    borderColor: '#007acc' ,
    width: 140 ,
    height: 40 
  },
  boxs: {
    height: 42 ,  
    marginTop:10 , 
    margin : 5 ,  
    justifyContent:'center',
    flexDirection:'row',  
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