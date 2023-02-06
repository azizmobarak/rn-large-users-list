import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Alert,
} from 'react-native';
import {UserState} from '../screens/UsersListScroll/usersReducer';
import {generateKeyExtrator} from '../utils/strings';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducer/RootReducer';
import {AnyAction, Dispatch} from 'redux';
import {userListViewActions} from '../screens/UsersListScroll/actions';
import {BaseColors} from '../theme/colors';

type Props = {
  data: UserState[];
  onEnd?: () => void;
  onRefrech?: () => void;
};

export default function CustomizedFlatList(props: Props) {
  const [refreshing, setIsRefreshing] = useState(false);
  const [listRef, setListRef] = useState<FlatList<UserState> | null>(null);
  const dispatch = useDispatch();
  const {scrollToChart}: any = useSelector<RootState>(
    _state => _state.usersReducer,
  );

  const onRefrech = (reload: (() => void) | undefined): boolean => {
    setIsRefreshing(true);
    if (!reload) {
      return false;
    }
    reload();
    setIsRefreshing(false);
    return true;
  };

  return (
    <>
      {renderHeader(listRef, props.data, scrollToChart, dispatch)}
      <FlatList
        ref={list => setListRef(list)}
        data={props.data}
        keyExtractor={(item, _index) => generateKeyExtrator(item.name)}
        renderItem={renderData}
        ItemSeparatorComponent={sparator}
        style={styles.list}
        onEndReachedThreshold={0.5}
        onEndReached={({distanceFromEnd}) => onEndHandler(distanceFromEnd)}
        removeClippedSubviews={true}
        initialNumToRender={100}
        onRefresh={() => onRefrech(props.onRefrech)}
        refreshing={refreshing}
        onScrollToIndexFailed={() =>
          Alert.alert('Error', 'cannot Scroll To sdelected Chart')
        }
      />
    </>
  );
}

const renderHeader = (
  listRef: FlatList<UserState> | null,
  data: UserState[],
  char: string,
  dispatch: Dispatch<AnyAction>,
) => {
  const onCharChanged = (value: string) => {
    if ((typeof value === 'string' && value.length === 1) || value === '') {
      dispatch(userListViewActions.scrollToChart(value));
    }
  };

  const isScrollButtonDisabled = (): boolean => !char;

  const getScrollButtontext = (): string => {
    if (char) {
      return `Click to Scroll to names starts with ${char}`;
    }
    return 'Please type a Letter to scroll';
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        disabled={isScrollButtonDisabled()}
        style={styles.scrollButton}
        onPress={() =>
          listRef?.scrollToItem({
            item: getFirstItemsBylettersInList(data, char),
            animated: true,
          })
        }>
        <Text style={styles.textScrollStyle}>{getScrollButtontext()}</Text>
      </TouchableOpacity>
      <TextInput
        maxLength={1}
        style={styles.input}
        numberOfLines={1}
        onChangeText={onCharChanged}
      />
    </View>
  );
};

const onEndHandler = ({distanceFromEnd}: any) =>
  //   onEnd: (() => void) | undefined,
  {
    if (distanceFromEnd >= 0) {
      console.log('donnneee');
      // return onEnd() ?? null;
    }
  };

const renderData = (props: ListRenderItemInfo<UserState>) => {
  return (
    <View style={styles.row} key={generateKeyExtrator(props.index.toString())}>
      {props.item && (
        <Image source={{uri: props.item.image}} style={styles.image} />
      )}
      <Text style={styles.nameText}>{props.item.name}</Text>
    </View>
  );
};

const sparator = () => {
  return <View style={styles.separator} />;
};

const getFirstItemsBylettersInList = (
  data: UserState[],
  chart: string,
): UserState => {
  let user: UserState = {} as UserState;
  data.forEach((item, _) => {
    if (item.name.charAt(0) === chart) {
      user = item;
      return;
    }
  });
  return user;
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    opacity: 0.1,
  },
  image: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddin: 5,
    margin: 5,
  },
  nameText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  list: {
    marginTop: 10,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    width: '100%',
    borderBottomWidth: 0.3,
  },
  scrollButton: {
    borderWidth: 1,
    padding: 5,
    fontWeight: '300',
    borderStyle: 'dotted',
    borderColor: BaseColors.Primary,
    backgroundColor: BaseColors.Button,
  },
  textScrollStyle: {
    fontWeight: '300',
  },
  input: {
    width: 50,
    height: 25,
    borderWidth: 1,
    borderColor: BaseColors.Button,
  },
});
