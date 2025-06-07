import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { GlobalContext } from '../global/GlobalState';
import { GlobalCarte } from '../global/GlobalCarte';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

const generateFactureCode = () => {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `RECU${date}${random}`;
};

export default function EditionFacture({ navigation, route }) {
  const item = route?.params?.item || {};

  const [date, setDate] = useState(item.date ? new Date(item.date) : new Date());
  const [montant, setMontant] = useState(item.montant || '');
  const [avance, setAvance] = useState(item.avance || '');
  const [reste, setReste] = useState(item.reste || '');
  const [telephone, setTelephone] = useState(item.client_telephone || '');
  const [client, setClient] = useState(item.client_identite || '');
  const [titre, setTitre] = useState(item.titre_facture || '');
  const [code, setCode] = useState(item.numero_facture || generateFactureCode());

  const [user] = useContext(GlobalContext);
  const [carte] = useContext(GlobalCarte);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString(); // Exemple : 05/06/2025
  };

  const handlePress = async () => {
    if (!montant || !telephone || !client || !titre) {
      setErrors({
        titre: !titre ? 'Le champ Motif est requis' : '',
        montant: !montant ? 'Le champ Montant est requis' : '',
        avance: !avance ? 'Le champ Avance du client est requis' : '',
        client: !client ? 'Le champ Nom & prénoms client est requis' : '',
      });
      return;
    }

    setIsSubmitting(true);

    fetch(`https://adores.cloud/api/edition-facture.php`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titre,
        montant,
        client,
        code,
        telephone,
        date: date.toISOString().split('T')[0],
        carte_id: carte?.[0]?.numero_carte || '',
        utilisateur_id: user?.[0]?.matricule || ''
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert("Message", responseJson);
        setIsSubmitting(false);
        setMontant('');
        setTelephone('');
        setClient('');
        setTitre('');
        setCode(generateFactureCode());
      })
      .catch((error) => {
        Alert.alert("Erreur", error.toString());
        setIsSubmitting(false);
      });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView style={styles.form}>

        <View style={styles.userContainer}>
        <View style={styles.userInfo}>
        <Text style={styles.userName}>CONSIGNES</Text>
        <Text style={styles.userCode}>kkkk</Text>
        </View>
        </View>

        <Text style={styles.label}>Numéro * :</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCode}
          editable={false}
          value={code}
        />

        <Text style={styles.label}>Motif * :</Text>
        <TextInput
          style={[styles.input, errors.titre && styles.inputError]}
          placeholder="Saisir le motif"
          onChangeText={setTitre}
          value={titre}
        />
        {errors.titre && <Text style={styles.errorText}>{errors.titre}</Text>}

        <Text style={styles.label}>Montant * :</Text>
        <TextInput
          style={[styles.input, errors.montant && styles.inputError]}
          placeholder="Saisir le montant"
          keyboardType="numeric"
          onChangeText={setMontant}
          value={montant}
        />
        {errors.montant && <Text style={styles.errorText}>{errors.montant}</Text>}

        <Text style={styles.label}>Avance * :</Text>
        <TextInput
          style={styles.input}
          placeholder="Saisir l'avance"
          keyboardType="numeric"
          onChangeText={setAvance}
          value={avance}
        />

        <Text style={styles.label}>Reste * :</Text>
        <TextInput
          style={styles.input}
          placeholder="Saisir le reste"
          keyboardType="numeric"
          onChangeText={setReste}
          value={reste}
        />

        <Text style={styles.label}>Date * :</Text>
<TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
  <Text style={styles.dateButtonText}>
    {date ? `${formatDateForDisplay(date)}` : 'Sélectionner une date'}
  </Text>
</TouchableOpacity>
{showDatePicker && (
  <DateTimePicker
    value={date || new Date()}
    mode="date"
    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
    onChange={(event, selectedDate) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
      if (selectedDate) {
        setDate(selectedDate);
      }
    }}
  />
)}

{errors.date && <Text style={styles.errorText}>{errors.date}</Text>}


        <Text style={styles.label}>Nom & prénoms client * :</Text>
        <TextInput
          style={[styles.input, errors.client && styles.inputError]}
          placeholder="Saisir le nom et prénoms du client"
          onChangeText={setClient}
          value={client}
        />
        {errors.client && <Text style={styles.errorText}>{errors.client}</Text>}

        <Text style={styles.label}>Téléphone client * :</Text>
        <TextInput
          style={[styles.input, errors.telephone && styles.inputError]}
          placeholder="Saisir le numéro de téléphone"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={setTelephone}
          value={telephone}
        />
        {errors.telephone && <Text style={styles.errorText}>{errors.telephone}</Text>}

        <TouchableOpacity style={styles.button} onPress={handlePress} disabled={isSubmitting}>
          <Text style={styles.buttonText}>{isSubmitting ? "Envoi..." : "Valider"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    marginTop: -8,
  },
 dateButton: {
  padding: 12,
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 5,
  marginBottom: 12,
  backgroundColor: '#fff', // important pour ne pas être grisé
},
dateButtonText: {
  color: '#000',
},

  button: {
    marginTop: 20,
    backgroundColor: '#0A84FF',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
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
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    userCode: {
      fontSize: 14,
      color: 'black',
      textAlign: 'justify',
    },
});
