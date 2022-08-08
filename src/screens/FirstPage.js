import React from 'react' ; 
import { StyleSheet, Text, View , Image } from 'react-native';
import IconButton from '../component/IconButton';

export default function FirstPage({navigation}) {
  return (
    <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.img} />
        <Text style={styles.text}>Application dédiée au pointage des ressources et la gestion des conges .</Text>
        <Text style={styles.text2}>Page de connexion</Text>
        <Text style={styles.text3}>Connectez-vous à partir d'ici pour accéder.</Text>
        <IconButton title={'suivant'} style={styles.btn} onPress={() => navigation.navigate('LoginScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black' , 
    flex:1 , 
    padding : 20 ,   
    justifyContent : 'center'
  }, 
  text: {
      color: 'white' , 
      fontSize: 22 , 
      paddingTop : 8 , 
  },
  text2: {
      color: 'white' , 
      fontSize: 20 , 
      paddingTop : 20 , 
  },
  text3: {
      color: 'white' , 
      fontWeight: '500' ,
      paddingTop : 12 , 
  },
  img: {
    width: "100%" ,
    height: "5%" ,
    marginLeft : 10
  },
  btn: {
    marginTop: 50 , 
  }

});
