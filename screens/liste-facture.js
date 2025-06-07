import React , {useEffect, useState, useContext, useMemo } from 'react';
import {StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput,Alert,Share} from 'react-native';
import { MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import { GlobalContext } from '../global/GlobalState';
import { GlobalCarte } from '../global/GlobalCarte';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Factures({navigation,item}){
    
   
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

   const [lien, setLien] = useState('https://adores.cloud');

  const [user, setUser] = useContext(GlobalContext);
  const [carte, setCarte] = useContext(GlobalCarte);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getFacture(); // Appeler la fonction de récupération des données
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };


  // toogle
   const [expandedItems, setExpandedItems] = useState([]);
   const toggleItem = (itemId) => {
     if (expandedItems.includes(itemId)) {
       setExpandedItems(expandedItems.filter(id => id !== itemId));
     } else {
       setExpandedItems([...expandedItems, itemId]);
     }
   };
  
  
  useEffect(()=>{
      // Exécuter la fonction avec cache
   const delay = 10000; // Définir le délai à 1 minute
   getFacture(); 
   // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
   const intervalId = setInterval(getFacture2, delay);
   // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
   return () => clearInterval(intervalId);
  },[])
  
  
  
  // Transaction

  const getFacture = async () => {
    setIsLoading(true);
   try {
    const response = await fetch(`https://adores.cloud/api/liste-facture.php?matricule=${carte[0].numero_carte}`, {
      headers: {
        //'Cache-Control': 'no-cache',
      },
    });
    const newData = await response.json();
    setData(newData);
   setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    setError(error);
  }
  
  }
  
  // In transactions entrees

  
  const getFacture2 = async () => {
   try {
    const response = await fetch(`https://adores.cloud/api/liste-facture.php?matricule=${carte[0].numero_carte}`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    const newData = await response.json();
    setData(newData);
  } catch (error) {
    setError(error);
  }
  
  }
  
  // partager
  const handlePartager = async (liens) => {
    try {
      const result = await Share.share({
        title: 'Règlement de facture',
        message: `${liens}`,
        url: liens,
      });

      if (result.action === Share.sharedAction) {
        //console.log('Partagé');
      } else if (result.action === Share.dismissedAction) {
        //console.log('Partage annulé');
      }
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  // fin partager
  
      // api recherche
    
      const searchItems = useMemo(() => {
  return () => {
    const filteredData = data.filter(item =>
      (item.numero_facture || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.titre_facture || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.date_facture || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.montant || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.client_identite || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.client_telephone || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredData;
  };
}, [data, searchTerm]);

  // api recherche
  
      // Erreur et Chargement --debut--
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    }
  
    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
          <MaterialCommunityIcons color="#266EF1" name="access-point-off" size={150}/>
          <Text style={{ fontSize: 18,marginRight:10,marginLeft:10,marginBottom:10}}>
          Pas de connexion internet !
          </Text>
          <TouchableOpacity onPress={handleRefresh} style={{ backgroundColor: '#0099cc',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 5,}}>
            <Text style={{ color: 'white',fontSize: 16,fontWeight: 'bold',textAlign: 'center', }}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      );
    }
  // Erreur et Chargement --fin--
  
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

    {data.length > 0 ? (
     <View style={styles.searchBar}>
     <Feather name="search" size={24} color="gray" style={styles.searchIcon} />
     <TextInput
       style={styles.input}
       placeholder="Rechercher..."
       onChangeText={text => setSearchTerm(text)}
    value={searchTerm}
     />
    </View>
    ) : (
        <View style={{marginTop: 25, marginRight:15,marginLeft:15,
            elevation:5,backgroundColor:'white',borderRadius:6,marginBottom:5,
          }}>
          <Text style={{marginTop: 10, marginRight:15,marginLeft:15,
            marginBottom:15,color:'#888',textAlign:'center'
          }}>Aucune donnée disponible</Text>
          </View>
        )}

         <FlatList
              data={searchTerm ? searchItems() : data}
              keyExtractor={(item) => item.numero_facture}
              renderItem={({item}) => (
                <View style={styles.experienceItem}>
                  
                <TouchableOpacity  onPress={() => toggleItem(item.numero_facture)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>


        <View style={[styles.cardIcon, { backgroundColor: "#0A84FF" }]}>
                <MaterialCommunityIcons color="white" name='book-open-page-variant-outline' size={20} />
              </View>
         
        
             
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.titre_facture}</Text>
                  <Text style={styles.userCode}>Montant :{item.montant || 'N/A'} F</Text>
                  <Text style={styles.cardCategory2}>{item.client_identite || 'N/A'} * {item.client_telephone || 'N/A'}</Text>
                </View>
                </View>
                {expandedItems.includes(item.numero_facture) && (
                  <View>
                <Text style={styles.description}>N° Facture : {item.numero_facture}</Text>
                <Text style={styles.description}>Client : {item.client_identite}</Text>
                <Text style={styles.description}>Téléphone : {item.client_telephone}</Text>
                <Text style={styles.description}>Avance : {parseFloat(item.avance).toLocaleString("fr-FR")} F</Text>
                <Text style={styles.description}>Reste : {parseFloat(item.reste).toLocaleString("fr-FR")} F</Text>
                <Text style={styles.description}>Encaissé : {parseFloat(item.encaisse).toLocaleString("fr-FR")} F</Text>
                {item.avance < item.montant && (
                  <>
                <View style={{marginBottom:20}}></View>
                <TouchableOpacity style={styles.followButton2} onPress={() => handlePartager(`https://adores.cloud/transaction/paiement/${item.numero_facture}`)}>
              <Text style={styles.followingButtonText}>Partager le lien</Text>
            </TouchableOpacity>
            </>
            )}
                <View style={{marginBottom:10}}></View>
            <TouchableOpacity style={styles.followButton} onPress={() => navigation.navigate("Edition de facture",{item})}>
              <Text style={styles.followButtonText}>Modifier la facture</Text>
            </TouchableOpacity>
            <View style={{marginBottom:10}}></View>
            <TouchableOpacity style={styles.followButton2} onPress={() => navigation.navigate("Facture transactions",{item})}>
              <Text style={styles.followingButtonText}>Voir les versements</Text>
            </TouchableOpacity>
                </View>
              )}
           
              </TouchableOpacity>
              </View>
        
        
              )}/>

     

           <View style={styles.overlay}>
              <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Edition de facture')} style={{ flex: 1 }}>
                  <View style={styles.btn}>
                    <MaterialCommunityIcons color="#fff" name="pencil" size={20} />
                    <Text style={styles.buttonText}>Editer une facture</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Fond blanc
    //marginBottom:20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white', // Fond blanc pour la barre de recherche
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  searchIcon: {
    padding: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
     marginRight: 16,
  },
  cardBody: {
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#131313',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7f7f7f',
  },
  cardCategory2: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0A84FF',
  },
  cardPrice: {
    marginLeft: 'auto',
    fontSize: 17,
    fontWeight: '700',
    color: '#0A84FF',
  },
  // OVERLAY
   overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  footer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#0A84FF',
    borderColor: '#0A84FF',
    height: 50,
    //marginRight:10
  },
   button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#3C64B1', // Couleur Hostinger / personnalisée
    borderColor: '#3C64B1',
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft:5
  },
  // Affichage en bas
  experienceItem: {
    marginBottom: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:12,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 5,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    //fontWeight: 'bold',
  },
  userCode: {
    fontSize: 14,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#0A84FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButton2: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:"#0A84FF"
  },
  followingButton: {
    backgroundColor: '#0A84FF',
  },
  followButtonText: {
    color: 'white',
    fontWeight:"bold"
  },
  followingButtonText: {
    color: '#0A84FF',
    fontWeight:"bold"
  },
  description: {
    fontSize: 15,
    textAlign: 'justify',
    marginTop:5
  },
});