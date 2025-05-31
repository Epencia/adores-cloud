import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { GlobalContext } from '../global/GlobalState';
import { GlobalCarte } from '../global/GlobalCarte';

const generateFactureCode = () => {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `FACTURE${date}${random}`;
};


export default function EditionFacture({ navigation, route }) {
  
  const item = route.params?.item || {}; // Récupérer les données passées

  const [montant, setMontant] = useState(item.montant || '');
  const [telephone, setTelephone] = useState(item.client_telephone || '');
  const [client, setClient] = useState(item.client_identite || '');
  const [titre, setTitre] = useState(item.titre_facture || '');
  const [code, setCode] = useState(item.numero_facture || generateFactureCode());

  const [user] = useContext(GlobalContext);
  const [carte] = useContext(GlobalCarte);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    navigation.setOptions({ title: "Edition de facture" });
    
  }, []);

  const handlePress = async () => {
    if (!montant || !telephone || !client || !titre) {
      setErrors({
        titre: !titre ? 'Le champ Titre est requis' : '',
        montant: !montant ? 'Le champ Montant est requis' : '',
        telephone: !telephone ? 'Le champ Téléphone du client est requis' : '',
        client: !client ? 'Le champ Identité du client est requis' : '',
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
        matricule: carte?.[0]?.numero_carte || '',
        utilisateur: user?.[0]?.matricule || ''
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
        setCode('');
      })
      .catch((error) => {
        Alert.alert("Erreur", error.toString());
        setIsSubmitting(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView style={styles.form}>

        <Text style={styles.label}>Numéro * :</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCode}
          editable={false}
          value={code}
        />


        <Text style={styles.label}>Titre * :</Text>
        <TextInput
          style={[styles.input, errors.titre && styles.inputError]}
          placeholder="Saisir le titre de la facture"
          onChangeText={setTitre}
          value={titre}
        />
        {errors.titre && <Text style={styles.errorText}>{errors.titre}</Text>}

        <Text style={styles.label}>Montant * :</Text>
        <TextInput
          style={[styles.input, errors.montant && styles.inputError]}
          placeholder="Saisir le montant de la facture"
          keyboardType="numeric"
          onChangeText={setMontant}
          value={montant}
        />
        {errors.montant && <Text style={styles.errorText}>{errors.montant}</Text>}

        <Text style={styles.label}>Identité du client * :</Text>
        <TextInput
          style={[styles.input, errors.client && styles.inputError]}
          placeholder="Saisir le nom et prénoms du client"
          onChangeText={setClient}
          value={client}
        />
        {errors.client && <Text style={styles.errorText}>{errors.client}</Text>}

        <Text style={styles.label}>Téléphone du client * :</Text>
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

// ✅ Styles corrigés
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
  button: {
    marginTop: 20,
    backgroundColor: '#2593B6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
