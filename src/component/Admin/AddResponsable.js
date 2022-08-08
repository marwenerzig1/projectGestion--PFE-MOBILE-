import { StyleSheet, Text, View , ScrollView , Linking, Platform , Image , Alert , TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState , useEffect  } from 'react';
import {useSelector , useDispatch} from 'react-redux'; 


export default function AddResponsable({item}) { 
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); 
  const {ip_config} = useSelector(state => state.userReducer);  

  const pressAjouter = (id) => {
    var InsertAPIURL="http://"+ip_config+"/api/AjouterResponsable";
    
    var headers={
      'Accept':'application/json' , 
      'Content-Type':'application/json' ,
    }

    fetch(InsertAPIURL,
      {
        method:'POST' , 
        headers:headers , 
        body: JSON.stringify({"id":id}) ,
      }
      )
      .then((response)=>response.json())
      .then((resData) =>{
        if (JSON.stringify(resData[0]['code']).toString() === '"201"' ) {
            setLoading(true);
            setLoading(false);
            navigation.navigate('ResponsableAdmin') ; 
            Alert.alert(JSON.stringify(resData[0]['message']).toString()) ;
       }
       else {
          return Alert.alert(JSON.stringify(resData[0]['message']).toString()) ; 
       }
      });
  }

    return (
         <TouchableOpacity style={styles.list} onPress={()=>{Alert.alert(
          //title
          '' , 
          //body
          'Est-ce que tu veux ajouter '+ item.nom+' '+item.prenom +' comme Responsable ? ',
          [
            {
              text: 'Ajouter',
              onPress: () => { 
                Alert.alert('','Etes-vous sûr que vous voulez ajouter ?',
              [ 
              { 
                text: 'Valider', 
                onPress: () => {console.log(item.id),
                pressAjouter(item.id)}
              },
              { 
                text: 'Annuler',
                onPress: () => {console.log('Canceled')},
                style: 'cancel'
              } 
              ]
              )
              }
            },

          ],
          {cancelable: true},
          //clicking out side of alert will not cancel
        );}}  >  
            <Image 
            //source={{uri: item.image}}
            source={require('../../../assets/icon2.png')}
            style={{height: 60, width: 60, borderRadius: 100  }}
            resizeMode='contain'
            />            
            <View style={styles.textes}>
                <Text style={styles.text1}>{item.nom} {item.prenom}</Text> 
                <Text style={styles.text2}>EMPLOYE-{item.status.toUpperCase()}</Text> 
                <Text style={styles.text3}>{item.login}</Text>  
            </View>
         </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    list: {  
        marginTop: 18 , 
        padding: 10 , 
        marginBottom: 4 , 
        backgroundColor: '#ffff' ,
        borderRadius: 12 ,  
        flex : 1 , 
        flexDirection:'row',  
        shadowColor: '#000',  
        shadowOffset: {
             width: 0, 
             height: 10 
        },  
        shadowOpacity: 3,  
        shadowRadius: 12 , 
        elevation: 8,  
        zIndex:999,  
    },
    text1: {
      fontSize : 23 , 
      fontWeight : '400' , 
    },
    text2: {
        fontSize: 12 , 
        opacity: .7 , 
    },
    text3: {
        fontSize : 14 , 
        opacity: .8 , 
        color : '#0099cc'
    },
    textes:{
      marginLeft: 22 , 
    },
    tt:{
      color: 'red' , 
    }
  });