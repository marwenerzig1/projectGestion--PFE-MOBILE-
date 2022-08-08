import FirstPage from './screens/FirstPage';
import LoginScreen from './screens/LoginScreen';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerAdmin from './screens/admin/DrawerAdmin';
import DrawerResponsable from './screens/responsable/DrawerResponsable';
import DrawerEmploye from './screens/employe/DrawerEmploye';
import CustomDrawer from './component/CustomDrawer';
import EmployeAdmin from './screens/admin/EmployeAdmin';
import ResponsableAdmin from './screens/admin/ResponsableAdmin';
import TeamLeaderAdmin from './screens/admin/TeamLeaderAdmin';
import ModifierCompte from './screens/admin/ModifierCompte';
import AjouterCompte from './screens/admin/AjouterCompte';
import AjouterCompteResponsable from './screens/admin/AjouterCompteResponsable';
import { Provider } from 'react-redux' ; 
import {Store} from './component/Redux/store';
import AjouterGroupe from './screens/responsable/AjouterGroupe';
import ModifierGroupe from './screens/responsable/ModifierGroupe';
import MembreGroupe from './screens/responsable/MembreGroupe';
import InfoGroupe from './screens/employe/InfoGroupe';
import AjouterMembre from './screens/responsable/AjouterMembre';
import SecondPointage from './screens/pointage/SecondPointage';
import Historique from './screens/pointage/Historique';
import Absence from './screens/pointage/Absence';
import AjouterAbsence from './screens/pointage/AjouterAbsence';
import ResponsableRHAdmin from './screens/admin/ResponsableRHAdmin';
import AjouterCompteResponsableRH from './screens/admin/AjouterCompteResponsableRH';
import DrawerResponsableRH from './screens/responsableRH/DrawerResponsableRH';
import ModifierInformation from './screens/employe/ModifierInformation';
import ModifierInformationAdmin from './screens/admin/ModifierInformationAdmin';
import ChangeMotdepasse from './screens/employe/ChangeMotdepasse';
import ChangeMotdepasseAdmin from './screens/admin/ChangeMotdepasseAdmin';
import CalendrierEmploi from './screens/employe/CalendrierEmploi';
import TraitementConge from './screens/responsable/TraitementConge';
import DisponibiliteActuelle from './screens/admin/DisponibiliteActuelle';
import Horaire from './screens/employe/Horaire';
import EmploiDeTemps from './screens/admin/EmploiDeTemps';
import AdminConges from './screens/admin/AdminConges';
import TraitementCongeAdmin from './screens/admin/TraitementCongeAdmin';
import CalendrierAdmin from './screens/admin/CalendrierAdmin';
import Location from './screens/pointage/Location';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FirstPage" component={FirstPage} options={{headerShown: false}} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Connexion' }} />
      <Stack.Screen name="DrawerAdmin" component={DrawerAdmin} options={{headerShown: false}} />
      <Stack.Screen name="DrawerResponsable" component={DrawerResponsable} options={{headerShown: false}} />
      <Stack.Screen name="DrawerResponsableRH" component={DrawerResponsableRH} options={{headerShown: false}} />
      <Stack.Screen name="DrawerEmploye" component={DrawerEmploye} options={{headerShown: false}} />
      <Stack.Screen name="CustomDrawer" component={CustomDrawer} options={{headerShown: false}} />
      <Stack.Screen name="EmployeAdmin" component={EmployeAdmin} options={{headerShown: true},{ title: 'Liste des employés :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="ResponsableAdmin" component={ResponsableAdmin} options={{headerShown: true},{ title: 'Liste des Responsables :', headerStyle: {backgroundColor: '#8c8c8c'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="ResponsableRHAdmin" component={ResponsableRHAdmin} options={{headerShown: true},{ title: 'Liste des Responsables RH :', headerStyle: {backgroundColor: '#51AE35'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="TeamLeaderAdmin" component={TeamLeaderAdmin} options={{headerShown: true},{ title: 'Liste des équipes :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="ModifierCompte" component={ModifierCompte} options={{headerShown: true},{ title: 'Modifier Compte :' }} />
      <Stack.Screen name="AjouterCompte" component={AjouterCompte} options={{headerShown: true},{ title: 'Ajouter Compte :' }} />
      <Stack.Screen name="AjouterCompteResponsable" component={AjouterCompteResponsable} options={{headerShown: true},{ title: 'Ajouter Responsable :' }} />
      <Stack.Screen name="AjouterCompteResponsableRH" component={AjouterCompteResponsableRH} options={{headerShown: true},{ title: 'Ajouter Responsable RH :' }} />
      <Stack.Screen name="AjouterGroupe" component={AjouterGroupe} options={{headerShown: true},{ title: 'Ajouter Groupe :' }} />
      <Stack.Screen name="ModifierGroupe" component={ModifierGroupe} options={{headerShown: true},{ title: 'Modifier Groupe :' }} />
      <Stack.Screen name="MembreGroupe" component={MembreGroupe} options={{headerShown: true},{ title: 'Groupe :' }} />
      <Stack.Screen name="InfoGroupe" component={InfoGroupe} options={{headerShown: true},{ title: 'Groupe :' }} />
      <Stack.Screen name="AjouterMembre" component={AjouterMembre} options={{headerShown: true},{ title: 'Ajouter Membre :' }} />
      <Stack.Screen name="SecondPointage" component={SecondPointage} options={{headerShown: true},{ title: 'Second Pointage :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="Historique" component={Historique} options={{headerShown: true},{ title: 'Historique :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="Absence" component={Absence} options={{headerShown: true},{ title: 'Absences :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="AjouterAbsence" component={AjouterAbsence} options={{headerShown: true},{ title: 'Ajouter Absence :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="ModifierInformation" component={ModifierInformation} options={{headerShown: true},{ title: 'Modifier Compte', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="ModifierInformationAdmin" component={ModifierInformationAdmin} options={{headerShown: true},{ title: 'Modifier Compte', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="ChangeMotdepasse" component={ChangeMotdepasse} options={{headerShown: true},{ title: 'Change Mot de Passe', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="ChangeMotdepasseAdmin" component={ChangeMotdepasseAdmin} options={{headerShown: true},{ title: 'Change Mot de Passe', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="CalendrierEmploi" component={CalendrierEmploi} options={{headerShown: true},{ title: 'Calendrier :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="CalendrierAdmin" component={CalendrierAdmin} options={{headerShown: true},{ title: 'Calendrier :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="TraitementConge" component={TraitementConge} options={{headerShown: true},{ title: 'Traitement Conge :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="TraitementCongeAdmin" component={TraitementCongeAdmin} options={{headerShown: true},{ title: 'Traitement Conge :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="DisponibiliteActuelle" component={DisponibiliteActuelle} options={{headerShown: true},{ title: 'Disponibilité Actuelle :', headerStyle: {backgroundColor: '#194568'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="Horaire" component={Horaire} options={{headerShown: true},{ title: 'Horaires de travail :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="EmploiDeTemps" component={EmploiDeTemps} options={{headerShown: true},{ title: 'Pointage :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="AdminConges" component={AdminConges} options={{headerShown: true},{ title: 'Conges :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
      <Stack.Screen name="Location" component={Location} options={{headerShown: true},{ title: 'Maps :', headerStyle: {backgroundColor: '#007acc'} , headerTintColor: '#fff' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}




