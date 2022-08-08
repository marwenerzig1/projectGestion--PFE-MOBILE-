import { StyleSheet, Text, View , ScrollView , TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GroupesItems({item}) { 
  const navigation = useNavigation(); 
  const groupe = [ item.id_groupe , item.nom_projet , item.description ] ; 
    return (
        <ScrollView style={styles.text} horizontal={false}  >
         <TouchableOpacity onPress={()=>{ console.log('information'),
            navigation.navigate('InfoGroupe',{tab: groupe}) } }  >  
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
        backgroundColor: '#007acc',
        padding:20 , 
        width: 330 ,
    },
    text1: {
      color:'white' , 
      fontSize : 16 , 
    },
  });