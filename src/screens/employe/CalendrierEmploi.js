import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux'; 
import React , {useState , useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

export default function CalendrierEmploi() { 
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getPointage();
    }, [])
  );

  const navigation = useNavigation();
  const {id,ip_config} = useSelector(state => state.userReducer); 
  const [pointage, setpointage] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

    const date = () => {
        var date = moment()
            .format('YYYY-MM-DD');
        return date ; 
    }

    const getPointage = () => {
      var InsertAPIURL="http://"+ip_config+"/api/getPointage";
        
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
        .then((json) => setpointage(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      };
      useEffect(() => {
          setLoading(true);
          getPointage();
      }, []);

    let newDaysObject = {};

    pointage.map((item) => {
      if(item.net_heures == "00:00:00"){
      newDaysObject[item.date] = {
        selected: true,
        marked: true,
        selectedColor: "#F33A0D",
      };
      }
      else if(item.net_heures == null || item.net_heures == item.regular_heures || item.overtime != "00:00:00" ){
      newDaysObject[item.date] = {
        selected: true,
        marked: true,
        selectedColor: "#18B52F",
        };
      }
      else{
      newDaysObject[item.date] = {
        selected: true,
        marked: true,
        selectedColor: "#F59B09",
        };
      }
    });

    const Affichage=(date) => {
      let i = pointage.findIndex(obj => obj.date === date);
      if(i != -1){
      Alert.alert(date,'Entre : '+pointage[i]['temps_dentree']
      +'\nSortie : '+pointage[i]['date_de_sortie']
      +'\nTotale : '+pointage[i]['totale_heures']
      +'\nBreak : '+pointage[i]['break_heures']
      +'\nTotale Net : '+pointage[i]['net_heures']
      +'\nOvertime : '+pointage[i]['overtime'])
      }
      else{
        Alert.alert(date,'Il n y a aucun')
      }
    }
  

    return (
      <View style={styles.container}>
       <View style={styles.boxs}> 
        <TouchableOpacity style={styles.box1} onPress={()=>navigation.navigate('Historique')}>
          <Text style={styles.text1}><Ionicons name="md-tablet-landscape-outline" size={20} color={'#007acc'} />  Tableau</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} >
          <Text style={styles.text}><Ionicons name="ios-calendar-sharp" size={20} color={'#fff'} /> Calendrier</Text>
        </TouchableOpacity>
      </View> 
      <ScrollView>
        <Calendar
          style={styles.calendar}
          current={date()}
          firstDay={1}
          markedDates={newDaysObject}
          onDayPress={day => {
            Affichage(day.dateString);
          }}
        />
        <View style={styles.info}>
          <View style={styles.bloc1}>
            <View style={styles.color1}></View>
            <Text style={styles.text11}> Precences</Text>
          </View>
          <View style={styles.bloc1}>
            <View style={styles.color2}></View>
            <Text> Precences (Temps {"\n"} n'est pas terminer)</Text>
          </View>
          <View style={styles.bloc1}>
            <View style={styles.color3}></View>
            <Text style={styles.text11}> Absences</Text>
          </View>
          <View style={styles.bloc1}>
            <View style={styles.color4}></View>
            <Text style={styles.text11}> Weekend ou Employé ne {"\n"} respecte pas son pointage</Text>
          </View>
        </View>
        </ScrollView>
      </View>
    );

}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  color1:{
    backgroundColor:'#18B52F' , 
    padding: 15 , 
    width: 50 ,
  },
  color2:{
    backgroundColor:'#F59B09' , 
    padding: 15 , 
    width: 50 
  },
  color3:{
    backgroundColor:'#F33A0D' , 
    padding: 15 , 
    width: 50 
  },
  color4:{
    backgroundColor:'#fff' , 
    borderWidth: 2,
    padding: 15 , 
    width: 50 
  },
  text11:{
    marginTop: 5 , 
    color: 'black' 
  },
  bloc1:{
    flexDirection:'row' , 
    marginLeft: 20 ,
    marginTop: 11
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    color: '#fff' , 
    fontSize: 17 , 
    textAlign:'center' , 
    marginTop: 6
  },
  text1: {
    color: '#007acc' , 
    fontSize: 17 , 
    textAlign:'center' , 
    marginTop: 6
  },
  box: {
    borderWidth: 1,
    borderColor: '#007acc' ,
    backgroundColor : '#007acc' , 
    width: 140 ,
    height: 40 
  },
  box1: {
    borderWidth: 1,
    borderColor: '#007acc' ,
    width: 140 ,
    height: 40 
  },
  boxs: {
    height: 42 ,  
    marginTop:10 , 
    margin : 5 ,  
    justifyContent:'center',
    flexDirection:'row',  
  }
});