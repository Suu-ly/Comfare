import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import CustomStatusBar from '../common/CustomStatusBar';
import DuoButton from '../common/DuoButton';
import Theme from '../common/constants/theme.json';
interface LeaderboardProps {
  route: any;
  navigation: any;
}

const Leaderboard = (props: LeaderboardProps) => {
  return (
    <View style={styles.mainContainer}>
      <CustomStatusBar />

      <View>
        <Text>Leaderboard</Text>
      </View>
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});