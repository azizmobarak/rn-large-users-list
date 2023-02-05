import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ActivityIndicator,
  Button,
} from 'react-native';
import {UsersListState} from './usersReducer';
import {Screens} from '../../services/Navigation/Screens';
import {useNavigation} from '@react-navigation/native';
import headerBuilder from '../../services/Navigation/headerBuilder';
import CustomizedFlatList from '../../components/flatList';
import {getUsersList} from './getUserListService';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducer/RootReducer';
import RemoteDataComponent from '../../components/RemoteData';

function UsersScreen() {
  // const dispatch = useDispatch();
  const navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  const [end, setEnd] = useState(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {users, currentPage, state}: any = useSelector<RootState>(
    _state => _state.usersReducer,
  );

  useEffect(() => {
    setUsersData(users as []);
  }, [users]);

  navigation.addListener('focus', () => getUsersList(end));
  navigation.addListener('blur', () => getUsersList(end));

  const onEnd = () => {
    const newEnd: number = end + 1;
    setEnd(newEnd);
    setLoading(true);
    getUsersList(end);
  };

  useEffect(() => {
    navigation.setOptions(
      headerBuilder({
        title: 'Scrolling List items ',
      }),
    );
  }, [navigation]);

  const renderError = () => (
    <View style={styles.error}>
      <Text style={styles.errorText}>Error No Data Provided</Text>
      <Button
        title={'referch'}
        onPress={() => getUsersList(end)}
        color={'#8777'}
      />
    </View>
  );

  const renderLoding = () => (
    <View style={styles.emptyListLoader}>
      <ActivityIndicator color={'black'} />
    </View>
  );

  const renderView = () => (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <View style={[styles.button, getColor('#677992')]}>
          <Text style={styles.buttonText}>Next page {currentPage}</Text>
        </View>
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
      <CustomizedFlatList onEnd={onEnd} data={usersData} />
      {isBottomLoader()}
    </View>
  );

  const isBottomLoader = () => {
    if (isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator color={'#ffff'} />
        </View>
      );
    }
    return null;
  };

  return (
    <RemoteDataComponent
      renderView={renderView}
      renderLoading={renderLoding}
      renderError={renderError}
      state={state}
    />
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
  emptyListLoader: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 24,
    color: 'red',
    fontWeight: '600',
  },
  referchButton: {
    width: 100,
  },
});

export const UserListScrollScreen = UsersScreen;
