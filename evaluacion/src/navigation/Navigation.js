import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Importar pantallas
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

// Componente de navegación principal que maneja la autenticación
const AuthNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // Mientras se verifica la autenticación, mostrar splash
    return <SplashScreen isCheckingAuth={true} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // Usuario autenticado - mostrar tabs
        <Stack.Screen name="Main" component={TabNavigation} />
      ) : (
        // Usuario no autenticado - mostrar login/register
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

// Navegador principal que incluye la splash screen inicial
const MainNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      {/* Splash screen inicial que se muestra al abrir la app */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      
      {/* Navegación principal con autenticación */}
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
};

// Componente principal de navegación con proveedor de autenticación
const Navigation = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default Navigation;