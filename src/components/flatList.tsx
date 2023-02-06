import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {UserState} from '../screens/UsersListScroll/usersReducer';
import {generateKeyExtrator} from '../utils/strings';

type Props = {
  data: UserState[];
  onEnd?: () => void;
};

export default function CustomizedFlatList(props: Props) {
  const [refreshing, setIsRefreshing] = useState(false);

  const onRefrech = (onEnd: (() => void) | undefined): boolean => {
    setIsRefreshing(true);
    if (!onEnd) {
      return false;
    }
    onEnd();
    setIsRefreshing(false);
    return true;
  };

  return (
    <FlatList
      data={props.data}
      keyExtractor={(item, _index) => generateKeyExtrator(item.name)}
      renderItem={renderData}
      ItemSeparatorComponent={sparator}
      style={styles.list}
      onEndReachedThreshold={0.5}
      onEndReached={({distanceFromEnd}) => onEndHandler(distanceFromEnd)}
      removeClippedSubviews={true}
      initialNumToRender={100}
      onRefresh={() => onRefrech(props.onEnd)}
      refreshing={refreshing}
    />
  );
}

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
});
