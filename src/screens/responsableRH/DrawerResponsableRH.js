import React , {useState} from 'react' ; 
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import CustomDrawer from '../../component/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FirstPointage from '../pointage/FirstPointage';
import DemanderConge from '../employe/DemanderConge';
import TableauDeBord from '../admin/TableauDeBord';
import Conges from '../employe/Conges';
import Horaire from '../employe/Horaire';
import Solde from '../employe/Solde';
import {useSelector, useDispatch} from 'react-redux'; 
import SecondPointage from '../pointage/SecondPointage';
import HomeEmploye from '../employe/HomeEmploye';



const Drawer = createDrawerNavigator();
const AppDrawer = () => {
  const {pointage} = useSelector(state => state.userReducer);

  const verif = () => {
    if(pointage == 0){
      return <Drawer.Screen 
      name={"Pointage"}
      component={FirstPointage}
      options={{ drawerIcon: ({color}) => (<Ionicons name="clipboard-outline" size={25} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
      />
    }
    else{
      return <Drawer.Screen 
      name={"Pointage"}
      component={SecondPointage}
      options={{ drawerIcon: ({color}) => (<Ionicons name="clipboard-outline" size={25} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
      />
    }
  }
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
        name="Home Responsable RH "
        component={HomeEmploye}    
        options={{ drawerIcon: ({color}) => (<Ionicons name="home-outline" size={22} color={color} />),}}
      />
      {verif()}
      <Drawer.Screen 
        name={"Demander Conge"}
        component={DemanderConge}
        options={{ drawerIcon: ({color}) => (<Ionicons name="md-save-outline" size={20} color={color} />),}}
      />
      <Drawer.Screen 
          name={"Conges"}
          component={Conges}
          options={{ drawerIcon: ({color}) => (<Ionicons name="ios-calendar-sharp" size={20} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
      />
      <Drawer.Screen 
          name={"Horaire de travail"}
          component={Horaire}
          options={{ drawerIcon: ({color}) => (<Ionicons name="ios-stopwatch-outline" size={25} color={color} />), headerTintColor: 'black'}}
      />
      <Drawer.Screen 
           name={"Solde Congé"}
           component={Solde}
           options={{ drawerIcon: ({color}) => (<Ionicons name="md-wallet-outline" size={25} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
      />
    </Drawer.Navigator>
  );
} 

export default function DrawerResponsableRH() {
  
  return (
      <AppDrawer />
  );
}