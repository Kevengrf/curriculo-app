import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import axios from 'axios';

// ⚠️ ATENÇÃO: Troque pela URL da sua API na Vercel!
const API_URL = "https://SEU-PROJETO-API.vercel.app/api/pessoa/1"; 

export default function HomeScreen() {
  const [pessoa, setPessoa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setPessoa(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      setPessoa(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />
        }>
        {loading && !refreshing ? (
          <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
        ) : !pessoa ? (
          <View style={styles.card}>
            <Text style={styles.errorText}>Não foi possível carregar os dados.</Text>
            <Text style={styles.errorSubText}>Verifique se a API_URL está correta.</Text>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.name}>{pessoa.nome} {pessoa.sobrenome}</Text>
              <Text style={styles.contact}>{pessoa.email} | {pessoa.telefone}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Resumo Profissional</Text>
              <Text style={styles.cardContent}>{pessoa.resumo_perfil || "Nenhum resumo cadastrado."}</Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  scrollContainer: { padding: 20 },
  loader: { marginTop: 50 },
  header: { alignItems: 'center', marginBottom: 30 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  contact: { fontSize: 16, color: '#AAAAAA', marginTop: 5 },
  card: { backgroundColor: '#1C1C1E', borderRadius: 15, padding: 20, marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
  cardContent: { fontSize: 16, color: '#DDDDDD', lineHeight: 24 },
  errorText: { fontSize: 18, color: '#FF6B6B', textAlign: 'center', fontWeight: 'bold' },
  errorSubText: { fontSize: 14, color: '#AAAAAA', textAlign: 'center', marginTop: 10 },
});