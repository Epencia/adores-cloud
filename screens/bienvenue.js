import React, { useRef, useState,useEffect } from 'react';
import {
  View,
  Text,
  Image,StatusBar,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '3',
    title: 'Suivi en temps réel',
    description:
      'Gardez un œil sur toutes vos transactions instantanément avec des alertes en temps réel.',
    image: require('../assets/images/images3.png'),
  },
  {
    id: '2',
    title: 'Budget familial',
    description:
      'Budgétiser ensemble et connaître la vue complète des finances familiales.',
    image: require('../assets/images/images3.png'),
  },
  {
    id: '1',
    title: 'Analyses et rapports sur les dépenses',
    description:
      'Obtenez des informations personnalisées pour savoir où va votre argent et dépenser plus intelligemment.',
    image: require('../assets/images/images1.png'),
  },
  {
    id: '4',
    title: 'Suivi en temps réel',
    description:
      'Gardez un œil sur toutes vos transactions instantanément avec des alertes en temps réel.',
    image: require('../assets/images/images3.png'),
  },
];

export default function Bienvenue({navigation}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const directionRef = useRef(1); // 1 = avance, -1 = recule

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + directionRef.current;

      // Si on atteint la fin, inverse la direction
      if (nextIndex >= slides.length) {
        directionRef.current = -1; // recule
        nextIndex = currentIndex + directionRef.current;
      }
      // Si on atteint le début, inverse la direction
      else if (nextIndex < 0) {
        directionRef.current = 1; // avance
        nextIndex = currentIndex + directionRef.current;
      }

      scrollToIndex(nextIndex);
      setCurrentIndex(nextIndex);
    }, 3000); // défilement toutes les 2 secondes

    return () => clearInterval(interval);
  }, [currentIndex]);


  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ index });
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const newIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: newIndex });
      setTimeout(() => setCurrentIndex(newIndex), 300);
    } else {
      console.log('Fin du slider');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: newIndex });
      setTimeout(() => setCurrentIndex(newIndex), 300);
    } else {
      console.log('Déjà au début');
    }
  };

  const handleSkip = () => {
    console.log('Onboarding sauté');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#fff' />
      <View style={styles.header}>
                      <Image
                        source={require('../assets/logo-adores-business3.png')} // Your logo path
                        style={{ width: 100, height: 40,marginLeft:16 }} // Adjust size
                        resizeMode="contain"
                      />
        
                      <View style={{ flexDirection: 'row', padding: 20 }}>

                    
                    <TouchableOpacity
                      style={styles.appButton2} onPress={() => navigation.navigate('Gemini')}>
                      <MaterialCommunityIcons name="chat" size={24} color="#2593B6" />
                    </TouchableOpacity>
                    <View style={{marginRight:8}}></View>
                       <TouchableOpacity
                      style={styles.appButton2} onPress={() => navigation.navigate('Registre de controle')}>
                      <MaterialCommunityIcons name="book-open-page-variant-outline" size={24} color="#2593B6" />
                    </TouchableOpacity>
                    <View style={{marginRight:8}}></View>
                    <TouchableOpacity
                      style={styles.appButton2}
                      onPress={() => navigation.navigate('Connexion')}>
                      <MaterialCommunityIcons name="login" size={24} color="#2593B6" />
                    </TouchableOpacity>
                      </View>
                      </View>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Connexion')} style={styles.skipButton}>
          <Text style={styles.skipText}>CONNEXION ›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Inscription')} style={styles.nextButton}>
          <Text style={styles.nextText}> INSCRIPTION ›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#111',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#0AC4FF',
    width: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  skipButton: {
    padding: 14,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  nextButton: {
    padding: 14,
    backgroundColor: '#0A84FF',
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  skipText: {
    color: '#333',
    fontWeight: 'bold',
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // HEARDER
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

});
