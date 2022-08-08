import { StyleSheet, Text, View , ScrollView , TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GroupesItems({item}) { 
  const navigation = useNavigation(); 
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
              //onPress: () =>  {}
            },
            {
              text: 'Modifier Membres',
             //onPress: () => {navigation.navigate('ModifierCompte',{tab: Personnel})}
            },

            {
              text: 'Supprimer',
              onPress: () => { 
                Alert.alert('','Etes-vous sûr que vous voulez supprimer groupe ?',
              [ 
              { 
                text: 'Supprimer', 
              /*  onPress: () => {console.log('Delete'),
                pressSupprimer(item.id)} */
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
            <Text style={styles.text1} ><Text style={styles.text11}>Responsable :</Text> {item.nom} {item.prenom}</Text> 
        </View>
         </TouchableOpacity>
        </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    text: {  
        //padding: 16 , 
        marginTop: 20 , 
    },
    text11: {
        color: 'white' , 
        fontWeight: 'bold' , 
    },
    card:{
        marginLeft: 10 , 
        backgroundColor: '#28282B',
        padding:20 , 
        width: 330 ,
    },
    text1: {
      color:'white' , 
      fontSize : 16 , 
    },
  });