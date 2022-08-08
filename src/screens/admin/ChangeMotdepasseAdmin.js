import { useNavigation } from '@react-navigation/native';
import {useSelector , useDispatch} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import React , {useState , useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

 

import Button from '../../component/Button';
import Input2 from '../../component/Input2';
import Loader from '../../component/Loader';

export default function ChangeMotdepasseAdmin() {
  useFocusEffect(
    React.useCallback(() => {
      setLoading(false);
    }, [])
  );


  const navigation = useNavigation();
  const {id,ip_config} = useSelector(state => state.userReducer);  
  const [inputs, setInputs] = React.useState({"password":"","nouveau_password":"","confirmation_password":""});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [message, setmessage] = React.useState('');
  

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }
    if (!inputs.nouveau_password) {
      handleError('Please input nouveau password', 'nouveau_password');
      isValid = false;
    } else if (inputs.nouveau_password.length < 5) {
      handleError('Min password length of 5', 'nouveau_password');
      isValid = false;
    }
    if (!inputs.confirmation_password) {
      handleError('Please input confirmation password', 'confirmation_password');
      isValid = false;
    } else if (inputs.confirmation_password.length < 5) {
      handleError('Min password length of 5', 'confirmation_password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
     var InsertAPIURL="http://"+ip_config+"/api/ModifierAdminPassword";
      
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
              "id":id , 
              "password":inputs.password ,
              "nouveau_password":inputs.nouveau_password ,
              "confirmation_password":inputs.confirmation_password ,
            }) 
        }
        )
        .then((response)=>response.json())
        .then((resData) =>{
          if (resData[0]['code']=== "201" ) {
             setLoading(true);
             setmessage(''); 
             handleOnchange('','password')
             handleOnchange('','nouveau_password')
             handleOnchange('','confirmation_password')
             setTimeout(async () => {
              setLoading(false);
              Alert.alert(resData[0]['message']) ;
            },1000);
         }
         else {
             return setmessage(resData[0]['message']) ;
         }
        })
        .catch((error) => console.error(error))

            
          
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Loader visible={loading} />
        <View style={styles.boxs}> 
            <TouchableOpacity style={styles.box} onPress={()=>navigation.goBack()}>
                <Text style={styles.text}>Modifier Compte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box1}>
                <Text style={styles.text1}>Change Mot de Passe</Text>
            </TouchableOpacity>
        </View> 
        <Text style={{color:'red' , marginLeft:14 , }} >{message}</Text>
        <ScrollView
        contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={{marginVertical: 6}}>
          <Input2
           onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            value={inputs.password}
            label="Ancien Mot de passe"
            placeholder="Entre Mot de passe"
            error={errors.password}
            password
          />
          <Input2
           onChangeText={text => handleOnchange(text, 'nouveau_password')}
            onFocus={() => handleError(null, 'nouveau_password')}
            iconName="lock-outline"
            value={inputs.nouveau_password}
            label="Nouveau Mot de passe"
            placeholder="Entre Mot de passe"
            error={errors.nouveau_password}
            password
          />
          <Input2
           onChangeText={text => handleOnchange(text, 'confirmation_password')}
            onFocus={() => handleError(null, 'confirmation_password')}
            iconName="lock-outline"
            value={inputs.confirmation_password}
            label="Confirmation Mot de passe"
            placeholder="Entre Mot de passe"
            error={errors.confirmation_password}
            password
          />
          <Button title="Modifier" onPress={validate} />

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center' , 
    alignItems : 'center' , 
  },
  text: {
    color: '#007acc' , 
    fontSize: 14 , 
    textAlign:'center' , 
    marginTop: 6
  },
  text1: {
    color: '#fff' , 
    fontSize: 14 , 
    textAlign:'center' , 
    marginTop: 6
  },
  box: {
    borderWidth: 1,
    borderColor: '#007acc' ,
    width: 140 ,
    height: 40 
  },
  box1: {
    borderWidth: 1,
    borderColor: '#007acc' ,
    backgroundColor : '#007acc' , 
    width: 180 ,
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