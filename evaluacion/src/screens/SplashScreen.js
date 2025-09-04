import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

// Pantalla de carga con animaciones
const SplashScreen = () => {
  return (
    <LinearGradient
      colors={['#0288d1', '#29b6f6', '#81d4fa']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo animado */}
        <Animatable.View 
          animation="bounceIn" 
          duration={2000}
          style={styles.logoContainer}
        >
          <Image 
            source={require('../../assets/splashScreen.jpg')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </Animatable.View>

        {/* Título animado */}
        <Animatable.View 
          animation="fadeInUp" 
          delay={1000}
          duration={1500}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>EvaluApp</Text>
          <Text style={styles.subtitle}>Sistema de Gestión de Usuarios</Text>
        </Animatable.View>

        {/* Indicador de carga */}
        <Animatable.View 
          animation="pulse" 
          iterationCount="infinite"
          delay={2000}
          style={styles.loadingContainer}
        >
          <Text style={styles.loadingText}>Cargando...</Text>
        </Animatable.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#f1f8ff',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.9,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default SplashScreen;