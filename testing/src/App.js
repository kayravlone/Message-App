import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './App.style';
import Login from './pages/auth/Login/Login';
import Sign from './pages/auth/Sign/Sign';
import Messages from './pages/Messages/Messages';
import auth from '@react-native-firebase/auth';
import colors from './styles/colors';

const Stack = createNativeStackNavigator();

function App() {
  const [userSession, setUserSession] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUserSession(!!user);
    });

    return unsubscribe;
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor,
        headerTitleStyle: styles.headerTitleStyle,
        headerShown: false
      }}>
        <Stack.Screen name='MessagesPage' component={Messages} />
        <Stack.Screen name='LoginPage' component={Login} />
        <Stack.Screen name='SignPage' component={Sign} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor,
        headerTitleStyle: styles.headerTitleStyle,
        headerShown: false
      }}>
        {
          !userSession ?
            <Stack.Screen name='AuthStack' component={AuthStack} />
            :
            <Stack.Screen
              name='MessagesPage'
              component={Messages}
              options={({ navigation }) => ({
                title: 'A$AP',
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerShown: userSession, // Kullanıcı giriş yapmışsa başlığı göster
                headerRight: () => (
                  <Icon
                    name="logout"
                    size={24}
                    color='white'
                    style={{ marginRight: 16 }}
                    onPress={() => {
                      // Çıkış işlevini burada ele alın
                      auth().signOut();
                    }}
                  />
                ),
              })}
            />

        }
      </Stack.Navigator>
      <FlashMessage position='top' />
    </NavigationContainer>
  )
}

export default App;
