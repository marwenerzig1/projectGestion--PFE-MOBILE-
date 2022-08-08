import { useNavigation } from '@react-navigation/native';
import {useSelector , useDispatch} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import React , {useEffect , useState} from 'react';
import { IconButton, Colors } from 'react-native-paper';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import {
  View, 
  Text, 
  SafeAreaView, 
  Keyboard, 
  Switch, 
  ScrollView, 
  Alert, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

 

import Button from '../../component/Button';
import Input2 from '../../component/Input2';
import Loader from '../../component/Loader';

export default function ConfigurationPointage() {
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getConfigurationPointage();
      //return () => unsubscribe();
    }, [])
  );

  const {id,ip_config} = useSelector(state => state.userReducer);  
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [lantitudeSociete, setlantitudeSociete] = React.useState('');
  const [longitudeSociete, setlongitudeSociete] = React.useState('');
  const [errorMsg, setErrorMsg] = useState(0);
  const [distanceInKM, setdistanceInKM] = React.useState('');
  const [temps_denvoi, settemps_denvoi] = React.useState('');
  const [idd, setidd] = React.useState(0);
  const [modePointage , setmodePointage] = useState(false); 
  const toggleSwitch = () => setmodePointage(previousState => !previousState);
  

  const getConfigurationPointage = () => {
    fetch("http://"+ip_config+"/api/getConfigurationPointage")
      .then((response) => response.json())
      .then((json) => { 
                        if(json[0]['etat'] == 0 ){
                            setmodePointage(false);
                        }
                        else{
                            setmodePointage(true);
                        }
                        setlantitudeSociete(json[0]['lantitudeSociete']);
                        setlongitudeSociete(json[0]['longitudeSociete']);
                        setdistanceInKM(json[0]['distanceInKM']);
                        settemps_denvoi(json[0]['temps_denvoi']);
                        setidd(json[0]['id']);
                     })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };

    useEffect(() => {
        setLoading(true);
        getConfigurationPointage(); 
    }, []);
  
    async function getLocation() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
			setErrorMsg(
			  'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
			);
            Alert.alert('',errorMsg);
			return;
		  } 
		  let { status } = await Location.requestForegroundPermissionsAsync();
		  if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			return;
		  }
	
		  let location = await Location.getCurrentPositionAsync();
		  setlantitudeSociete(location.coords.latitude); 
		  setlongitudeSociete(location.coords.longitude); 
          return Alert.alert('','get Location avec succes ! ') ; 
    }



  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!lantitudeSociete) {
      handleError('Please input lantitudeSociete', 'lantitudeSociete');
      isValid = false;
    }
    if (!longitudeSociete) {
      handleError('Please input longitudeSociete', 'longitudeSociete');
      isValid = false;
    }
    if (!distanceInKM) {
      handleError('Please input distanceInKM', 'distanceInKM');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    var InsertAPIURL="http://"+ip_config+"/api/ModifierConfigurationPointage";
      
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
            "lantitudeSociete": lantitudeSociete, 
            "longitudeSociete": longitudeSociete ,
            "distanceInKM": distanceInKM,
            "temps_denvoi": temps_denvoi ,
            "etat": modePointage , 
            "id": idd
          }) 
      }
      )
      .then((response)=>response.json())
      .then((resData) =>{
        if (resData[0]['code'] === "201" ) {
           setLoading(true);
           setTimeout(async () => {
            setLoading(false);
            Alert.alert(resData[0]['message']) ;
          },1000);
       }
       else { 
           return Alert.alert(resData[0]['message']) ;
       }
      })
      .catch((error) => console.error(error))   
  };

  const handleOnchange1 = (text, input) => {
    setlantitudeSociete(text);
  };
  const handleOnchange2 = (text, input) => {
    setlongitudeSociete(text);
  };
  const handleOnchange3 = (text, input) => {
    setdistanceInKM(text);
  };
  const handleOnchange4 = (text, input) => {
    settemps_denvoi(text);
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Loader visible={loading} />
        <ScrollView
        contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={styles.inputs}>
        <View style={styles.bloc}>
            <Text style={{fontSize: 18 , fontWeight : 'bold' }}>Mode Work Zone</Text>
            <Switch
                trackColor={{ false : "#D80808", true : "#1AB515" }}
                thumbColor={modePointage ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={modePointage}
                style={{ transform:[{ scaleX: 2 }, { scaleY: 2 }]  }}
            />
        </View>

        <View style={styles.lesinputs} >
          <Input2
            keyboardType="numeric"
            onChangeText={text => handleOnchange1(parseFloat(text), 'lantitudeSociete')}
            onFocus={() => handleError(null, 'lantitudeSociete')}
            iconName="map"
            value={lantitudeSociete.toString()}
            label="Altitude du societe"
            placeholder="Entre lantitudeSociete"
            error={errors.lantitudeSociete}
          />
        <Input2
            onChangeText={text => handleOnchange2(text, 'longitudeSociete')}
            onFocus={() => handleError(null, 'longitudeSociete')}
            iconName="map"
            value={longitudeSociete.toString()}
            label="Longitude du Societe"
            placeholder="Entre longitudeSociete "
            error={errors.longitudeSociete}
          />
        <Input2
            onChangeText={text => handleOnchange3(text, 'distanceInKM')}
            onFocus={() => handleError(null, 'distanceInKM')}
            iconName="marker"
            value={distanceInKM.toString()}
            label="Distance en KM"
            placeholder="Entre distanceInKM "
            error={errors.distanceInKM}
          />
        <Input2
            onChangeText={text => handleOnchange4(text, 'temps_denvoi')}
            onFocus={() => handleError(null, 'temps_denvoi')}
            iconName="clock"
            value={temps_denvoi.toString()}
            label="Temps d'envoi"
            placeholder="Entre distanceInKM "
            error={errors.temps_denvoi}
          />

        <View style={{ position:'relative' , top: -100 }} >
        <IconButton
          icon= "marker"
          color={Colors.white}
          size={33}
          style={{
            backgroundColor: '#007acc' , 
            position:'relative' , 
            left: 220 ,
            top: -270 
          }}
          onPress={()=>{getLocation();}}
        />
        <Text style={{color:"red" , position:'relative' , top: -260 , left : 170  }}>Plus info : installez dans votre locale puis cliquez sur le bouton (collectez votre emplacement actuel)</Text>
        </View>
        </View>
        </View>
        <View style={{ marginTop : -160 }} >
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
  bloc:{
    flexDirection:'row',  
    justifyContent: 'space-evenly' , 
    alignItems: 'center' , 
    position:'relative' , 
    left: -40
  }, 
  inputs: {
    marginTop : 20 ,
  },
  lesinputs:{
      width : "50%" , 
  },


});