import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Button,
  Platform,
  Pressable,TouchableOpacity,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GlobalContext } from '../global/GlobalState';
import { GlobalCarte } from '../global/GlobalCarte';

export default function ReleveCarte() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [data, setData] = useState([]);

  const [user] = useContext(GlobalContext);
  const [carte] = useContext(GlobalCarte);

  // Fonction pour formater une date en AAAAMMJJ
  const formatDateToAAAAMMJJ = (date) =>
    date.toISOString().slice(0, 10).replace(/-/g, '');

  const formatDateForDisplay = (date) =>
    date.toLocaleDateString('fr-FR');

  const handleShowReleve = async () => {
    if (!startDate || !endDate) {
      Alert.alert('Erreur', 'Veuillez sélectionner les deux dates.');
      return;
    }

    const formatStartDate = formatDateToAAAAMMJJ(startDate);
    const formatEndDate = formatDateToAAAAMMJJ(endDate);

    try {
      const response = await fetch(
        `https://adores.cloud/api/liste-facture-periode.php?matricule=${carte[0].numero_carte}&dd=${formatStartDate}&df=${formatEndDate}`
      );
      const newData = await response.json();
      if (Array.isArray(newData)) {
        setData(newData);
      } else {
        setData([]);
        Alert.alert('Info', 'Aucune donnée trouvée.');
      }
    } catch (error) {
      Alert.alert('Erreur', "Échec de la récupération des données.");
    }
  };

  return (
    <View style={styles.container}>
    <ScrollView>
      <Text style={styles.title}>👤 {carte[0].nom_prenom_carte || ''}</Text>
      <Text style={styles.subtitle}>📄 {carte[0].numero_carte}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📆 Période à afficher</Text>

        {/* Date de début */}
        <Pressable onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
          <Text>
            {startDate ? `Début : ${formatDateForDisplay(startDate)}` : 'Sélectionner la date de début'}
          </Text>
        </Pressable>
        {showStartPicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartPicker(Platform.OS === 'ios');
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}

        {/* Date de fin */}
        <Pressable onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
          <Text>
            {endDate ? `Fin : ${formatDateForDisplay(endDate)}` : 'Sélectionner la date de fin'}
          </Text>
        </Pressable>
        {showEndPicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndPicker(Platform.OS === 'ios');
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}


        <TouchableOpacity style={styles.button} onPress={handleShowReleve}>
                  <Text style={styles.buttonText}>Afficher le relevé</Text>
                </TouchableOpacity>
      </View>

      {/* Relevé des opérations */}
      {data.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📑 Détails des opérations</Text>

          <ScrollView horizontal>
            <View>
              <View style={styles.tableHeader}>
                <Text style={styles.cellHeader}>Date</Text>
                <Text style={styles.cellHeader}>Facture</Text>
                <Text style={styles.cellHeader}>Total</Text>
                <Text style={styles.cellHeader}>Avance</Text>
                <Text style={styles.cellHeader}>Reste</Text>
              </View>

              <FlatList
                data={data}
                keyExtractor={(item) => item.numero_facture}
                renderItem={({ item }) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.cell}>{item.date_facture}</Text>
                    <Text style={styles.cell}>{item.titre_facture}</Text>
                    <Text style={styles.cell}>{item.montant}</Text>
                    <Text style={styles.cell}>{item.avance}</Text>
                    <Text style={styles.cell}>{item.reste}</Text>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: '#555',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 8,
  },
  showButton: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#dcdcdc',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cellHeader: {
    width: 100,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  cell: {
    width: 100,
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  button: {
    marginTop:20,
    backgroundColor: '#2593B6',
    borderColor: '#2593B6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
