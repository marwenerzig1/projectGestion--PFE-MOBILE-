import { StyleSheet, Text, View , ScrollView , TouchableOpacity,Alert } from 'react-native';
import { IconButton} from 'react-native-paper';

export default function HoraireItems({item}) { 
    
        const test=() => {
            if(item.date_debut == "00:00:00" && item.date_fin == "00:00:00"){
                return <View style={styles.card}>
                            <Text style={styles.text12} >{item.day}</Text> 
                            <View style={styles.line}/>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' , marginTop:12}}> 
                                <Text style={styles.text14}> Weekend</Text>  
                            </View>
                    </View> ; 
            }
            else{
                return <View style={styles.card}>
                            <Text style={styles.text12} >{item.day}</Text> 
                            <View style={styles.line}/>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' , marginTop:12}}> 
                                <Text style={styles.text1} ><Text style={styles.text11}> Entre</Text> {"\n"}{item.date_debut}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}> Sortie</Text> {"\n"}{item.date_fin}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}> Break</Text> {"\n"}{item.break_houres}</Text> 
                                <Text style={styles.text1} ><Text style={styles.text11}>Temps finale</Text> {"\n"}      {item.date_finale}</Text>  
                            </View>
                    </View> ; 
            }
        }

        return (

             <View style={styles.text} >  
                {test()}
             </View>

        );
  }
  
  const styles = StyleSheet.create({
    text: {  
        marginTop: 15 , 
    },
    text1: {
        color: 'black' , 
        fontWeight: 'bold' , 
        fontSize : 12 ,
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
        color : '#007acc'
    },
    text11: {
      color:'#A9ADAE' , 
      fontSize : 14 , 
      fontWeight : 'bold'
    },
    text14: {
      color:'#EA1D8D' , 
      fontSize : 14 , 
      fontWeight : 'bold' , 
      marginLeft : 120 
    },
  });