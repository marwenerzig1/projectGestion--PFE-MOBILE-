import React from 'react' ; 
import { StyleSheet, Text, TextInput } from 'react-native';


export default function Input({style ,...props}) {
  return (
      <TextInput  {...props} style={[style , styles.input]}   />
  );
}

const styles = StyleSheet.create({
  input:{ 
      backgroundColor: '#e8e8e8' , 
      width: '100%' ,  
      marginVertical: 20 , 
      padding: 18 , 
      borderRadius: 8 , 
  }

});
