import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import axios from 'axios';

// ⚠️ ATENÇÃO: Troque pela URL da sua API na Vercel!
const API_URL = "https://curriculo-app-nine.vercel.app/api/pessoa/1";

export default function ProfissionalScreen() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setExperiencias(response.data.experiencias || []);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      setExperiencias([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchData(); }, []));
  const onRefresh = useCallback(() => { setRefreshing(true); fetchData(); }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.cargo}</Text>
      <Text style={styles.cardSubtitle}>{item.empresa}</Text>
      <Text style={styles.cardDate}>{item.data_inicio} até {item.data_fim || 'Atual'}</Text>
      <Text style={styles.cardContent}>{item.descricao}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
      ) : (
        <FlatList
          data={experiencias}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />}
          ListEmptyComponent={<View style={styles.card}><Text style={styles.cardTitle}>Nenhuma experiência cadastrada.</Text></View>}
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
  cardContent: { fontSize: 16, color: '#DDDDDD', lineHeight: 24 },
});