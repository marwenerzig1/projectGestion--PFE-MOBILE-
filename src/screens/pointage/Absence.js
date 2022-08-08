import React , {useState , useEffect} from 'react' ; 
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View ,Alert, FlatList } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import {useSelector , useDispatch} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import HistoriqueAbsence from '../../component/Pointage/HistoriqueAbsence';


export default function Absence() {
  const {id,ip_config} = useSelector(state => state.userReducer);  
  const [isLoading, setLoading] = useState(false);
  const [absence , setabsence] = useState();
  const navigation = useNavigation(); 

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getAbsence();
      //return () => unsubscribe();
    }, [])
  );

  const getAbsence = () => {
    var InsertAPIURL="http://"+ip_config+"/api/GetAbsence";
      
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
      .then((json) => {setabsence(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getAbsence();
    }, []); 

    const pressSupprimer = (id) => {
        var InsertAPIURL="http://"+ip_config+"/api/DeleteAbsence";
        
        var headers={
          'Accept':'application/json' , 
          'Content-Type':'application/json' ,
        }
  
        fetch(InsertAPIURL,
          {
            method:'post' , 
            headers:headers , 
            body: JSON.stringify({"id_pointage":id}) ,
          }
          )
          .then((res)=>res.json())
          .then((resData)=>
            {
              setLoading(true);
              getAbsence();
              return Alert.alert(resData[0].message); 
            })
          .catch((error)=>{
              return Alert.alert("Error "+error); 
          });
      }

  return (
    <View style={styles.container}>
      <View style={styles.list}>
       <View>
       <FlatList 
              data={absence} 
              renderItem={({item}) => (
                <HistoriqueAbsence item={item} pressSupprimer={pressSupprimer} />
              )}
              keyExtractor={(item, index) => 'key'+index}
        /> 
        </View>
      </View>
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
          onPress={() => navigation.navigate('AjouterAbsence')}
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
    alignItems:'center' , 
    marginTop:20 ,
    fontSize: 14 , 
  },
});
