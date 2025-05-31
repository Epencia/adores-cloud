import React , {useEffect, useState, useContext  } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions,TouchableOpacity,StatusBar,ScrollView,Alert } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { GlobalContext } from '../global/GlobalState';
import { GlobalCarte } from '../global/GlobalCarte';


export default function Accueil ({navigation}) {
  const rotation = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const [user, setUser] = useContext(GlobalContext);
  const [carte, setCarte] = useContext(GlobalCarte);



  const flip = () => {
    setFlipped(!flipped);
    rotation.value = withTiming(flipped ? 0 : 180, { duration: 600 });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
    zIndex: rotation.value < 90 ? 1 : 0,
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value + 180}deg` }],
    zIndex: rotation.value >= 90 ? 1 : 0,
  }));




   useEffect(() => {
    const updateData = () => {
      getCarte();
    };
    updateData(); // Appeler la fonction immédiatement au montage
    const intervalId = setInterval(updateData, 1000);
    return () => clearInterval(intervalId);
        }, []);


        // FUNCTION


    // CARTE
const getCarte = async () => {
  try {
   const response = await fetch(`https://adores.cloud/api/liste-carte.php?matricule=${user[0].matricule}`, {
     headers: {
       'Cache-Control': 'no-cache',
     },
   });
   const newData = await response.json();
   setCarte(newData);
   
 } catch (error) {
   Alert.alert("Erreur carte", error.message);
 }
 }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

<ScrollView>

      {/* QR Code */}
       <View style={styles.profileContent}>
        
             <TouchableOpacity style={styles.profileAvatar} onPress={() => navigation.navigate('Profil')}>
              {user[0].photo64 ? (
              <Image
              source={{ uri: `data:${user[0].type};base64,${user[0].photo64.toString('base64')}` }}
              style={styles.profileAvatarImg}/>
              ) : (
              <Image source={require("../assets/user-profile.jpg")} style={styles.profileAvatarImg}/>
              )}
              <View style={styles.profileAvatarNotification} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowBalance(!showBalance)} style={styles.profileSubtitle}>
                <View><Text style={styles.balanceText}>
                  {carte && carte.length > 0 && carte[0].numero_carte ? (
            <Text style={styles.balanceTitle}>
              {showBalance
          ? carte[0].solde_carte.toString().replace(/\d/g, '*')
          : parseFloat(carte[0].solde_carte).toLocaleString('fr-FR')}{' '}
         <Text style={{ fontSize: 17, fontWeight: 'bold' }}>F </Text>
            </Text>
            ) : (
              <Text style={styles.balanceTitle}>0{' '} 
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>F </Text>
              </Text>
            )}
                  </Text></View>
            </TouchableOpacity>  

        </View>
        {/* QR Code */}



      <Pressable onPress={flip} style={styles.cardWrapper}>
        {/* Recto */}
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <View style={styles.qrWrapper}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.filigrane}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20,borderWidth: 0, }}>
            {carte && carte.length > 0 && carte[0].numero_carte ? (
       <QRCode
          value={carte[0].numero_carte}
          size={200}
          backgroundColor="white"
          color="black"
        />
           ) : (
       <QRCode
          value="001"
          size={200}
          backgroundColor="white"
          color="black"
        />
            )}
            </View>
            <Image
              source={require('../assets/logo.png')}
              style={styles.qrLogo}
            />
          </View>
        </Animated.View>

        {/* Verso */}
        <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
          <Text style={styles.backText}>adorès</Text>
        </Animated.View>
      </Pressable>
      
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    width: 250,
    height: 350,
    perspective: 1000,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth:1,
    borderColor:"#007BFF",
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backCard: {
    backgroundColor: '#007BFF',
    transform: [{ rotateY: '180deg' }],
  },
  backText: {
    fontSize: 55,
    color: 'white',
    fontFamily: 'Poppins',
  },
  qrWrapper: {
    width: 200,
    height: 200,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
    position: 'absolute',
    zIndex: 2,
  },
  filigrane: {
    width: 100,
    height: 100,
    position: 'absolute',
    opacity: 0.1,
    zIndex: 1,
  },
  qrLogo: {
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 3,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 5,
  },
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
    backgroundColor: '#2593B6',
    borderColor: '#2593B6',
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
  // balance
  balanceWrapper: {
  marginTop: -200,
  marginBottom: 40,
},
balanceText: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#007BFF',
},
// Profil
profileContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:15,
  },
profileTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',

  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#778599',
    marginTop:-10
  },
profileAvatar: {
    position: 'relative',
  },
  profileAvatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileAvatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 23,
    right: 6,
    width: 21,
    height: 21,
    backgroundColor: '#22C55E',
  },
  // HEADER
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'white',
    width:'100%',
    //marginLeft:16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    //marginRight:16
  },
  avatarImg2: {
    width: 30,
    height: 30,
    borderRadius: 9999,
    borderWidth:1,
    borderColor:'gray'
  },
});
