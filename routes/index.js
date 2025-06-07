import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profil from '../screens/profil';
import Connexion from '../screens/connexion';
import Inscription from '../screens/inscription';
import Bienvenue from '../screens/bienvenue';
import Menu from '../screens/menu';
import Accueil from '../screens/accueil';
import Formations from '../screens/liste-formation';
import Deconnexion from '../screens/deconnexion';
import Notifications from '../screens/notification';
import RegistreControle from '../screens/registre-controle';
import Categories from '../screens/liste-categorie';
import Videos from '../screens/liste-video';
import Diplomes from '../screens/diplome-pdf';
import BottomTabs from '../navigation/bottom-tab';
import GeoRepere from '../screens/geo-repere';
import Gemini from '../screens/gemini';
import GeoRecherche from '../screens/geo-recherche';
import AlerteBatterie from '../screens/alerte-batterie';
import EditionFacture from '../screens/edition-facture';
import Factures from '../screens/liste-facture';
import BackgroundLocationManager from '../navigation/background';
import EditionFamille from '../screens/edition-famille';
import ListeFamille from '../screens/liste-famille';
import ListeDiplome from '../screens/liste-diplome';
import ListeAppareil from '../screens/liste-appareil';



const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Bienvenue">
        
          <Stack.Screen name='Bienvenue' component={Bienvenue} options={{ headerShown: false }} />
          <Stack.Screen name='Gemini' component={Gemini} options={{ headerShown: true }} />
          <Stack.Screen name='Accueil' component={Accueil} options={{ headerShown: false }} />
          <Stack.Screen name='Connexion' component={Connexion} options={{headerShown: true}}/>
          <Stack.Screen name='Inscription' component={Inscription} options={{headerShown: true}} />
          <Stack.Screen name='Profil' component={Profil} options={{headerShown: true}}/>
          <Stack.Screen name='Menu' component={Menu} options={{headerShown: true}}/>
          <Stack.Screen name='Formations' component={Formations} options={{headerShown: true}}/>
          <Stack.Screen name='Categories' component={Categories} options={{headerShown: true}}/>
          <Stack.Screen name='Videos' component={Videos} options={{headerShown: true}}/>
          <Stack.Screen name='Diplomes' component={Diplomes} options={{headerShown: true}}/>
          <Stack.Screen name='Liste des diplomes' component={ListeDiplome} options={{headerShown: true}}/>
          <Stack.Screen name='Notifications' component={Notifications} options={{headerShown: true}}/>
          <Stack.Screen name='Registre de controle' component={RegistreControle} options={{headerShown: true}}/>
          <Stack.Screen name='Localisation' component={GeoRepere} options={{ headerShown: true }}/>
          <Stack.Screen name='Geolocalisation' component={GeoRecherche} options={{ headerShown: true }}/>
          <Stack.Screen name='Alerte batterie' component={AlerteBatterie} options={{ headerShown: true }}/>
          <Stack.Screen name='Factures' component={Factures} options={{ headerShown: true }}/>
          <Stack.Screen name='Edition de facture' component={EditionFacture} options={{headerShown: true}}/>
          <Stack.Screen name='Edition de famille' component={EditionFamille} options={{headerShown: true}}/>
          <Stack.Screen name='Familles' component={ListeFamille} options={{headerShown: true}}/>
          <Stack.Screen name='Appareils' component={ListeAppareil} options={{headerShown: true}}/>
          <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }}/>
          <Stack.Screen name='Arriere plan' component={BackgroundLocationManager} options={{ headerShown: true }}/>
          <Stack.Screen name='Déconnexion' component={Deconnexion} options={{headerShown: true}}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes