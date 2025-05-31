import React , {useEffect, useState, useContext, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import { MaterialCommunityIcons ,Feather} from '@expo/vector-icons';
import { GlobalContext } from '../global/GlobalState';
import { GlobalCarte } from '../global/GlobalCarte';
import dayjs from 'dayjs';


export default function FactureTransactions({navigation,route,list}){
    
   
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const {item} = route.params;

  const [user, setUser] = useContext(GlobalContext);
   const [carte, setCarte] = useContext(GlobalCarte);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getTransaction(); // Appeler la fonction de récupération des données
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };
  
  
  useEffect(()=>{
    navigation.setOptions({title: item.titre_facture});
      // Exécuter la fonction avec cache
   const delay = 10000; // Définir le délai à 1 minute
   getTransaction(); 
   // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
   const intervalId = setInterval(getTransaction2, delay);
   // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
   return () => clearInterval(intervalId);
  },[])
  
  
  
  // Transaction

  const getTransaction = async () => {
    setIsLoading(true);
   try {
    const response = await fetch(`https://adores.cloud/api/liste-transaction-facture.php?matricule=${item.numero_facture}`, {
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

  
  const getTransaction2 = async () => {
   try {
    const response = await fetch(`https://adores.cloud/api/liste-transaction-facture.php?matricule=${item.numero_facture}`, {
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
  
  
      // api recherche
    
      const searchItems = useMemo(() => {
        return () => {
      const filteredData = data.filter(item =>
        item.type_transaction.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.montant_total.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date_transaction.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.heure_transaction.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.etat_transaction.toLowerCase().includes(searchTerm.toLowerCase())
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
    <View style={styles.container}>

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

        {selectedTransaction ? (
  // ✅ Détails de la transaction
  <View style={{
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 16,
  margin: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 5
}}>
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
    <MaterialCommunityIcons name="file-document-outline" size={28} color="#2593B6" />
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#333' }}>
      Détails de la transaction
    </Text>
  </View>

  <View style={{ marginBottom: 10 }}>
    <Text style={{ fontWeight: '600', color: '#555' }}>Type :</Text>
    <Text style={{ fontSize: 16, color: '#000' }}>{selectedTransaction.type_transaction}</Text>
  </View>

  <View style={{ marginBottom: 10 }}>
    <Text style={{ fontWeight: '600', color: '#555' }}>Date :</Text>
    <Text style={{ fontSize: 16, color: '#000' }}>{dayjs(selectedTransaction.date_transaction).format('DD-MM-YYYY')}</Text>
  </View>

  <View style={{ marginBottom: 10 }}>
    <Text style={{ fontWeight: '600', color: '#555' }}>Heure :</Text>
    <Text style={{ fontSize: 16, color: '#000' }}>{selectedTransaction.heure_transaction}</Text>
  </View>

  <View style={{ marginBottom: 10 }}>
    <Text style={{ fontWeight: '600', color: '#555' }}>Montant :</Text>
    <Text style={{ fontSize: 16, color: '#000' }}>
      {parseFloat(selectedTransaction.montant_total).toLocaleString("fr-FR")} F
    </Text>
  </View>

  <View style={{ marginBottom: 10 }}>
    <Text style={{ fontWeight: '600', color: '#555' }}>État :</Text>
    <Text style={{ fontSize: 16, color: '#000' }}>{selectedTransaction.etat_transaction}</Text>
  </View>

  <View style={{ marginBottom: 20 }}>
    <Text style={{ fontWeight: '600', color: '#555' }}>Numéro :</Text>
    <Text style={{ fontSize: 16, color: '#000' }}>{selectedTransaction.numero_transaction}</Text>
  </View>

  <TouchableOpacity
    onPress={() => setSelectedTransaction(null)}
    style={{
      backgroundColor: '#2593B6',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center'
    }}>
    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
      Retour à la liste
    </Text>
  </TouchableOpacity>
</View>

) : (
  // ✅ Liste des transactions
  <FlatList
    data={searchTerm ? searchItems() : data}
    keyExtractor={item => item.numero_transaction}
    renderItem={({ item }) => (
      <TouchableOpacity style={styles.card} onPress={() => setSelectedTransaction(item)}>
        <View style={[styles.cardIcon, { backgroundColor: "#2593B6" }]}>
          <MaterialCommunityIcons color="white" name='card-account-details' size={20} />
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.type_transaction}</Text>
          <Text style={styles.cardCategory}>
            {dayjs(item.date_transaction).format('DD-MM-YYYY')} {item.heure_transaction} {item.etat_transaction}
          </Text>
          <Text style={styles.cardCategory2}>{parseFloat(item.montant_total).toLocaleString("fr-FR")} F</Text>
        </View>
      </TouchableOpacity>
    )}
  />
)}

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Fond blanc
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
    color: '#2593B6',
  },
  cardPrice: {
    marginLeft: 'auto',
    fontSize: 17,
    fontWeight: '700',
    color: '#2593B6',
  },
});