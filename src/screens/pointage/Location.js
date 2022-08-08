import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity,Alert, Text, View } from "react-native" ; 
import MapView, { Callout, Circle, Marker } from "react-native-maps" ; 
import {useSelector} from 'react-redux'; 
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function Location() {

const {ip_config} = useSelector(state => state.userReducer); 
const [users,setUsers] = useState([]); 
const [loading, setLoading] = React.useState(false);
const route = useRoute() ; 

useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getLocation();
    }, [])
  );

const getLocation = () => {
    var InsertAPIURL="http://"+ip_config+"/api/getLocation";
      
    var headers={
      'Accept':'application/json' , 
      'Content-Type':'application/json' ,
    }

    fetch(InsertAPIURL,
      {
        method:'POST' , 
        headers:headers , 
        body: JSON.stringify(
          {"id_pointage": route.params.id_pointage }) 
      }
      )
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getLocation();
    }, []);

const pressMarker = (i) => {
    console.log(i.etat);
    console.log(i.temps);
  };

		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
                        latitude: 35.6326276 ,
                        longitude: 10.9063815 ,
                        latitudeDelta: 0.04 ,
                        longitudeDelta: 0.04
                    }}
				>
                     {users.map((i, index) => ( 
                    <Marker
                        key={index}
                        onPress = {() => pressMarker(i)}
                        coordinate={{
                        latitude: i.latitude,
                        longitude: i.longitude,
                        }}
                        title={i.etat == 0 ? "Debut" : i.etat == 1 ? "En Cours" : "Fin" }
                        description={i.temps}
                        pinColor={i.etat == 0 ? "green" : i.etat == 1 ? "red" : "blue" }
                        style={{width: 5000, height: 28}}
                    />
                    ))}    
                </MapView>
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
  marker:{
    width: 500 , 
  },
	map: {
		width: Dimensions.get("window").width,
		height: "100%",
        position: 'absolute' , 
        top : 0 , 
	}, 
})