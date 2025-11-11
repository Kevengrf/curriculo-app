import React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ⚠️ ATENÇÃO: Troque pelos links dos seus repositórios!
// ⚠️ ATENÇÃO FINAL - TROCAR ANTES DE ENTREGAR! ⚠️
const meusProjetos = [
  {
    id: 1,
    titulo: 'Projeto da API de Currículo (Tarefa 1)',
    descricao: 'API RESTful feita com Node.js, Express e Supabase (PostgreSQL) para gerenciar currículos, incluindo dados pessoais, experiências e formações com relacionamentos.',
    link: 'https://github.com/SEU_USUARIO_GITHUB/NOME_DO_REPO_DA_API'
  },
  {
    id: 2,
    titulo: 'Este App de Portfólio (Tarefa 2)',
    descricao: 'Aplicativo React Native + Expo com Expo Router que consome a API de currículo para exibir dados de forma dinâmica.',
    link: 'https://github.com/SEU_USUARIO_GITHUB/NOME_DO_REPO_DO_APP'
  },
];

export default function ProjetosScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        {meusProjetos.map((projeto) => (
          <View style={styles.card} key={projeto.id}>
            <Text style={styles.cardTitle}>{projeto.titulo}</Text>
            <Text style={styles.cardContent}>{projeto.descricao}</Text>
            <Text style={styles.cardLink} onPress={() => Linking.openURL(projeto.link)}>
              Ver no GitHub
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  list: { padding: 20 },
  card: { backgroundColor: '#1C1C1E', borderRadius: 15, padding: 20, marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
  cardContent: { fontSize: 16, color: '#DDDDDD', lineHeight: 24, marginBottom: 15 },
  cardLink: { fontSize: 16, color: '#3478F6', fontWeight: 'bold' }
});