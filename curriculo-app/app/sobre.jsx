import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SobreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sobre o App</Text>
          <Text style={styles.cardContent}>Este aplicativo foi desenvolvido como parte da atividade acadêmica, utilizando as seguintes tecnologias:</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>React Native</Text>
            <Text style={styles.tag}>Expo</Text>
            <Text style={styles.tag}>Expo Router</Text>
            <Text style={styles.tag}>JavaScript (ES6+)</Text>
            <Text style={styles.tag}>Axios</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Funcionalidade Extra Implementada</Text>
          <Text style={styles.cardContent}>
            A funcionalidade extra é a sua natureza dinâmica. 
            Ele consome em tempo real a API RESTful (criada na Tarefa 1) hospedada na Vercel e conectada ao Supabase.
          </Text>
          <Text style={styles.cardContent}>
            As telas 'Home', 'Profissional' e 'Acadêmica' buscam os dados da API, permitindo que o currículo seja atualizado no banco e o app reflita as mudanças.
          </Text>
        </View>
         <View style={styles.card}>
          <Text style={styles.cardTitle}>Módulos Utilizados</Text>
          <Text style={styles.cardContent}>- `expo-router`</Text>
          <Text style={styles.cardContent}>- `axios`</Text>
          <Text style={styles.cardContent}>- `react-native-safe-area-context`</Text>
          <Text style={styles.cardContent}>- `@expo/vector-icons`</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  scrollContainer: { padding: 20 },
  card: { backgroundColor: '#1C1C1E', borderRadius: 15, padding: 20, marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 15 },
  cardContent: { fontSize: 16, color: '#DDDDDD', lineHeight: 24, marginBottom: 10 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  tag: { backgroundColor: '#333333', color: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 15, marginRight: 10, marginBottom: 10, fontSize: 14 }
});