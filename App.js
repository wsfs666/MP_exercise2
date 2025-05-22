import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';
import { InboxProvider } from './components/InboxContext';

// or any files within the Snack

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import MessageScreen from './screen/MessageScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <InboxProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Messages" component={MessageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </InboxProvider>
   
  );
}


