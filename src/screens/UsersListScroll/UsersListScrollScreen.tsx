import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
  ViewStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import headerBuilder from '../../services/Navigation/headerBuilder';
import CustomizedFlatList from '../../components/CustomizedFlatListWithHeader';
import {getUsersList} from './getUserListService';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducer/RootReducer';
import RemoteDataComponent from '../../components/RemoteData';
import {buildUsersListPresenter} from './usersPresenter';
import {NavigationState} from '../../utils/typing';
import {BaseColors} from '../../theme/colors';

function UsersScreen() {
  const navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {users, currentPage, state, lastPage}: any = useSelector<RootState>(
    _state => _state.usersReducer,
  );
  const [sortTo, setSortTo] = useState(1);
  const {pagination, title} = buildUsersListPresenter(
    currentPage,
    lastPage,
    users,
    sortTo,
    state,
  );

  useEffect(() => {
    setUsersData(users as []);
  }, [users]);

  useEffect(() => {
    navigation.addListener(NavigationState.Focus, () =>
      getUsersList(pageNumber),
    );
    return () =>
      navigation.removeListener(NavigationState.Blur, () =>
        getUsersList(pageNumber),
      );
  }, [pageNumber, navigation]);

  const onEnd = () => {
    const newEnd: number = pageNumber + 1;
    setPageNumber(newEnd);
    setLoading(true);
    getUsersList(pageNumber);
    setLoading(true);
  };

  const onRefrech = () => {
    const newEnd: number = pageNumber + 1;
    setPageNumber(newEnd);
    getUsersList(pageNumber);
  };

  useEffect(() => {
    navigation.setOptions(
      headerBuilder({
        title,
      }),
    );
  }, [navigation, title]);

  const navigate = useCallback(
    (isNext: boolean) => {
      const newEnd: number = pageNumber + (isNext ? 1 : -1);
      setPageNumber(newEnd);
      setLoading(true);
      getUsersList(pageNumber);
      setLoading(false);
    },
    [pageNumber],
  );

  const renderError = () => (
    <View style={styles.error}>
      <Text style={styles.errorText}>Error No Data Provided</Text>
      <Button
        title={'referch'}
        onPress={() => getUsersList(pageNumber)}
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
        <View style={styles.filterContainer}>
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
      <CustomizedFlatList
        onRefrech={onRefrech}
        onEnd={onEnd}
        data={usersData}
      />
      {isBottomLoader()}
      {pagination.length === 4
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
          disabled={pageNumber === 1}
          onPress={() => navigate(false)}
          style={styles.simplePaginationButtons}>
          <Text>{'<<<<'}</Text>
        </TouchableOpacity>

        <Text style={styles.pageNumber}>
          {pageNumber} / {lastPage}
        </Text>

        <TouchableOpacity
          disabled={pageNumber === lastPage}
          onPress={() => navigate(true)}
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
          <ActivityIndicator color={BaseColors.Secondary} />
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
    marginHorizontal: 4,
  },
});

export const UserListScrollScreen = UsersScreen;
