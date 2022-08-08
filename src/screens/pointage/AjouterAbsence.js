import React, { useState , useEffect } from 'react'
import DatePicker from 'react-native-datepicker';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux'; 
import { LogBox } from 'react-native';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';

import Button from '../../component/Button';
import Loader from '../../component/Loader';

export default function AjouterAbsence() {
    const [date, setDate] = useState(new Date()) ; 
    const {ip_config,id} = useSelector(state => state.userReducer); 
    const [message, setmessage] = useState(null);
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []); 

    const register = () => {
        var InsertAPIURL="http://"+ip_config+"/api/AddAbsence";
         
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
               "id_employe": id ,
               "date":date }) 
           }
           )
           .then((response)=>response.json())
           .then((resData) =>{
             if (JSON.stringify(resData[0]['code']).toString() === '"201"' ) {
                setLoading(true);
                setTimeout(async () => {
                 setLoading(false);
                 navigation.navigate('Absence') ; 
                 Alert.alert(JSON.stringify(resData[0]['message']).toString()) ;
               },2000);
            }
            else {
                return setmessage(resData[0]['message']) ;
            }
           })
           .catch((error) => console.error(error))      
     };
   

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold',marginTop:10,marginLeft:5 }}>
          Ajouter Absence
        </Text>
      <Loader visible={loading} />
      <View style={{marginLeft:20 , marginTop:15}}>
      <Text style={{color: 'black', fontSize: 20}}> Date : </Text>
        <DatePicker 
            date={date} 
            placeholder="select date"
            format="YYYY-MM-DD"
            onDateChange={setDate} 
            />
        <Text style={{color:'red',fontSize: 14 ,fontWeight:'500'}}>{message}</Text>
      </View>
      <View style={{width:'50%',marginLeft:85,marginTop:20}}>
            <Button title="Ajouter" onPress={register} />
      </View>
    </SafeAreaView>
  );
};