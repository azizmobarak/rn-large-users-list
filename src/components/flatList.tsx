import React from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {UserState} from '../screens/UsersListScroll/usersReducer';

type Props = {
  data: UserState[];
  onEnd?: () => void;
};

export default function CustomizedFlatList(props: Props) {
  return (
    <FlatList
      data={props.data}
      keyExtractor={(item, index) => Math.random() * 200 * index + item.name}
      renderItem={renderData}
      ItemSeparatorComponent={sparator}
      style={styles.list}
    />
  );
}

const renderData = (props: ListRenderItemInfo<UserState>) => {
  return (
    <View style={styles.row} key={props.index}>
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
  },
});
