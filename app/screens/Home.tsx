import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Animated,
} from 'react-native';

import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../common/constants/theme.json';

import CustomStatusBar from '../common/CustomStatusBar';
import Constants from '../common/constants/Constants';
import Dropdown from '../common/DropdownButton';
import Questions from '../data/ModuleQuestion.json';
import TopicButton from '../common/TopicButton';
import {getSectionListData, numberOfCompletedModules} from '../utils/firestore';
import auth from '@react-native-firebase/auth';

interface HomeProps {
  route: any;
  navigation: any;
  translate: Animated.Value;
  selectedLanguage: {id: number; value: string; icon: string};
}

const Home = (props: HomeProps) => {
  const {route, navigation, translate, selectedLanguage} = props;

  //calculate the index of the topic in the entire language
  const calculateOverallIndex = (
    sections: {data: string | any[]}[],
    sectionIndex: number,
    itemIndex: number,
  ) => {
    let overallIndex = 0;
    for (let i = 0; i < sectionIndex; i++) {
      overallIndex += sections[i].data.length;
    }
    overallIndex += itemIndex;
    return overallIndex;
  };

  type resultType = {
    id: number;
    title: any;
    data: string[];
    backgroundColor: string;
  };
  const [mandarinResult, setMandarinResult] = useState<resultType[] | null>(
    null,
  );
  const [malayResult, setMalayResult] = useState<resultType[] | null>(null);
  const [numberOfCompletedChineseModules, setNumberOfCompletedChineseModules] =
    useState<number | null>(null);
  const [numberOfCompletedMalayModules, setNumberOfCompletedMalayModules] =
    useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = async () => {
      const user = auth().currentUser;
      if (user) {
        const userID = user.uid;
        console.log(userID);
        const numberOfCompletedChineseModules = await numberOfCompletedModules(
          userID,
          'chinese',
        );
        const numberOfCompletedMalayModules = await numberOfCompletedModules(
          userID,
          'malay',
        );
        setNumberOfCompletedChineseModules(numberOfCompletedChineseModules);
        setNumberOfCompletedMalayModules(numberOfCompletedMalayModules);
      } else {
        console.log('No user is signed in.');
      }
    };

    const getChineseResult = async () => {
      const mandarinResult = await getSectionListData('Chinese');
      setMandarinResult(mandarinResult!);
    };

    const getMalayResult = async () => {
      const malayResult = await getSectionListData('Malay');
      setMalayResult(malayResult!);
    };

    unsubscribe();
    getChineseResult();
    getMalayResult();
  }, []);

  return (
    <Animated.View
      style={[styles.mainContainer, {transform: [{translateY: translate}]}]}>
      <View style={styles.container}>
        {mandarinResult !== null &&
          malayResult !== null &&
          numberOfCompletedChineseModules !== null &&
          numberOfCompletedMalayModules !== null && (
            <SectionList
              showsVerticalScrollIndicator={false}
              stickySectionHeadersEnabled={true}
              sections={
                selectedLanguage.id === 1 ? mandarinResult : malayResult
              } //if selectedLanguage is chinese, use chinese result array, else use malay resullt array
              keyExtractor={(item: any, index: any) => item + index}
              renderItem={({item, index, section}) => {
                const overallIndex = calculateOverallIndex(
                  selectedLanguage.id === 1 ? mandarinResult : malayResult,
                  section.id,
                  index,
                );
                //Find out whether the current topic being rendered should be active
                const isActive =
                  overallIndex <
                  (selectedLanguage.id === 1
                    ? numberOfCompletedChineseModules + 1
                    : numberOfCompletedMalayModules + 1);
                //Find out whether the current topic being rendered is completed
                const isCompleted =
                  overallIndex <
                  (selectedLanguage.id === 1
                    ? numberOfCompletedChineseModules
                    : numberOfCompletedMalayModules);
                //Find out whether the item rendered is the last item of the section
                const isLastItem =
                  section.data.indexOf(item) === section.data.length - 1;
                const icon = isLastItem
                  ? 'treasure-chest'
                  : isCompleted
                  ? 'check-bold'
                  : 'star';
                return (
                  <View style={styles.buttonContainer}>
                    <TopicButton
                      disabled={!isActive}
                      backgroundColor={section.backgroundColor}
                      borderColor={Theme.colors.onSurface}
                      icon={icon}
                      textColor={Theme.colors.onSurface}
                      onPress={() => {
                        navigation.navigate('Quiz', {
                          language:
                            selectedLanguage.id == 1 ? 'Chinese' : 'Malay',
                          module: 'Module' + (section.id + 1),
                          topic: 'Topic' + (section.data.indexOf(item) + 1),
                        });
                      }}>
                      {item}
                    </TopicButton>
                  </View>
                );
              }}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.header} variant={'titleLarge'}>
                  {selectedLanguage.value} {title}
                </Text>
              )}
              ItemSeparatorComponent={() => (
                <View style={{height: Constants.defaultGap}} />
              )}
              SectionSeparatorComponent={() => (
                <View style={{paddingVertical: Constants.mediumGap}} />
              )}
            />
          )}
      </View>
    </Animated.View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
  },
  buttonContainer: {
    paddingHorizontal: Constants.edgePadding,
  },
  button: {
    borderRadius: Constants.radiusMedium,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Constants.mediumGap,
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    backgroundColor: Theme.colors.elevation.level1,
    padding: Constants.edgePadding,
  },
  title: {
    fontSize: 24,
  },
});
