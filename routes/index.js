import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profil from '../screens/profil';
import Connexion from '../screens/connexion';
import Inscription from '../screens/inscription';
import Bienvenue from '../screens/bienvenue';
import Menu from '../screens/menu';
import Exemple from '../screens/exemple';
import Accueil from '../screens/accueil';
import Rechargement from '../screens/rechargement-carte';
import Retrait from '../screens/retrait-carte';
import Transactions from '../screens/liste-transaction';
import Formations from '../screens/liste-formation';
import Societe from '../screens/liste-societe';
import Partenaires from '../screens/liste-partenaire';
import Prestations from '../screens/liste-prestation';
import Transfert from '../screens/transfert-carte';
import Deconnexion from '../screens/deconnexion';
import Factures from '../screens/liste-facture';
import EditionFacture from '../screens/edition-facture';
import Notifications from '../screens/notification';
import FactureTransactions from '../screens/liste-transaction-facture';
import ReleveCarte from '../screens/releve-carte';
import AideFinanciere from '../screens/aide-financiere';
import RegistreControle from '../screens/registre-controle';
import Gemini from '../screens/gemini';
import Categories from '../screens/liste-categorie';
import Videos from '../screens/liste-video';
import Diplomes from '../screens/diplome-pdf';
import BottomTabs from '../navigation/bottom-tab';



const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Bienvenue">
        

      <Stack.Screen name='Exemple' component={Exemple} options={{ headerShown: false }} />
          <Stack.Screen name='Accueil' component={Accueil} options={{ headerShown: false }} />
          <Stack.Screen name='Connexion' component={Connexion}/>
          <Stack.Screen name='Inscription' component={Inscription} />
          <Stack.Screen name='Profil' component={Profil} />
          <Stack.Screen name='Menu' component={Menu} />
          <Stack.Screen name='Bienvenue' component={Bienvenue} options={{ headerShown: false }} />
          <Stack.Screen name='Rechargement' component={Rechargement} />
          <Stack.Screen name='Retrait' component={Retrait} />
          <Stack.Screen name='Transactions' component={Transactions} />
          <Stack.Screen name='Facture transactions' component={FactureTransactions} />
          <Stack.Screen name='Formations' component={Formations} />
          <Stack.Screen name='Categories' component={Categories} />
          <Stack.Screen name='Videos' component={Videos} />
          <Stack.Screen name='Diplomes' component={Diplomes} />
          <Stack.Screen name='Societe' component={Societe} />
          <Stack.Screen name='Partenaires' component={Partenaires} />
          <Stack.Screen name='Prestations' component={Prestations} />
          <Stack.Screen name='Transfert' component={Transfert} />
          <Stack.Screen name='Factures' component={Factures} />
          <Stack.Screen name='Edition de facture' component={EditionFacture} />
          <Stack.Screen name='Notifications' component={Notifications} />
          <Stack.Screen name='Releve de carte' component={ReleveCarte} />
          <Stack.Screen name='Aide financiere' component={AideFinanciere} />
          <Stack.Screen name='Registre de controle' component={RegistreControle} />
          <Stack.Screen name='Gemini' component={Gemini} />
          <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }}/>
          <Stack.Screen name='Deconnexion' component={Deconnexion} />



      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes