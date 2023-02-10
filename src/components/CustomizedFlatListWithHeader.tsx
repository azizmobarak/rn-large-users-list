import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  ListRenderItemInfo,
  StyleSheet,
  Alert,
} from 'react-native';
import {UserState} from '../screens/UsersListScroll/usersReducer';
import {generateKeyExtrator} from '../utils/strings';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer/RootReducer';
import {BaseColors} from '../theme/colors';
import FastImage from 'react-native-fast-image';
import {navigateToCharScreen} from '../services/Navigation/helpers';

const FIXED_HEIGHT: number = 30;

type Props = {
  data: UserState[];
  onSortList?: () => void;
};

export default function CustomizedFlatList(props: Props) {
  const [listRef, setListRef] = useState<FlatList<UserState> | null>(null);
  const {scrollToChart}: any = useSelector<RootState>(
    _state => _state.usersReducer,
  );

  return (
    <FlatList
      stickyHeaderIndices={[0]}
      ListHeaderComponent={renderHeader(listRef, props.data, scrollToChart)}
      ref={list => setListRef(list)}
      data={props.data}
      keyExtractor={(item, _index) => generateKeyExtrator(item.name)}
      renderItem={renderData}
      ItemSeparatorComponent={separator}
      style={styles.list}
      removeClippedSubviews={true}
      initialNumToRender={100}
      onScrollToIndexFailed={() =>
        Alert.alert('Error', 'cannot Scroll To selected Char')
      }
      getItemLayout={(_data, index) => getItemLayout(_data, index)}
    />
  );
}

const getItemLayout = (
  data: UserState[] | null | undefined,
  index: number,
) => ({
  length: FIXED_HEIGHT,
  offset: FIXED_HEIGHT * (data ? data.length : 0),
  index,
});

const renderHeader = (
  listRef: FlatList<UserState> | null,
  data: UserState[],
  char: string,
) => {
  const isScrollButtonDisabled = (): boolean => !char;

  return (
    <View style={styles.headerContainer}>
      {char ? (
        <TouchableOpacity
          disabled={isScrollButtonDisabled()}
          style={styles.scrollButton}
          onPress={() =>
            listRef?.scrollToItem({
              item: getFirstItemsBylettersInList(data, char),
              animated: true,
            })
          }>
          <Text style={styles.textScrollStyle}>{`Scroll To ${char}`}</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={navigateToCharScreen}>
        <Text style={styles.selectText}>click to Select letter</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderData = (props: ListRenderItemInfo<UserState>) => {
  return (
    <View style={styles.row} key={generateKeyExtrator(props.index.toString())}>
      <Text>{props.index + 1} - </Text>
      {props.item.image && (
        <FastImage
          style={styles.image}
          source={{
            uri: props.item.image,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
      <Text style={styles.nameText}>{props.item.name}</Text>
    </View>
  );
};

const separator = () => {
  return <View style={styles.separator} />;
};

const getFirstItemsBylettersInList = (
  data: UserState[],
  char: string,
): UserState => {
  let user: UserState = {} as UserState;
  data.forEach((item, _) => {
    if (item.name.charAt(0) === char) {
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
    backgroundColor: 'white',
  },
  scrollButton: {
    padding: 5,
    fontWeight: '300',
    backgroundColor: BaseColors.Secondary,
  },
  textScrollStyle: {
    fontWeight: '300',
    color: BaseColors.WhiteText,
  },
  input: {
    width: 50,
    height: 25,
    borderWidth: 1,
    borderColor: BaseColors.Button,
  },
  selectText: {
    fontWeight: '400',
    fontSize: 17,
    color: BaseColors.WhiteText,
  },
  selectButton: {
    borderWidth: 0.2,
    backgroundColor: BaseColors.Primary,
    padding: 4,
  },
});
