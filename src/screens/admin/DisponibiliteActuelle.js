import React , {useState , useEffect} from 'react' ; 
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View , FlatList,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector , useDispatch} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import DisponibiliteItems from '../../component/Admin/DisponibiliteItems';



export default function DisponibiliteActuelle() {
  const {id,ip_config} = useSelector(state => state.userReducer);  
  const [isLoading, setLoading] = useState(false);
  const [disponibilite , setdisponibilite] = useState();
  const [nombre_desponibilite , setnombre_desponibilite] = useState(0);
  const [nombre_employes , setnombre_employes] = useState(0);
  const navigation = useNavigation(); 

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getDisponibilite();
      getNombre_Desponibilite(); 
      getNombre_Employes();
    }, [])
  );

  const getDisponibilite = () => {
    fetch("http://"+ip_config+"/api/getDisponibilite")
      .then((response) => response.json())
      .then((json) => {setdisponibilite(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
  const getNombre_Desponibilite = () => {
    fetch("http://"+ip_config+"/api/getNombreDisponibilite")
      .then((response) => response.json())
      .then((json) => {setnombre_desponibilite(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
  const getNombre_Employes = () => {
    fetch("http://"+ip_config+"/api/getNombreEmployes")
      .then((response) => response.json())
      .then((json) => {setnombre_employes(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getDisponibilite(); 
        getNombre_Desponibilite(); 
        getNombre_Employes();
    }, []);

  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.txt1}><Ionicons name="md-calendar-sharp" size={24} color={'black'} /> DISPONIBILITÉ ACTUELLE</Text>
        <View style={styles.line}/>
        <Text style={styles.txt2}><Text style={{color:'rgb(42, 141, 221)' , fontSize : 20}}>{nombre_desponibilite}</Text><Text style={{color : 'rgb(168, 166, 166)', fontSize : 20}}>/{nombre_employes}</Text> employés pointés dans le système</Text>
    </View>
       <FlatList 
              data={disponibilite} 
              renderItem={({item}) => (
                <DisponibiliteItems item={item} />
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
  header: {
    marginTop : 10 , 
    padding : 10 
  },
  txt1: {
      fontWeight:'bold' , 
      fontSize: 23
  },
  txt2:{
      marginTop : 8 , 
      fontSize : 17 
  },
  line: {
    marginTop: 6 , 
    borderBottomColor: '#C2C5C1',
    borderBottomWidth: 0.8,
    marginLeft : 5 , 
    width: 328 
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
