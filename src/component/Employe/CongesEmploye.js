import { StyleSheet, Text, View , ScrollView , TouchableOpacity,Alert } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import moment from 'moment';
export default function CongesEmploye({item,pressSupprimer}) { 

    const tesst = () => {
        var date = moment()
        .format('YYYY-MM-DD');
        if(date < item.date_debut ){
            return <IconButton
            icon="delete"
            color={Colors.red600}
            size={39}
            style={{
                marginLeft:250 , 
                marginTop: -47 
            }}
            onPress={() => pressSupprimer(item.id)}
        /> ; 
        }
    }

    const test=() => {
        if(item.etat == 0){
                return <View style={styles.card}>
                <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
                <Text style={{color : "#6D706C",fontWeight:'bold'}}>En Cours</Text>
                {tesst()}
                <View style={styles.line}/>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                    <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                    <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                    <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                </View>
                <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text>
            </View> ; 
        }
        else if(item.etat == 1 ){
            return  <View style={styles.card}>
                        <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
                        <Text style={{color : "#18B52F",fontWeight:'bold'}}>Accepter</Text>
                        <View style={styles.line}/>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                            <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                            <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                            <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                        </View>
                        <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text> 
                    </View> ; 
        }
        else if(item.etat == 2 ){
            return   <View style={styles.card}>
            <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
            <Text style={{color : "#CD1010",fontWeight:'bold'}}>Refuser</Text>
            <View style={styles.line}/>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                    <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                    <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                    <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                </View>
            <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text>
        </View> ; 
        }
    }

    const verif = () => {
        if(item != null){
            return test() ; 
        }
        else{
            return <View><Text style={styles.texxt}>Il n'y a aucun congé !</Text></View> ; 
        }
    }

    return (
        <ScrollView style={styles.text} horizontal={false}  >
         <TouchableOpacity>  
            {verif()}
         </TouchableOpacity>
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
texxt: {
    marginLeft:102 ,  
    marginTop: 130 , 
    fontSize:18 , 
    color:'red'
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