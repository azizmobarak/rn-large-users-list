import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { UserList, UserState } from './usersReducer';
import { Screens } from '../../services/Navigation/Screens';
import { useNavigation } from '@react-navigation/native';
import headerBuilder from '../../services/Navigation/headerBuilder';
import CustomizedFlatList from '../../components/flatList';
import { useDispatchUserListAction } from './useDispatchUserListAction';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/RootReducer';

function UsersScreen() {
  // const dispatch = useDispatch();
  const navigation = useNavigation();
  const [end, setEnd] = useState(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatchList = useDispatchUserListAction(end);
  const state: UserList = useSelector<RootState>(state => state.usersReducer);

  navigation.addListener('focus', () => dispatchList);
  navigation.addListener('blur', () => dispatchList);

  const onEnd = () => {
    const newEnd: number = end + 1;
    setEnd(newEnd);
    const loadingState = end === newEnd;
    setLoading(loadingState);
  };

  useEffect(() => {
    navigation.setOptions(
      headerBuilder({
        title: 'Scrolling List items ',
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, getColor('#677992')]}
          onPress={onEnd}>
          <Text style={styles.buttonText}>Next page {end}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, getColor('#677992')]}
          onPress={() =>
            navigation.navigate(Screens.UsersPaginationScreen as never)
          }>
          <Text style={styles.buttonText}>pagination</Text>
        </TouchableOpacity>
      </View>
      <CustomizedFlatList data={state.users} />
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator color={'#ffff'} />
        </View>
      )}
    </View>
  );
}

const getColor = (color: string): TextStyle => ({
  backgroundColor: color,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    height: 30,
  },
  button: {
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  loader: {
    width: '100%',
    height: 50,
    marginTop: 40,
    backgroundColor: '#336648',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const UserListScrollScreen = UsersScreen;
