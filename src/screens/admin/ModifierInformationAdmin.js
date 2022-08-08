import { useNavigation } from '@react-navigation/native';
import {useSelector , useDispatch} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import {setName , setPrenom } from '../../component/Redux/actions';
import React , {useEffect} from 'react';
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

export default function ModifierInformationAdmin() {
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getEmploye();
      //return () => unsubscribe();
    }, [])
  );


  const navigation = useNavigation();
  const {id,ip_config} = useSelector(state => state.userReducer);  
  const [inputs, setInputs] = React.useState([]);
  const dispatch = useDispatch() ; 
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [message, setmessage] = React.useState('');

  const getEmploye = () => {
    var InsertAPIURL="http://"+ip_config+"/api/getAdminModifier";
      
    var headers={
      'Accept':'application/json' , 
      'Content-Type':'application/json' ,
    }

    fetch(InsertAPIURL,
      {
        method:'POST' , 
        headers:headers , 
        body: JSON.stringify(
          {"id_admin": id }) 
      }
      )
      .then((response) => response.json())
      .then((json) => setInputs(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getEmploye();
    }, []);
  

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.login) {
      handleError('Please input email', 'login');
      isValid = false;
    } else if (!inputs.login.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'login');
      isValid = false;
    }

    if (!inputs.nom) {
      handleError('Please input nom', 'nom');
      isValid = false;
    }
    if (!inputs.prenom) {
      handleError('Please input prenom', 'prenom');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
     var InsertAPIURL="http://"+ip_config+"/api/ModifierAdminInfo";
      
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
              "id":inputs.id , 
              "nom":inputs.nom ,
              "prenom":inputs.prenom,
              "login":inputs.login ,
              "password":password  }) 
        }
        )
        .then((response)=>response.json())
        .then((resData) =>{
          if (resData[0]['code'] === "201" ) {
             setLoading(true);
             dispatch(setName(inputs.nom)) ; 
             dispatch(setPrenom(inputs.prenom)) ; 
             setmessage(''); 
             setPassword('');
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
            <TouchableOpacity style={styles.box1} >
                <Text style={styles.text1}>Modifier Compte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('ChangeMotdepasseAdmin')}>
                <Text style={styles.text}>Change Mot de Passe</Text>
            </TouchableOpacity>
        </View> 
        <Text style={{color:'red' , marginLeft:14  }} >{message}</Text>
        <ScrollView
        contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={{marginVertical: 6}}>
        <Input2
            onChangeText={text => handleOnchange(text, 'nom')}
            onFocus={() => handleError(null, 'nom')}
            iconName="account-outline"
            value={inputs.nom}
            label="Nom"
            placeholder="Entre nom "
            error={errors.nom}
          />

        <Input2
            onChangeText={text => handleOnchange(text, 'prenom')}
            onFocus={() => handleError(null, 'prenom')}
            iconName="account-outline"
            value={inputs.prenom}
            label="Prenom"
            placeholder="Entre prenom "
            error={errors.prenom}
          />

        <Input2
            onChangeText={text => handleOnchange(text, 'login')}
            onFocus={() => handleError(null, 'login')}
            iconName="email-outline"
            value={inputs.login}
            label="Email"
            placeholder="Entre email "
            error={errors.login}
          />


        <Input2
            onChangeText={text => setPassword(text)}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            value={password}
            label="Mot de passe"
            placeholder="Entre Mot de passe"
            error={errors.password}
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
    width: 180 ,
    height: 40 
  },
  box1: {
    borderWidth: 1,
    borderColor: '#007acc' ,
    backgroundColor : '#007acc' , 
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