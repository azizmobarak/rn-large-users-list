import {StackNavigationOptions} from '@react-navigation/stack';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title: string;
  goBack?: () => void;
};

export default function headerBuilder(props: Props): StackNavigationOptions {
  return {
    header: () => headerComponent(props),
  };
}

const headerComponent: FC<Props> = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.header}>
      {props.goBack && (
        <TouchableOpacity onPress={props.goBack}>
          <Text style={styles.backText}>{'<<<<<<'}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{props.title}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#679942',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  backText: {
    color: 'white',
    fontSize: 20,
  },
});
