import { StyleSheet, Text, View , ScrollView , TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HistoriqueItems({item}) { 

        const test=() => {
            if(item.net_heures == "00:00:00"){
                return <View style={styles.card}>
                            <Text style={styles.text12} >{item.date}</Text> 
                            <Text style={{color : "#F33A0D",fontWeight:'bold'}}>Absence</Text>
                            <View style={styles.line}/>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                                <Text style={styles.text1} ><Text style={styles.text11}>Entrée</Text> {"\n"}{item.temps_dentree}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}>  Sortie</Text> {"\n"}  {item.date_de_sortie}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}>  Overtime</Text> {"\n"}   {item.overtime}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}> Break</Text> {"\n"} {item.break_heures}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}>  Totale</Text> {"\n"}   {item.net_heures}</Text>  
                            </View>
                    </View> ; 
            }
            else if(item.net_heures == null || item.net_heures == item.regular_heures || item.overtime != "00:00:00" ){
                return  <View style={styles.card}>
                            <Text style={styles.text12} >{item.date}</Text> 
                            <Text style={{color : "#18B52F",fontWeight:'bold'}}>Presence</Text>
                            <View style={styles.line}/>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                                <Text style={styles.text1} ><Text style={styles.text11}>Entrée</Text> {"\n"}{item.temps_dentree}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}>  Sortie</Text> {"\n"}  {item.date_de_sortie}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}>  Overtime</Text> {"\n"}   {item.overtime}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}> Break</Text> {"\n"} {item.break_heures}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}>  Totale</Text> {"\n"}   {item.net_heures}</Text>  
                            </View>
                        </View> ; 
            }
            else{
                return  <View style={styles.card}>
                            <Text style={styles.text12} >{item.date}</Text> 
                            <Text style={{color : "#F59B09",fontWeight:'bold'}}>Presence</Text>
                            <View style={styles.line}/>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                                <Text style={styles.text1} ><Text style={styles.text11}>Entrée</Text> {"\n"}{item.temps_dentree}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}>  Sortie</Text> {"\n"}  {item.date_de_sortie}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}>  Overtime</Text> {"\n"}   {item.overtime}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}> Break</Text> {"\n"} {item.break_heures}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}>  Totale</Text> {"\n"}   {item.net_heures}</Text>  
                            </View>
                       </View> ; 
            }
        }

        return (
            <ScrollView style={styles.text} horizontal={false}  >
             <View>  
                {test()}
             </View>
            </ScrollView>
        );
  }
  
  const styles = StyleSheet.create({
    text: {  
        marginTop: 20 , 
    },
    text1: {
        color: 'black' , 
        fontWeight: 'bold' , 
        fontSize : 12 ,
    },
    item:{

    },
    line: {
        marginTop: 6 , 
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
    },
    card:{ 
        backgroundColor: '#fff',
        padding: 20 , 
        width: '100%' ,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 18,
    },
    text12:{
        color: 'black' , 
        fontWeight: 'bold' , 
        fontSize : 15 ,
    },
    text11: {
      color:'#A9ADAE' , 
      fontSize : 14 , 
      fontWeight : 'bold'
    },
  });