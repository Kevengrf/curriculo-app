import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import axios from 'axios';

// ⚠️ ATENÇÃO: Troque pela URL da sua API na Vercel!
const API_URL = "https://curriculo-app-nine.vercel.app/api/pessoa/1";

export default function AcademicaScreen() {
  const [formacoes, setFormacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setFormacoes(response.data.formacoes || []);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      setFormacoes([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchData(); }, []));
  const onRefresh = useCallback(() => { setRefreshing(true); fetchData(); }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.curso}</Text>
      <Text style={styles.cardSubtitle}>{item.instituicao}</Text>
      <Text style={styles.cardDate}>{item.data_inicio} até {item.data_fim || 'Cursando'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
      ) : (
        <FlatList
          data={formacoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />}
          ListEmptyComponent={<View style={styles.card}><Text style={styles.cardTitle}>Nenhuma formação cadastrada.</Text></View>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 20 },
  card: { backgroundColor: '#1C1C1E', borderRadius: 15, padding: 20, marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  cardSubtitle: { fontSize: 16, color: '#BBBBBB', marginTop: 5, marginBottom: 10 },
  cardDate: { fontSize: 14, color: '#888888', fontStyle: 'italic', marginBottom: 10 },
});