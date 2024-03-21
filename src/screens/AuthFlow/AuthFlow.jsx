/* eslint-disable prettier/prettier */
import {View, Text, Image, Pressable, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import styles from '../../styles';
import {moderateScale, verticalScale} from '../../styles/mixins';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import OnboardingComponent from '../../components/OnboardingComponent';


const AuthFlow = () => {
  const navigation = useNavigation();
  return (
    // <LinearGradient
    //   colors={['#1B202C', '#1B202C']}
    //   start={{x: 0, y: 0}}
    //   end={{x: 1, y: 1}}
    //   style={{flex: 1}}>
      <View
        style={[
          localStyles.container,
        ]}>
          <StatusBar backgroundColor='#1B202C'/>
        {/* <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
          <Text style={localStyles.heading}>Welcome</Text>
        </View> */}

        <OnboardingComponent/>
       
      </View>
    // </LinearGradient>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: moderateScale(80),
    backgroundColor:'#1B202C'
  },

  heading: {
    color: 'white',
    fontSize: moderateScale(48),
    fontWeight: '600',
  },

  onboardingImage: {
    width: moderateScale(350),
    height: moderateScale(300),
    marginTop: moderateScale(15),
  },
});

export default AuthFlow;
