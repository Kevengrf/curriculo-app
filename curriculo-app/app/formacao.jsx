import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import axios from 'axios';

const API_URL = "https://curriculo-app-nine.vercel.app/api/pessoa/1";

export default function FormacaoScreen() {
  const [formacoes, setFormacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    if (!refreshing) setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setFormacoes(response.data.formacoes || []);
    } catch (error) {
      console.error("Erro ao buscar formações:", error);
      setFormacoes([]);
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
        ) : formacoes.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nenhuma formação acadêmica cadastrada.</Text>
          </View>
        ) : (
          formacoes.map((form) => (
            <View style={styles.card} key={form.id}>
              <Text style={styles.cardTitle}>{form.curso}</Text>
              <Text style={styles.cardSubtitle}>{form.instituicao}</Text>
              <Text style={styles.cardDate}>{new Date(form.data_inicio).getFullYear()} - {form.data_fim ? new Date(form.data_fim).getFullYear() : 'Cursando'}</Text>
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
  cardDate: { fontSize: 14, color: '#888888', fontStyle: 'italic' },
});