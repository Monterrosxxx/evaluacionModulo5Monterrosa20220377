import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

// Obtener las dimensiones de la pantalla del dispositivo
const { width, height } = Dimensions.get('window');

// Pantalla de carga con animaciones
const SplashScreen = ({ navigation, isCheckingAuth = false }) => {
  // Animaciones inicializadas con valores de inicio
  const fadeAnim = new Animated.Value(0); // Para efecto fade in/out (opacidad)
  const scaleAnim = new Animated.Value(0.5); // Para efecto de escala (crecimiento)
  const slideAnim = new Animated.Value(50); // Para efecto de deslizamiento vertical
  const progressAnim = new Animated.Value(0); // Para la barra de progreso de carga

  useEffect(() => {
    // Ejecutar animaciones de entrada en paralelo
    Animated.parallel([
      // Animación de fade in (aparición gradual)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Animación de escala con efecto spring (rebote)
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50, // Tensión del resorte
        friction: 8, // Fricción del resorte
        useNativeDriver: true,
      }),
      // Animación de deslizamiento hacia arriba
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación de la barra de progreso (no usa native driver por el width)
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false, 
    }).start();

    // Solo navegar automáticamente si no está verificando autenticación
    if (!isCheckingAuth && navigation) {
      // Timer para navegar a la siguiente pantalla después de 3 segundos
      const timer = setTimeout(() => {
        // Animaciones de salida en paralelo
        Animated.parallel([
          // Fade out (desvanecimiento)
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          // Reducción de escala
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Navegar a la pantalla de autenticación cuando terminen las animaciones
          navigation.replace('Auth');
        });
      }, 3000);

      // Cleanup: limpiar el timer si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [navigation, isCheckingAuth]);

  return (
    <LinearGradient
      colors={['#0288d1', '#29b6f6', '#81d4fa']}
      style={styles.container}
    >
      {/* Decoración de fondo con círculos flotantes */}
      <View style={styles.backgroundDecoration}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
        <View style={[styles.circle, styles.circle4]} />
      </View>

      {/* Logo y texto principal con animaciones */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim, // Aplicar animación de opacidad
            transform: [
              { scale: scaleAnim }, // Aplicar animación de escala
              { translateY: slideAnim } // Aplicar animación de deslizamiento
            ],
          },
        ]}
      >
        {/* Contenedor del icono decorativo */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📱</Text>
        </View>

        {/* Título de la aplicación */}
        <Text style={styles.appName}>Evaluación con Firebase</Text>
        {/* Texto descriptivo de la app */}
        <Text style={styles.tagline}>Sistema de Gestión de Usuarios - Monterrosa</Text>
      </Animated.View>

      {/* Indicador de carga con barra de progreso */}
      <Animated.View
        style={[
          styles.loadingContainer,
          {
            opacity: fadeAnim, // Aplicar misma animación de opacidad
            transform: [{ translateY: slideAnim }], // Aplicar misma animación de deslizamiento
          },
        ]}
      >
        <Text style={styles.loadingText}>
          {isCheckingAuth ? 'Verificando sesión...' : 'Cargando...'}
        </Text>
        {/* Contenedor de la barra de progreso */}
        <View style={styles.loadingBar}>
          {/* Barra de progreso animada */}
          <Animated.View
            style={[
              styles.loadingProgress,
              {
                // Interpolar el progreso de 0% a 100% basado en progressAnim
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // Contenedor principal de la pantalla
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Contenedor de elementos decorativos de fondo
  backgroundDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  // Estilo base para los círculos decorativos
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Blanco semi-transparente
    borderRadius: 100, // Hace los elementos circulares
  },
  // Círculo decorativo 1 - grande, arriba izquierda
  circle1: {
    width: 200,
    height: 200,
    top: 80,
    left: -60,
  },
  // Círculo decorativo 2 - mediano, abajo derecha
  circle2: {
    width: 120,
    height: 120,
    bottom: 150,
    right: -40,
  },
  // Círculo decorativo 3 - pequeño, centro derecha
  circle3: {
    width: 80,
    height: 80,
    top: '55%',
    right: 40,
  },
  // Círculo decorativo 4 - grande, arriba derecha, más transparente
  circle4: {
    width: 160,
    height: 160,
    top: '20%',
    right: -50,
    opacity: 0.5,
  },
  // Contenedor del logo y textos principales
  logoContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  // Contenedor del logo con imagen y sombra
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo blanco semi-transparente más sutil
    borderRadius: 60, // Hace el contenedor circular
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    // Propiedades de sombra para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8, // Sombra para Android
    overflow: 'hidden', // Para que la imagen respete el borderRadius
  },
  // Estilo de la imagen del logo
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Hacer la imagen circular
  },
  // Estilo del nombre de la aplicación
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  // Estilo del texto descriptivo
  tagline: {
    fontSize: 16,
    color: '#f1f8ff',
    opacity: 0.9,
    textAlign: 'center',
    letterSpacing: 1,
  },
  // Contenedor del indicador de carga
  loadingContainer: {
    position: 'absolute',
    bottom: 120, // Posicionado cerca de la parte inferior
    width: width * 0.7, // 70% del ancho de la pantalla
    alignItems: 'center',
  },
  // Estilo del texto "Cargando..."
  loadingText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
    opacity: 0.9,
    fontWeight: '500',
  },
  // Contenedor de la barra de progreso (fondo)
  loadingBar: {
    height: 4,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo de la barra semi-transparente
    borderRadius: 2,
    overflow: 'hidden', // Ocultar contenido que se salga del contenedor
  },
  // Barra de progreso animada (relleno)
  loadingProgress: {
    height: '100%',
    backgroundColor: '#fff', // Color blanco para el progreso
    borderRadius: 2,
  },
});

export default SplashScreen;