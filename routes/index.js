import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profil from '../screens/profil';
import Connexion from '../screens/connexion';
import Inscription from '../screens/inscription';
import Bienvenue from '../screens/bienvenue';
import { navigationRef } from '../screens/bienvenue';
import Menu from '../screens/menu';
import Accueil from '../screens/accueil';
import Deconnexion from '../screens/deconnexion';
import Notifications from '../screens/notification';
import BottomTabs from '../navigation/bottom-tab';
import Gemini from '../screens/gemini';
import EditionFamille from '../screens/edition-famille';
import ListeFamille from '../screens/liste-famille';
import ListeAppareil from '../screens/liste-appareil';
import ListeContact from '../screens/liste-contact';
import Geolocalisation from '../screens/geolocalisation';
import AlerteSOS from '../screens/alerte-sos';
import LoginUser from '../screens/login-user';
import LoginPass from '../screens/login-pass';
import DetecteurMagnetique from '../screens/detecteur-magnetique';
import ZoneDangereuse from '../screens/zone-dangereuse';
import EditionZone from '../screens/edition-zone';
import AppStore from '../screens/app-store';
import DetecteurVitesse from '../screens/detecteur-vitesse';
import DetecteurParanormal from '../screens/detecteur-paranormal';
import SignalAlerte from '../screens/alerte-signal';
import EditionAlerte from '../screens/edition-alerte';
import Menaces from '../screens/menaces';



const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer ref={navigationRef}>

      <Stack.Navigator initialRouteName="Bienvenue">
        
          <Stack.Screen name='Bienvenue' component={Bienvenue} options={{ headerShown: false }} />
          <Stack.Screen name='Gemini' component={Gemini} options={{ headerShown: true }} />
          <Stack.Screen name='Accueil' component={Accueil} options={{ headerShown: false }} />
          <Stack.Screen name='Connexion' component={Connexion} options={{headerShown: true}}/>
          <Stack.Screen name='Inscription' component={Inscription} options={{headerShown: true}} />
          <Stack.Screen name='Profil' component={Profil} options={{headerShown: true}}/>
          <Stack.Screen name='Menu' component={Menu} options={{headerShown: true}}/>
          <Stack.Screen name='Notifications' component={Notifications} options={{headerShown: true}}/>
          <Stack.Screen name='Geolocalisation' component={Geolocalisation} options={{ headerShown: true }}/>
          <Stack.Screen name='Edition de famille' component={EditionFamille} options={{headerShown: true}}/>
          <Stack.Screen name='Familles' component={ListeFamille} options={{headerShown: true}}/>
          <Stack.Screen name='App store' component={AppStore} options={{headerShown: true}}/>
          <Stack.Screen name='Appareils' component={ListeAppareil} options={{headerShown: true}}/>
          <Stack.Screen name='Contacts' component={ListeContact} options={{headerShown: true}}/>
          <Stack.Screen name='Edition de zone' component={EditionZone} options={{headerShown: true}}/>
          <Stack.Screen name="Edition d'alerte" component={EditionAlerte} options={{headerShown: true}}/>
          <Stack.Screen name='Alerte SOS' component={AlerteSOS} options={{headerShown: true}}/>
          <Stack.Screen name='Detecteur magnetique' component={DetecteurMagnetique} options={{headerShown: true}}/>
          <Stack.Screen name='Detecteur paranormal' component={DetecteurParanormal} options={{headerShown: true}}/>
          <Stack.Screen name='Detecteur de vitesse' component={DetecteurVitesse} options={{headerShown: true}}/>
          <Stack.Screen name='Zone dangereuse' component={ZoneDangereuse} options={{headerShown: true}}/>
          <Stack.Screen name='Menaces' component={Menaces} options={{headerShown: true}}/>
          <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }}/>
          <Stack.Screen name='Login user' component={LoginUser} options={{headerShown: true}}/>
          <Stack.Screen name='Login pass' component={LoginPass} options={{headerShown: true}}/>
          <Stack.Screen name="Signal d'alerte" component={SignalAlerte} />
          <Stack.Screen name='Déconnexion' component={Deconnexion} options={{headerShown: true}}/>
          

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes