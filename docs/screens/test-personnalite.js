import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Appearance, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MBTITest = () => {
  const questions = [
    {
      dimension: 'E/I',
      question: 'Où préférez-vous diriger votre énergie ?',
      options: [
        { text: 'Vers le monde extérieur (personnes, activités)', value: 'E' },
        { text: 'Vers votre monde intérieur (idées, réflexions)', value: 'I' },
      ],
    },
    {
      dimension: 'S/N',
      question: 'Comment préférez-vous recueillir des informations ?',
      options: [
        { text: 'Par les sens (concret, présent, factuel)', value: 'S' },
        { text: "Par l'intuition (modèles, possibilités futures)", value: 'N' },
      ],
    },
    {
      dimension: 'T/F',
      question: 'Comment prenez-vous des décisions ?',
      options: [
        { text: 'Logique et objectivité (tête)', value: 'T' },
        { text: 'Valeurs et harmonie (cœur)', value: 'F' },
      ],
    },
    {
      dimension: 'J/P',
      question: 'Comment préférez-vous organiser votre vie ?',
      options: [
        { text: 'Structurée, planifiée, décidée', value: 'J' },
        { text: 'Flexible, spontanée, adaptable', value: 'P' },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (userAnswers) => {
    if (!userAnswers || userAnswers.length !== 4) {
      setResult(null);
      return;
    }
    const mbtiType = userAnswers.join('');
    setResult(mbtiType);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getTypeDetails = (type) => {
    const typeDetails = {
      ISTJ: {
        name: "Le Logisticien",
        description: "Pratique et factuel, fiable et responsable. Ils aiment l'ordre et l'organisation.",
        strengths: ["Fiable", "Déterminé", "Organisé", "Pratique"],
        weaknesses: ["Têtu", "Peu flexible", "Trop critique"],
        careers: ["Comptable", "Juge", "Administrateur", "Officier militaire"],
        famous: ["George Washington", "Angela Merkel", "Natalie Portman"],
        color: '#3498db'
      },
      ISFJ: {
        name: "Le Défenseur",
        description: "Attentionné et dévoué, protecteur et minutieux. Ils sont chaleureux et altruistes.",
        strengths: ["Chaleureux", "Responsable", "Patient", "Loyal"],
        weaknesses: ["Trop modeste", "Sensible aux critiques", "Se sacrifie trop"],
        careers: ["Infirmier", "Enseignant", "Assistant social", "Bibliothécaire"],
        famous: ["Mother Teresa", "Kate Middleton", "Rosa Parks"],
        color: '#2ecc71'
      },
      INFJ: {
        name: "L'Avocat",
        description: "Idéaliste et déterminé, rare et perspicace. Ils cherchent à comprendre les gens et à les aider.",
        strengths: ["Créatif", "Insightful", "Déterminé", "Altruiste"],
        weaknesses: ["Perfectionniste", "Sensible", "Complexe"],
        careers: ["Psychologue", "Écrivain", "Conseiller", "Artiste"],
        famous: ["Nelson Mandela", "Martin Luther King Jr.", "Emily Brontë"],
        color: '#9b59b6'
      },
      INTJ: {
        name: "L'Architecte",
        description: "Stratège imaginatif, déterminé et indépendant. Ils ont une vision à long terme.",
        strengths: ["Stratégique", "Innovant", "Indépendant", "Déterminé"],
        weaknesses: ["Arrogant", "Insensible", "Perfectionniste"],
        careers: ["Scientifique", "Ingénieur", "Entrepreneur", "Stratège"],
        famous: ["Elon Musk", "Michelle Obama", "Stephen Hawking"],
        color: '#e74c3c'
      },
      ISTP: {
        name: "Le Virtuose",
        description: "Expérimentateur audacieux et pratique. Ils excellent dans les situations de crise.",
        strengths: ["Optimiste", "Courageux", "Pragmatique", "Calme"],
        weaknesses: ["Insensible", "Imprudent", "Se désengage facilement"],
        careers: ["Pilote", "Mécanicien", "Informaticien", "Artisan"],
        famous: ["Bruce Lee", "Tom Cruise", "Amelia Earhart"],
        color: '#f39c12'
      },
      ISFP: {
        name: "L'Aventurier",
        description: "Artiste flexible et charmant, toujours prêt à explorer. Ils vivent dans le moment présent.",
        strengths: ["Charmant", "Artistique", "Sensible", "Curieux"],
        weaknesses: ["Trop compétitif", "Se sent facilement dépassé", "Fuit les conflits"],
        careers: ["Designer", "Musicien", "Chef", "Photographe"],
        famous: ["Michael Jackson", "Frida Kahlo", "Brad Pitt"],
        color: '#1abc9c'
      },
      INFP: {
        name: "Le Médiateur",
        description: "Poétique, gentil et altruiste. Guidés par leurs valeurs et leurs croyances.",
        strengths: ["Empathique", "Créatif", "Idéaliste", "Loyal"],
        weaknesses: ["Trop idéaliste", "Se critique trop", "Difficile à connaître"],
        careers: ["Écrivain", "Psychologue", "Artiste", "Conseiller"],
        famous: ["William Shakespeare", "J.R.R. Tolkien", "Princess Diana"],
        color: '#e67e22'
      },
      INTP: {
        name: "Le Logicien",
        description: "Inventeur innovateur, amoureux des idées. Ils analysent tout avec logique.",
        strengths: ["Original", "Ouvert d'esprit", "Enthousiaste", "Objectif"],
        weaknesses: ["Insensible", "Absent", "Doute de lui-même"],
        careers: ["Programmeur", "Mathématicien", "Architecte", "Philosophe"],
        famous: ["Albert Einstein", "Bill Gates", "Socrates"],
        color: '#34495e'
      },
      ESTP: {
        name: "L'Entrepreneur",
        description: "Intelligent, énergique et très perspicace. Ils aiment l'action et le risque.",
        strengths: ["Energique", "Pragmatique", "Persuasif", "Sociable"],
        weaknesses: ["Impulsif", "Insensible", "Peu patient"],
        careers: ["Entrepreneur", "Marketing", "Vendeur", "Athlète"],
        famous: ["Donald Trump", "Madonna", "Ernest Hemingway"],
        color: '#e74c3c'
      },
      ESFP: {
        name: "L'Amuseur",
        description: "Spontané, énergique et enthousiaste. Ils aiment être le centre d'attention.",
        strengths: ["Enthousiaste", "Sociable", "Généreux", "Optimiste"],
        weaknesses: ["Sensible aux critiques", "Se disperse facilement", "Évite le conflit"],
        careers: ["Acteur", "Animateur", "Hôtesse", "Designer"],
        famous: ["Elton John", "Marilyn Monroe", "Jamie Oliver"],
        color: '#f1c40f'
      },
      ENFP: {
        name: "L'Inspirateur",
        description: "Créatif, sociable et libre d'esprit. Ils voient des possibilités partout.",
        strengths: ["Enthousiaste", "Créatif", "Sociable", "Optimiste"],
        weaknesses: ["Se surcharge", "Indécis", "Cherche l'approbation"],
        careers: ["Journaliste", "Psychologue", "Conseiller", "Artiste"],
        famous: ["Robin Williams", "Walt Disney", "Oscar Wilde"],
        color: '#2ecc71'
      },
      ENTP: {
        name: "Le Débatteur",
        description: "Ingénieux, rapide et stimulant intellectuellement. Ils aiment les défis mentaux.",
        strengths: ["Intelligent", "Curieux", "Innovant", "Charismatique"],
        weaknesses: ["Peu sensible", "Peu patient", "Peut argumenter excessivement"],
        careers: ["Entrepreneur", "Avocat", "Inventeur", "Ingénieur"],
        famous: ["Steve Jobs", "Mark Twain", "Thomas Edison"],
        color: '#3498db'
      },
      ESTJ: {
        name: "Le Directeur",
        description: "Gestionnaire excellent, extraordinairement responsable. Ils maintiennent l'ordre et la tradition.",
        strengths: ["Organisé", "Loyal", "Direct", "Responsable"],
        weaknesses: ["Inflexible", "Peu sensible", "Autoritaire"],
        careers: ["Manager", "Officier militaire", "Juge", "Administrateur"],
        famous: ["Franklin D. Roosevelt", "Judge Judy", "Lyndon B. Johnson"],
        color: '#e67e22'
      },
      ESFJ: {
        name: "Le Consul",
        description: "Attentionné, sociable et populaire. Ils aiment aider les autres et créer l'harmonie.",
        strengths: ["Loyal", "Sociable", "Altruiste", "Pratique"],
        weaknesses: ["Sensible aux critiques", "Peu flexible", "Cherche l'approbation"],
        careers: ["Enseignant", "Infirmier", "Ressources humaines", "Hôtesse"],
        famous: ["Taylor Swift", "Bill Clinton", "Sally Field"],
        color: '#f39c12'
      },
      ENFJ: {
        name: "Le Donateur",
        description: "Charismatique et inspirant, capable de hypnotiser. Ils motivent les autres à grandir.",
        strengths: ["Charismatique", "Empathique", "Inspirant", "Altruiste"],
        weaknesses: ["Trop idéaliste", "Trop sensible", "Se sacrifie trop"],
        careers: ["Enseignant", "Psychologue", "Politicien", "Coach"],
        famous: ["Oprah Winfrey", "Barack Obama", "Maya Angelou"],
        color: '#9b59b6'
      },
      ENTJ: {
        name: "Le Commandant",
        description: "Leader audacieux, imaginatif et à forte volonté. Ils excellent dans la gestion et la planification.",
        strengths: ["Charismatique", "Déterminé", "Stratégique", "Efficace"],
        weaknesses: ["Autoritaire", "Impatient", "Intolérant"],
        careers: ["CEO", "Avocat", "Officier militaire", "Entrepreneur"],
        famous: ["Margaret Thatcher", "Steve Jobs", "Franklin D. Roosevelt"],
        color: '#e74c3c'
      }
    };

    return typeDetails[type] || {
      name: "Type inconnu",
      description: "Nous n'avons pas d'informations sur ce type de personnalité.",
      strengths: [],
      weaknesses: [],
      careers: [],
      famous: [],
      color: '#95a5a6'
    };
  };

  // Styles dynamiques en fonction du mode
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f8f9fa',
    },
    header: {
      padding: 30,
      paddingTop: 50,
      alignItems: 'center',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      marginBottom: 20
    },
    contentContainer: {
      padding: 20,
      paddingBottom: 40
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDarkMode ? '#ecf0f1' : '#2c3e50'
    },
    sectionText: {
      fontSize: 16,
      lineHeight: 24,
      color: isDarkMode ? '#bdc3c7' : '#34495e'
    },
    listItem: {
      fontSize: 16,
      marginBottom: 5,
      color: isDarkMode ? '#bdc3c7' : '#34495e'
    },
    famousName: {
      textAlign: 'center',
      fontSize: 12,
      color: isDarkMode ? '#7f8c8d' : '#95a5a6'
    },
    testContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#6a11cb'
    },
    testQuestion: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#ecf0f1' : 'white',
      marginBottom: 5,
      lineHeight: 32
    },
    testDimension: {
      fontSize: 16,
      color: isDarkMode ? 'rgba(236, 240, 241, 0.8)' : 'rgba(255,255,255,0.8)',
      marginBottom: 30
    },
    optionButton: {
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
      padding: 20,
      borderRadius: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'
    },
    optionText: {
      color: isDarkMode ? '#ecf0f1' : 'white',
      fontSize: 16,
      lineHeight: 22
    },
    progressText: {
      color: isDarkMode ? 'rgba(236, 240, 241, 0.8)' : 'rgba(255,255,255,0.8)',
      marginBottom: 5
    },
    progressBar: {
      height: 6,
      backgroundColor: isDarkMode ? 'rgba(236, 240, 241, 0.2)' : 'rgba(255,255,255,0.3)',
      borderRadius: 3,
      overflow: 'hidden'
    },
    themeToggleContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 10
    },
    themeText: {
      color: isDarkMode ? '#ecf0f1' : 'white',
      marginRight: 8,
      fontSize: 14
    }
  });

  if (result && getTypeDetails(result)) {
    const typeInfo = getTypeDetails(result);
    const famousPeople = typeInfo.famous || [];
    
    return (
      <ScrollView style={dynamicStyles.container}>
        <LinearGradient
          colors={[typeInfo.color, isDarkMode ? '#1a1a1a' : '#ffffff']}
          style={dynamicStyles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={dynamicStyles.themeToggleContainer}>
            <Text style={dynamicStyles.themeText}>{isDarkMode ? 'Nuit' : 'Jour'}</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
          
          <Text style={styles.typeTitle}>{result}</Text>
          <Text style={styles.typeName}>{typeInfo.name}</Text>
        </LinearGradient>

        <View style={dynamicStyles.contentContainer}>
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Description</Text>
            <Text style={dynamicStyles.sectionText}>{typeInfo.description}</Text>
          </View>

          <View style={styles.row}>
            <View style={[styles.column, { marginRight: 10 }]}>
              <Text style={dynamicStyles.sectionTitle}>Forces</Text>
              {(typeInfo.strengths || []).map((strength, index) => (
                <Text key={index} style={dynamicStyles.listItem}>• {strength}</Text>
              ))}
            </View>
            <View style={styles.column}>
              <Text style={dynamicStyles.sectionTitle}>Faiblesses</Text>
              {(typeInfo.weaknesses || []).map((weakness, index) => (
                <Text key={index} style={dynamicStyles.listItem}>• {weakness}</Text>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Carrières adaptées</Text>
            <View style={styles.careerContainer}>
              {(typeInfo.careers || []).map((career, index) => (
                <View key={index} style={[styles.careerPill, { backgroundColor: typeInfo.color }]}>
                  <Text style={styles.careerText}>{career}</Text>
                </View>
              ))}
            </View>
          </View>

          {famousPeople.length > 0 && (
            <View style={styles.section}>
              <Text style={dynamicStyles.sectionTitle}>Personnalités célèbres</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {famousPeople.map((person, index) => {
                  if (!person) return null;
                  const nameParts = person.split(' ');
                  const initials = nameParts.length >= 2 
                    ? `${nameParts[0][0]}${nameParts[1][0]}`
                    : person[0];
                  
                  return (
                    <View key={index} style={styles.famousCard}>
                      <View style={[styles.famousIcon, { backgroundColor: typeInfo.color }]}>
                        <Text style={styles.famousIconText}>{initials}</Text>
                      </View>
                      <Text style={dynamicStyles.famousName}>{person}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity 
            style={[styles.restartButton, { backgroundColor: typeInfo.color }]}
            onPress={restartTest}
          >
            <Text style={styles.restartButtonText}>Refaire le test</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <LinearGradient 
      colors={isDarkMode ? ['#121212', '#1a1a1a'] : ['#6a11cb', '#2575fc']} 
      style={dynamicStyles.testContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={dynamicStyles.themeToggleContainer}>
        <Text style={dynamicStyles.themeText}>{isDarkMode ? 'Nuit' : 'Jour'}</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.testContent}>
        <View style={styles.progressContainer}>
          <Text style={dynamicStyles.progressText}>
            Question {currentQuestion + 1}/{questions.length}
          </Text>
          <View style={dynamicStyles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  backgroundColor: isDarkMode ? '#ecf0f1' : '#ffffff'
                }
              ]}
            />
          </View>
        </View>

        <Text style={dynamicStyles.testQuestion}>
          {questions[currentQuestion]?.question || "Question non disponible"}
        </Text>
        <Text style={dynamicStyles.testDimension}>
          ({questions[currentQuestion]?.dimension || "Dimension"})
        </Text>

        <View style={styles.optionsContainer}>
          {(questions[currentQuestion]?.options || []).map((option, index) => (
            <TouchableOpacity
              key={index}
              style={dynamicStyles.optionButton}
              onPress={() => option?.value && handleAnswer(option.value)}
            >
              <Text style={dynamicStyles.optionText}>{option?.text || "Option"}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  typeTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5
  },
  typeName: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600'
  },
  section: {
    marginBottom: 25
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  column: {
    flex: 1
  },
  careerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  careerPill: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10
  },
  careerText: {
    color: 'white',
    fontWeight: '500'
  },
  famousCard: {
    alignItems: 'center',
    marginRight: 15,
    width: 80
  },
  famousIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  famousIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  restartButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  restartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  testContent: {
    flexGrow: 1,
    padding: 25,
    paddingTop: 50
  },
  progressContainer: {
    marginBottom: 30
  },
  progressFill: {
    height: '100%'
  },
  optionsContainer: {
    marginTop: 20
  }
});

export default MBTITest;