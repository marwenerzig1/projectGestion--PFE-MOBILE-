import React from 'react' ; 
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export default function IconButton({title , style , onPress}) {
  return (
      <TouchableOpacity style={[style , styles.container]} onPress={onPress} >
          <Text style={styles.text}>{title.toUpperCase()}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{ 
      backgroundColor: '#3F3E40' , 
      width: '100%' , 
      alignItems : 'center' , 
      justifyContent : 'center' , 
      padding : 20 , 
      borderRadius : 8 , 
  } , 
  text: {
      color: 'white' , 
      fontWeight : '500' , 
      fontSize : 17 , 
  }

});
