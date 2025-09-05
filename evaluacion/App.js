// Importaciones de Expo y React Native
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

// Importaciones de navegación
import Navigation from './src/navigation/Navigation';

// Importaciones para manejo de fuentes y splash screen
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Prevenir que el splash screen nativo se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Hook para cargar las fuentes de Google Fonts
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  // Efecto que se ejecuta cuando las fuentes terminan de cargar
  useEffect(() => {
    if (fontsLoaded) {
      // Ocultar el splash screen nativo una vez que las fuentes estén listas
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Mostrar pantalla de carga mientras las fuentes no estén disponibles
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando fuentes...</Text>
      </View>
    );
  }

  // Renderizar la aplicación principal una vez que las fuentes estén cargadas
  return (
    <View style={styles.container}>
      <Navigation />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0288d1',
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  }
});