import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import List from './src/components/List';

export default function App() {
  return (
    <List />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
