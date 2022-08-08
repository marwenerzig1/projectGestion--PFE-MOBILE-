import { StyleSheet, Text, View , ScrollView , TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ActeurItems({item}) { 
  const navigation = useNavigation(); 
    return (
        <ScrollView style={styles.text} horizontal={true}  >
         <TouchableOpacity style={styles.bloc1} onPress={() => {navigation.navigate('EmployeAdmin')}}>
            <Text style={styles.text1} >Employés</Text> 
            <Text style={styles.text11} >Nombre des Employés : {item.employe}</Text> 
         </TouchableOpacity>
         <TouchableOpacity style={styles.bloc2} onPress={() => {navigation.navigate('ResponsableRHAdmin')}}>
            <Text style={styles.text1} >Responsable RH</Text> 
            <Text style={styles.text11} >Nombre des Responsables RH : {item.responsable_RH}</Text> 
         </TouchableOpacity>
         <TouchableOpacity style={styles.bloc3} onPress={() => {navigation.navigate('ResponsableAdmin')}}>
            <Text style={styles.text1} >Responsables</Text> 
            <Text style={styles.text111} >Nombre des Responsables : {item.responsable}</Text> 
         </TouchableOpacity>
         <TouchableOpacity style={styles.bloc4} onPress={() => {navigation.navigate('TeamLeaderAdmin')}}>
            <Text style={styles.text1} >Equipé</Text>
            <Text style={styles.text11} >Nombre des Equipes : {item.team_leader}</Text> 
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
      backgroundColor: '#007acc', 
      justifyContent: 'center' , 
      alignItems: 'center' , 
      marginLeft: 10 , 
      padding : 10 
    },
    bloc2: {
      backgroundColor: '#8c8c8c', 
      justifyContent: 'center' , 
      alignItems: 'center' , 
      marginLeft: 10 , 
      padding : 10 
    },
    bloc3: {
      backgroundColor: '#00b300', 
      justifyContent: 'center' , 
      alignItems: 'center' , 
      marginLeft: 10 , 
      padding : 10 
    },
    bloc4: {
      backgroundColor: '#28282B', 
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