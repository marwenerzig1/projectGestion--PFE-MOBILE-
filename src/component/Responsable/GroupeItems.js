import { StyleSheet, Text, View , ScrollView , TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GroupeItems({item , pressSupprimer}) { 
  const navigation = useNavigation(); 
  const groupe = [ item.id_groupe , item.nom_projet , item.description , item.id_responsable ] ; 
    return (
        <ScrollView style={styles.text} horizontal={false}  >
         <TouchableOpacity onPress={()=>{Alert.alert(
          //title
          '' , 
          //body
          'Est-ce que tu veux .. ? ',
          [
            {
              text: 'Modifier Projet',
              onPress: () => {navigation.navigate('ModifierGroupe',{tab: groupe})}
            },
            {
              text: 'Modifier Membres' ,
              onPress: () => {navigation.navigate('MembreGroupe',{tab: groupe})}
            },

            {
              text: 'Supprimer',
              onPress: () => { 
                Alert.alert('','Etes-vous sûr que vous voulez supprimer groupe ?',
              [ 
              { 
                text: 'Supprimer', 
                onPress: () => {console.log('Delete'),
                pressSupprimer(item.id_groupe)} 
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
       <View style={styles.card}>
            <Text style={styles.text1} ><Text style={styles.text11}>Projet :</Text> {item.nom_projet}</Text> 
            <Text style={styles.text1} ><Text style={styles.text11}>Description :</Text> {item.description}</Text> 
        </View>
         </TouchableOpacity>
        </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    text: {  
        marginTop: 20 , 
    },
    text11: {
        color: 'white' , 
        fontWeight: 'bold' , 
    },
    card:{
        marginLeft: 10 , 
        backgroundColor: '#007acc',
        padding:20 , 
        width: 330 ,
    },
    text1: {
      color:'white' , 
      fontSize : 16 , 
    },
  });