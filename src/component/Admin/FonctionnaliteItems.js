import { StyleSheet, Text, View , ScrollView , TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FonctionnaliteItems({item}) { 
  const navigation = useNavigation(); 
    return (
        <ScrollView style={styles.text} horizontal={true}  >
         <TouchableOpacity style={styles.bloc1} onPress={() => {navigation.navigate('DisponibiliteActuelle')}}>
            <Text style={styles.text1} >Disponibilité Actuelle</Text> 
         </TouchableOpacity>
         <TouchableOpacity style={styles.bloc2} onPress={() => {navigation.navigate('EmploiDeTemps')}}>
            <Text style={styles.text1} >Pointage</Text>  
         </TouchableOpacity>
         <TouchableOpacity style={styles.bloc3} onPress={() => {navigation.navigate('AdminConges')}}>
            <Text style={styles.text1} >Demandes De Congés</Text> 
         </TouchableOpacity>
         <TouchableOpacity style={styles.bloc4} onPress={() => {navigation.navigate('Horaire')}}>
            <Text style={styles.text1} >Configuration</Text>
         </TouchableOpacity> 
        </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    text: {  
        //padding: 16 , 
        marginTop: 20 , 
        flex : 1 , 
        flexDirection:'row',  
    },
    bloc1: {
      backgroundColor: '#194568', 
      justifyContent: 'center' , 
      alignItems: 'center' , 
      marginLeft: 10 , 
      padding : 25 
    },
    bloc2: {
      backgroundColor: '#546CBC', 
      justifyContent: 'center' , 
      alignItems: 'center' , 
      marginLeft: 10 , 
      padding : 25
    },
    bloc3: {
      backgroundColor: '#8895B1', 
      justifyContent: 'center' , 
      alignItems: 'center' , 
      marginLeft: 10 , 
      padding : 25 
    },
    bloc4: {
      backgroundColor: '#BCC2D7', 
      justifyContent: 'center' , 
      alignItems: 'center' , 
      marginLeft: 10 , 
      padding : 10 , 
      marginRight : 10
    },
    text1: { 
      color:'white' , 
      fontSize : 16 , 
    },
    text11: { 
      color:'#aeb1b1' , 
      fontSize : 13 , 
      marginTop : 14 , 
    },
    text111: { 
      color:'#EEF2F2' , 
      fontSize : 13 , 
      marginTop : 14 , 
    }
  });