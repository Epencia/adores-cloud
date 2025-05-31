import React , {useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons ,Feather} from '@expo/vector-icons';

const data = [
  {
    id: '1',
    image: 'credit-card-outline',
    titre: 'MON COMPTE',
    libelle: "Suivre l'activité de son compte",
    src : 'Accueil'
  },
  {
    id: '2',
    image: 'account-outline',
    titre: 'MON PROFIL',
    libelle: 'Voir votre profil utilisateur',
    src : 'Profil'
  },
  {
    id: '6',
    image: 'account-cash-outline',
    titre: 'RÉCHARGEMENT',
    libelle: 'Déposer des fonds',
    src : 'Rechargement'
  },
  {
    id: '7',
    image: 'cash',
    titre: 'RETRAIT',
    libelle: 'Rétirer des fonds',
    src : 'Retrait'
  },
  {
    id: '8',
    image: 'bank-outline',
    titre: 'TRANSFERT',
    libelle: 'Envoyer des fonds',
    src : 'Transfert'
  },
  {
    id: '10',
    image: 'card-account-details-outline',
    titre: 'TRANSACTIONS',
    libelle: 'Voir toutes vos transactions',
    src : 'Transactions'
  },
  {
    id: '11',
    image: 'numeric',
    titre: 'RELEVÉ DE CARTE',
    libelle: "Voir mon relevé de carte",
    src : 'Releve de carte'
  },
  {
    id: '13',
    image: 'diamond-stone',
    titre: "AIDE FINANCIÈRE",
    libelle: "Bénéficier d'une aide financière",
    src : "Aide financiere"
  },
  {
    id: '14',
    image: 'credit-card-minus-outline',
    titre: "FACTURES",
    libelle: "Voir la liste des factures",
    src : 'Factures'
  },
  {
    id: '17',
    image: 'store-outline',
    titre: "PARTENAIRES",
    libelle: "Découvrir nos partenaires",
    src : 'Partenaires'
  },
  {
    id: '18',
    image: 'bag-personal-outline',
    titre: "FORMATIONS",
    libelle: "Découvrir nos articles vendus",
    src : 'Categories'
  },
   {
    id: '19',
    image: 'bag-personal-outline',
    titre: "DIPLOMES",
    libelle: "Découvrir nos articles vendus",
    src : 'Diplomes'
  },

];

export default function Menu({navigation}) {

  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.titre.toLowerCase().includes(searchText.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText.toLowerCase())   
  );


  useEffect(()=>{
    navigation.setOptions({ title: 'Menu' });
},[])

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate(item.src)}>
          <View style={styles.cardIcon}>
            <MaterialCommunityIcons color="#000" name={item.image} size={24}/>
                    </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.titre}</Text>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>{item.libelle}</Text>
            </View>
          </View>
        </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Fond blanc
    padding: 16,
    //marginBottom:20
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8, // Bordures arrondies
    backgroundColor: 'white', // Fond gris clair
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  dataText: {
    fontSize: 14,
    color: 'gray',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
    marginRight: 16,
  },
});
