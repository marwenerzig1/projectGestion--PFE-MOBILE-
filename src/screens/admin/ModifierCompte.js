import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import {useSelector , useDispatch} from 'react-redux'; 
import { LogBox } from 'react-native';
import React , {useState , useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';

 

import Button from '../../component/Button';
import Input2 from '../../component/Input2';
import Loader from '../../component/Loader';

export default function ModifierCompte() {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, [])

  const navigation = useNavigation();
  const route = useRoute() ;
  const {ip_config} = useSelector(state => state.userReducer);  
  const [message, setmessage] = useState(null);
  const [date, setDate] = useState(route.params.tab[6]);
  const [inputs, setInputs] = React.useState({
    id: route.params.tab[0].toString(),
    nom : route.params.tab[1] , 
    prenom : route.params.tab[2] , 
    cin : route.params.tab[3].toString() , 
    telephone : route.params.tab[4].toString() , 
    adresse : route.params.tab[5] , 
    status : route.params.tab[7] , 
    solde_conge : route.params.tab[8].toString() ,
    salaire : route.params.tab[9].toString() ,
    etat : route.params.tab[10].toString() ,
    login : route.params.tab[11] ,
    password : route.params.tab[12] 
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const changeMessage = (val) => {
    setmessage(val) ; 
  }
  

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
    if (!inputs.adresse) {
      handleError('Please input adresse', 'adresse');
      isValid = false;
    }
    if (!inputs.status) {
      handleError('Please input status', 'status');
      isValid = false;
    }
    if (!inputs.solde_conge) {
      handleError('Please input solde conge', 'solde_conge');
      isValid = false;
    }
    if (!inputs.salaire) {
      handleError('Please input salaire', 'salaire');
      isValid = false;
    }

    if (!inputs.cin) {
      handleError('Please input cin', 'cin');
      isValid = false;
    }
    if (!inputs.telephone) {
      handleError('Please input phone number', 'telephone');
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
     /* try {
        setLoading(false);
        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('LoginScreen');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }*/
      //Alert.alert(inputs.nom)
      //----------------------------
     var InsertAPIURL="http://"+ip_config+"/api/ModifierPersonne";
      
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
              "cin":inputs.cin ,
              "telephone":inputs.telephone , 
              "adresse":inputs.adresse ,
              "date_de_naissance":date ,
              "status":inputs.status ,
              "solde_conge":inputs.solde_conge ,
              "salaire":inputs.salaire ,
              "etat":inputs.etat ,
              "login":inputs.login ,
              "password":inputs.password  }) 
        }
        )
        .then((response)=>response.json())
        .then((resData) =>{
          if (JSON.stringify(resData[0]['code']).toString() === '"201"' ) {
             setLoading(true);
             setTimeout(async () => {
              setLoading(false);
              navigation.navigate('EmployeAdmin') ; 
              Alert.alert(JSON.stringify(resData[0]['message']).toString()) ;
            },2000);
         }
         else {
             Alert.alert(JSON.stringify(resData[0]['message']).toString()) ; 
             return changeMessage(JSON.stringify(resData[0]['message']).toString()) ;
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
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold'}}>
          Modifer Compte
        </Text>
        <Text style={{color: 'grey', fontSize: 18, marginVertical: 10}}>
        Modifiez vos coordonnées pour modifier un compte
        </Text>
        <Text style={{color:'red',fontSize: 14 ,fontWeight:'500'}}>{message}</Text>
        <View style={{marginVertical: 20}}>

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
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'cin')}
            onFocus={() => handleError(null, 'cin')}
            iconName="account-outline"
            value={inputs.cin}
            label="CIN"
            placeholder="Entre CIN"
            error={errors.cin}
          />

            <Input2
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'telephone')}
            onFocus={() => handleError(null, 'telephone')}
            iconName="phone-outline"
            value={inputs.telephone}
            label="Numéro de téléphone"
            placeholder="Entre Numero telephone"
            error={errors.telephone}
          />

            <Input2
            onChangeText={text => handleOnchange(text, 'adresse')}
            onFocus={() => handleError(null, 'adresse')}
            iconName="account-outline"
            value={inputs.adresse}
            label="Adresse"
            placeholder="Entre Adresse "
            error={errors.adresse}
          />

          <Text style={{color:"grey" ,marginBottom: 5}} >date de naissance</Text>
          <DatePicker
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-MM-DD"
          maxDate="01-01-2007"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />

          <Input2
            onChangeText={text => handleOnchange(text, 'status')}
            onFocus={() => handleError(null, 'status')}
            iconName="account-outline"
            value={inputs.status}
            label="Status"
            placeholder="Entre Status "
            error={errors.status}
          />

          <Input2
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'solde_conge')}
            onFocus={() => handleError(null, 'solde_conge')}
            iconName="account-outline"
            value={inputs.solde_conge}
            label="solde_conge"
            placeholder="Entre solde conge"
            error={errors.solde_conge}
          />

          <Input2
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'salaire')}
            onFocus={() => handleError(null, 'salaire')}
            iconName="account-outline"
            value={inputs.salaire}
            label="salaire"
            placeholder="Entre salaire"
            error={errors.salaire}
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
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            value={inputs.password}
            label="Mot de passe"
            placeholder="Entre Mot de passe"
            error={errors.password}
            password
          />
          <Button title="Modifier" onPress={validate} />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
