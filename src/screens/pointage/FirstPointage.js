import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity,Alert, Text, View } from "react-native" ; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector , useDispatch} from 'react-redux'; 
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import MapView, { Callout, Circle, Marker } from "react-native-maps" ; 
import { setId_Pointage , setPointage } from '../../component/Redux/actions';
import Geofence from 'react-native-expo-geofence';

export default function FirstPointage() {

    const navigation = useNavigation(); 
    const dispatch = useDispatch() ; 
    const {ip_config,id} = useSelector(state => state.userReducer);  
    const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
    const [errorMsg, setErrorMsg] = useState(0);
    const [points , setpoints] = useState([{ latitude: 0, longitude: 0 }]);
    const [startPoint , setstartPoint] = useState({latitude: 0,longitude: 0});
    const [maxDistanceInKM , setmaxDistanceInKM] = useState(0); 
    const [modePointage , setmodePointage] = useState(0); 
    const [loading, setLoading] = React.useState(false);


    const getByProximity = () => {
        getConfigurationPointage();
        getLocation(); 
        console.log("Distance in KM : " + maxDistanceInKM);
        console.log("Point : " + points);
        console.log("Start Point : " + startPoint);
        console.log("Mode Pointage : "+modePointage);
        var result = Geofence.filterByProximity(startPoint, points, maxDistanceInKM);
        return result ; 
    }



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
          console.log(location.coords.latitude);
          console.log(location.coords.longitude);
          setpoints([{["latitude"]:location.coords.latitude , ["longitude"]:location.coords.longitude}]) ; 

    }

    const getConfigurationPointage = () => {
        fetch("http://"+ip_config+"/api/getConfigurationPointage")
          .then((response) => response.json())
          .then((json) => {
            setstartPoint({ ["latitude"]: json[0]['lantitudeSociete'] , ["longitude"]: json[0]['longitudeSociete'] }) ;
            setmaxDistanceInKM(json[0]['distanceInKM']) ;
            setmodePointage(json[0]['etat']);
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
        };

    useEffect(() => {
        setLoading(true);
        getConfigurationPointage();
		getLocation(); 
	  }, []);


    const DemarrerHandler = () => {
        getLocation();
        console.log(latitude);
        console.log(longitude);
        var InsertAPIURL="http://"+ip_config+"/api/StartDay";
        
        var headers={
          'Accept':'application/json' , 
          'Content-Type':'application/json' ,
        }
    
        fetch(InsertAPIURL,
          {
            method:'POST' , 
            headers:headers , 
            body: JSON.stringify({"id_employe":id,"latitude":latitude,"longitude":longitude}) ,
          }
          )
          .then((response)=>response.json())
          .then((resData) =>{
            if (JSON.stringify(resData[0]['code']).toString() === '"201"' ) {
                dispatch(setId_Pointage(resData[0]['id_pointage'])) ;
                dispatch(setPointage(1)) ;
                navigation.navigate('SecondPointage') ; 
                Alert.alert(resData[0]['message']) ;
           }
           else {
              return Alert.alert(resData[0]['message']) ; 
           }
          });
      }

    const clickDemarrerHandler = () => {
        getConfigurationPointage();
        if(modePointage == 1) {
            if(!getByProximity().length){
                return Alert.alert('','You are not in the work zone !')
            }else{
                return DemarrerHandler() ; 
            }
        }
        else{
            return DemarrerHandler() ; 
        }
    }

		return (
			<View style={styles.container}>
				{<MapView
					style={styles.map}
					initialRegion={{
                        latitude: 35.6326276 ,
                        longitude: 10.9063815 ,
                        latitudeDelta: 0.06 ,
                        longitudeDelta: 0.06
                    }}
				/>}
                <View style={styles.backWhite}>
                    <TouchableOpacity  style={styles.button} onPress={clickDemarrerHandler} >
                        <View style={styles.bloc}>
                            <Ionicons name="md-stopwatch-outline" size={38} color={'#fff'} />
                            <Text style={{color: '#fff' , fontWeight : 'bold' , fontSize: 17 }}>Démarrer</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
                <TouchableOpacity onPress={()=>{ console.log(getByProximity()) ; }}>
                <Text>click ici ! </Text>
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
	map: {
		width: Dimensions.get("window").width,
		height: "50%",
        position: 'absolute' , 
        top : 0 , 
	}, 
    text:{
        position: 'relative' , 
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
    bloc:{
        alignItems: "center", 
		position: 'relative' , 
        top: 20 , 
        fontWeight:'bold'
    },
    button: {
        backgroundColor: '#007acc' , 
        borderRadius : 200 , 
        width: 120 ,
        height: 120 , 
        position: 'relative' , 
        left: 20 , 
        top:  17 , 
    }, 
    backWhite: {
        backgroundColor: 'white' , 
        borderRadius : 200 , 
        width: 160 ,
        height: 160 , 
    }
})
