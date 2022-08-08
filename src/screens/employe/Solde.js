import React , {useState , useEffect} from 'react';
import { StyleSheet, View , Text , ScrollView ,Alert } from 'react-native';
import {useSelector , useDispatch} from 'react-redux'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';


export default function Solde() {
    useFocusEffect(
        React.useCallback(() => {
          setLoading(true);
          getSolde();
        }, [])
      );

    const {id,ip_config} = useSelector(state => state.userReducer);
    const [salaire, setsalaire] = React.useState('');
    const [solde_conge, setsolde_conge] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const getSolde = () => {
        var InsertAPIURL="http://"+ip_config+"/api/getsolde";
          
        var headers={
          'Accept':'application/json' , 
          'Content-Type':'application/json' ,
        }
    
        fetch(InsertAPIURL,
          {
            method:'POST' , 
            headers:headers , 
            body: JSON.stringify(
              {"id_employe": id }) 
          }
          )
          .then((response) => response.json())
          .then((json) => {setsalaire(json[0]['salaire'].toFixed(2)),setsolde_conge(json[0]['solde_conge']) })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));        
        };
        useEffect(() => {
            setLoading(true);
            getSolde();
        }, []);

        
        
       // setsalaire(item.salaire) ;
      

    return (
    <View style={styles.container}>
        <ScrollView style={styles.container2} horizontal={true}  >
            <View style={styles.bloc2}>
                <Text style={styles.text11}>Jours de congés restants</Text>
                <Text style={styles.text2}>{solde_conge} <Text style={{color:'#007acc',fontSize:22}}>Jours</Text></Text>
                <View style={styles.icon}>
                    <Ionicons name="md-wallet-outline" size={35} color={'black'} />
                </View>
            </View>
        </ScrollView>
        
    </View>
    )

}

const styles = StyleSheet.create({
    container: {
       flex: 1,  
       backgroundColor: '#F4F8F8', 
       justifyContent: 'center' , 
       alignItems: 'center' 
       
    },
    icon: {
        borderColor : 'black' , 
        borderWidth : 1 , 
        borderRadius : 6 ,
        width: 45 ,  
        padding : 4 , 
        position:'relative' , 
        top: 20 ,   
    },
    text11:{
        color : '#007acc',
        fontSize: 22 ,
        fontWeight: 'bold' , 
        textAlign: 'center',
        position : 'relative' , 
        top: -18 , 
    },
    text2:{
        fontSize:28 , 
        position : 'relative' , 
        top: -4 , 
    },
    bloc2: {
        borderRadius:1000,
        width : 200 , 
        height: 200 , 
        borderColor : 1 , 
        backgroundColor: '#fff' , 
        alignItems:'center' , 
        justifyContent: 'center' ,
        marginTop: 80 , 
    },
});