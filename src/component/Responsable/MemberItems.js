import { StyleSheet, Text, View , ScrollView , Linking, Platform , Image , Alert , TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function MemberItems({item , pressSupprimer}) { 
  const navigation = useNavigation(); 
  const Personnel = [item.id,item.nom] ; 
    return (
         <TouchableOpacity style={styles.list} onPress={()=>{Alert.alert(
          //title
          '' , 
          //body
          'Est-ce que tu veux .. ? ',
          [
            {
              text: 'Appel',
              onPress: () =>  {

                let phoneNumber = '';
                var number = item.telephone ;
            
                if (Platform.OS === 'android') {
                  phoneNumber = 'tel:${'+number.toString()+'}';
                } else {
                  phoneNumber = 'telprompt:${'+number.toString()+'}';
                }
            
                Linking.openURL(phoneNumber);
              }
            },
            {
              text: 'Supprimer Member',
              onPress: () => { 
                Alert.alert('','Etes-vous sûr que vous voulez supprimer ?',
              [ 
              { 
                text: 'Supprimer', 
                onPress: () => {console.log('Delete'),
                pressSupprimer(item.id_employe)}
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
                <Text style={styles.text2}>MEMBRE-{item.status.toUpperCase()}</Text> 
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