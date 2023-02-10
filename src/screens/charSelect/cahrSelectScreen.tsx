import React from 'react';
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
} from 'react-native';
import {userListViewActions} from '../UsersListScroll/actions';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

type ItemData = {
  id: string;
  title: string;
};

const letters = 'ABCDEFGHIJKLMNOPQRSTVWXYZ'.split('');

const getItem = (_data: unknown, index: number): ItemData => ({
  id: Math.random().toString(12).substring(0),
  title: letters[index],
});

const getItemCount = (_data: unknown) => letters.length;

type ItemProps = {
  title: string;
  onPress: () => void;
};

const Item = ({title, onPress}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const separator = () => <View style={styles.separator} />;

export const CahrSelectScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onItemPress = (value: string) => {
    console.log(value);
    if ((typeof value === 'string' && value.length === 1) || value === '') {
      dispatch(userListViewActions.scrollToChart(value));
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({item}) => (
          <Item title={item.title} onPress={() => onItemPress(item.title)} />
        )}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
        ItemSeparatorComponent={separator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 30,
    justifyContent: 'center',
    marginVertical: 4,
    marginHorizontal: 16,
    padding: 5,
  },
  title: {
    fontSize: 16,
  },
  separator: {
    borderWidth: 0.3,
    opacity: 0.4,
  },
});
