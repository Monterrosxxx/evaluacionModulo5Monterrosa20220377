<h1 align="center">📱 Evaluación Firebase - Módulo 5</h1>
<h2 align="center">Aplicación React Native con Firebase - Monterrosa</h2>

<div align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native"/>
  <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" alt="Firebase"/>
  <img src="https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37" alt="Expo"/>
</div>

<br/>

<h3>👨‍🎓 Información del Estudiante</h3>
<table>
  <tr>
    <td><strong>Nombre:</strong></td>
    <td>Rodrigo Josué Monterrosa Jorge</td>
  </tr>
  <tr>
    <td><strong>Carnet:</strong></td>
    <td>20220377</td>
  </tr>
</table>

<h3>🎥 Video Demostrativo</h3>
<p>
  <a href="https://drive.google.com/file/d/1B87hsNqs08Sp-XLhi7v4feqQ-li23NAu/view?usp=sharing" target="_blank">
    <img src="https://img.shields.io/badge/Ver_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Ver demostración"/>
  </a>
</p>

<h3>📋 Descripción del Proyecto</h3>
<p>Sistema de gestión de usuarios desarrollado en React Native con integración a Firebase. La aplicación incluye funcionalidades de autenticación, registro de usuarios, gestión de perfiles y navegación por tabs.</p>

<h3>✨ Características Principales</h3>
<ul>
  <li>🔐 <strong>Autenticación completa</strong> con Firebase Auth</li>
  <li>👤 <strong>Registro y login</strong> de usuarios</li>
  <li>📝 <strong>Gestión de perfiles</strong> con información personalizada</li>
  <li>🎨 <strong>Interfaz moderna</strong> con gradientes y animaciones</li>
  <li>📱 <strong>Navegación por tabs</strong> intuitiva</li>
  <li>💾 <strong>Almacenamiento en Firestore</strong> para datos de usuario</li>
  <li>🎭 <strong>Splash screen</strong> animado</li>
  <li>🔄 <strong>Cambio de contraseña</strong> con reautenticación</li>
</ul>

<h3>📦 Dependencias Utilizadas</h3>

<h4>Dependencias Principales</h4>
<pre><code>{
  "@expo/vector-icons": "^15.0.2",
  "@expo-google-fonts/poppins": "^0.2.3",
  "@react-native-community/datetimepicker": "^8.4.4",
  "@react-navigation/bottom-tabs": "^7.4.7",
  "@react-navigation/native": "^7.1.17",
  "@react-navigation/native-stack": "^7.3.26",
  "expo": "~53.0.22",
  "expo-constants": "^17.1.7",
  "expo-font": "~13.0.1",
  "expo-linear-gradient": "^14.1.5",
  "expo-splash-screen": "~0.29.15",
  "expo-status-bar": "~2.2.3",
  "firebase": "^12.2.1",
  "react": "19.0.0",
  "react-native": "0.79.6",
  "react-native-animatable": "^1.4.0",
  "react-native-dotenv": "^3.4.11",
  "react-native-gesture-handler": "^2.28.0",
  "react-native-safe-area-context": "^5.6.1",
  "react-native-screens": "^4.16.0"
}</code></pre>

