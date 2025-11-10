import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function AppLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#555555',
          tabBarStyle: {
            backgroundColor: '#1C1C1E',
            borderTopColor: '#333333',
          },
          headerStyle: {
            backgroundColor: '#1C1C1E',
          },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profissional"
          options={{
            title: 'Profissional',
            tabBarIcon: ({ color }) => (
              <Ionicons name="briefcase-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="academica"
          options={{
            title: 'Acadêmica',
            tabBarIcon: ({ color }) => (
              <Ionicons name="school-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="projetos"
          options={{
            title: 'Projetos',
            tabBarIcon: ({ color }) => (
              <Ionicons name="folder-open-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sobre"
          options={{
            title: 'Sobre',
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-circle-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}