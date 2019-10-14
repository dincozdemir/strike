import React, { useRef } from 'react';
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
  const onPress = () => {
    if(textRef.current){
      textRef.current.focus();
    }
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TextInput
            ref={textRef}
            autoFocus
            underlineColorAndroid="transparent"
            autoCorrect={false}
            autoCapitalize="words"
            onChangeText={text => onChange({ id, value: text })}
            onFocus={() => onFocus(item)}
            style={styles.text}
          >
            {value}
          </TextInput>
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