import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ActivityIndicator,
  Button,
  ViewStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import headerBuilder from '../../services/Navigation/headerBuilder';
import CustomizedFlatList from '../../components/flatList';
import {getUsersList} from './getUserListService';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducer/RootReducer';
import RemoteDataComponent from '../../components/RemoteData';
import {userPresenterPresentable} from './usersPresenter';
import {navigateToPaginationScreen} from './helpers';
import {NavigationState} from '../../utils/typing';

function UsersScreen() {
  const navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  const [end, setEnd] = useState(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {users, currentPage, state, lastPage}: any = useSelector<RootState>(
    _state => _state.usersReducer,
  );
  const [sortTo, setSortTo] = useState(1);
  const {pagination} = userPresenterPresentable(
    currentPage,
    lastPage,
    users,
    sortTo,
  );

  useEffect(() => {
    setUsersData(users as []);
  }, [users]);

  useEffect(() => {
    navigation.addListener(NavigationState.Focus, () => getUsersList(end));
    return () =>
      navigation.removeListener(NavigationState.Blur, () => getUsersList(end));
  }, [end, navigation]);

  const onEnd = () => {
    const newEnd: number = end + 1;
    setEnd(newEnd);
    setLoading(true);
    getUsersList(end);
    setLoading(true);
  };

  useEffect(() => {
    navigation.setOptions(
      headerBuilder({
        title: 'Try Pagination & scroll Top Bottom',
      }),
    );
  }, [navigation]);

  const onNext = useCallback(() => {
    const newEnd: number = end + 1;
    setEnd(newEnd);
    setLoading(true);
    getUsersList(end);
    setLoading(false);
    console.log('p', end);
  }, [end]);

  const onPrevious = useCallback(() => {
    const newEnd: number = end - 1;
    setEnd(newEnd);
    setLoading(true);
    getUsersList(end);
    setLoading(false);
    console.log('p', end);
  }, [end]);

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
        <TouchableOpacity
          style={[styles.button, getColor('#677992')]}
          onPress={navigateToPaginationScreen}>
          <Text style={styles.buttonText}>Click to Switch to Scrolling</Text>
        </TouchableOpacity>

        <View style={[styles.filterContainer, getColor('#675992')]}>
          <Text style={styles.filterText}>Sort List</Text>
          <View style={styles.filterListButtonsContainer}>
            <TouchableOpacity
              disabled={sortTo === 1}
              onPress={() => setSortTo(1)}
              style={[
                styles.filterButton,
                getButtonDisabledStyle(sortTo === 1),
              ]}>
              <Text style={styles.filterButtonText}>{'A -> Z'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={sortTo === -1}
              onPress={() => setSortTo(-1)}
              style={[
                styles.filterButton,
                getButtonDisabledStyle(sortTo === -1),
              ]}>
              <Text style={styles.filterButtonText}>{'Z -> A'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomizedFlatList onEnd={onEnd} data={usersData} />
      {isBottomLoader()}
      {pagination.length > 0
        ? renderPagination()
        : renderPaginationSimpleButtons()}
    </View>
  );

  const renderPagination = () => {
    return (
      <>
        {pagination.forEach((page: number) => (
          <View style={styles.paginationContainer}>
            <TouchableOpacity style={styles.paginationButtons}>
              <Text>{page}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </>
    );
  };

  const renderPaginationSimpleButtons = () => {
    return (
      <View style={styles.simplePaginationContainer}>
        <TouchableOpacity
          onPress={onPrevious}
          style={styles.simplePaginationButtons}>
          <Text>{'<<<<'}</Text>
        </TouchableOpacity>

        <Text>{end}</Text>

        <TouchableOpacity
          onPress={onNext}
          style={styles.simplePaginationButtons}>
          <Text>{'>>>>'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

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

  const getButtonDisabledStyle = (isDisabled: boolean): ViewStyle => {
    if (isDisabled) {
      return {
        backgroundColor: 'gray',
      };
    }
    return {};
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
    alignItems: 'center',
    justifyContent: 'center',
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
  paginationContainer: {
    height: 30,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  paginationButtons: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  simplePaginationContainer: {
    width: '50%',
    padding: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  simplePaginationButtons: {
    borderWidth: 1,
    width: '40%',
    borderRadius: 10,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  filterListButtonsContainer: {
    flexDirection: 'row',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '50%',
  },
  filterButton: {
    height: 20,
    width: 60,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  filterButtonText: {
    fontWeight: '200',
  },
  filterText: {
    color: 'white',
    fontStyle: 'italic',
  },
});

export const UserListScrollScreen = UsersScreen;
