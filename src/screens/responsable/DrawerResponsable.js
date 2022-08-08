import React , {useState} from 'react' ; 
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import CustomDrawer from '../../component/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListeGroupe from './ListeGroupe';
import { useNavigation } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import GroupeMembre from '../employe/GroupeMembre';
import FirstPointage from '../pointage/FirstPointage';
import DemanderConge from '../employe/DemanderConge';
import Conges from '../employe/Conges';
import Horaire from '../employe/Horaire';
import Solde from '../employe/Solde';
import MembresConges from './MembresConges';
import TraitementConge from './TraitementConge';
import {useSelector, useDispatch} from 'react-redux'; 
import SecondPointage from '../pointage/SecondPointage';
import DisponibiliteActuelleEmploye from '../employe/DisponibiliteActuelleEmploye';
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
           name="HomeResponsable"
           component={HomeEmploye}
           options={{ drawerIcon: ({color}) => (<Ionicons name="home-outline" size={22} color={color} />),}}   
      />
      {verif()}
      <Drawer.Screen 
           name={"Disponibilité Actuelle"}
           component={DisponibiliteActuelleEmploye}
           options={{ drawerIcon: ({color}) => (<Ionicons name="ios-checkmark-done-sharp" size={25} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
      />
      <Drawer.Screen 
           name={"Listes des groupes"}
           component={ListeGroupe}
           options={{ drawerIcon: ({color}) => (<Ionicons name="list" size={22} color={color} />),}}
      />
      <Drawer.Screen 
        name={"Conges"}
        component={Conges}
        options={{ drawerIcon: ({color}) => (<Ionicons name="ios-calendar-sharp" size={20} color={color} />), headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }}
      />
      <Drawer.Screen 
        name={"Demander Conge"}
        component={DemanderConge}
        options={{ drawerIcon: ({color}) => (<Ionicons name="md-save-outline" size={20} color={color} />),}}
      />
      <Drawer.Screen 
           name={"Membre groupes"}
           component={GroupeMembre}
           options={{ drawerIcon: ({color}) => (<Ionicons name="md-list-circle-outline" size={22} color={color} />),}}
      />
      <Drawer.Screen 
        name={"Membres Conges"}
        component={MembresConges}
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

export default function DrawerResponsable() {


  return (
      <AppDrawer />
  );
}
