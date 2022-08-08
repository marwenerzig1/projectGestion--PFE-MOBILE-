import React , {useState , useEffect}   from 'react' ; 
import { StyleSheet, Text, View , TouchableWithoutFeedback , Keyboard , Alert} from 'react-native';
import FilledButton from '../component/FilledButton';
import Heading from '../component/Heading';
import Input from '../component/Input';
import {useSelector , useDispatch} from 'react-redux'; 
import { setId , setName , setPrenom , setEtat_RH } from '../component/Redux/actions';
import * as Notifications from 'expo-notifications'; 


export default function LoginScreen({navigation}) {

  const [login, setLogin] = useState(null);
  const [password, setpassword] = useState(null);
  const [message, setmessage] = useState(null);
  const [token , getToken] = useState('') ; 
  const [reponse , setreponse] = useState('') ; 

  const {ip_config}=useSelector(state => state.userReducer) ; 
  const dispatch = useDispatch() ; 


  useEffect(()=> {
    async function configurePushNotifications() {
        const {status} = await Notifications.getPermissionsAsync();
        let finalStatus = status;
        
        if(finalStatus !== 'granted'){
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status ; 
        }

        if(finalStatus !== 'granted'){
            Alert.alert('Permission required','Push notifications need the approprite permissions.');
            return ; 
        };
        
        const pushTokenData = await Notifications.getExpoPushTokenAsync();
        console.log(pushTokenData.data) ; 
        getToken(pushTokenData.data) ; 
        
        if (Platform.OS === 'android'){
            Notifications.setNotificationChanneAsync('default', {
                name: 'default' , 
                importance: Notifications.AndroidImportance.DEFAULT
            });
        }
    }  
        console.disableYellowBox = true;
        configurePushNotifications();

} , []) ; 

const sendToken = (role) => {
  var InsertAPIURL="http://"+ip_config+"/api/sendToken";
    
  var headers={
    'Accept':'application/json' , 
    'Content-Type':'application/json' ,
  }

  fetch(InsertAPIURL,
    {
      method:'POST' , 
      headers:headers , 
      body: JSON.stringify({ "token" : token , "role" : role }) ,
    }
    )
    .then((response) => response.json())
    .then((json) => {setreponse(json)})
    .catch((error) => console.error(error))
    .finally();
  };

  const submitHandler = async() => {
    if ( (login != null ) && (password != null ) ) {
      var InsertAPIURL="http://"+ip_config+"/api/connexion";
      
      var headers={
        'Accept':'application/json' , 
        'Content-Type':'application/json' ,
      }

      await fetch(InsertAPIURL,
        {
          method:'POST' , 
          headers:headers , 
          body: JSON.stringify({"login":login,"password":password}) ,
        }
        )
        .then((res)=>res.json())
        .then((resData)=>
          {
            if (resData.message != null) {
              return changeMessage(resData.message) ;
            } else {
              //return navigation.navigate('DrawerEmploye') ;
              var nom = JSON.stringify(resData[0]['nom']).toString() ;
              dispatch(setId(resData[0]['id'])) ; 
              dispatch(setName(resData[0]['nom'])) ; 
              dispatch(setPrenom(resData[0]['prenom'])) ; 
              //return Alert.alert(fonction) ; 
              if(nom == '"admin"'){
                sendToken(0);
                dispatch(setEtat_RH(0)) ; 
                return navigation.navigate('DrawerAdmin',{id_responsable: resData[0]['id']
                , status: "ADMINISTRATEUR" }) ;
              }
              var etat = JSON.stringify(resData[0]['etat']).toString() ;
              //return Alert.alert(etat) ;
              if (etat == '0'){
                sendToken(2);
                dispatch(setEtat_RH(2)) ;
                return navigation.navigate('DrawerEmploye',{id_responsable: resData[0]['id']
                , nom: resData[0]['nom'] , prenom: resData[0]['prenom'] , status: "EMPLOYE" }) ;
              } 
              else if (etat == '1'){
                sendToken(2);
                dispatch(setEtat_RH(2)) ;
                return navigation.navigate('DrawerResponsable',{id_responsable: resData[0]['id']
                , nom: resData[0]['nom'] , prenom: resData[0]['prenom'] , status: "RESPONSABLE" }) ;
              }
              else if (etat == '3'){
                sendToken(1); 
                dispatch(setEtat_RH(1)) ; 
                return navigation.navigate('DrawerResponsableRH',{id_responsable: resData[0]['id']
                , nom: resData[0]['nom'] , prenom: resData[0]['prenom'] , status: "RESPONSABLE RH" }) ;
              }
            } 
          })
        .catch((error)=>{
            return Alert.alert("Error "+error); 
        })
    } 
    else {
        return changeMessage("champ invalid ! ") ; 
    }
  }

  const changeLogin = (val) => {
    setLogin(val) ; 
  }
  const changeMessage = (val) => {
    setmessage(val) ; 
  }
  const changePassword = (val) => {
    setpassword(val) ; 
  }

  return (
    <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss() ; 
      console.log('Keybord dismiss') ; 
    }}>
    <View style={styles.container}>
      <Heading style={styles.title}>S'identifier</Heading>
      <Text style={styles.message}>{message}</Text>
      <Input style={styles.input}  onChangeText={changeLogin} placeholder={'Email'} keyboardType={'email-address'} />
      <Input style={styles.input2} onChangeText={changePassword} placeholder={'Mot de passe'} secureTextEntry />
      <FilledButton title={'Connexion'} onPress={submitHandler}/>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1 , 
    paddingTop: 90 , 
    padding : 20 ,   
    alignItems:'center', 
  }, 
  message: {
    color:'red' , 
    fontSize: 14 , 
    fontWeight:'500' , 
  },
  title: {
    marginBottom: 16 , 
  },
  input: {
      marginVertical: 20 , 
      fontSize:15,
  },
  input2 :{
    marginTop: 2 ,
    fontSize:15, 
  }

});
