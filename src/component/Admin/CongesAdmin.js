import { StyleSheet, Text, View , ScrollView , TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function CongesAdmin({item}) { 
    const navigation = useNavigation();
    const {etat_rh} = useSelector(state => state.userReducer); 
    const verif = () => {
        if(etat_rh == 1){
            if(item.etat_employe == 3){
                if(item.etat == 0){
                    return <View style={styles.card}>
                        <Text style={styles.text13} >{item.nom.toUpperCase()} {item.prenom.toUpperCase()}</Text> 
                        <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
                        <Text style={{color : "#6D706C",fontWeight:'bold'}}>En Cours</Text>
                        <View style={styles.line}/>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                            <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                            <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                            <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                        </View>
                        <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text>
                    </View>
                }
                else if(item.etat == 1){
                    return <View style={styles.card}>
                    <Text style={styles.text13} >{item.nom.toUpperCase()} {item.prenom.toUpperCase()}</Text> 
                    <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
                    <Text style={{color : "#18B52F",fontWeight:'bold'}}>Accepter</Text>
                    <View style={styles.line}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                        <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                        <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                        <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                    </View>
                    <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text>
                </View>
                }
                else{
                    return <View style={styles.card} >
                    <Text style={styles.text13} >{item.nom.toUpperCase()} {item.prenom.toUpperCase()}</Text> 
                    <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
                    <Text style={{color : "#F33A0D",fontWeight:'bold'}}>Refuser</Text>
                    <View style={styles.line}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                        <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                        <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                        <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                    </View>
                    <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text>
                </View>
                }
            }
            else{
                if(item.etat == 0){
                    return <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('TraitementCongeAdmin',{id_conge: item.id , id_employe : item.id_employe , etat_conge : item.etat} )}}>
                        <Text style={styles.text13} >{item.nom.toUpperCase()} {item.prenom.toUpperCase()}</Text> 
                        <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
                        <Text style={{color : "#6D706C",fontWeight:'bold'}}>En Cours</Text>
                        <View style={styles.line}/>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                            <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                            <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                            <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                        </View>
                        <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text>
                    </TouchableOpacity>
                }
                else if(item.etat == 1){
                    return <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('TraitementCongeAdmin',{id_conge: item.id , id_employe : item.id_employe , etat_conge : item.etat })}}>
                    <Text style={styles.text13} >{item.nom.toUpperCase()} {item.prenom.toUpperCase()}</Text> 
                    <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
                    <Text style={{color : "#18B52F",fontWeight:'bold'}}>Accepter</Text>
                    <View style={styles.line}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                        <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                        <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                        <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                    </View>
                    <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text>
                </TouchableOpacity>
                }
                else{
                    return <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('TraitementCongeAdmin',{id_conge: item.id , id_employe : item.id_employe , etat_conge : item.etat })}}>
                    <Text style={styles.text13} >{item.nom.toUpperCase()} {item.prenom.toUpperCase()}</Text> 
                    <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
                    <Text style={{color : "#F33A0D",fontWeight:'bold'}}>Refuser</Text>
                    <View style={styles.line}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                        <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                        <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                        <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                    </View>
                    <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text>
                </TouchableOpacity>
                }
            }
        }
        else{
            if(item.etat == 0){
                return <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('TraitementCongeAdmin',{id_conge: item.id , id_employe : item.id_employe , etat_conge : item.etat} )}}>
                    <Text style={styles.text13} >{item.nom.toUpperCase()} {item.prenom.toUpperCase()}</Text> 
                    <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
                    <Text style={{color : "#6D706C",fontWeight:'bold'}}>En Cours</Text>
                    <View style={styles.line}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                        <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                        <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                        <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                    </View>
                    <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text>
                </TouchableOpacity>
            }
            else if(item.etat == 1){
                return <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('TraitementCongeAdmin',{id_conge: item.id , id_employe : item.id_employe , etat_conge : item.etat })}}>
                <Text style={styles.text13} >{item.nom.toUpperCase()} {item.prenom.toUpperCase()}</Text> 
                <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
                <Text style={{color : "#18B52F",fontWeight:'bold'}}>Accepter</Text>
                <View style={styles.line}/>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                    <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                    <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                    <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                </View>
                <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text>
            </TouchableOpacity>
            }
            else{
                return <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('TraitementCongeAdmin',{id_conge: item.id , id_employe : item.id_employe , etat_conge : item.etat })}}>
                <Text style={styles.text13} >{item.nom.toUpperCase()} {item.prenom.toUpperCase()}</Text> 
                <Text style={styles.text12} >Date demande : {item.date_demande}</Text> 
                <Text style={{color : "#F33A0D",fontWeight:'bold'}}>Refuser</Text>
                <View style={styles.line}/>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop:12}}>
                    <Text style={styles.text1} ><Text style={styles.text11}> Debut</Text> {"\n"}{item.date_debut}</Text> 
                    <Text style={styles.text1} ><Text style={styles.text11}>            Fin</Text> {"\n"}      {item.date_fin}</Text> 
                    <Text style={styles.text1} ><Text style={styles.text11}>       Nombre de jours</Text> {"\n"}                        {item.nombre_jours}</Text>  
                </View>
                <Text style={styles.text1} ><Text style={styles.text11}>Cause : </Text> {"\n"}{item.cause}</Text>
            </TouchableOpacity>
            }
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
text13:{
    color: '#007acc' , 
    fontWeight: '500' , 
    fontSize : 15 ,
},
text11: {
  color:'#A9ADAE' , 
  fontSize : 14 , 
  fontWeight : 'bold'
},
});