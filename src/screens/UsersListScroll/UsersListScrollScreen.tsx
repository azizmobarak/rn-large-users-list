import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Button} from 'react-native';
import CustomizedFlatList from '../../components/CustomizedFlatListWithHeader';
import {getUsersList} from './getUserListService';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducer/RootReducer';
import RemoteDataComponent from '../../components/RemoteData';
import {BaseColors} from '../../theme/colors';
import {userListViewActions} from './actions';
import {buildUsersListPresenter} from './usersPresenter';

function UsersScreen() {
  const dispatch = useDispatch();
  const {users, state}: any = useSelector<RootState>(
    _state => _state.usersReducer,
  );

  useEffect(() => {
    getUsersList();
  }, []);

  const onListSort = () => {
    const {sortedList} = buildUsersListPresenter(users, 1);
    dispatch(userListViewActions.loadList());
    dispatch(userListViewActions.getUsers(sortedList));
  };

  const renderError = () => (
    <View style={styles.error}>
      <Text style={styles.errorText}>Error No Data Provided</Text>
      <Button
        title={'referch'}
        onPress={() => getUsersList()}
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
      <CustomizedFlatList onSortList={onListSort} data={users} />
    </View>
  );

  return (
    <RemoteDataComponent
      renderView={renderView}
      renderLoading={renderLoding}
      renderError={renderError}
      state={state}
    />
  );
}

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
    height: 30,
  },
  button: {
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: BaseColors.WhiteText,
  },
  loader: {
    width: '100%',
    height: 50,
    marginTop: 40,
    backgroundColor: BaseColors.Primary,
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
    color: BaseColors.Error,
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
    flex: 1,
    backgroundColor: BaseColors.Primary,
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
    color: BaseColors.WhiteText,
    fontStyle: 'italic',
  },
  pageNumber: {
    marginHorizontal: 10,
  },
});

export const UserListScrollScreen = UsersScreen;
