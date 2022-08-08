import React,{ Component } from 'react' ; 
import { StyleSheet, Text, View , BackHandler, Alert} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TableauDeBord from './TableauDeBord' ;  
import CustomDrawer from '../../component/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Horaire from '../employe/Horaire';
import ConfigurationPointage from './ConfigurationPointage';


const Drawer = createDrawerNavigator();


const AppDrawer = () => {
  return (
    <Drawer.Navigator  
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      drawerActiveBackgroundColor: '#8c8c8c',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        fontSize: 15,
      },}}
        >
      <Drawer.Screen 
           name="Tableau De Bord"
           component={TableauDeBord}    
           options={{ drawerIcon: ({color}) => (<Ionicons name="home-outline" size={22} color={color} />),}}
      />
      <Drawer.Screen 
          name={"Horaire de travail"}
          component={Horaire}
          options={{ drawerIcon: ({color}) => (<Ionicons name="ios-stopwatch-outline" size={25} color={color} />), headerTintColor: 'black'}}
      />
      <Drawer.Screen 
          name={"Configuration du pointage"}
          component={ConfigurationPointage}
          options={{ drawerIcon: ({color}) => (<Ionicons name="hammer-outline" size={25} color={color} />), headerTintColor: 'black'}}
      />
    </Drawer.Navigator>
  );
} 

export default class DrawerAdmin extends Component {
  

  handleBackButton=()=>{
    Alert.alert(
      'Exit from App' , 
      'Do you want to exit from App' , 
      [
        { text:'Yes' , onPress : () =>  BackHandler.exitApp() }, 
        { text:'No' , onPress: () => console.log('No Pressed') }
      ],
    );
    return true ; 
  }
  
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton)
  }
  
  componentWillunMount(){
    BackHandler.removeEventListener('hardwareBackPress',this.handleBackButton);
  }
  render(){
    return (
      <AppDrawer />
  );
  }
}
