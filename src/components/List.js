import React, { useState, useMemo, useEffect } from 'react';
import { View, Dimensions, StyleSheet, SafeAreaView, AsyncStorage, TouchableOpacity, Text, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ListItem from './ListItem';
import NewItem from './NewItem';

const List = () => {
  const [counter, setCounter] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
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
    if (updateItem && updateItem.value.length < 20) {
      updateList(list.map(item => item.id === updateItem.id ? { ...updateItem } : item));
    }
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

  const clearOthers = focusItem => {
    updateList(list.filter(item => item.value !== '' || item.id === focusItem.id))
  }

  return (
    <SafeAreaView>
      <View style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
        <TouchableWithoutFeedback onPress={() => { clearOthers({}); }}>
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
                onFocus={clearOthers}
                onDelete={deleteItem}
              />
            ))}
            <TouchableOpacity onPress={clickAddItem}>
              <NewItem />
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView >
  );
}

export default List;
