import { View, Image } from 'react-native'
import React, { useEffect } from 'react'
import {useNavigation, useIsFocused} from '@react-navigation/native'
import {LocalSignIn } from '../../actions/authentication'
import { getUserProfile } from '../../actions/userProfile'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
const InitialLandingScreen =(props) => {

   const navigation = useNavigation();
   const isFocused = useIsFocused();
// console.log(props);
    const getActiveUser =async() => {

        const userId = await AsyncStorage.getItem('userId');
        if(userId){
            props.LocalSignIn(userId,navigation);
            props.getUserProfile()
        }else{

            navigation.replace('SignupFlow')
        }
   
  }
    useEffect(() =>{
      getActiveUser();
    },[isFocused]);
  return (
    <View style={{backgroundColor:'white',flex:1,justifyContent:'center'}}>
    
      <Image source={require('../../assets/app-icon.png')} style={{alignSelf:'center'}}/>
    </View>
  )
}

export default connect(null,{

  LocalSignIn,
  getUserProfile
})( InitialLandingScreen);