<h4>Descripción de Dependencias Clave</h4>
<table>
  <thead>
    <tr>
      <th>Dependencia</th>
      <th>Propósito</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>firebase</code></td>
      <td>Integración con servicios de Firebase (Auth, Firestore)</td>
    </tr>
    <tr>
      <td><code>@react-navigation/*</code></td>
      <td>Sistema de navegación entre pantallas</td>
    </tr>
    <tr>
      <td><code>expo-linear-gradient</code></td>
      <td>Gradientes para diseño visual</td>
    </tr>
    <tr>
      <td><code>react-native-animatable</code></td>
      <td>Animaciones predefinidas</td>
    </tr>
    <tr>
      <td><code>@expo-google-fonts/poppins</code></td>
      <td>Fuentes personalizadas</td>
    </tr>
    <tr>
      <td><code>@react-native-community/datetimepicker</code></td>
      <td>Selector de fecha</td>
    </tr>
    <tr>
      <td><code>react-native-dotenv</code></td>
      <td>Manejo de variables de entorno</td>
    </tr>
    <tr>
      <td><code>@expo/vector-icons</code></td>
      <td>Iconos vectoriales</td>
    </tr>
  </tbody>
</table>

<h3>🏗️ Estructura del Proyecto</h3>
<pre><code>src/
├── config/
│   └── firebase.js          # Configuración de Firebase
├── context/
│   └── AuthContext.js       # Contexto de autenticación
├── navigation/
│   ├── Navigation.js        # Navegación principal
│   └── TabNavigation.js     # Navegación por tabs
└── screens/
    ├── SplashScreen.js      # Pantalla de carga
    ├── LoginScreen.js       # Pantalla de login
    ├── RegisterScreen.js    # Pantalla de registro
    ├── HomeScreen.js        # Pantalla principal
    └── ProfileScreen.js     # Pantalla de perfil</code></pre>

<h3>🚀 Configuración e Instalación</h3>

<ol>
  <li><strong>Clonar el repositorio</strong>
    <pre><code>git clone [URL_DEL_REPOSITORIO]
cd evaluacion</code></pre>
  </li>
  
  <li><strong>Instalar dependencias</strong>
    <pre><code>npm install</code></pre>
  </li>
  
  <li><strong>Configurar Firebase</strong>
    <ul>
      <li>Crear un archivo <code>.env</code> en la raíz del proyecto</li>
      <li>Agregar las variables de configuración de Firebase:</li>
    </ul>
    <pre><code>API_KEY=tu_api_key
AUTH_DOMAIN=tu_auth_domain
PROJECT_ID=tu_project_id
STORAGE_BUCKET=tu_storage_bucket
MESSAGING_SENDER_ID=tu_messaging_sender_id
APP_ID=tu_app_id</code></pre>
  </li>
  
  <li><strong>Ejecutar la aplicación</strong>
    <pre><code>npm start</code></pre>
  </li>
</ol>

<h3>📱 Funcionalidades Implementadas</h3>

<h4>🔑 Autenticación</h4>
<ul>
  <li>Login con email y contraseña</li>
  <li>Registro de nuevos usuarios</li>
  <li>Validación de formularios</li>
  <li>Manejo de errores de autenticación</li>
  <li>Cierre de sesión</li>
</ul>

<h4>👤 Gestión de Perfil</h4>
<ul>
  <li>Visualización de información personal</li>
  <li>Edición de datos del usuario</li>
  <li>Cambio de contraseña con reautenticación</li>
  <li>Selector de año de graduación</li>
  <li>Validación de datos</li>
</ul>

<h4>🎨 Interfaz de Usuario</h4>
<ul>
  <li>Diseño moderno con gradientes</li>
  <li>Animaciones fluidas</li>
  <li>Iconos vectoriales</li>
  <li>Splash screen personalizado</li>
  <li>Navegación intuitiva por tabs</li>
</ul>

<h3>🔧 Tecnologías Utilizadas</h3>
<ul>
  <li><strong>React Native</strong> - Framework de desarrollo</li>
  <li><strong>Expo</strong> - Plataforma de desarrollo</li>
  <li><strong>Firebase Auth</strong> - Autenticación de usuarios</li>
  <li><strong>Firestore</strong> - Base de datos NoSQL</li>
  <li><strong>React Navigation</strong> - Navegación entre pantallas</li>
  <li><strong>React Native Animatable</strong> - Animaciones</li>
</ul>

<h3>📋 Requisitos del Sistema</h3>
<ul>
  <li>Node.js 14 o superior</li>
  <li>Expo CLI</li>
  <li>Cuenta de Firebase</li>
  <li>Dispositivo móvil o emulador para pruebas</li>
</ul>

<hr/>

<p align="center"><em>Desarrollado como parte de la evaluación del Módulo 5</em></p>
