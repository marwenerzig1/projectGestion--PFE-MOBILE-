import React , {useState , useEffect} from 'react' ; 
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View ,Alert, FlatList,TouchableOpacity,SafeAreaView,ScrollView  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector , useDispatch} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import HistoriqueItems from '../../component/Pointage/HistoriqueItems';


export default function Historique() {
  const {id,ip_config} = useSelector(state => state.userReducer);  
  const [isLoading, setLoading] = useState(false);
  const [historique , sethistorique] = useState();
  const navigation = useNavigation(); 

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getHistorique();
    }, [])
  );

  const getHistorique = () => {
    var InsertAPIURL="http://"+ip_config+"/api/getPointage";
      
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
      .then((json) => {sethistorique(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getHistorique();
    }, []);

  return (
    <View style={styles.container}>
      <View style={styles.boxs} underlineColorAndroid="transparent"> 
        <TouchableOpacity style={styles.box}>
          <Text style={styles.text}><Ionicons name="md-tablet-landscape-outline" size={20} color={'#fff'} />  Tableau</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box1} onPress={()=>navigation.navigate('CalendrierEmploi')} >
          <Text style={styles.text1}><Ionicons name="ios-calendar-sharp" size={20} color={'#007acc'} /> Calendrier</Text>
        </TouchableOpacity>
      </View> 
       <FlatList 
              data={historique} 
              renderItem={({item}) => (
                <HistoriqueItems item={item} />
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
