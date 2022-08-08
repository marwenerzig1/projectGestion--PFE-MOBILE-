import React , {useState , useEffect} from 'react' ; 
import { View, Text, StyleSheet,TouchableOpacity , Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import {useSelector} from 'react-redux'; 
import Timeline from 'react-native-timeline-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

export default function TraitementCongeAdmin() {

    useFocusEffect(
        React.useCallback(() => {
          setLoading(true);
          getTraitement();
          getTraitementACEP();
        }, [])
      );

    const route = useRoute() ;
    const {id,name,prenom,ip_config} = useSelector(state => state.userReducer);
    const [id_conge,setid_conge] = useState(route.params.id_conge) ;
    const [isLoading, setLoading] = useState(false);  
    const [traitement, settraitement] = React.useState([]);
    const [etat, setetat ] = React.useState(route.params.etat_conge);
    const [traitementACEP, settraitementACEP] = React.useState([]);

    const etatconge = () => {
        if(etat == 0 ){
            return <Text style={styles.teext1}>En Cours</Text>
        }
        else if(etat == 1){
            return <Text style={styles.teext2}>Accepter</Text>
        }
        else{
            return <Text style={styles.teext3}>Refuser</Text>
        }
    }

    const getTraitementACEP = () => {
        var InsertAPIURL="http://"+ip_config+"/api/TraitementCongesACEP";
          
        var headers={
          'Accept':'application/json' , 
          'Content-Type':'application/json' ,
        }
    
        fetch(InsertAPIURL,
          {
            method:'POST' , 
            headers:headers , 
            body: JSON.stringify(
              {"id_conge": route.params.id_conge }) 
          }
          )
          .then((response) => response.json())
          .then((json) => settraitementACEP(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
        };
    const getTraitement = () => {
        var InsertAPIURL="http://"+ip_config+"/api/TraitementConges";
          
        var headers={
          'Accept':'application/json' , 
          'Content-Type':'application/json' ,
        }
    
        fetch(InsertAPIURL,
          {
            method:'POST' , 
            headers:headers , 
            body: JSON.stringify(
              {"id_employe": route.params.id_employe }) 
          }
          )
          .then((response) => response.json())
          .then((json) => settraitement(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
        };
        useEffect(() => {
            setLoading(true);
            getTraitement();
            getTraitementACEP();
        }, []);

        let enCours = [];
        traitement.map((item) => {
            enCours.push({
                time: '', 
                title: 'En Cours' , 
                description: item.nom.toUpperCase()+" "+item.prenom.toUpperCase()
              })
        });
        traitementACEP.map((item) => {
            let etat = "" ; 
            if(item.etat == 0){
                etat = 'Accepter' ; 
            }
            else{
                etat = 'Refuser' ; 
            }
            enCours.push({
                time: item.updated_at , 
                title: etat , 
                description: item.nom.toUpperCase()+" "+item.prenom.toUpperCase()
              })
        });

    const AccepterConges = () => {
        var InsertAPIURL="http://"+ip_config+"/api/AccepterCongesAdmin";
        
        var headers={
          'Accept':'application/json' , 
          'Content-Type':'application/json' ,
        }
  
        fetch(InsertAPIURL,
          {
            method:'post' , 
            headers:headers , 
            body: JSON.stringify({"id_conge": id_conge ,"id_responsable": id }) ,
          }
          )
          .then((res)=>res.json())
          .then((resData)=>
            {
              if(resData[0].code == "201"){
                setetat(1)
              }  
              setLoading(true);
              getTraitement();
              getTraitementACEP();
              return Alert.alert(resData[0].message); 
            })
          .catch((error)=>{
              return Alert.alert("Error "+error); 
          });
    }
    const RefuserConges = () => {
        var InsertAPIURL="http://"+ip_config+"/api/RefuserCongesAdmin";
        
        var headers={
          'Accept':'application/json' , 
          'Content-Type':'application/json' ,
        }
  
        fetch(InsertAPIURL,
          {
            method:'post' , 
            headers:headers , 
            body: JSON.stringify({"id_conge": id_conge ,"id_responsable": id }) ,
          }
          )
          .then((res)=>res.json())
          .then((resData)=>
            {
                if(resData[0].code == "201"){
                    setetat(2)
                }
              setLoading(true);
              getTraitement();
              getTraitementACEP();
              return Alert.alert(resData[0].message); 
            })
          .catch((error)=>{
              return Alert.alert("Error "+error); 
          });
    }

    return (
      <View style={styles.container}> 
        <View>
            <Text style={styles.fullname}>{name.toUpperCase()} {prenom.toUpperCase()}</Text>
            <View style={styles.blocs}>
            <TouchableOpacity style={styles.btn1} onPress={()=>AccepterConges()}><Text style={styles.text1}><Ionicons name="md-checkmark-circle-sharp" size={20} color={'#fff'} /> Accepter</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btn2} onPress={()=>RefuserConges()}><Text style={styles.text1}><Ionicons name="md-close-circle-sharp" size={20} color={'#fff'} /> Refuser</Text></TouchableOpacity>
            </View>
            <Text style={styles.ff}>Etat de conge : {etatconge()}</Text>
        </View>
        <Timeline
        circleSize={20}
        separator={true}
        circleColor='blue'
        lineColor='gray'
        timeStyle={styles.time}
        descriptionStyle={styles.description}
        style={styles.list}
        data={enCours}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
	backgroundColor:'white'
  },
  ff:{
    color: 'black' , 
    marginTop : 10 
  },
  teext1:{
    color: '#6D706C' , 
    fontWeight:'bold'
  },
  teext2:{
    color: '#18B52F' , 
    fontWeight:'bold'
  },
  teext3:{
    color: '#F33A0D' , 
    fontWeight:'bold'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
  btn1 : {
    backgroundColor: '#2FCF0A' , 
    padding : 7 , 
    width :  114 
  },
  btn2 : {
    backgroundColor: '#F02626' , 
    padding : 7 , 
    width :  114 
  },
  blocs: { 
   flexDirection : 'row' ,  
   justifyContent : 'space-evenly',
  },
  text1 : {
    color: '#fff' , 
    fontSize : 18 , 
    fontWeight : 'bold'  
  },
  fullname: {
    marginLeft : 29 , 
    marginBottom : 10 , 
    fontSize : 20 , 
    color : '#007acc' , 
  },
  time: {
    textAlign: 'center',
    backgroundColor:'gray',
    width: 90 , 
    marginTop : 22 , 
    fontSize: 12,
    color:'white', 
    padding:5, 
    borderRadius:13, 
    overflow: 'hidden'
  },
  description: {
    color: 'gray'
  }
});