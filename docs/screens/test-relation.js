import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RelationshipSuitabilityTest = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Charger les préférences de thème
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Erreur lors du chargement du thème :', error);
      }
    };
    loadTheme();

    // Animation d'apparition
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentQuestion, result]);

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du thème :', error);
    }
  };

  const theme = {
    light: {
      background: '#f0f4f8',
      cardBackground: '#ffffff',
      text: '#2d3748',
      secondaryText: '#4a5568',
      accent: '#4c51bf',
      gradient: ['#a3bffa', '#e2e8f0'],
      button: '#5a67d8',
      buttonText: '#ffffff',
    },
    dark: {
      background: '#1a202c',
      cardBackground: '#2d3748',
      text: '#e2e8f0',
      secondaryText: '#a0aec0',
      accent: '#7f9cf5',
      gradient: ['#4a5568', '#2d3748'],
      button: '#667eea',
      buttonText: '#e2e8f0',
    },
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const questions = [
    {
      question: 'Comment réagissez-vous lorsqu’un ami partage un problème personnel ?',
      options: [
        { text: 'J’écoute attentivement et propose mon soutien', value: 2 },
        { text: 'Je change de sujet ou minimise leur problème', value: 0 },
      ],
    },
    {
      question: 'Respectez-vous les engagements pris avec vos amis ou partenaires ?',
      options: [
        { text: 'Je tiens toujours mes promesses', value: 2 },
        { text: 'Il m’arrive d’oublier ou d’annuler sans prévenir', value: 0 },
      ],
    },
    {
      question: 'Comment gérez-vous les désaccords dans une relation ?',
      options: [
        { text: 'Je discute calmement pour trouver une solution', value: 2 },
        { text: 'Je m’énerve ou évite la confrontation', value: 0 },
      ],
    },
    {
      question: 'Êtes-vous ouvert à comprendre les sentiments des autres ?',
      options: [
        { text: 'Je m’efforce de comprendre leur perspective', value: 2 },
        { text: 'Je me concentre surtout sur mes propres sentiments', value: 0 },
      ],
    },
    {
      question: 'Comment traitez-vous les limites personnelles des autres ?',
      options: [
        { text: 'Je respecte leurs besoins et leur espace', value: 2 },
        { text: 'Je peux parfois ignorer leurs limites', value: 0 },
      ],
    },
  ];

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        calculateResult(newAnswers);
      }
    });
  };

  const calculateResult = (userAnswers) => {
    const score = userAnswers.reduce((sum, val) => sum + val, 0);
    let resultType;

    if (score >= 8) {
      resultType = {
        title: 'Excellent partenaire',
        description: 'Vous êtes une personne attentionnée, respectueuse et fiable, idéale pour des relations amicales ou amoureuses solides. Vous valorisez l’empathie et la communication.',
        tips: ['Continuez à cultiver l’écoute active.', 'Maintenez votre respect des limites des autres.'],
        color: '#48bb78',
      };
    } else if (score >= 4) {
      resultType = {
        title: 'Bon potentiel',
        description: 'Vous avez de bonnes bases pour des relations saines, mais il y a des domaines à améliorer. Travaillez sur la constance et l’écoute pour renforcer vos liens.',
        tips: ['Pratiquez l’empathie en posant des questions ouvertes.', 'Soyez plus attentif aux besoins des autres.'],
        color: '#ed8936',
      };
    } else {
      resultType = {
        title: 'À améliorer',
        description: 'Vos comportements actuels peuvent poser des défis dans les relations. Prenez le temps de réfléchir à vos actions et à leur impact sur les autres.',
        tips: ['Apprenez à écouter sans juger.', 'Travaillez sur le respect des engagements et des limites.'],
        color: '#f56565',
      };
    }

    setResult(resultType);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const restartTest = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentQuestion(0);
      setAnswers([]);
      setResult(null);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  if (result) {
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
        <LinearGradient colors={currentTheme.gradient} style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={[styles.resultTitle, { color: result.color }]}>{result.title}</Text>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
              <Ionicons
                name={isDarkMode ? 'sunny' : 'moon'}
                size={24}
                color={currentTheme.text}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <Animated.View style={[styles.resultCard, { opacity: fadeAnim }]}>
            <Text style={[styles.resultDescription, { color: currentTheme.secondaryText }]}>
              {result.description}
            </Text>
            <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Conseils pour vous :</Text>
            {result.tips.map((tip, index) => (
              <Text key={index} style={[styles.tipText, { color: currentTheme.secondaryText }]}>
                • {tip}
              </Text>
            ))}
            <TouchableOpacity
              style={[styles.restartButton, { backgroundColor: result.color }]}
              onPress={restartTest}
            >
              <Text style={styles.restartButtonText}>Recommencer le test</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

  return (
    <LinearGradient colors={currentTheme.gradient} style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: currentTheme.text }]}>
          Test de compatibilité relationnelle
        </Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Ionicons
            name={isDarkMode ? 'sunny' : 'moon'}
            size={24}
            color={currentTheme.text}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.testContainer}>
        <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
          <Text style={[styles.questionText, { color: currentTheme.text }]}>
            {questions[currentQuestion]?.question || 'Question non disponible'}
          </Text>
          <Text style={[styles.progressText, { color: currentTheme.secondaryText }]}>
            Question {currentQuestion + 1}/{questions.length}
          </Text>
          <View style={styles.optionsContainer}>
            {(questions[currentQuestion]?.options || []).map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.optionButton, { backgroundColor: currentTheme.cardBackground }]}
                onPress={() => option?.value !== undefined && handleAnswer(option.value)}
              >
                <Text style={[styles.optionText, { color: currentTheme.text }]}>
                  {option?.text || 'Option'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  themeToggle: {
    padding: 10,
  },
  testContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  questionCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    lineHeight: 28,
  },
  progressText: {
    fontSize: 16,
    margin : 1,
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  resultContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  resultCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  resultDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    marginBottom: 5,
  },
  restartButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  restartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RelationshipSuitabilityTest;