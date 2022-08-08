import React from 'react' ; 
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeEmploye from './HomeEmploye';
import CustomDrawer from '../../component/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GroupeMembre from './GroupeMembre';
import FirstPointage from '../pointage/FirstPointage';
import CalendrierEmploi from './CalendrierEmploi';
import DemanderConge from './DemanderConge';
import Conges from './Conges';
import Horaire from './Horaire';
import Notification from './Notification';
import Solde from './Solde';
import {useSelector, useDispatch} from 'react-redux'; 
import SecondPointage from '../pointage/SecondPointage';
import DisponibiliteActuelleEmploye from './DisponibiliteActuelleEmploye';



const DrawerEm = createDrawerNavigator();


const AppDrawerEm = () => {
     const {pointage} = useSelector(state => state.userReducer);

     const verif = () => {
       if(pointage == 0){
         return <DrawerEm.Screen 
         name={"Pointage"}
         component={FirstPointage}
         options={{ drawerIcon: ({color}) => (<Ionicons name="clipboard-outline" size={25} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
         />
       }
       else{
         return <DrawerEm.Screen 
         name={"Pointage"}
         component={SecondPointage}
         options={{ drawerIcon: ({color}) => (<Ionicons name="clipboard-outline" size={25} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
         />
       }
     }
  return (
    <DrawerEm.Navigator  
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      drawerActiveBackgroundColor: '#8c8c8c',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        fontSize: 15,
      },}}
        >
      <DrawerEm.Screen 
           name="Home Employe"
           component={HomeEmploye}    
           options={{ drawerIcon: ({color}) => (<Ionicons name="home-outline" size={22} color={color} />),}}
      />
      {verif()}
      <DrawerEm.Screen 
           name={"Disponibilité Actuelle"}
           component={DisponibiliteActuelleEmploye}
           options={{ drawerIcon: ({color}) => (<Ionicons name="ios-checkmark-done-sharp" size={25} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
      />
      <DrawerEm.Screen 
           name={"Listes des groupes"}
           component={GroupeMembre}
           options={{ drawerIcon: ({color}) => (<Ionicons name="md-list-circle-outline" size={22} color={color} />),}}
      />
      <DrawerEm.Screen 
           name={"Calendrier"}
           component={CalendrierEmploi}
           options={{ drawerIcon: ({color}) => (<Ionicons name="ios-calendar-sharp" size={22} color={color} />),}}
      />
     <DrawerEm.Screen 
           name={"Conges"}
           component={Conges}
           options={{ drawerIcon: ({color}) => (<Ionicons name="md-calendar-outline" size={22} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
      />
      <DrawerEm.Screen 
           name={"Demande d'un congé"}
           component={DemanderConge}
           options={{ drawerIcon: ({color}) => (<Ionicons name="md-save-outline" size={20} color={color} />),}}
      />
      <DrawerEm.Screen 
           name={"Horaire de travail"}
           component={Horaire}
           options={{ drawerIcon: ({color}) => (<Ionicons name="ios-stopwatch-outline" size={25} color={color} />), headerTintColor: 'black'}}
      />
      <DrawerEm.Screen 
           name={"Solde Congé"}
           component={Solde}
           options={{ drawerIcon: ({color}) => (<Ionicons name="md-wallet-outline" size={25} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
      />
      <DrawerEm.Screen 
           name={"Notification"}
           component={Notification}
           options={{ drawerIcon: ({color}) => (<Ionicons name="ios-stopwatch-outline" size={25} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
      />

    </DrawerEm.Navigator>
  );
} 

export default function DrawerEmploye() {
  return (
      <AppDrawerEm />
  );
}
