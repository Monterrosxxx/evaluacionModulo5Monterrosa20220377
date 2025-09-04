import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useAuth } from '../context/AuthContext.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';

// Pantalla de edición de perfil
const ProfileScreen = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    universitaryTitle: '',
    graduationYear: new Date()
  });
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

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
        const data = userDoc.data();
        setUserData({
          name: data.name || '',
          email: data.email || user.email,
          universitaryTitle: data.universitaryTitle || '',
          graduationYear: data.graduationYear ? new Date(data.graduationYear, 0, 1) : new Date()
        });
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  };

  // Función para actualizar los datos del formulario
  const updateFormData = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Validar formulario
  const validateForm = () => {
    if (!userData.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return false;
    }
    
    if (!userData.universitaryTitle.trim()) {
      Alert.alert('Error', 'El título universitario es requerido');
      return false;
    }
    
    return true;
  };

  // Función para guardar cambios del perfil
  const handleSaveProfile = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await updateDoc(doc(database, 'users', user.uid), {
        name: userData.name.trim(),
        universitaryTitle: userData.universitaryTitle.trim(),
        graduationYear: userData.graduationYear.getFullYear(),
        updatedAt: new Date()
      });

      setIsEditing(false);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
    setLoading(false);
  };

  // Función para cambiar contraseña
  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      Alert.alert('Error', 'Completa todos los campos de contraseña');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert('Error', 'Las nuevas contraseñas no coinciden');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      // Reautenticar usuario
      const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Actualizar contraseña
      await updatePassword(user, passwordData.newPassword);

      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      Alert.alert('Éxito', 'Contraseña actualizada correctamente');
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      let errorMessage = 'Error al cambiar la contraseña';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'La contraseña actual es incorrecta';
      }
      
      Alert.alert('Error', errorMessage);
    }
    setLoading(false);
  };

  // Manejar cambio de fecha
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      updateFormData('graduationYear', selectedDate);
    }
  };

  return (
    <LinearGradient
      colors={['#f5f5f5', '#fff']}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <Animatable.View 
            animation="fadeInDown" 
            duration={1000}
            style={styles.header}
          >
            <Text style={styles.title}>Mi Perfil</Text>
            <Text style={styles.subtitle}>Edita tu información personal</Text>
          </Animatable.View>

          {/* Formulario de perfil */}
          <Animatable.View 
            animation="fadeInUp" 
            delay={300}
            duration={1000}
            style={styles.formContainer}
          >
            <Text style={styles.sectionTitle}>Información Personal</Text>

            {/* Campo de nombre */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                placeholder="Nombre completo"
                value={userData.name}
                onChangeText={(text) => updateFormData('name', text)}
                autoCapitalize="words"
                editable={isEditing}
              />
            </View>

            {/* Campo de email (solo lectura) */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.disabledInput]}
                placeholder="Correo electrónico"
                value={userData.email}
                editable={false}
              />
            </View>

            {/* Campo de título universitario */}
            <View style={styles.inputContainer}>
              <Ionicons name="school-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                placeholder="Título universitario"
                value={userData.universitaryTitle}
                onChangeText={(text) => updateFormData('universitaryTitle', text)}
                autoCapitalize="words"
                editable={isEditing}
              />
            </View>

            {/* Campo de año de graduación */}
            <TouchableOpacity 
              style={[styles.inputContainer, !isEditing && styles.disabledContainer]}
              onPress={isEditing ? () => setShowDatePicker(true) : null}
              disabled={!isEditing}
            >
              <Ionicons name="calendar-outline" size={20} color="#666" style={styles.inputIcon} />
              <Text style={[styles.dateText, !isEditing && styles.disabledText]}>
                Año de graduación: {userData.graduationYear.getFullYear()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={userData.graduationYear}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1950, 0, 1)}
              />
            )}

            {/* Botones de perfil */}
            <View style={styles.buttonContainer}>
              {!isEditing ? (
                <TouchableOpacity 
                  style={styles.editButton} 
                  onPress={() => setIsEditing(true)}
                >
                  <Ionicons name="create-outline" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Editar Perfil</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.editButtonContainer}>
                  <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={handleSaveProfile}
                    disabled={loading}
                  >
                    <Ionicons name="checkmark-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>
                      {loading ? 'Guardando...' : 'Guardar'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={() => {
                      setIsEditing(false);
                      loadUserData();
                    }}
                  >
                    <Ionicons name="close-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Animatable.View>

          {/* Sección de cambio de contraseña */}
          <Animatable.View 
            animation="fadeInUp" 
            delay={500}
            duration={1000}
            style={styles.formContainer}
          >
            <TouchableOpacity 
              style={styles.passwordToggle}
              onPress={() => setShowPasswordForm(!showPasswordForm)}
            >
              <Text style={styles.sectionTitle}>Cambiar Contraseña</Text>
              <Ionicons 
                name={showPasswordForm ? "chevron-up-outline" : "chevron-down-outline"} 
                size={24} 
                color="#0288d1" 
              />
            </TouchableOpacity>

            {showPasswordForm && (
              <View style={styles.passwordContainer}>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña actual"
                    value={passwordData.currentPassword}
                    onChangeText={(text) => setPasswordData(prev => ({...prev, currentPassword: text}))}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nueva contraseña"
                    value={passwordData.newPassword}
                    onChangeText={(text) => setPasswordData(prev => ({...prev, newPassword: text}))}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmar nueva contraseña"
                    value={passwordData.confirmPassword}
                    onChangeText={(text) => setPasswordData(prev => ({...prev, confirmPassword: text}))}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>

                <TouchableOpacity 
                  style={styles.changePasswordButton} 
                  onPress={handleChangePassword}
                  disabled={loading}
                >
                  <Ionicons name="key-outline" size={20} color="#fff" />
                  <Text style={styles.buttonText}>
                    {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    minHeight: 50,
  },
  disabledContainer: {
    backgroundColor: '#f0f0f0',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#999',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 15,
  },
  disabledText: {
    color: '#999',
  },
  buttonContainer: {
    marginTop: 10,
  },
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  editButton: {
    backgroundColor: '#0288d1',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0288d1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4caf50',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f44336',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  passwordToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordContainer: {
    marginTop: 10,
  },
  changePasswordButton: {
    backgroundColor: '#ff9800',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ProfileScreen;