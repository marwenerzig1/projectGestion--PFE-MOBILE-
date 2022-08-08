import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React , {useState , useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';

import {useSelector , useDispatch} from 'react-redux'; 
import Button from '../../component/Button';
import Input2 from '../../component/Input2';
import Loader from '../../component/Loader';

export default function ModifierGroupe() {
  const navigation = useNavigation();
  const route = useRoute() ;
  const {ip_config} = useSelector(state => state.userReducer); 
  const [message, setmessage] = useState(null);
  const [inputs, setInputs] = React.useState({
    id_groupe : route.params.tab[0].toString() ,
    nom_projet : route.params.tab[1] ,
    description : route.params.tab[2] ,
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const changeMessage = (val) => {
    setmessage(val) ; 
  }
  

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.nom_projet) {
      handleError('Please input nom projet', 'nom_projet');
      isValid = false;
    }
    if (!inputs.description) {
      handleError('Please input description de projet', 'description');
      isValid = false;
    }


    if (isValid) {
      register();
    }
  };

  const register = () => {
     var InsertAPIURL="http://"+ip_config+"/api/ModifierGroupe";
      
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
            "id_groupe":inputs.id_groupe , 
            "nom_projet":inputs.nom_projet ,
            "description":inputs.description
          }) 
        }
        )
        .then((response)=>response.json())
        .then((resData) =>{
          if (JSON.stringify(resData[0]['code']).toString() === '"201"' ) {
             setLoading(true);
             setTimeout(async () => {
              setLoading(false);
              navigation.goBack() ; 
              Alert.alert(JSON.stringify(resData[0]['message']).toString()) ;
            },500);
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
          Modifier groupe
        </Text>
        <Text style={{color: 'grey', fontSize: 18, marginVertical: 10}}>
        Modifier vos coordonnées 
        </Text>
        <Text style={{color:'red',fontSize: 14 ,fontWeight:'500'}}>{message}</Text>
        <View style={{marginVertical: 20}}>

        <Input2
            onChangeText={text => handleOnchange(text, 'nom_projet')}
            onFocus={() => handleError(null, 'nom_projet')}
            iconName="account-outline"
            value={inputs.nom_projet}
            label="Nom Projet"
            placeholder="Entre nom de projet "
            error={errors.nom_projet}
          />

        <Input2
            onChangeText={text => handleOnchange(text, 'description')}
            onFocus={() => handleError(null, 'description')}
            iconName="account-outline"
            value={inputs.description}
            label="Description"
            placeholder="Entre description de projet "
            error={errors.description}
          />

          <Button title="Modifier" onPress={validate} />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};