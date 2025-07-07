import React, { useEffect } from 'react';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// Définir la tâche d'arrière-plan
const BACKGROUND_FETCH_TASK = 'posture-api-task';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    const response = await fetch('https://adores.cloud/api/posture.php', {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });
    const data = await response.json();
    console.log('API Response:', data);
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Background Fetch Error:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Enregistrer la tâche
async function registerBackgroundTask() {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60, // Minimum 60 secondes (limite Android; iOS peut ignorer et utiliser ~15 minutes)
      stopOnTerminate: false, // Continue après fermeture de l'app
      startOnBoot: true, // Démarre au redémarrage du téléphone
    });
    console.log('Tâche enregistrée avec succès');
  } catch (err) {
    console.error('Erreur d\'enregistrement:', err);
  }
}

export default function BackgroundPush() {
  useEffect(() => {
    console.log('BackgroundPush component mounted');
    // Vérifier si la tâche est déjà enregistrée
    TaskManager.getRegisteredTasksAsync().then(tasks => {
      if (!tasks.some(task => task.taskName === BACKGROUND_FETCH_TASK)) {
        registerBackgroundTask();
      }
    });

    // Exécuter immédiatement au lancement
    fetch('https://adores.cloud/api/posture.php')
      .then(r => r.json())
      .then(data => console.log('Initial API Response:', data))
      .catch(error => console.error('Initial Fetch Error:', error));

    return () => {
      // Nettoyage si nécessaire
    };
  }, []);

  return null; // Pas d'UI nécessaire
}