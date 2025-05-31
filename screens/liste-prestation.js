import React , {useEffect, useState, useContext, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput,Alert} from 'react-native';
import { MaterialCommunityIcons,Feather } from '@expo/vector-icons';


export default function Prestations({navigation,route}) {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [contact, setContact] = useState([]);

  const {item} = route.params;

  const handleRefresh = () => {
    setRefreshing(true);
    getPrestation();
    setRefreshing(false);
  };

  useEffect(() => {

    navigation.setOptions({title: item.nom_societe});
    const delay = 10000;
    getPrestation();
    const intervalId = setInterval(getPrestation2, delay);
    return () => clearInterval(intervalId);
  }, []);

  const getPrestation = async () => {
    setIsLoading(true);
    try {
        const response = await fetch(`https://adores.cloud/api/liste-prestation.php?societe=${item.code_societe}`, {
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
  };

  const getPrestation2 = async () => {
    try {
      const response = await fetch(`https://adores.cloud/api/liste-prestation.php?societe=${item.code_societe}`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      setError(error);
    }
  };



    const searchItems = useMemo(() => {
    return () => {
      const filteredData = data.filter(item =>
        (item.reference || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.designation || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.prix || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.etat || '').toLowerCase().includes(searchTerm.toLowerCase())
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

        <FlatList
      data={searchTerm ? searchItems() : data}
      keyExtractor={item=>item.reference} 
      renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => Alert.alert('Description',item.description)}>
              <View style={[styles.cardIcon, { backgroundColor: "#2593B6" }]}>
                <MaterialCommunityIcons color="white" name='shopping-outline' size={20} />
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.designation}</Text>
                <Text style={styles.cardCategory}>Prix : {parseFloat(item.prix).toLocaleString("fr-FR")} F</Text>
                <Text style={styles.cardCategory2}>Voir plus...</Text>
              </View>


             
            </TouchableOpacity>
         )}/>


 <View style={styles.overlay}>
     <View style={styles.footer}>
       <TouchableOpacity onPress={() => { Linking.openURL(`tel:${item.telephone_societe}`); }} style={{ flex: 1 }}>
         <View style={styles.btnAppel}>
           <MaterialCommunityIcons color="#fff" name="phone" size={25} />
         </View>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => { Linking.openURL(`sms:${item.telephone_societe}`); }} style={{ flex: 1, paddingHorizontal: 8 }}>
         <View style={styles.btnSms}>
           <MaterialCommunityIcons color="#fff" name="message-processing" size={25} />
         </View>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => { Linking.openURL(`https://wa.me/${item.telephone_societe}`); }} style={{ flex: 1 }}>
         <View style={styles.btnWhatsapp}>
           <MaterialCommunityIcons color="#fff" name="whatsapp" size={25} />
         </View>
       </TouchableOpacity>
     </View>
   </View>
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
  btnWhatsapp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#4FB048',
    borderColor: '#4FB048',
    height: 52,
    //marginRight:10
  },
  btnAppel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#D64430',
    borderColor: '#D64430',
    height: 52,
    //marginRight:10
  },
  btnSms: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
    height: 52,
    //marginRight:10
  },
});