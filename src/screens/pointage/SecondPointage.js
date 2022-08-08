import React, { useState, useEffect } from 'react';
import {StyleSheet, TouchableOpacity, Text,Alert, View } from "react-native" ; 
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import {useSelector, useDispatch} from 'react-redux'; 
import moment from 'moment';
import {setPointage } from '../../component/Redux/actions';


export default function SecondPointage() {

	const navigation = useNavigation(); 
    const {ip_config,id_pointage} = useSelector(state => state.userReducer);
    const [latitude, setLatitude] = useState(0);
	  const [longitude, setLongitude] = useState(0);
    const dispatch = useDispatch() ; 
    const [errorMsg, setErrorMsg] = useState(0);
    const [afk, setAfk] = useState(0);
    const [Arretepause , setArretePause] = useState("00:00:00");
    const [Debutpause , setDebutPause] = useState("00:00:00");

    const [time, setTime] = useState({
      seconds: 0,
      minutes: 0,
      hours: 0,
    });

    async function getLocation() {
      if (Platform.OS === 'android' && !Constants.isDevice) {
    setErrorMsg(
      'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
    );
    return;
    } 
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
    }

    let location = await Location.getCurrentPositionAsync();
    setLatitude(location.coords.latitude); 
    setLongitude(location.coords.longitude); 

  }

    useEffect(() => {
      getLocation(); 
      let isCancelled = false;
  
      const advanceTime = () => {
        setTimeout(() => {
          let nSeconds = time.seconds;
          let nMinutes = time.minutes;
          let nHours = time.hours;
  
          nSeconds++;
  
          if (nSeconds > 59) {
            AumilieuHandler();
            nMinutes++;
            nSeconds = 0;
          }
          if (nMinutes > 59) {
            nHours++;
            nMinutes = 0;
          }
          if (nHours > 24) {
            nHours = 0;
          }

          !isCancelled && setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
        }, 1000);
      };
      advanceTime();
      return () => {
        //final time:
        //console.log(time);
        isCancelled = true;
      };
    }, [time]);
    

    const AumilieuHandler = () => {
      getLocation();
        var InsertAPIURL="http://"+ip_config+"/api/MilieuDay";
        var headers={
          'Accept':'application/json' , 
          'Content-Type':'application/json' ,
        }
    
        fetch(InsertAPIURL,
          {
            method:'POST' , 
            headers:headers , 
            body: JSON.stringify({"id_pointage":id_pointage,"latitude":latitude,"longitude":longitude}) ,
          }
          )
          .then((response)=>response.json())
          .then((resData) =>{
            if (JSON.stringify(resData[0]['code']).toString() === '"201"' ) {
              console.log("Localisation envoyer avec succes ! ") ; 
           }
           else {
              return Alert.alert(resData[0]['message']) ; 
           }
          });
      }

    const ArreterHandler = () => {
      getLocation();
        var InsertAPIURL="http://"+ip_config+"/api/FinDay";
        var headers={
          'Accept':'application/json' , 
          'Content-Type':'application/json' ,
        }
    
        fetch(InsertAPIURL,
          {
            method:'POST' , 
            headers:headers , 
            body: JSON.stringify({"id_pointage":id_pointage,"latitude":latitude,"longitude":longitude}) ,
          }
          )
          .then((response)=>response.json())
          .then((resData) =>{
            if (JSON.stringify(resData[0]['code']).toString() === '"201"' ) {
            dispatch(setPointage(0)) ;
            Alert.alert(resData[0]['message']) ;
            navigation.goBack() ; 
           }
           else {
              return Alert.alert(resData[0]['message']) ; 
           }
          });
      }

    const mise_a_jour_break = (date) => {
      var InsertAPIURL="http://"+ip_config+"/api/Break";
      var headers={
        'Accept':'application/json' , 
        'Content-Type':'application/json' ,
      }
  
      fetch(InsertAPIURL,
        {
          method:'POST' , 
          headers:headers , 
          body: JSON.stringify({"id_pointage":id_pointage,"break_entre": Debutpause.toString(),"break_fin": date.toString()}) ,
        }
        )
        .then((response)=>response.json())
        .then((resData) =>{
          if (JSON.stringify(resData[0]['code']).toString() === '"201"' ) {
          return Alert.alert("",resData[0]['message']) ; 
         }
         else {
            return Alert.alert(resData[0]['message']) ; 
         }
        });
    }

    const getDate=()=>{
        var date = moment()
        .format('ll'); //DD/MM/YYYY
        return date ;
      }

    const debutpause=()=>{
     if(Debutpause == "00:00:00"){ 
          setAfk(1);
          var date = moment()
            .format('hh:mm:ss');
          setDebutPause(date) ; 
      }
      else{
        Alert.alert("","Votre pause deja enregistré")
      } 
    }
    const finpause=()=>{
      setAfk(0);
          var date = moment()
            .format('hh:mm:ss');
          setArretePause(date) ; 
      mise_a_jour_break(date) ; 
    }

      const affichageButton = () => {
          if(afk == 0 ){
            return  <TouchableOpacity style={styles.buttonPause} onPress={()=>{ debutpause();}}>
                    <View style={styles.bloc}>
                              <Text style={styles.textPause}>Debut pause</Text>
                              <Ionicons name="cafe-outline" style={styles.icon} size={32} color={'#000'} />
                    </View>
                    <Text style={{fontSize:14 ,fontWeight: 'bold' , color: '#000',marginTop:-10}} >{Debutpause == "00:00:00" ? "" : Debutpause+"---------->"+Arretepause }</Text>
                  </TouchableOpacity>
          }
          else{
            return  <TouchableOpacity style={styles.buttonPause} onPress={()=>{ finpause(); }}>
            <View style={styles.bloc}>
                      <Text style={styles.textPause}>Fin pause</Text>
                      <Ionicons name="cafe-outline" style={styles.icon} size={32} color={'#000'} />
                      <Text style={{fontSize:14 ,fontWeight: 'bold' , color: '#000',marginTop:-10}} >{Debutpause == "00:00:00" ? "" : Debutpause+"---------->" }</Text>
            </View>
          </TouchableOpacity>
          }
        

      }

		return (
			<View style={styles.container}>
      <LinearGradient
					colors={['#3586E9', '#79BBF0']}
					start={{x: 0, y: 0}}
					end={{x: 1, y: 1}}
					style={styles.compteur} 
				>
                    <Text style={{color:'#fff',fontSize:18 ,fontWeight:'bold',marginLeft:12,marginTop:8 }}>{getDate()}</Text>
                    <View style={styles.line}/>
                    <Text style={{fontSize:45 ,fontWeight: 'bold' , color: '#fff',marginLeft:48,marginTop:20}} >{`${time.hours < 10 ? '0' + time.hours : time.hours} : ${time.minutes < 10 ? '0' + time.minutes : time.minutes} : ${time.seconds < 10 ? '0' + time.seconds : time.seconds}`}</Text>
        </LinearGradient>
				<TouchableOpacity style={styles.button} onPress={() => { 
                Alert.alert('','Etes-vous sûr que vous voulez arrêter le pointage ?',
              [ 
              { 
                text: 'Confirmer', 
                onPress: () => {ArreterHandler()}
              },
              { 
                text: 'Annuler',
                onPress: () => {console.log('Canceled')},
                style: 'cancel'
              } 
              ]
              )
              }} >
                    <View style={styles.bloc}>
                        <Text style={styles.text2}>Fin de journée</Text>
                        <Ionicons name="md-stopwatch-outline" style={styles.icon} size={32} color={'#fff'} />
                    </View>
        </TouchableOpacity>
        {affichageButton()}
				<TouchableOpacity style={styles.footer1} onPress={()=>{navigation.navigate('Absence')}}>
                    <View style={styles.blocc}>
                        <Text style={styles.text}>Ajouter absence</Text>
                        <Ionicons name="md-podium-sharp" size={27} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footer2} onPress={()=>{navigation.navigate('Historique')}}>
                    <View style={styles.blocc}>
                        <Text style={styles.text}>Historique</Text>
                        <Ionicons name="calendar" size={27} color={'black'} />
                    </View>
                </TouchableOpacity>
			</View>
		)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	button: {
		width: '90%' , 
		backgroundColor : '#E9353D' , 
		height: 50 ,
		alignItems: "center",
		borderRadius: 50 , 
		position:'relative' , 
		top: 70 , 
	},
	buttonPause: {
		width: '70%' , 
		backgroundColor : '#EAEDF0' , 
		height: 50 ,
		alignItems: "center",
		borderRadius: 50 , 
		position:'relative' , 
		top: 90 , 
	},
	compteur:{
		//backgroundColor: '#007acc' , 
		width : '90%' ,
		height : '35%', 
		borderRadius: 25 , 
		position : 'absolute' , 
		top: '4%'	,
	},
  line: {
    marginTop: 8 , 
    borderBottomColor: '#fff',
    borderBottomWidth: 0.6,
  },
	text:{
        position: 'relative' , 
		color:'black' , 
        fontSize: 14 ,
        left: 40 ,
        top: 24 ,  
        fontWeight: 'bold'
    },
    blocc: {
        position:'relative' , 
        top: -11 , 
        left: 5 
    }, 
	footer1: {
        backgroundColor: "#D5DEEA" ,
        width : '50%' ,  
        padding : 5 , 
        position : 'absolute' , 
        bottom : 29 , 
        left : 16 , 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    footer2: {
        backgroundColor: "#D5DEEA" ,
        width : 148 ,  
        padding : 5 , 
        position : 'absolute' , 
        bottom : 29 , 
        left : 203 , 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
	text2:{
		color:'#fff' , 
		fontSize: 20 ,
		position:'relative' , 
		left: 20 ,
		top: 10 
	},
	textPause:{
		color:'#000' , 
		fontSize: 20 ,
		position:'relative' , 
		left: 20 ,
		top: 10 
	},
	icon:{
		position:'relative' , 
		top: -19 ,
		left: -22 , 
	}
})