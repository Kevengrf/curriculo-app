import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import axios from 'axios';

const API_URL = "https://curriculo-app-nine.vercel.app/api/pessoa/1"; 

export default function ExperienciaScreen() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    if (!refreshing) setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setExperiencias(response.data.experiencias || []);
    } catch (error) {
      console.error("Erro ao buscar experiências:", error);
      setExperiencias([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchData(); }, []));
  const onRefresh = useCallback(() => { setRefreshing(true); fetchData(); }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : experiencias.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nenhuma experiência profissional cadastrada.</Text>
          </View>
        ) : (
          experiencias.map((exp) => (
            <View style={styles.card} key={exp.id}>
              <Text style={styles.cardTitle}>{exp.cargo}</Text>
              <Text style={styles.cardSubtitle}>{exp.empresa}</Text>
              <Text style={styles.cardDate}>{new Date(exp.data_inicio).getFullYear()} - {exp.data_fim ? new Date(exp.data_fim).getFullYear() : 'Atual'}</Text>
              <Text style={styles.cardContent}>{exp.descricao}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  list: { padding: 20 },
  card: { backgroundColor: '#1C1C1E', borderRadius: 15, padding: 20, marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 5 },
  cardSubtitle: { fontSize: 16, color: '#AAAAAA', marginBottom: 10 },
  cardDate: { fontSize: 14, color: '#888888', fontStyle: 'italic', marginBottom: 15 },
  cardContent: { fontSize: 16, color: '#DDDDDD', lineHeight: 24 },
});