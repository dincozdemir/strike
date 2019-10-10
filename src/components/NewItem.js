import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import commonStyles from './styles';

const NewItem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Note</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: commonStyles.container,
  text: {
    ...commonStyles.text,
    color: '#ccc'
  }
})

export default NewItem;