import React, { useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import commonStyles from './styles';

const ListItem = ({
  item,
  onChange,
  onFocus,
  onDelete,
}) => {
  const { id, value } = item; 
  const textRef = useRef(null);
  const focus = () => {
    textRef.current.focus();
  }
  const textStyle = {
    ...styles.text,
    fontSize: value.length < 13 ? 36 : 28
  }
  useEffect(focus, []);
  return (
    <TouchableWithoutFeedback onPress={focus}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TextInput
            ref={textRef}
            underlineColorAndroid="transparent"
            multiline
            autoCorrect={false}
            autoCapitalize="words"
            onChangeText={text => onChange({ id, value: text })}
            onFocus={() => onFocus(item)}
            style={textStyle}
            numberOfLines={2}
            value={value}
          />
        </View>
        <TouchableOpacity style={styles.deleteContainer} onPress={() => onDelete(item)}>
          <MaterialIcons name="delete" size={40} color="#EB9797" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: commonStyles.container,
  text: commonStyles.text,
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteContainer: {
    position: 'absolute',
    right: 0,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default ListItem;
