import React, { useState , useEffect } from 'react'
import DatePicker from 'react-native-datepicker';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import {useSelector} from 'react-redux'; 
import * as Notifications from 'expo-notifications'; 
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';

import Input2 from '../../component/Input2';
import Button from '../../component/Button';


Notifications.setNotificationHandler({
  handleNotification: async () => {
      return {
          shouldPlaySound : false , 
          shouldSetBadge : false , 
          shouldShowAlert : true 
      };
  }
}); 


export default function DemanderConge() { 

    useFocusEffect(
      React.useCallback(() => {
        setCause('');
        setDate_debut('');
        setDate_fin('');
        setErrors('');
        setErrors_dateDebut('');
        setErrors_dateFin('');
      }, [])
    );

    const {ip_config,name,prenom,id} = useSelector(state => state.userReducer); 
    const navigation = useNavigation();
    const [errors, setErrors] = React.useState('');
    const [cause,setCause] = React.useState('');
    const [date_debut,setDate_debut] = React.useState('');
    const [date_fin,setDate_fin] = React.useState('');
    const [errors_dateDebut, setErrors_dateDebut] = React.useState('');
    const [errors_dateFin, setErrors_dateFin] = React.useState('');
    const [token , setToken] = useState();
    const [isLoading, setLoading] = useState(false);
    

    const getToken = () => {
      fetch("http://"+ip_config+"/api/getTokenConge")
        .then((response) => response.json())
        .then((json) => {setToken(json)})
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      };
      useEffect(()=> {
        getToken() ; 
        console.log(token);
        setLoading(false) ; 
    } , []) ; 
  
  
    function sendPushNotificationHandler() {
          const tokens = affichage() ; 
          console.log(tokens); 
          fetch('https://exp.host/--/api/v2/push/send', {
              method: 'POST' , 
              headers: {
                  'content-type' : 'application/json'
              } ,
              body : JSON.stringify(tokens)
          }); 
          console.log("ok");
      }
  
      function affichage () {
          const tokens = []; 
          if(token != null ){
              token.map((item) => {
                  tokens.push({
                      to : item.token , 
                      title : 'Demander d un congé ! ' , 
                      body: name.toUpperCase() + ' ' + prenom.toUpperCase() + ' demande un congé'
                  });
              })
          }
          return tokens ;  
      }


      const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        var date1 = new Date(date_debut);
        var date2 = new Date(date_fin);
        var date3 = new Date(); 

        if (!cause) {
          handleError('Please input cause', 'cause');
          isValid = false;
        }
        if (!date_debut) {
          setErrors_dateDebut('Please input date debut')
          isValid = false;
        }
        else{
          setErrors_dateDebut('')
        }
        if (!date_fin) {
          setErrors_dateFin('Please input date fin')
          isValid = false;
        }
        else{
          setErrors_dateFin('')  
        }
        if ( date1 > date2 ) {
            setErrors_dateDebut('invalid Date Debut > Date Fin');
            isValid = false;
          }
        if ( date1 <= date3){ 
            setErrors_dateDebut('invalid date');
            isValid = false;
        }
        if (isValid) {
          register();
        }
      };
    
      const register = () => {
        var InsertAPIURL="http://"+ip_config+"/api/AjouterDemanderConge";
      
        var headers={
          'Accept':'application/json' , 
          'Content-Type':'application/json' ,
        }
  
        fetch(InsertAPIURL,
          {
            method:'POST' , 
            headers:headers , 
            body: JSON.stringify(
              {
              "id_employe":id ,
              "date_debut":date_debut,
              "date_fin":date_fin ,
              "cause":cause 
             }) 
          }
          )
          .then((response)=>response.json())
          .then((resData) =>{
            if (JSON.stringify(resData[0]['code']).toString() === '"201"' ) {
                sendPushNotificationHandler(); 
                Alert.alert('Valide','Votre demande de Congé Enregistre avec succes') ;
                setErrors_dateDebut('');
                setErrors_dateFin('');
                setDate_debut(''); 
                setDate_fin(''); 
                setCause('');
                setErrors('');
           }
           else if (JSON.stringify(resData[0]['code']).toString() === '"401"' ) {
                setErrors_dateDebut(resData[0]['message']) ;
                setErrors_dateFin(resData[0]['message']) ;
           }
           else{
                return Alert.alert(JSON.stringify(resData[0]['message']).toString()) ;
           }
          })
          .catch((error) => console.error(error))   
        
      };

    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
      };

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}} onPress={()=>Keyboard.dismiss()}>
        <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold',marginTop:20,marginLeft:15 }}>
            Demande d'un congé
          </Text>

        <View style={{marginLeft:20 , marginTop:15}}>
          <Text style={{color:"grey" ,marginBottom: 5}} >Date de début</Text>
          <DatePicker 
            date={date_debut} 
            placeholder="select date"
            format="YYYY-MM-DD"
            onDateChange={date => setDate_debut(date)} 
            onFocus={() => handleError(null, 'date_debut')}
            error={errors.date_debut}
          />
          <Text style={{color:'red' , fontSize:13}}>{errors_dateDebut}</Text>
         <Text style={{color:"grey" ,marginBottom: 5}} >Date de fin</Text>
        <DatePicker 
            date={date_fin} 
            placeholder="select date"
            format="YYYY-MM-DD"
            onDateChange={date => setDate_fin(date)} 
            onFocus={() => handleError(null, 'date_fin')}
            error={errors.date_fin}
        />
        <Text style={{color:'red' , fontSize:13}}>{errors_dateFin}</Text>
        <View  style={{width:310}}>
        <Input2
            onChangeText={text => setCause(text)}
            iconName="account-outline"
            value={cause}
            label="Cause"
            placeholder="Entrer le cause"
            onFocus={() => handleError(null, 'cause')}
            error={errors.cause}
          />
        </View>
          <Text style={{color:'red',fontSize: 14 ,fontWeight:'500'}}></Text>
        </View>
        <View style={{width:'50%',marginLeft:85,marginTop:-20}}>
              <Button title="Ajouter" onPress={validate} />
        </View>
      </SafeAreaView>
      </TouchableWithoutFeedback>
    );

}