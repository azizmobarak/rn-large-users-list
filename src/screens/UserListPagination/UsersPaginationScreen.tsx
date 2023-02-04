import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import headerBuilder from '../../services/Navigation/headerBuilder';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Screens} from '../../services/Navigation/Screens';

function UsersScreen() {
  const navigation = useNavigation();
  // () => <Text>teees</Text>,
  //   title: 'tteest'
  useEffect(() => {
    navigation.setOptions(
      headerBuilder({
        title: 'Pagination',
        goBack: navigation.goBack,
      }),
    );
  }, [navigation]);
  return (
    <View>
      <View>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text>Scrolling</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Screens.UsersPaginationScreen as never)
          }>
          <Text>Scrolling</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const UsersPaginationScreen = UsersScreen;
