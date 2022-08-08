import { StyleSheet, Text, View , ScrollView , TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButton, Colors } from 'react-native-paper';
import {useSelector , useDispatch} from 'react-redux'; 

export default function DisponibiliteItems({item}) { 
    
    const navigation = useNavigation(); 
    const {etat_rh} = useSelector(state => state.userReducer); 

        const fonctionnalite = () => {
            if(item.etat == 0 ){
                return <Text style={{color : "#194568",fontWeight:'bold'}}>Employe</Text> ; 
            }
            else if (item.etat == 1 ){
                return <Text style={{color : "#194568",fontWeight:'bold'}}>Responsable du groupe</Text> ; 
            }
            else{
                return <Text style={{color : "#194568",fontWeight:'bold'}}>Responsable RH</Text> ;
            }
        }

        const justeAffichage = () => {
            if(item.date_de_sortie != null) {
                return <Text style={styles.text1} ><Text style={styles.text11}>         Temps de sortie</Text> {"\n"}                   {item.date_de_sortie}</Text>  ;  
            }
            else{
                return <Text style={styles.text1} ><Text style={styles.text11}>         Temps de sortie</Text> {"\n"}                         --</Text>  ;
            }
        } 

        const controlle = () => {
            if(etat_rh != 2 ){
                return <IconButton icon="map" color={'#DFDE07'} size={39} style={{ marginLeft:245 , marginTop: -47 }} onPress={()=> navigation.navigate('Location',{id_pointage : item.id})} /> ; 
            }
        }

        const test=() => {
                return <View style={styles.card}>
                            <Text style={styles.text12} >{item.nom.toUpperCase()} {item.prenom.toUpperCase()}</Text> 
                            {fonctionnalite()}
                            {controlle()}
                            <View style={styles.line}/>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                                <Text style={styles.text1} ><Text style={styles.text11}>Temps d'entree</Text> {"\n"}        {item.temps_dentree}</Text> 
                                {justeAffichage()}
                            </View>
                    </View> ; 
        }

        const verif = () => {
            if(item.code != "401"){
                return test() ; 
            }
            else{
                return <View><Text style={styles.texxt}>Il n'y a aucun pointage aujourd'hui !</Text></View> ; 
            }
        }
    
        return (
            <ScrollView style={styles.text} horizontal={false}  > 
                {verif()}
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
    texxt:{
        marginLeft : 15 , 
        marginTop : 30 , 
        fontSize : 18 
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