import React , {useState , useEffect} from 'react' ; 
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View ,Alert, FlatList, TouchableOpacity, Dimensions  } from 'react-native';
import {useSelector} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import CongesEmploye from '../../component/Employe/CongesEmploye';


export default function Conges() {
  const {id,ip_config} = useSelector(state => state.userReducer);  
  const [isLoading, setLoading] = useState(false);
  const [conges , setconges] = useState();
  const [filtredconges , setfiltredconges] = useState([]);
  const [status,setStatus] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getConges();
    }, [])
  );

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

  const searchFilter = (text) => {
    if(text) {
      const newData = conges.filter((item) => {
        const val = item.etat.toString() ; 
        const itemData = val ? val.toUpperCase() : ''.toUpperCase() ; 
        const textData = text.toUpperCase(); 
        return itemData.indexOf(textData) > -1 ; 
      }); 
      setfiltredconges(newData); 
    } 
    else{
      setfiltredconges(conges);
    }
  }

  const getConges = () => {
    var InsertAPIURL="http://"+ip_config+"/api/getCongesEmploye" ;
      
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
      .then((json) => {setconges(json);setfiltredconges(json);})
      .catch((error) => console.error( error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getConges();
    }, []);

    const pressSupprimer = (idd) => {
      var InsertAPIURL="http://"+ip_config+"/api/DeleteConge";
      
      var headers={
        'Accept':'application/json' , 
        'Content-Type':'application/json' ,
      }

      fetch(InsertAPIURL,
        {
          method:'post' , 
          headers:headers , 
          body: JSON.stringify({"id_conge":idd,"id_employe":id}) ,
        }
        )
        .then((res)=>res.json())
        .then((resData)=>
          {
            setLoading(true);
            getConges();
            setStatus(''); 
            return Alert.alert(resData[0].message); 
          })
        .catch((error)=>{
            return Alert.alert("Error "+error); 
        });
    }

  return (
    <View style={styles.container}>
       <View style={styles.listTab}>
          {
            listTab.map( e => (
                <TouchableOpacity
                 key={e.statusChiffre}
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
              data={filtredconges} 
              renderItem={({item}) => (
                <CongesEmploye item={item} pressSupprimer={pressSupprimer} />
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
  flat:{
    marginTop:20 , 
  },
  text: {
    color: '#007acc' , 
    fontSize: 17 , 
    textAlign:'center' , 
    marginTop: 6
  },
  text1: {
    color: '#fff' , 
    fontSize: 17 , 
    textAlign:'center' , 
    marginTop: 6
  },
  box: {
    borderWidth: 1,
    borderColor: '#007acc' ,
    width: 110 ,
    height: 40 
  },
  box1: {
    borderWidth: 1,
    borderColor: '#007acc' ,
    backgroundColor : '#007acc' , 
    width: 110 ,
    height: 40 
  },
  boxs: {
    height: 42 ,  
    marginTop:10 , 
    margin : 5 ,  
    justifyContent:'center',
    flexDirection:'row',  
  },
  listTab:{
    flexDirection: 'row',
    alignSelf:'center' , 
    marginBottom : 20 ,  
    marginTop : 12 
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