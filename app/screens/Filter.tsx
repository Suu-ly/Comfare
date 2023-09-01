import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Button} from 'react-native';
import Colors from '../common/constants/Colors';
import Label from '../common/Label';
import TextStyles from '../common/constants/TextStyles';
import CustomStatusBar from '../common/CustomStatusBar';

interface FilterProps {
  route: any;
  navigation: any;
}

const Filter = (props: FilterProps) => {
  const {route, navigation} = props;
  return (
    <View style={styles.mainContainer}>
      <CustomStatusBar />
      <View style={styles.container}>
        <Label
          title={'Filter'}
          color={Colors.black}
          style={TextStyles.bodyLarge}
        />
        <Button
          title={'Go to Home'}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'thistle',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
