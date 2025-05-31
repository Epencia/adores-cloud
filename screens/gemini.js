import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard'; // 📋 Pour copier dans le presse-papiers

const API_KEY = 'AIzaSyCbsmVC8QGA-TCCttladKSnxykyWPUwO8c'; // ⚠️ Ne pas exposer en production
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export default function GeminiChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const handleAskGemini = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { sender: 'user', text: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: trimmed }] }]
        }),
      });

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') ||
        data?.error?.message ||
        "Aucune réponse générée.";

      const aiMessage = { sender: 'ai', text: reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = { sender: 'ai', text: "Erreur : " + err.message };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Gestion des actions sur un message utilisateur
  const handleUserMessagePress = (text) => {
    Alert.alert(
      "Action sur la question",
      "Que souhaitez-vous faire ?",
      [
        {
          text: "Copier",
          onPress: () => {
            Clipboard.setStringAsync(text);
          }
        },
        {
          text: "Modifier",
          onPress: () => {
            setInput(text);
          }
        },
        { text: "Annuler", style: "cancel" }
      ]
    );
  };

  // Gestion des actions sur un message AI
  const handleAIMessagePress = (text) => {
    Alert.alert(
      "Action sur la réponse",
      "Que souhaitez-vous faire ?",
      [
        {
          text: "Copier",
          onPress: () => {
            Clipboard.setStringAsync(text);
          }
        },
        { text: "Annuler", style: "cancel" }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>💡 Adorès Cloud Assistant</Text>

        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: 20 }}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <TouchableOpacity
                key={index}
                onPress={() => isUser ? handleUserMessagePress(msg.text) : handleAIMessagePress(msg.text)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.messageBubble,
                    isUser ? styles.userBubble : styles.aiBubble
                  ]}
                >
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {loading && (
            <View style={[styles.messageBubble, styles.aiBubble]}>
              <ActivityIndicator size="small" color="#007bff" />
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pose ta question..."
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleAskGemini} disabled={loading}>
            <Text style={styles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 16,
    backgroundColor: '#007bff',
    color: '#fff',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageBubble: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 16,
    maxWidth: '85%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    padding: 10,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
