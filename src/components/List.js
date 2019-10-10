import React, { useState, useMemo, useEffect } from 'react';
import { FlatList, StyleSheet, SafeAreaView, AsyncStorage, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ListItem from './ListItem';
import NewItem from './NewItem';

const List = () => {
  const [blurred, setBlurred] = useState(null);
  const [counter, setCounter] = useState(0);
  const [list, setList] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      //await AsyncStorage.removeItem('@strike/list');

      const savedList = await AsyncStorage.getItem('@strike/list');
      const counter = await AsyncStorage.getItem('@strike/counter');
      if (savedList) {
        setList(JSON.parse(savedList));
        setCounter(parseInt(counter));
      }
    }
    loadData();
  }, []);

  const updateList = newList => {
    setList(newList);
    AsyncStorage.setItem('@strike/list', JSON.stringify(newList));
    AsyncStorage.setItem('@strike/counter', `${counter + 1}`);
  }

  const addItem = addItem => {
    updateList([
      ...list,
      addItem
    ])
  }

  const updateItem = updateItem => {
    updateList(list.map(item => item.id === updateItem.id ? { ...updateItem } : item));
  }

  const deleteItem = deleteItem => {
    updateList(list.filter(item => item.id !== deleteItem.id));
  }

  const clickAddItem = () => {
    addItem({ id: counter, value: '' });
    setCounter(counter + 1);
  }

  const clearEmpty = () => {
    updateList(list.filter(item => item.value !== ''))
  }

  const onFocus = focusItem => {
    updateList(list.filter(item => item.value !== '' || item.id === focusItem.id))
  }
  
  return (
    <SafeAreaView>
    <KeyboardAwareScrollView
      extraScrollHeight={100}
      enableOnAndroid={true}
      keyboardShouldPersistTaps='handled'
      resetScrollToCoords={{ x: 0, y: 0 }}
    >
      {list.map(item => (
        <ListItem
          key={item.id}
          item={item}
          onChange={updateItem}
          onFocus={onFocus}
          onDelete={deleteItem}
        />
      ))}
      <TouchableOpacity onPress={clickAddItem}>
        <NewItem />
      </TouchableOpacity>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
  }
})

export default List;
