import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,Alert,
  Text,Linking,
  TextInput,ScrollView,
  TouchableOpacity,Image,StatusBar
} from 'react-native';
import { GlobalContext } from '../global/GlobalState';
import { GlobalCarte } from '../global/GlobalCarte';



export default function AideFinanciere({navigation})  {
        // variables

    const [montant,setMontant] = useState('');
    const [telephone,setTelephone] = useState('');

    const [user, setUser] = useContext(GlobalContext);
     const [carte, setCarte] = useContext(GlobalCarte);

    const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission
    const [errors, setErrors] = useState({}); // Add a state to hold the error messages
    
  useEffect(()=>{
    navigation.setOptions({title: "Aide financière"});
    },[])

  // PHP MYSQL

  const handlePress = async () => {

    if (!montant || !telephone) {
      setErrors({
        // Update error state with appropriate error messages
        montant: !montant ? 'Le champ Montant est requis' : '',
        telephone: !telephone ? 'Le champ Téléphone est requis' : '',
      });
      return;
    }

    setIsSubmitting(true); // Set submitting state to true while sending the data

    // algo
    fetch(`https://adores.cloud/api/aide-financiere.php`,{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
                montant : montant,
                telephone : telephone,
                matricule: carte[0].numero_carte,
                utilisateur: user[0].matricule,
      })
    })
    .then((response) => response.json())
     .then((responseJson)=>{
      Alert.alert("Message",responseJson);
      setIsSubmitting(false);
      setMontant('');
      setTelephone('');
     })
     .catch((error)=>{
      Alert.alert("Message",error);
      setIsSubmitting(false);
     });

  };
  // fin

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />

    <ScrollView style={styles.form}>

    <View style={styles.userContainer}>

<View style={styles.userInfo}>
<Text style={styles.userName}>CONSIGNES</Text>
<Text style={styles.userCode}>Pour l'aide financière, veuillez saisir un montant et un numéro de téléphone ayant un compte Wave (Sans l'indicatif) puis valider et vous recevrez immédiatement la somme sur votre compte Wave</Text>

</View>

</View>

<View style={styles.profileImage}>

<Image alt="" source={require("../assets/images/wave.png")} style={styles.image} resizeMode="center"/>

</View> 
      

    <Text style={styles.label}>Montant * :</Text>
    <TextInput 
    style={[
      styles.input,
      errors.montant && styles.inputError,
    ]}
    label="Montant *" 
    variant="standard"
    keyboardType="numeric"
    placeholder="Saisir le montant à recharger"
    onChangeText={(val) => setMontant(val)}
    errorText={errors.montant}
    value={montant}
     />
      {errors.montant && (
          <Text style={styles.errorText}>{errors.montant}</Text>
        )}


<Text style={styles.label}>Téléphone * :</Text>
    <TextInput 
    style={[
      styles.input,
      errors.telephone && styles.inputError,
    ]}
       label="Telephone" 
       variant="standard" 
       keyboardType="numeric"
       placeholder="Saisir le numéro de téléphone"
       maxLength={10}
       onChangeText={(val) => setTelephone(val)}
       errorText={errors.telephone} 
       value={telephone}
    />
     {errors.telephone && (
          <Text style={styles.errorText}>{errors.telephone}</Text>
        )}


    
    
      <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
  
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
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: 'red', // Couleur de bordure rouge en cas d'erreur
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginTop:-10
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
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  picker: {
    height: 40,
  },
  profileImage: {
    width: 150,
    height: 150,
    //borderRadius: 75,
    overflow: "hidden",
    marginTop: 1,
    borderWidth: 1,
    borderColor: 'gray', // Couleur du cercle
},
image: {
  flex: 1,
  height: undefined,
  width: undefined,
},
profileImageContainer: {
  flex: 1, // Utilisez flex pour aligner au centre
      justifyContent: 'center', // Alignez verticalement au centre
      alignItems: 'center', // Alignez horizontalement au centre
      backgroundColor: '#fff',
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
    image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  profileImage: {
      width: 150,
    height: 125,
    marginBottom: 20,
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: '#ccc',
    overflow: "hidden",
    alignSelf: "center",
  },
});