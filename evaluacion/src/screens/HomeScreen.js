import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

// Pantalla de inicio para usuarios autenticados
const HomeScreen = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    loadUserData();
  }, [user]);

  // Función para cargar datos del usuario desde Firestore
  const loadUserData = async () => {
    if (!user) return;
    
    try {
      const userDoc = await getDoc(doc(database, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log('No se encontraron datos del usuario');
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
    setLoading(false);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          onPress: async () => {
            try {
              await signOut(auth);
              console.log('Sesión cerrada exitosamente');
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header con saludo */}
      <LinearGradient
        colors={['#0288d1', '#29b6f6']}
        style={styles.header}
      >
        <Animatable.View 
          animation="fadeInDown" 
          duration={1000}
          style={styles.welcomeContainer}
        >
          <Text style={styles.welcomeText}>¡Bienvenido!</Text>
          <Text style={styles.nameText}>
            {userData?.name || user?.email || 'Usuario'}
          </Text>
        </Animatable.View>
      </LinearGradient>

      {/* Información del usuario */}
      <Animatable.View 
        animation="fadeInUp" 
        delay={300}
        duration={1000}
        style={styles.contentContainer}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Información de tu cuenta</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#0288d1" />
            <Text style={styles.infoLabel}>Nombre:</Text>
            <Text style={styles.infoValue}>{userData?.name || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#0288d1" />
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userData?.email || user?.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={20} color="#0288d1" />
            <Text style={styles.infoLabel}>Título:</Text>
            <Text style={styles.infoValue}>{userData?.universitaryTitle || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color="#0288d1" />
            <Text style={styles.infoLabel}>Graduación:</Text>
            <Text style={styles.infoValue}>{userData?.graduationYear || 'No disponible'}</Text>
          </View>
        </View>

        {/* Botones de acción */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.refreshButton} onPress={loadUserData}>
            <Ionicons name="refresh-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 30,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '300',
  },
  nameText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    minWidth: 80,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    marginLeft: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  refreshButton: {
    flex: 1,
    backgroundColor: '#4caf50',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4caf50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoutButton: {
    flex: 1,
    backgroundColor: '#f44336',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f44336',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default HomeScreen;