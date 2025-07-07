import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const LockScreen = ({ navigation }) => {
  const apps = [
    { id: '1', name: 'Spotify', icon: '🎵', color: '#1DB954' },
    { id: '2', name: 'Instagram', icon: '📷', color: '#E1306C', notification: '5 new messages' },
    { id: '3', name: 'WhatsApp', icon: '💬', color: '#25D366' },
    { id: '4', name: 'YouTube', icon: '▶️', color: '#FF0000' },
    { id: '5', name: 'Maps', icon: '🗺️', color: '#4285F4' },
  ];

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#0f2027', '#203a43', '#2c5364']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>

          <View style={styles.appList}>
            {apps.map((app) => (
              <TouchableOpacity 
                key={app.id} 
                style={styles.appItem} 
                onPress={() => navigation.navigate(app.name)}
              >
                <View style={[styles.appIcon, { backgroundColor: app.color }]}>
                  <Text style={styles.iconText}>{app.icon}</Text>
                </View>
                <View style={styles.appTextContainer}>
                  <Text style={styles.appName}>{app.name}</Text>
                  {app.notification && (
                    <Text style={styles.notification}>{app.notification}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.unlockButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.unlockText}>Déverrouiller</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.05,
  },
  date: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  time: {
    fontSize: 72,
    fontWeight: '200',
    color: '#fff',
  },
  appList: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  appTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  appName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  notification: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    paddingBottom: Dimensions.get('window').height * 0.05,
    alignItems: 'center',
  },
  unlockButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  unlockText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LockScreen;