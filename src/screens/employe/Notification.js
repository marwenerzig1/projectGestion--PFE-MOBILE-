import { StyleSheet, Text, View , Button , ScrollView, Alert , Platform  } from 'react-native';
import * as Notifications from 'expo-notifications'; 
import { StatusBar } from 'expo-status-bar';
import { useEffect , useState } from 'react';
import {useSelector , useDispatch} from 'react-redux'; 


Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldPlaySound : false , 
            shouldSetBadge : false , 
            shouldShowAlert : true 
        };
    }
}); 

export default function Notification() { 

  /*const [token , getToken] = useState('') ; 

    useEffect(()=> {
        async function configurePushNotifications() {
            const {status} = await Notifications.getPermissionsAsync();
            let finalStatus = status;
            
            if(finalStatus !== 'granted'){
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status ; 
            }

            if(finalStatus !== 'granted'){
                Alert.alert('Permission required','Push notifications need the approprite permissions.');
                return ; 
            };
            
            const pushTokenData = await Notifications.getExpoPushTokenAsync();
            console.log(pushTokenData) ; 
            getToken(pushTokenData) ; 
            
            if (Platform.OS === 'android'){
                Notifications.setNotificationChanneAsync('default', {
                    name: 'default' , 
                    importance: Notifications.AndroidImportance.DEFAULT
                });
            }
        }  

            configurePushNotifications();

    } , []) ; */
 /*   useEffect(()=>{
        const subscription1 = Notifications.addNotificationReceivedListener((notification)=> {
            console.log('NOTIFICATION RECEVIED');
            console.log(notification);
            const userName = notification.request.content.data.userName; 
            console.log(userName) ; 
        });

        const subscription2 = Notifications.addNotificationReceivedListener((response) => {
            console.log('NOTIFICATION RESPONSE RECEVIED'); 
            console.log(response); 
         //   const userName = response.notification.request.content.data.userName; 
          //  console.log(userName) ; 
        }) ; 

        return () => {
            subscription1.remove() ; 
            subscription2.remove() ; 
        };
    },[]) */
/*   function scheduleNotificationHandler() {
        Notifications.scheduleNotificationAsync({
            content : {title : 'My first local notification' , 
            body : 'This is the body of the notification. ',
            data: {userName: 'Max'}
        },  
        trigger: {
            seconds: 5 
        }
        }); 
    }
*/

const [token , setToken] = useState();
const [isLoading, setLoading] = useState(false);
const {id,name,prenom,ip_config} = useSelector(state => state.userReducer);

const getToken = () => {
    fetch("http://"+ip_config+"/api/getTokenConge")
      .then((response) => response.json())
      .then((json) => {setToken(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };


    function sendPushNotificationHandler() {
        getToken();
        const tokens = affichage() ; 
    fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST' , 
            headers: {
                'content-type' : 'application/json'
            } ,
            body : JSON.stringify(tokens)
        }); 
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


        return (
            <View style={styles.text}  > 
            <Button title='Send Push Notification' onPress={sendPushNotificationHandler}/>
            <StatusBar style="auto" />
            </View>
        );
  }
  
  const styles = StyleSheet.create({
    text: {  
        flex : 1  , 
        alignItems : 'center' , 
        justifyContent : 'center' 
    },
  });